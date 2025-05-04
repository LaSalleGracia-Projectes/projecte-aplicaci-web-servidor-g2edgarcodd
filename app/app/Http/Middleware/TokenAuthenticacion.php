<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class TokenAuthenticacion
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $bearerToken = $request->bearerToken();
        if (!$bearerToken) {
            return response()->json([
                'success' => false,
                'error' => 'Token no proporcionado'
            ], 401);
        }

        $accessToken = PersonalAccessToken::findToken($bearerToken);
        if (!$accessToken) {
            return response()->json([
                'success' => false,
                'error' => 'Token inválido',
                'token' => $accessToken
            ], 401);
        }

        $usuarioAutenticado = $accessToken->tokenable;

        $idUsuarioEnRuta = $request->route('user_id') ?? $request->route('admin_id');

        if ($idUsuarioEnRuta && $usuarioAutenticado->id != $idUsuarioEnRuta) {
            return response()->json([
                'success' => false,
                'error' => 'No tienes permiso para acceder a este recurso'
            ], 403);
        }
        return $next($request);
    }
}
