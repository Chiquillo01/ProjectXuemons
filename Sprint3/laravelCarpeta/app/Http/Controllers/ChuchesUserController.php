<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\ChuchesUser;
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
        $chucheAleatoria = DB::select("SELECT id FROM chuches ORDER BY RAND() LIMIT 1");

        return !empty($chucheAleatoria) ? $chucheAleatoria[0]->id : null;
    }

    /**
     * Nombre: debug
     * Función: Crear un nuevo xuxemon aleatorio asociado al usuario en sesión.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function debug(Request $request, $userId)
    {
        try {
            $chucheAleatoria = self::obtenerChucheAleatoria();
            if ($chucheAleatoria) {
                // Crear un nuevo xuxemon asociado al usuario en sesión
                $nuevaChucheUsuario = new ChuchesUser();
                $nuevaChucheUsuario->chuche_id = $chucheAleatoria;
                $nuevaChucheUsuario->user_id = $userId;
                $nuevaChucheUsuario->save();
                return response()->json(['message' => 'Nuevo Xuxemon creado con éxito'], 200);
            } else {
                return response()->json(['message' => 'No se pudo encontrar un xuxemon aleatorio'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al crear la chuche aleatorio: ' . $e->getMessage()], 500);
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

