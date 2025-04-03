<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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
        /*$request->validate([
            'username' => 'required|string|max:255|unique:users',
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);*/

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

        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'message'      => 'Usuario registrado exitosamente',
            'access_token' => $token,
            'token_type'   => 'Bearer',
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
                'message' => 'Error al iniciar sesion',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [ 'Las credenciales son incorrectas'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'Login correcto',
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
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
                'message' => 'Error al cargar la imagen',
                'errors' => $validator->errors()
            ], 400);
        }

        $uploadFolder = 'users';

        $image = $request->file('image');

        $image_uploaded_path = $image->store($uploadFolder, 'public');

        return response()->json([
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
}
