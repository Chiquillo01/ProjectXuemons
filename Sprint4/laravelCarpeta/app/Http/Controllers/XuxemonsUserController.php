<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\XuxemonsUser;
use App\Models\ChuchesUser;
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
     * Nombre: alimentar
     * Función: Primero recoje los valores necesarios, seguidamente suma y 
     * agrega el nuevo valor de comida al xuxemon y ha su vez elimina la xuxe usada.
     * Por último comprovaciones para ver si el Xuxemon puede evolucionar
     */
    public function alimentar(Request $request, $xuxemon_id, $chuche_id, $user_id)
    {
        try {
            $xuxemonInfo = XuxemonsUser::where('user_id', $user_id)
                ->where('xuxemon_id', $xuxemon_id)
                ->join('xuxemons', 'xuxemons_users.xuxemon_id', '=', 'xuxemons.id')
                ->select(
                    'xuxemons_users.*',
                    'xuxemons.nombre',
                    'xuxemons.tamano',
                    'xuxemons.evo1',
                    'xuxemons.evo2'
                )
                ->first();

            $chucheInfo = ChuchesUser::where('user_id', $user_id)
                ->where('chuche_id', $chuche_id)
                ->join('chuches', 'chuches_users.chuche_id', '=', 'chuches.id')
                ->select(
                    'chuches_users.*',
                    'chuches.modificador',
                )
                ->first();
            // ------------- //
            $nuevaComida = $xuxemonInfo->comida + $chucheInfo->modificador;
            DB::transaction(function () use ($user_id, $xuxemon_id, $nuevaComida, $chuche_id) {
                // Actualizar el valor de comida en la tabla xuxemons_users dentro de la transacción
                XuxemonsUser::where('user_id', $user_id)
                    ->where('xuxemon_id', $xuxemon_id)
                    ->update(['comida' => $nuevaComida]);

                ChuchesUser::where('user_id', $user_id)
                    ->where('chuche_id', $chuche_id)
                    ->delete();
            });
            // ------------- //
            $cumpleEvo1 = $nuevaComida >= $xuxemonInfo->evo1;
            $cumpleEvo2 = $nuevaComida >= $xuxemonInfo->evo2;

            // ------------- //
            return response()->json([
                'cumpleEvo1' => $cumpleEvo1,
                'cumpleEvo2' => $cumpleEvo2,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Nombre: evolucionarXuxemon
     * Función: 
     */
    public function evolucionarXuxemon(Request $request, $user_Id, $xuxemon_id)
    {
        try {
            $cumpleEvo1 = $request->input('cumpleEvo1');

            if ($cumpleEvo1) {
                DB::transaction(function () use ($user_Id, $xuxemon_id) {
                    // Actualizar el valor de comida en la tabla xuxemons_users dentro de la transacción
                    XuxemonsUser::where('user_id', $user_Id)
                        ->where('xuxemon_id', $xuxemon_id)
                        ->join('xuxemons', 'xuxemons_users.xuxemon_id', '=', 'xuxemons.id')
                        ->update(['xuxemons.tamano' => 'mediano']);
                });
            }
            return response()->json(['message' => 'Xuxemon evolucionado con éxito.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al evolucionar el xuxemon: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Nombre: evolucionarXuxemon
     * Función: 
     */
    public function evolucionarXuxemon2(Request $request, $user_Id, $xuxemon_id)
    {
        try {
            $cumpleEvo2 = $request->input('cumpleEvo2');

            if ($cumpleEvo2) {
                DB::transaction(function () use ($user_Id, $xuxemon_id) {
                    // Actualizar el valor de comida en la tabla xuxemons_users dentro de la transacción
                    XuxemonsUser::where('user_id', $user_Id)
                        ->where('xuxemon_id', $xuxemon_id)
                        ->join('xuxemons', 'xuxemons_users.xuxemon_id', '=', 'xuxemons.id')
                        ->update(['xuxemons.tamano' => 'grande']);
                });
            }
            return response()->json(['message' => 'Xuxemon evolucionado con éxito.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al evolucionar el xuxemon: ' . $e->getMessage()], 500);
        }
    }
}
