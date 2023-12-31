<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hello', function () {
    DB::insert('insert into user (cookie, username, pass) values (?, ?, ?)', array(1, 'Dayle', 'myPass'));
    return "Hello World!";
  });

Route::post('/createAccount', 'App\Http\Controllers\CreateAccountController@insertData');

Route::middleware(['cors'])->group(function () {
  Route::post('/login', 'App\Http\Controllers\LoginController@login');
});


Route::post('/CartIn', 'App\Http\Controllers\CartController@insertData');

Route::get('/cart/{id}', "App\Http\Controllers\CartDataController@show");
Route::get('/equip/{id}', "App\Http\Controllers\EquipableController@show");

Route::post('/transfer', "App\Http\Controllers\FromCartToEquipController@transfer");
Route::post('/equipAvatar', "App\Http\Controllers\AvatarController@Equip");
