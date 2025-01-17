<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\DashboardController;
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
    Route::get('me', [AuthController::class, 'me']);


});

Route::group([
    'middleware' => 'jwt',
], function ($router) {
    Route::get('users', [UserController::class, 'index']);
    Route::put('users/{id}/status', [UserController::class, 'updateStatusByField']);
    Route::delete('records/delete/batch', [DashboardController::class, 'deleteBatch']);
    Route::put('records/update/batch', [DashboardController::class, 'updateBatch']);

});

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/refresh', [AuthController::class, 'refresh']);