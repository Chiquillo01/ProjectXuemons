<?php

use App\Http\Controllers\ChuchesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// Controladores //
use \App\Http\Controllers\Controller;
use \App\Http\Controllers\XuxemonsController;
use \App\Http\Controllers\XuxemonsUserController;

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

// Usuario // 
// Registar //
Route::post('/register', [Controller::class, 'register']);

// Loguearse //
Route::post('/login', [Controller::class, 'login']);

// Logout //
Route::post('/logout', [Controller::class, 'logout']);
// ---------------------- //

// Xuxemons // 
// Crear xuxemon //
Route::post('/xuxemons', [XuxemonsController::class, 'store']);

// Crear xuxemon aleatorios //
Route::post('/xuxemons/users/random', [XuxemonsUserController::class, 'debug']);

// Actualizar xuxemon //
Route::put('/xuxemons/{xuxemons}', [XuxemonsController::class, 'update']);

// Eliminar un xuxemon //
Route::delete('/xuxemons/{xuxemons}', [XuxemonsController::class, 'destroy']);

// Mostrar todos los xuxemons //
Route::get('/xuxemons', [XuxemonsController::class, 'show']);

// Mostrar todos los xuxemons //
Route::get('/chuches', [ChuchesController::class, 'show']);

// Mostrar todos los xuxemons //
Route::get('/xuxemonsUser', [XuxemonsUserController::class, 'show']);

// Mostrar un xuxemon //
Route::get('/xuxemons/{xuxemons}', [XuxemonsController::class, 'showOne']);
// ---------------------- //

// Roles //
// Usuario normal //
Route::middleware('CheckRole:user')->group(function () {
});

// Middleware para verificar que el usuario esta logueado //
//Route::middleware('auth:sanctum')->group(function () {

// Usuario admin //
//Route::middleware('CheckRole:1')->group(function () {
// Mostrar todos las chuches //
//Route::get('/chuches', [ChuchesController::class, 'show']);
   // });
//});
