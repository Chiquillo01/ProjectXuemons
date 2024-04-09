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
     * Nombre: show
     * Función: Enviar los datos para que se muestren en el frontend
     */
    public function show(Request $request, $userId)
    {
        try {
            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $xuxemons = XuxemonsUser::where('user_id', $userId)
                ->join('xuxemons', 'xuxemons_users.xuxemon_id', '=', 'xuxemons.id')
                ->select(
                    'xuxemons_users.*',
                    'xuxemons.nombre',
                    'xuxemons.tipo',
                    'xuxemons.archivo',
                    'xuxemons.tamano',
                    'xuxemons.evo1',
                    'xuxemons.evo2'
                )
                ->get();

            // Retorna todos los xuxemons en forma json
            return response()->json([$xuxemons, 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Nombre: show
     * Función: 
     */
    public function alimentar(Request $request, $xuxemon_id)
    {
        try {

            // $info = XuxemonsUser::where('xuxemon_id', $xuxemon_id)
            //     ->where('chuche_id', $chuche_id)
            //     ->join('xuxemons', 'xuxemons_users.xuxemon_id', '=', 'xuxemons.id')
            //     ->join('chuches', 'xuxemons_users.chuche_id', '=', 'chuches.id')
            //     ->select(
            //         'xuxemons_users.comida',
            //         'xuxemons.tamano',
            //         'xuxemons.evo1',
            //         'xuxemons.evo2',
            //         'chuches.modificador'
            //     )
            //     ->get();

            return response()->json([$xuxemon_id, 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }
}
