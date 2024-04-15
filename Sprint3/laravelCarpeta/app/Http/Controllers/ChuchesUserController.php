<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\ChuchesUser;
use App\Models\Chuches;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChuchesUserController extends Controller
{
    /**
     * Nombre: obtenerXuxemonAleatorio
     * Función: Obtener una chuche aleatoria de la tabla chuches.
     * @return \App\Models\Xuxemons|null
     */
    public static function obtenerChucheAleatoria()
    {
        // $chucheAleatoria = DB::select("SELECT id FROM chuches ORDER BY RAND() LIMIT 1");

        // return !empty($chucheAleatoria) ? $chucheAleatoria[0]->id : null;

        // Utiliza Eloquent para obtener una chuche aleatoria
        $chucheAleatoria = Chuches::inRandomOrder()->first();

        // Retorna el id si se encuentra una chuche aleatoria, o null si no se encuentra ninguna
        return $chucheAleatoria ? $chucheAleatoria->id : null;
    }

    /**
     * Nombre: debug
     * Función: Crear una nueva chuche aleatoria asociada al usuario en sesión.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function debug(Request $request, $userId)
    {
        try {
            // Obtener una chuche aleatoria
            $chucheAleatoria = self::obtenerChucheAleatoria();

            if (!$chucheAleatoria) {
                return response()->json(['message' => 'No se pudo encontrar una chuche aleatoria.'], 404);
            }

            // Verificar si el usuario ya tiene esta chuche
            $chucheExistente = ChuchesUser::where('user_id', $userId)
                ->where('chuche_id', $chucheAleatoria)
                ->first();

            if ($chucheExistente) {
                // Incrementar el valor de stack en 1
                $chucheExistente->stack += 1;
                $chucheExistente->save();

                // Si ya tiene la chuche, retornar un mensaje indicándolo
                return response()->json(['message' => 'Chuche añadida en el stack'], 200);
            } else {
                // Crear un nuevo ChuchesUser
                $nuevaChucheUsuario = new ChuchesUser();
                $nuevaChucheUsuario->chuche_id = $chucheAleatoria;
                $nuevaChucheUsuario->user_id = $userId;
                $nuevaChucheUsuario->stack = 1;
                $nuevaChucheUsuario->save();

                // Retornar la respuesta con éxito
                return response()->json(['message' => 'Nueva chuche creada con éxito'], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al crear la chuche aleatoria: ' . $e->getMessage()], 500);
        }
    }



    /**
     * Nombre: show
     * Función: Enviar los datos para que se muestren en el frontend
     */
    public function show(Request $request, $userId)
    {
        try {
            $chuches = ChuchesUser::where('user_id', $userId)
                ->join('chuches', 'chuches_users.chuche_id', '=', 'chuches.id')
                ->select('chuches_users.*', 'chuches.nombre', 'chuches.dinero', 'chuches.modificador', 'chuches.archivo')
                ->get();

            return response()->json([$chuches, 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar las chuches: ' . $e->getMessage()], 500);
        }
    }







    function updateStack(Request $request, ChuchesUser $chuches)
    {
        try {
            // Valida los datos recibidos
            $validados = $request->validate([
                'stack' => 'required', // Validación simple, puedes ajustarla según tus necesidades
            ]);

            // Hace el update dentro de una transacción
            DB::transaction(function () use ($validados, $chuches) {
                $chuches->update($validados);
            });

            // Retorna actualizado de forma satisfactoria
            return response()->json(['message' => 'Se ha actualizado de forma correcta'], 200);
        } catch (\Exception $e) {

            // Retorna error
            return response()->json(['message' => 'Ha ocurrido un error al actualizar las chuches: ' . $e->getMessage()], 500);
        }
    }
}
