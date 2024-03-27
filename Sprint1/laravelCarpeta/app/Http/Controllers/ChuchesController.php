<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\Chuches;
use App\Models\ChuchesUser;
use App\Models\XuxemonsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChuchesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Valida los datos //
            $validados = $request->validate([
                'name' => 'required|string',
                'type' => 'required|string',
                'archive' => 'required|string',
            ]);

            DB::transaction(function () use ($validados) {
                // Crea los datos en una transaccion //
                Chuches::create($validados);
            });

            // Devuelve un 200 (OK) para confirmar al usuario //
            return response()->json(['message' => 'Chuche creado con exito'], 200);
        } catch (\Exception $e) {
            // Y devuelve un mensaje de error //
            return response()->json(['message' => 'Ha ocurrido un error al crear la chuche: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Chuches $chuches)
    {
        try {
            // Selecciona todos los xuxemons
            $chuches = Chuches::all();
            // Retorna todos los xuxemons en forma json
            return response()->json([$chuches, 200]);
        } catch (\Exception $e) {
            // Retorna error con el mensaje de error
            return response()->json(['message' => 'Ha ocurrido un error al retornar las chuches: ' . $e->getMessage()], 500);
        }
    }

    // public function showOne(Chuches $chuches)
    // {

    //     try {
    //         return response()->json(['chuches' => $chuches]);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'Ha ocurrido un error al retornar las chuches: ' . $e->getMessage()], 500);
    //     }
    // }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chuches $chuches)
    {

        try {
            // Valida los datos
            $validados = $request->validate([
                'name' => ['required', 'max:20', 'unique:xuxemons,name,' . $chuches->id],
                'modifcacion' => ['required', 'number'],
                'dinero' => ['required', 'number'],
                'archive' => ['required', 'unique:xuxemons,archive,' . $chuches->id],
            ]);

            // Hace el update dentro de una transaccion
            DB::transaction(function () use ($validados, $chuches) {
                $chuches->update($validados);
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
    public function destroy(Chuches $chuches)
    {
        try {

            DB::transaction(function () use ($chuches) {
                $chuches->delete();
            });

            // Retorna borrado de forma correcta
            return response()->json(['message' => 'Se ha borrado de forma correcta'], 200);
        } catch (\Exception $e) {

            // Retorna error
            return response()->json(['message' => 'Ha ocurrido un error al eliminar: ' . $e->getMessage()], 500);
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
            'dinero' => 'required|number',
            'modificador' => 'required|number',
            'archivo' => 'required|string',
        ]);

        DB::transaction(function () use ($validados) {
            // Selecciona un xuxemon aleatorio //
            $chuchesAleatorio = Chuches::inRandomOrder()->first();

            // Asigna la ID 1 al xuxemon aleatorio seleccionado //
            $validados['chuches_id'] = $chuchesAleatorio->id;

            // Crea los datos en una transacción //
            ChuchesUser::create($validados);
        });

        // Devuelve un 200 (OK) para confirmar al usuario //
        return response()->json(['message' => 'Chuches creado aleatoriamente con éxito'], 200);
    } catch (\Exception $e) {
        // Y devuelve un mensaje de error //
        return response()->json(['message' => 'Ha ocurrido un error al crear la chuche aleatorio: ' . $e->getMessage()], 500);
    }
}

}
