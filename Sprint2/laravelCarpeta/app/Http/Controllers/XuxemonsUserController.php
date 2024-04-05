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
                'comida' => 'numeric',
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
