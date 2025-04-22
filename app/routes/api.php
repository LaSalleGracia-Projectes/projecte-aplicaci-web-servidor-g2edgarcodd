<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use App\Models\Review;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::get('/getUser', [UserController::class, 'getUser']);
Route::post('/uploadImage', [UserController::class, 'uploadImage']);
Route::post('/createReview', [ReviewController::class, 'createReview']);
Route::delete('/deleteReview', [ReviewController::class, 'deleteReview']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Ruta de verificación (el enlace que el usuario recibe por correo)
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request, $id, $hash) {
    $user = User::findOrFail($id);

    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    if (! hash_equals($hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => 'Firma inválida'], 403);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'El correo ya estaba verificado']);
    }

    $user->markEmailAsVerified();

    //return response()->json(['message' => 'Correo verificado correctamente']);
    return redirect('/test');
})->middleware(['signed'])->name('verification.verify');

// Ruta de notificación de verificación (por si quieres mostrar algo mientras espera)
Route::get('/email/verify', function () {
    return response()->json(['message' => 'Por favor verifica tu correo']);
})->middleware('auth:sanctum')->name('verification.notice');

// Ruta para reenviar el correo de verificación
Route::post('/email/verification-notification', function (Request $request) {
    if ($request->user()->hasVerifiedEmail()) {
        return response()->json(['message' => 'Tu correo ya está verificado.']);
    }

    $request->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Correo de verificación reenviado']);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');

/*
Route::middleware('api')->group(function () {
});
*/
