<?php

use App\Mail\newLaravelTips;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('v1')->middleware('jwt.auth')->group(function() {
    Route::post('me', 'App\Http\Controllers\AuthController@me');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::apiResource('negocio', 'App\Http\Controllers\NegocioController');
});

Route::get('user', 'App\Http\Controllers\UserController@index');
Route::post('user', 'App\Http\Controllers\UserController@store');
Route::get('user/{id}', 'App\Http\Controllers\UserController@show');
Route::put('user/{id}', 'App\Http\Controllers\UserController@update');
Route::patch('user/{id}', 'App\Http\Controllers\UserController@update');
Route::delete('user/{id}', 'App\Http\Controllers\UserController@destroy');

Route::post('login', 'App\Http\Controllers\AuthController@login');
Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');

Route::get('envio-email', function(Request $request) {
    $user = new stdClass();
    $user->name = $request->nome;
    $user->email = $request->email;
    $user->codigo = $request->numeroAleatorio;
    Mail::send(new newLaravelTips($user));
    //return new newLaravelTips($user);
});
