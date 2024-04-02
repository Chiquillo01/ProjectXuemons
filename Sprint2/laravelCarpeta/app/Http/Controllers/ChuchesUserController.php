<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chuches;
use App\Models\ChuchesUser;
use Illuminate\Support\Facades\DB;

class ChuchesUserController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(ChuchesUser $chuches)
    {
        try {
            // Selecciona todas las xuxes
            $chuches = ChuchesUser::all();
            // Retorna todos las xuxes en forma json
            return response()->json([$chuches, 200]);
        } catch (\Exception $e) {
            // Retorna error con el mensaje de error
            return response()->json(['message' => 'Ha ocurrido un error al retornar las chuches: ' . $e->getMessage()], 500);
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
                'dinero' => 'required|numeric',
                'modificador' => 'required|numeric',
                'archivo' => 'required|string',
                'idUser' => 'required|numeric',
            ]);

            DB::transaction(function () use ($validados) {
                // Selecciona un xuxemon aleatorio //
                $chuchesAleatorio = Chuches::inRandomOrder()->first();

                // Asigna la ID 1 al xuxemon aleatorio seleccionado //
                // $validados['idUser'] = $chuchesAleatorio->id;

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

