<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\Xuxemons;
use App\Models\XuxemonsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class XuxemonsUserController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(XuxemonsUser $xuxemons)
    {
        try {
            // Selecciona todos los xuxemons
            $xuxemons = XuxemonsUser::all();
            // Retorna todos los xuxemons en forma json
            return response()->json([$xuxemons, 200]);
        } catch (\Exception $e) {
            // Retorna error con el mensaje de error
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Create a random Xuxemon from JSON data.
     */
    public function debug(Request $request)
    {
        try {
            // Valida los datos //
            $validados = $request->validate([
                'nombre' => 'required|string',
                'tipo' => 'required|string',
                'tamano' => 'required|numeric',
                'vida' => 'required|numeric',
                'archivo' => 'required|string',
                'idUser' => 'required|numeric',
            ]);

            DB::transaction(function () use ($validados) {
                // Crea los datos en una transaccion //
                XuxemonsUser::create($validados);
            });

            // Devuelve un 200 (OK) para confirmar al usuario //
            return response()->json(['message' => 'Xuxemon creado aleatoriamente con exito'], 200);
        } catch (\Exception $e) {
            // Y devuelve un mensaje de error //
            return response()->json(['message' => 'Ha ocurrido un error al crear el Xuxemon aleatorio: ' . $e->getMessage()], 500);
        }
    }
}
