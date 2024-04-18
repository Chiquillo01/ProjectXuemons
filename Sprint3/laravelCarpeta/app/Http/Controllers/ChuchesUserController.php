<?php

namespace App\Http\Controllers;

// Imports //
use Carbon\Carbon;
use App\Models\ChuchesUser;
use App\Models\Chuches;
use App\Models\User;
use App\Models\Horario;
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
        // Utiliza Eloquent para obtener una chuche aleatoria
        $chucheAleatoria = Chuches::inRandomOrder()->first();

        // Retorna el id si se encuentra una chuche aleatoria, o null si no se encuentra ninguna
        return $chucheAleatoria ? $chucheAleatoria->id : null;
    }

    public function horario(Request $request, $userToken)
    {

        $user = User::where('remember_token', $userToken)
            ->first();

        if (!$user) {
            // Manejar el caso donde no se encontró ningún usuario con el token proporcionado
            return response()->json(['message' => 'Usuario no encontrado', $user, $userToken], 404);
        }

        $existeHorario = Horario::where('id_users', $user->id)
            ->exists();

        if (!$existeHorario) {
            $nuevoHorario = new Horario();
            $nuevoHorario->chuche_maximas;
            $nuevoHorario->debug;
            $nuevoHorario->date_debug = Carbon::now();
            $nuevoHorario->id_users = $user->id;
            $nuevoHorario->save();
        } else {
            $actualizarHorario = Horario::where('id_users', $user->id)
                ->first();

            $actualizarHorario->date_debug = Carbon::now();
            $actualizarHorario->debug = true;
            $actualizarHorario->save();
        }
    }

    public function ReclamarHorario(Request $request, $userToken)
    {
        $user = User::where('remember_token', $userToken)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $horario = Horario::where('id_users', $user->id)->first();

        if ($horario && is_string($horario->date_debug)) {
            $horario->date_debug = Carbon::parse($horario->date_debug); // Convertir a instancia de Carbon
        }

        $diaGuardado = intval($horario->date_debug->format('d'));
        $diaActual = intval(Carbon::now()->format('d'));
        $horaActual = intval(Carbon::now()->format('H'));

        if ($horario) {
         // if ($diaGuardado < $diaActual) {
            if ($horaActual > 9 && $diaGuardado < $diaActual) {
                $horario->debug = true;
                $horario->save();
                return response()->json(['message' => 'Debug es true', $horario, $diaActual, $diaGuardado], 200);
            }
        } else {
            return response()->json(['message' => 'Debug sigue false', $horario, $diaActual, $diaGuardado], 404);
        }
    }

    /**
     * Nombre: debug
     * Función: Crear una nueva chuche aleatoria asociada al usuario en sesión.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function debug(Request $request, $userToken)
    {
        try {

            $user = User::where('remember_token', $userToken)
                ->first();

            if (!$user) {
                // Manejar el caso donde no se encontró ningún usuario con el token proporcionado
                return response()->json(['message' => 'Usuario no encontrado', $user, $userToken], 404);
            }

            $chuchesCreadas = [];
            // Obtener una chuche aleatoria
            $chucheAleatoria = self::obtenerChucheAleatoria();


            //Verifica si puede dar las chuches
            $darChuchesUser = Horario::where('id_users', $user->id)
                ->where('debug', true)
                ->first();

            if (!$darChuchesUser) {
                return response()->json(['message' => 'No tienes permitido recoger chuches'], 403);
            }

            // Obtener el número máximo de chuches a crear
            $numeroChuches = $darChuchesUser->chuche_maximas;

            for ($i = 0; $i < $numeroChuches; $i++) {
                // Obtener una chuche aleatoria
                $chucheAleatoria = self::obtenerChucheAleatoria();

                if (!$chucheAleatoria) {
                    return response()->json(['message' => 'No se pudo encontrar una chuche aleatoria.'], 404);
                }

                // Verificar si el usuario ya tiene esta chuche
                $chucheExistente = ChuchesUser::where('user_id', $user->id)
                    ->where('chuche_id', $chucheAleatoria)
                    ->first();

                if ($chucheExistente) {
                    // Incrementar el valor de stack en 1
                    $chucheExistente->stack += 1;
                    $chucheExistente->save();
                } else {
                    // Crear un nuevo ChuchesUser
                    $nuevaChucheUsuario = new ChuchesUser();
                    $nuevaChucheUsuario->chuche_id = $chucheAleatoria;
                    $nuevaChucheUsuario->user_id = $user->id;
                    $nuevaChucheUsuario->stack = 1; // Establecer el valor inicial de stack
                    $nuevaChucheUsuario->save();
                }

                $darChuchesUser->debug = false;
                $darChuchesUser->save();

                // Agregar la chuche creada al array
                $chuchesCreadas[] = $chucheAleatoria;
            }

            //codigo antiguo

            // if ($darChuchesUser) {

            //     if (!$chucheAleatoria) {
            //         return response()->json(['message' => 'No se pudo encontrar una chuche aleatoria.'], 404);
            //     }
            //     // Verificar si el usuario ya tiene esta chuche
            //     $chucheExistente = ChuchesUser::where('user_id', $userId)
            //         ->where('chuche_id', $chucheAleatoria)
            //         ->first();

            //     if ($chucheExistente) {
            //         // Incrementar el valor de stack en 1
            //         $chucheExistente->stack += 1;
            //         $chucheExistente->save();

            //         // Si ya tiene la chuche, retornar un mensaje indicándolo
            //         return response()->json(['message' => 'Chuche añadida en el stack'], 200);
            //     } else {
            //         // Crear un nuevo ChuchesUser
            //         $nuevaChucheUsuario = new ChuchesUser();
            //         $nuevaChucheUsuario->chuche_id = $chucheAleatoria;
            //         $nuevaChucheUsuario->user_id = $userId;
            //         $nuevaChucheUsuario->stack = 1; // Establecer el valor inicial de stack
            //         $nuevaChucheUsuario->save();

            //         // Retornar la respuesta con éxito
            //         return response()->json(['message' => 'Nueva chuche creada con éxito'], 200);
            //     }
            // } else {
            // return response()->json(['message' => 'Ya has recogido las chuches'], 404);
            // }
            return response()->json(['message' => 'Chuches añadidas con éxito', 'chuches' => $chuchesCreadas], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al crear la chuche aleatoria: ' . $e->getMessage()], 500);
        }
    }



    /**
     * Nombre: show
     * Función: Enviar los datos para que se muestren en el frontend
     */
    public function show(Request $request, $userToken)
    {
        try {

            $user = User::where('remember_token', $userToken)
                ->first();

            if (!$user) {
                // Manejar el caso donde no se encontró ningún usuario con el token proporcionado
                return response()->json(['message' => 'Usuario no encontrado', $user, $userToken], 404);
            }


            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $chuches = ChuchesUser::where('user_id', $user->id)
                ->join('chuches', 'chuches_users.chuche_id', '=', 'chuches.id')
                ->select('chuches_users.*', 'chuches.nombre', 'chuches.dinero', 'chuches.modificador', 'chuches.archivo')
                ->get();

            // Retorna todos los xuxemons en forma json
            return response()->json([$chuches, 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar las chuches: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Nombre: showHorario
     * Función: Enviar los datos para que se muestren en el frontend
     */
    public function showHorario(Request $request, $userToken)
    {
        try {

            $user = User::where('remember_token', $userToken)
                ->first();

            if (!$user) {
                // Manejar el caso donde no se encontró ningún usuario con el token proporcionado
                return response()->json(['message' => 'Usuario no encontrado', $user, $userToken], 404);
            }

            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $horario = Horario::where('id_users', $user->id)->get();

            // Retorna todos los xuxemons en forma json
            return response()->json([$horario, 200]);
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
