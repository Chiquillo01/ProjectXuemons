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
Route::post('/xuxemons', [XuxemonsController::class, 'crearXuxemon']);
// Crear xuxemon aleatorios //
Route::post('/xuxemons/pc/random/{userId}', [XuxemonsUserController::class, 'debug']);
// Actualizar xuxemon //
Route::put('/xuxemons/{xuxemons}', [XuxemonsController::class, 'update']);
// Actualizar tamaño por defecto del xuxemon //
Route::put('/xuxemons/tamano/{tamano}', [XuxemonsController::class, 'updateTam']);
// Actualizar activo por defecto del xuxemon //
Route::post('/xuxemons/{user_Id}/activo/{xuxemon_id}', [XuxemonsUserController::class, 'updateActivo']);
// Actualizar favorito por defecto del xuxemon //
Route::post('/xuxemons/{user_Id}/favorito/{xuxemon_id}', [XuxemonsUserController::class, 'updateFav']);
// Actualizar tamaño para la evolución por defecto ( uso del administrador) //
Route::put('/xuxemons/{user_Id}/evolucionar/{xuxemonId}', [XuxemonsUserController::class, 'evolucionarXuxemon']);
// Actualizar tamaño para la evolución por defecto ( uso del administrador) //
Route::put('/xuxemons/{user_Id}/evolucionar2/{xuxemonId}', [XuxemonsUserController::class, 'evolucionarXuxemon2']);
// Actualizar evoluciones xuxemon //
Route::put('/xuxemons/evos/{evo1}', [XuxemonsController::class, 'updateEvo1']);
// Actualizar evoluciones xuxemon //
Route::put('/xuxemons/evos2/{evo2}', [XuxemonsController::class, 'updateEvo2']);
// Actualizar alimentos xuxemon usuario //
Route::put('/xuxemons/{xuxemon_id}/alimentar/{chuche_id}/user/{user_Id}', [XuxemonsUserController::class, 'alimentar']);
// Route::put('/xuxemons/alimentar/user', [XuxemonsUserController::class, 'alimentar']);
// Eliminar un xuxemon //
Route::delete('/xuxemons/{xuxemons}', [XuxemonsController::class, 'destroy']);
// Mostrar todos los xuxemons //
Route::get('/xuxemons', [XuxemonsController::class, 'show']);
// Mostrar todos los xuxemons del usuario //
Route::get('/xuxemonsUser/{userToken}', [XuxemonsUserController::class, 'show']);
// Mostrar todos los xuxemons del usuario //
Route::get('/xuxemonsUserActivos/{userId}', [XuxemonsUserController::class, 'showActivos']);
// ---------------------- //
// ---------------------- //

// Rutas para las chuches //
Route::put('/activar/horario/{userId}', [ChuchesUserController::class, 'ReclamarHorario']);
Route::get('/horario/show/{userId}', [ChuchesUserController::class, 'showHorario']);
// Crear chuches aleatorias //
Route::post('/chuches/horario/{userId}', [ChuchesUserController::class, 'horario']);
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