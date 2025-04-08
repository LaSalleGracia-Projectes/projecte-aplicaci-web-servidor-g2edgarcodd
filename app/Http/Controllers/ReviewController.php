<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ReviewController extends Controller
{
    public function createReview(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'title' => 'required|string|max:255',
                'body' => 'required|string|max:255',
                'is_positive' => 'required|boolean',
                'user_id' => 'required|integer',
                'movie_id' => 'required|string|max:255'
            ]
        );

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Error al registrarse',
                'errors' => $validator->errors()
            ], 400);
        }

        Review::create([
            'title' => $request->title,
            'body' => $request->body,
            'is_positive' => $request->is_positive,
            'user_id' => $request->user_id,
            'movie_id' => $request->movie_id,
        ]);
    }

    public function deleteReview(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'review_id' => 'required|integer',
                'review_user_id' => 'required|integer',
                'user_id' => 'required|integer'
            ]
        );

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Error: review_id, review_user_id o user_id incorrecto',
                'errors' => $validator->errors()
            ], 400);
        }

        if (($request->review_user_id) != ($request->user_id)) {
            return response([
                'success' => false,
                'message' => 'Error: solo el dueño de la review puede eliminarla'
            ]);
        }

        $review = Review::find($request->review_id);

        $review->delete();

        return response([
            'success' => true,
            'message' => 'Review eliminada correctamente'
        ]);
    }
}
