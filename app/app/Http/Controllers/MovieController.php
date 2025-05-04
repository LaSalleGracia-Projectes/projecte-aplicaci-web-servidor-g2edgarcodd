<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class MovieController extends Controller
{
    public function getAllMovies()
    {
        return response()->json(Movie::all());
    }

    public function getMovieById(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'movie_id' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'ID de pelicula inválido',
                'errors' => $validator->errors()
            ], 400);
        }
        $movie = Movie::where("#IMDB_ID", $request->movie_id)->get();

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        return response()->json($movie);
    }

    public function getMovieByTitle(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'title' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Titulo de pelicula inválido',
                'errors' => $validator->errors()
            ], 400);
        }
        $movie = Movie::where('#TITLE', $request->title)->get();

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        return response()->json($movie);
    }
}
