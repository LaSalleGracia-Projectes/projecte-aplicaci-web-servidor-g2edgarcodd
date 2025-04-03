<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use App\Models\Review;

Route::get('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/uploadImage', [UserController::class, 'uploadImage']);
Route::post('/createReview', [Review::class, 'createReview']);
Route::delete('/deleteReview', [ReviewController::class, 'deleteReview']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
Route::middleware('api')->group(function () {
});
*/
