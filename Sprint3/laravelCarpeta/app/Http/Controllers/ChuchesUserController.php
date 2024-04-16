<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\ChuchesUser;
use App\Models\Chuches;
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

    public function horario(Request $request, $userId)
    {

        $existeHorario = Horario::where('id_users', $userId)
            ->exists();

        if (!$existeHorario) {
            $nuevoHorario = new Horario();
            $nuevoHorario->chuche_maximas;
            $nuevoHorario->debug;
            $nuevoHorario->date_debug = now();
            $nuevoHorario->id_users = $userId;
            $nuevoHorario->save();
        } else {
            $actualizarHorario = Horario::where('id_users', $userId)
                ->first();

            // Obtener la fecha actual en formato 'Y-m-d'
            $fechaActual = date('Y-m-d');
            // Obtener la fecha almacenada en la base de datos en formato 'Y-m-d'
            $fechaGuardada = date('Y-m-d', strtotime($actualizarHorario->date_debug));

            // Verificar si la fecha guardada es el día siguiente a la fecha actual
            if ($fechaGuardada == date('Y-m-d', strtotime('+1 day', strtotime($fechaActual)))) {
                // Obtener la hora actual en formato 'H:i'
                $horaActual = date('H:i');
                // Verificar si la hora actual es a las 9:00 a.m. o más tarde
                if ($horaActual >= '09:00') {
                    // La fecha es el día siguiente y la hora es 9:00 a.m. o más tarde
                    // Realizar las acciones necesarias aquí
                    $actualizarHorario->date_debug = now();
                    $actualizarHorario->debug = true;
                    $actualizarHorario->save();
                }
            }
        }
    }

    public function ReclamarHorario(Request $request, $userId)
    {

        $Horarios = Horario::where('id_users', $userId)
            ->exists();

        if (!$Horarios) {
            $actualizarHorario = Horario::where('id_users', $userId)
                ->first();

            // Obtener la fecha actual en formato 'Y-m-d'
            $fechaActual = date('Y-m-d');
            // Obtener la fecha almacenada en la base de datos en formato 'Y-m-d'
            $fechaGuardada = date('Y-m-d', strtotime($actualizarHorario->date_debug));

            // Verificar si la fecha guardada es el día siguiente a la fecha actual
            if ($fechaGuardada == date('Y-m-d', strtotime('+1 day', strtotime($fechaActual)))) {
                // Obtener la hora actual en formato 'H:i'
                $horaActual = date('H:i');
                // Verificar si la hora actual es a las 9:00 a.m. o más tarde
                if ($horaActual >= '09:00') {
                    // La fecha es el día siguiente y la hora es 9:00 a.m. o más tarde
                    // Realizar las acciones necesarias aquí
                    $actualizarHorario->debug = true;
                    $actualizarHorario->save();
                }
            }
        }
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
            $chuchesCreadas = [];
            // Obtener una chuche aleatoria
            $chucheAleatoria = self::obtenerChucheAleatoria();


            //Verifica si puede dar las chuches
            $darChuchesUser = Horario::where('id_users', $userId)
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
                $chucheExistente = ChuchesUser::where('user_id', $userId)
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
                    $nuevaChucheUsuario->user_id = $userId;
                    $nuevaChucheUsuario->stack = 1; // Establecer el valor inicial de stack
                    $nuevaChucheUsuario->save();
                }

                $darChuchesUser->debug = false;
                $darChuchesUser->save();

                // Agregar la chuche creada al array
                $chuchesCreadas[] = $chucheAleatoria;
            }

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
    public function show(Request $request, $userId)
    {
        try {
            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $chuches = ChuchesUser::where('user_id', $userId)
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
    public function showHorario(Request $request, $userId)
    {
        try {
            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $horario = Horario::where('id_users', $userId)->get();

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
