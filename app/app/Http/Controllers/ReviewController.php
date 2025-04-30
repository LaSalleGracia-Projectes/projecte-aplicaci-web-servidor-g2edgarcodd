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
                'message' => 'Error al crear la review',
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

        return response([
            'success' => true,
            'message' => 'Review creada correctamente'
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

    public function updateReview(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'review_id' => 'required|integer',
                'review_user_id' => 'required|integer',
                'user_id' => 'required|integer',
                'title' => 'required|string|max:255',
                'body' => 'required|string|max:255',
                'is_positive' => 'required|boolean'
            ]
        );

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Error al modificar review',
                'errors' => $validator->errors()
            ], 400);
        }

        $review = Review::find($request->review_id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Reseña no encontrada'
            ], 404);
        }

        if (($request->review_user_id) != $review->user_id) {
            return response([
                'success' => false,
                'message' => 'Error: solo el dueño de la review puede modificarla'
            ]);
        }
        $review->update([
            'title' => $request->title,
            'body' => $request->body,
            'is_positive' => $request->is_positive
        ]);

        return response([
            'success' => true,
            'message' => 'Review actualizada correctamente'
        ]);
    }

    public function getReviewByUser(Request $request)
    {
        $user = $request->user();

        $reviews = Review::where('user_id', $user->id)->get();

        if ($reviews->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No se ha encontrado ninguna reseña',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $reviews,
        ], 200);
    }

    public function getReviewByMovie(Request $request)
    {
        $request->validate([
            'movie_id' => 'required|string',
        ]);

        $reviews = Review::where('movie_id', $request->movie_id)->get();

        if ($reviews->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No se ha encontrado ninguna reseña',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $reviews,
        ], 200);
    }
}
