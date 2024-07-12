<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Middleware\Jwt;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::get('/login', [AuthController::class, 'login']);


Route::group([
    'middleware' => 'jwt',
    'prefix' => 'auth'
], function ($router) {
    
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refesh', [AuthController::class, 'refesh']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::post('auth/login', [AuthController::class, 'login']);