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
                'review_id' => 'required|integer'
            ]
        );

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Error: review_id incorrecto',
                'errors' => $validator->errors()
            ], 400);
        }

        $review = Review::find($request->review_id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review no encontrada'
            ], 404);
        }

        $usuarioAutenticado = auth()->user();

        if ($review->user_id !== $usuarioAutenticado->id && !$usuarioAutenticado->is_admin) {
            return response([
                'success' => false,
                'message' => 'No tienes permiso para eliminar esta review'
            ], 403);
        }

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
                'title' => 'required|string|max:255',
                'body' => 'required|string|max:255',
                'is_positive' => 'required|boolean'
            ]
        );

        if ($validator->fails()) {
            return response([
                'success' => false,
                'message' => 'Informacion incorrecta',
                'errors' => $validator->errors()
            ], 400);
        }

        $review = Review::find($request->review_id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review no encontrada'
            ], 404);
        }

        $usuarioAutenticado = auth()->user();

        if ($review->user_id !== $usuarioAutenticado->id && !$usuarioAutenticado->is_admin) {
            return response([
                'success' => false,
                'message' => 'No tienes permiso para modificar esta review'
            ], 403);
        }

        $review->update($request->only(['title', 'body', 'is_positive']));

        return response([
            'success' => true,
            'message' => 'Review modificada correctamente'
        ], 200);
    }

    public function getReview(Request $request)
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
