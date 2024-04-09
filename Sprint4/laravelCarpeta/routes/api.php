<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// Controladores //
use \App\Http\Controllers\Controller;
use \App\Http\Controllers\XuxemonsController;
use \App\Http\Controllers\XuxemonsUserController;
use App\Http\Controllers\ChuchesController;
use App\Http\Controllers\ChuchesUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('cors')->group(function () {
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas del usuario Usuario // 
// Registar //
Route::post('/register', [Controller::class, 'register']);
// Loguearse //
Route::post('/login', [Controller::class, 'login']);
// ---------------------- //

// Rutas para los Xuxemons // 
// Crear xuxemon //
Route::post('/xuxemons', [XuxemonsController::class, 'store']);
// Crear xuxemon aleatorios //
Route::post('/xuxemons/pc/random/{userId}', [XuxemonsUserController::class, 'debug']);
// Actualizar xuxemon //
Route::put('/xuxemons/{xuxemons}', [XuxemonsController::class, 'update']);
// Actualizar tamaño por defecto del xuxemon //
Route::put('/xuxemons/tamano/{tamano}', [XuxemonsController::class, 'updateTam']);
// Actualizar tamaño para la evolución //
Route::put('/xuxemons/{user_Id}/evolucionar/{xuxemonId}', [XuxemonsUserController::class, 'evolucionarXuxemon']);
// Actualizar tamaño para la evolución //
Route::put('/xuxemons/{user_Id}/evolucionar/{xuxemonId}', [XuxemonsUserController::class, 'evolucionarXuxemon2']);
// Actualizar evoluciones xuxemon //
Route::put('/xuxemons/evos/{evo1}', [XuxemonsController::class, 'updateEvo1']);
// Actualizar evoluciones xuxemon //
Route::put('/xuxemons/evos/{evo2}', [XuxemonsController::class, 'updateEvo2']);
// Actualizar alimentos xuxemon usuario //
Route::put('/xuxemons/{xuxemon_id}/alimentar/{chuche_id}/user/{user_Id}', [XuxemonsUserController::class, 'alimentar']);
// Eliminar un xuxemon //
Route::delete('/xuxemons/{xuxemons}', [XuxemonsController::class, 'destroy']);
// Mostrar todos los xuxemons //
Route::get('/xuxemons', [XuxemonsController::class, 'show']);
// Mostrar todos los xuxemons del usuario //
Route::get('/xuxemonsUser/{userId}', [XuxemonsUserController::class, 'show']);
// ---------------------- //
// ---------------------- //

// Rutas para las chuches //
// Crear chuches aleatorias //
Route::post('/chuches/random/{userId}', [ChuchesUserController::class, 'debug']);
// Mostrar todas las xuxes del usuario //
Route::get('/chuchesUser/{userId}', [ChuchesUserController::class, 'show']);


// // Alimentar xuxemons //
// Route::put('/xuxemons/users/comer/{xuxemons}', [XuxemonsUserController::class, 'alimentar']);

// 


// // Actualizar chuche //
// Route::put('/chuches/{chuches}', [ChuchesUserController::class, 'updateStack']);
// ---------------------- //
// ---------------------- //