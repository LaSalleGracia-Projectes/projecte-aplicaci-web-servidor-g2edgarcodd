<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'username' => 'required|string|max:255|unique:users',
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'date_of_birth' => 'required|date',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed'
            ]
        );

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Error al registrarse',
                'errors' => $validator->errors()
            ], 400);
        }


        $user = User::create([
            'username'  => $request->username,
            'name'      => $request->name,
            'surname'   => $request->surname,
            'date_of_birth' => $request->date_of_birth,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'is_admin'   => false,
        ]);

        event(new Registered($user));


        return response()->json([
            'sucess' => true,
            'message'      => 'Usuario registrado correctamente. Verifica tu direccion de correo.'
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email'    => 'required|string|email',
                'password' => 'required|string'
            ]
        );
        /*$request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);*/

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Error al iniciar sesion',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'success' => false,
                'errors' => [ 'Las credenciales son incorrectas'],
            ]);
        }

        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'El correo no esta verificado'
            ], 400);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message'      => 'Login correcto',
            'user_id' => $user->id,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 200);
    }

    public function uploadImage(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'image' => 'required|image:jpeg,png,jpg|max:2048'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cargar la imagen',
                'errors' => $validator->errors()
            ], 400);
        }

        $uploadFolder = 'users';

        $image = $request->file('image');

        $image_uploaded_path = $image->store($uploadFolder, 'public');

        return response()->json([
            'success' => true,
            'message' => 'Imagen cargada correctamente',
        ], 200);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|email|exists:users,email'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Email incorrecto',
                'errors' => $validator->errors()
            ], 400);
        }

        return response()->json([
            'success' => true
        ]);
    }

    public function getUser(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'token'    => 'required|string',
                'user_id' => 'required|integer'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ], 200);
    }
}
