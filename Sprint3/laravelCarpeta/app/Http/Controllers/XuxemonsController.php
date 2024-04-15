<?php

namespace App\Http\Controllers;

// Imports //
use App\Models\Xuxemons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class XuxemonsController extends Controller
{
    /**
     * Nombre: store
     * Función: se encarga de crear los nuevos xuxemons, para ello valida los datos recibidos 
     * y crea el nuevo xuxemon a traves de una transacción
     */
    public function crearXuxemon(Request $request)
    {
        try {
            // Valida los datos //
            $validados = $request->validate([
                'nombre' => 'required|string',
                'tipo' => 'required|string',
                'archivo' => 'required|string',
            ]);

            DB::transaction(function () use ($validados) {
                Xuxemons::create($validados);
            });

            // Devuelve un 200 (OK) para confirmar al usuario //
            return response()->json(['message' => 'Xuxemon creado con exito'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al crear el Xuxemon: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Nombre: show
     * Función: Recoje todos los xuxemons de la bd y se los pasa al servicio de angular
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

    /**
     * Nombre: update
     * Función: se encarga de actualizar los nuevos valores, para ello valida los datos recibidos 
     * y crea el update de losdatos xuxemon a traves de una transacción. Sabe el xuxemon a actualizar 
     * gracias al paremetro extra que le llega por la api
     */
    public function update(Request $request, Xuxemons $xuxemons)
    {
        try {
            // Valida los datos
            $validados = $request->validate([
                'nombre' => ['required', 'max:20', 'unique:xuxemons,nombre,' . $xuxemons->id],
                'tipo' => ['required', 'in:Tierra,Aire,Agua'],
                'archivo' => ['required', 'unique:xuxemons,archivo,' . $xuxemons->id],
            ]);

            // Hace el update dentro de una transaccion
            DB::transaction(function () use ($validados, $xuxemons) {
                $xuxemons->update($validados);
            });

            // Retorna actualizado de forma satisfactoria
            return response()->json(['message' => 'Se ha actualizado de forma correcta'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Nombre: destroy
     * Función: elimina al xuxemon que le llega como parametro
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

    /**
     * Nombre: updateTam
     * Función: gracias al valor que se le pasa por paremetro hace un update
     * a la bd con el nuevo valor, esto lo hace a todos los registros
     */
    public function updateTam(Request $request, $tamano)
    {
        try {
            DB::transaction(function () use ($tamano) {
                Xuxemons::query()->update(['tamano' => $tamano]);
            });

            return response()->json(['message' => 'Se ha actualizado el tamaño de los xuxemons correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Nombre: updateEvo1
     * Función: gracias al valor que se le pasa por paremetro hace un update
     * a la bd con el nuevo valor, esto lo hace a todos los registros
     */
    public function updateEvo1(Request $request, $evo1)
    {
        try {
            DB::transaction(function () use ($evo1) {
                Xuxemons::query()->update(['evo1' => $evo1]);
            });

            return response()->json(['message' => 'Se ha actualizado el tamaño de los xuxemons correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }
    /**
     * Nombre: updateEvo2
     * Función: gracias al valor que se le pasa por paremetro hace un update
     * a la bd con el nuevo valor, esto lo hace a todos los registros
     */
    public function updateEvo2(Request $request, $evo2)
    {
        try {
            DB::transaction(function () use ($evo2) {
                Xuxemons::query()->update(['evo2' => $evo2]);
            });

            return response()->json(['message' => 'Se ha actualizado el tamaño de los xuxemons correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al actualizar los xuxemons: ' . $e->getMessage()], 500);
        }
    }
}
