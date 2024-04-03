<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\Xuxemons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class XuxemonsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Valida los datos //
            $validados = $request->validate([
                'nombre' => 'required|string',
                'tipo' => 'required|string',
                'tamano' => 'nullable|numeric',
                'evo1' => 'nullable|numeric',
                'evo2' => 'nullable|numeric',
                //'comida' => 'numeric',
                'vida' => 'required|numeric',
                'archivo' => 'required|string',
            ]);

            DB::transaction(function () use ($validados) {
                // Crea los datos en una transaccion //
                Xuxemons::create($validados);
            });

            // Devuelve un 200 (OK) para confirmar al usuario //
            return response()->json(['message' => 'Xuxemon creado con exito'], 200);
        } catch (\Exception $e) {
            // Y devuelve un mensaje de error //
            return response()->json(['message' => 'Ha ocurrido un error al crear el Xuxemon: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Xuxemons $xuxemons)
    {
        try {
            // Selecciona todos los xuxemons
            $xuxemons = Xuxemons::all();
            // Retorna todos los xuxemons en forma json
            return response()->json([$xuxemons, 200]);
        } catch (\Exception $e) {
            // Retorna error con el mensaje de error
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    public function showOne(Xuxemons $xuxemons)
    {

        try {
            return response()->json(['xuxemons' => $xuxemons]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Xuxemons $xuxemons)
    {

        try {
            // Valida los datos
            $validados = $request->validate([
                'nombre' => ['required', 'max:20', 'unique:xuxemons,nombre,' . $xuxemons->id],
                'tipo' => ['required', 'in:Tierra,Aire,Agua'],
                'tamano' => ['required'],
                'evo1' => ['required'],
                'evo2' => ['required'],
                'archivo' => ['required', 'unique:xuxemons,archivo,' . $xuxemons->id],
            ]);

            // Hace el update dentro de una transaccion
            DB::transaction(function () use ($validados, $xuxemons) {
                $xuxemons->update($validados);
            });

            // Retorna actualizado de forma satisfactoria
            return response()->json(['message' => 'Se ha actualizado de forma correcta'], 200);
        } catch (\Exception $e) {

            // Retorna error
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateTam(Request $request, Xuxemons $xuxemons)
    {
        try {
            // Valida los datos recibidos
            $validados = $request->validate([
                'tamano' => 'required', // Validación simple, puedes ajustarla según tus necesidades
            ]);

            // Hace el update dentro de una transacción
            DB::transaction(function () use ($validados, $xuxemons) {
                $xuxemons->update($validados);
            });

            // Retorna actualizado de forma satisfactoria
            return response()->json(['message' => 'Se ha actualizado de forma correcta'], 200);
        } catch (\Exception $e) {

            // Retorna error
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Xuxemons $xuxemons)
    {
        try {

            DB::transaction(function () use ($xuxemons) {
                $xuxemons->delete();
            });

            // Retorna borrado de forma correcta
            return response()->json(['message' => 'Se ha borrado de forma correcta'], 200);
        } catch (\Exception $e) {

            // Retorna error
            return response()->json(['message' => 'Ha ocurrido un error al eliminar: ' . $e->getMessage()], 500);
        }
    }
}
