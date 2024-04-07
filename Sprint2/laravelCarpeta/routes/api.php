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
// Eliminar un xuxemon //
Route::delete('/xuxemons/{xuxemons}', [XuxemonsController::class, 'destroy']);
// Mostrar todos los xuxemons //
Route::get('/xuxemons', [XuxemonsController::class, 'show']);
// Mostrar todos los xuxemons del usuario //
Route::get('/xuxemonsUser/{userId}', [XuxemonsUserController::class, 'show']);
// ---------------------- //
// ---------------------- //

// Alimentar xuxemons //
Route::put('/xuxemons/users/comer/{xuxemons}', [XuxemonsUserController::class, 'alimentar']);

// Mostrar todos los xuxemons del usuario //
Route::put('/xuxemons_users/{xuxemons_users}', [XuxemonsUserController::class, 'update']);
// Actualizar tamaño xuxemon //
Route::put('/xuxemons/tamano', [XuxemonsController::class, 'updateTam']);
// Actualizar evoluciones xuxemon //
Route::put('/xuxemons/evos', [XuxemonsUserController::class, 'updateEvos']);
// Rutas para las chuches //
// Mostrar todas las xuxes del usuario //
Route::get('/chuches', [ChuchesController::class, 'show']);
// Mostrar todas las xuxes del usuario //
Route::get('/chuchesUser', [ChuchesUserController::class, 'show']);
// Crear chuches aleatorias //
Route::post('/chuches/random', [ChuchesUserController::class, 'debug']);
// Actualizar chuche //
Route::put('/chuches/{chuches}', [ChuchesUserController::class, 'updateStack']);
// ---------------------- //
// ---------------------- //