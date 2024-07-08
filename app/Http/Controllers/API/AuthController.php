<?php
 
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use Symfony\Component\HttpFoundation\Response;
class AuthController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login']]);
    }
    /**
     * Show the profile for a given user.
     */
    public function login(AuthRequest $request) {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if(! $token = auth()->attempt($credentials)){
            return response()->json(['error' => 'Email or Password is invalid'], Response::HTTP_UNAUTHORIZED);
        }

        $accessTokenCookie = cookie('access_token', $token, auth()->factory()->getTTL() * 2);

        return $this->respondWithToken($token)->withCookie($accessTokenCookie);
    }

    protected function respondWithToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 2
        ]);
    }
}