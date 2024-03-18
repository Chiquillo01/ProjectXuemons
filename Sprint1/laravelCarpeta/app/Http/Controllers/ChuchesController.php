<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\Chuches;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChuchesController extends Controller
{
    /**
     * Create a random Xuxemon from JSON data.
     */
    public function debug(Request $request)
    {
        try {
            // Valida los datos //
            $validados = $request->validate([
                'name' => 'required|string',
                'modifcacion' => 'required|number',
                'dinero' => 'required|number',
                'archive' => 'required|string',
            ]);

            DB::transaction(function () use ($validados) {
                // Crea los datos en una transaccion //
                Chuches::create($validados);
            });

            // Devuelve un 200 (OK) para confirmar al usuario //
            return response()->json(['message' => 'Xuxemon creado aleatoriamente con exito'], 200);
        } catch (\Exception $e) {
            // Y devuelve un mensaje de error //
            return response()->json(['message' => 'Ha ocurrido un error al crear el Xuxemon aleatorio: ' . $e->getMessage()], 500);
        }
    }
}
