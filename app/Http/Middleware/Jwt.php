<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try {
            //code...
            if($request->hasCookie('access_token')){
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }
            if(!$token){
                return response()->json(['message' => 'Token is invalid'], Response::HTTP_UNAUTHORIZED);
            }
            $user = auth()->userOrFail();
            if(!$user){
                return response()->json(['message' => 'User do not exists'], Response::HTTP_UNAUTHORIZED);
            }

        } catch (TokenExpiredException $e) {
            //throw $th;
            return response()->json(['message' => 'Token has expired'], Response::HTTP_UNAUTHORIZED);
        }catch (JWTException $e) {
            //throw $th;
            return response()->json(['message' => 'Token is invalid'], Response::HTTP_UNAUTHORIZED);

        }catch (\Exception $e) {
            //throw $th;
            return response()->json(['message' => 'Token not found'], Response::HTTP_UNAUTHORIZED);

        }
        return $next($request);
    }
}
