<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Lists;

class ListsController extends Controller
{
    public function createList(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'user_id' => 'required|integer',
                'list_type' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Error al crear la lista',
                'errors' => $validator->errors()
            ], 400);
        }

        Lists::create([
            'name' => $request->name,
            'user_id' => $request->user_id,
            'movie_id' => $request->movie_id,
        ]);

        return response([
            'success' => true,
            'message' => 'Lista creada correctamente'
        ]);
    }

    public function deleteList(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'list_id' => 'required|integer'
            ]
        );

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Error: list_id incorrecto',
                'errors' => $validator->errors()
            ], 400);
        }

        Lists::destroy($request->list_id);

        return response([
            'success' => true,
            'message' => 'Lista eliminada correctamente'
        ]);
    }
}
