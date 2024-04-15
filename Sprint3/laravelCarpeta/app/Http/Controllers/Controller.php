<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

// Imports agregador //
use App\Models\User;
use \Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Registro de los usuarios
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        DB::beginTransaction();
        try {
            $validados = $request->validate([
                'nick' => ['required', 'min:2', 'max:20'],
                'email' => ['required', 'max:50'],
                'password' => ['required', 'min:8', 'max:20', 'confirmed'],
                'rol' => ['required'],
            ]);
            $rolStatus = $request->input('rol') ? true : false;
            $user = new User();
            $user->nick = $request->input('nick');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->rol = $rolStatus;
            $user->save();
            DB::commit();
            return response()->json(['message' => 'Usuario registrado correctamente'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Ha ocurrido un error al registrar el usuario: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Login de los usuarios
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try {
            $validados = $request->validate([
                'email' => ['required'],
                'password' => ['required'],
            ]);
            if (Auth::attempt($validados)) {
                $user = Auth::user();
                $token = $user->createToken('authToken')->plainTextToken;
                $rol = Auth::user()->rol;
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'rol' => $rol,
                ], 200);
            } else {
                return response()->json(['message' => 'Credenciales incorrectas'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al hacer login: ' . $e->getMessage()], 500);
        }
    }
}
