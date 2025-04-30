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
        return $next($request);
    }
}
