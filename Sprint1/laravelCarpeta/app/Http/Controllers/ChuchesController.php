<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\Chuches;
use App\Models\ChuchesUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChuchesController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Chuches $chuches)
    {
        try {
            // Selecciona todas las xuxes
            $chuches = Chuches::all();
            // Retorna todos las xuxes en forma json
            return response()->json([$chuches, 200]);
        } catch (\Exception $e) {
            // Retorna error con el mensaje de error
            return response()->json(['message' => 'Ha ocurrido un error al retornar las chuches: ' . $e->getMessage()], 500);
        }
    }
}
