<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\XuxemonsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class XuxemonsUserController extends Controller
{
    /**
     * Nombre: obtenerXuxemonAleatorio
     * Función: Obtener un xuxemon aleatorio de la tabla xuxemons.
     * @return \App\Models\Xuxemons|null
     */
    public static function obtenerXuxemonAleatorio()
    {
        $xuxemonAleatorio = DB::select("SELECT id FROM xuxemons ORDER BY RAND() LIMIT 1");

        return !empty($xuxemonAleatorio) ? $xuxemonAleatorio[0]->id : null;
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
            $xuxemonAleatorio = self::obtenerXuxemonAleatorio();

            if ($xuxemonAleatorio) {
                // Crear un nuevo xuxemon asociado al usuario en sesión
                $nuevoXuxemonUsuario = new XuxemonsUser();
                $nuevoXuxemonUsuario->xuxemon_id = $xuxemonAleatorio;
                $nuevoXuxemonUsuario->user_id = $userId;
                $nuevoXuxemonUsuario->save();

                // Retornar la respuesta con éxito
                return response()->json(['message' => 'Nuevo Xuxemon creado con éxito'], 200);
            } else {
                // Retornar un error si no se encontró un xuxemon aleatorio
                return response()->json(['message' => 'No se pudo encontrar un xuxemon aleatorio'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el nuevo Xuxemon: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $userId)
    {
        try {
            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $xuxemons = XuxemonsUser::where('user_id', $userId)
                ->join('xuxemons', 'xuxemons_users.xuxemon_id', '=', 'xuxemons.id')
                ->select('xuxemons_users.*', 'xuxemons.nombre', 'xuxemons.tipo', 'xuxemons.archivo')
                ->get();

            // Retorna todos los xuxemons en forma json
            return response()->json([$xuxemons, 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }



    /**
     * Update the evolutions in storage.
     */
    public function alimentar(Request $request, XuxemonsUser $xuxemonsUser)
    {

        try {
            // Valida los datos //
            $validados = $request->validate([
                'comida' => ['required'],
            ]);

            // Hace el update dentro de una transaccion
            DB::transaction(function () use ($validados, $xuxemonsUser) {
                $xuxemonsUser->update($validados);
            });

            dump($xuxemonsUser);

            // Retorna actualizado de forma satisfactoria
            return response()->json(['message' => 'Se ha actualizado de forma correcta'], 200);
        } catch (\Exception $e) {

            // Retorna error
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, XuxemonsUser $xuxemonsUser)
    {
        try {
            // Valida los datos
            $validados = $request->validate([
                'nombre' => 'required',
                'tipo' => 'required',
                'comida' => 'required',
                'tamano' => 'required',
                'evo1' => 'required',
                'evo2' => 'required',
                'vida' => 'required',
                'archivo' => 'required',
                'idUser' => 'nullable',
            ]);

            // Hace el update dentro de una transaccion
            DB::transaction(function () use ($validados, $xuxemonsUser) {
                $xuxemonsUser->update($validados);
            });

            // Retorna actualizado de forma satisfactoria
            return response()->json(['message' => 'Se ha actualizado de forma correcta el tamaño'], 200);
        } catch (\Exception $e) {

            // Retorna error
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update the evolutions in storage.
     */
    public function updateEvos(Request $request, XuxemonsUser $xuxemonsUser)
    {

        try {
            // Valida los datos
            $validados = $request->validate([
                'evo1' => ['required'],
                'evo2' => ['required'],
            ]);

            // Obtiene los datos validados del request
            $evo1 = $request->input('evo1');
            $evo2 = $request->input('evo2');

            // Hace el update dentro de una transaccion
            DB::transaction(function () use ($evo1, $evo2) {
                XuxemonsUser::query()->update(['evo1' => $evo1, 'evo2' => $evo2]);
            });

            // Retorna actualizado de forma satisfactoria
            return response()->json(['message' => 'Se ha actualizado de forma correcta'], 200);
        } catch (\Exception $e) {

            // Retorna error
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }
}
