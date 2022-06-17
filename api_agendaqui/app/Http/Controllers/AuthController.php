<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request) 
    {
        $credenciais = $request->only(['email', 'password']);
        $token = auth('api')->attempt($credenciais);
        if($token) {
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['erro' => 'Usuário ou senha inválidos'], 403);
        }
        return 'login';
    }

    public function logout() 
    {
        auth('api')->logout();
        return response()->json(['sucesso' => 'Logout realizado com sucesso'], 403);
    }

    public function refresh() 
    {
        return '';
    }

    public function me() 
    {
        return response()->json(auth()->user());
    }
}
