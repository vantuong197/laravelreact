<?php
 
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;




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
        $user = auth()->user();
        $refreshTokenData = $this->getRefreshTokenData($user);
        $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);
        $cookie = $this->setTokenAndRefeshTokenCookie($token, $refreshToken);
        $accessTokenCookie = $cookie['accessTokenCookie'];
        $refreshCookie = $cookie['refreshTokenCookie'];

        return $this->respondWithToken($token,$refreshToken, $user)->withCookie($accessTokenCookie)->withCookie($refreshCookie);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        try {
            //code...
            if($request->hasCookie('access_token')){
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }
            // dd(1);
            $user = JWTAuth::parseToken()->authenticate();
            // dd($user);
            $newToken = auth()->refresh();
            // auth()->invalidate(true);
            $refreshTokenData = $this->getRefreshTokenData($user);

            $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);

            $cookie = $this->setTokenAndRefeshTokenCookie($newToken, $refreshToken);
            $accessTokenCookie = $cookie['accessTokenCookie'];
            $refreshCookie = $cookie['refreshTokenCookie'];
            return $this->respondWithToken($token,$refreshToken, $user)->withCookie($accessTokenCookie)->withCookie($refreshCookie);

        } catch (TokenExpiredException $e) {
            //throw $th;
            if($request->hasCookie('refresh_token')){
                if(!$request->cookie('refresh_token')){
                    return response()->json(['message' => 'Token is invalid'], Response::HTTP_UNAUTHORIZED);
                }
                $refreshToken = $request->cookie('refresh_token');
                $requestTokenDecode = JWTAuth::getJWTProvider()->decode($refreshToken);

                //check that token has expired or not?
                $user = User::find($requestTokenDecode['user_id']);
                $newToken = auth()->login($user);

                $refreshTokenData = $this->getRefreshTokenData($user);

                $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);
                $cookie = $this->setTokenAndRefeshTokenCookie($newToken, $refreshToken);
                $accessTokenCookie = $cookie['accessTokenCookie'];
                $refreshCookie = $cookie['refreshTokenCookie'];
                return $this->respondWithToken($token,$refreshToken, $user)->withCookie($accessTokenCookie)->withCookie($refreshCookie);
            }
            return response()->json(['message' => 'Token has expired'], Response::HTTP_UNAUTHORIZED);
        }catch (JWTException $e) {
            //throw $th;
            return response()->json(['message' => 'Token is invalid'], Response::HTTP_UNAUTHORIZED);

        }catch (\Exception $e) {
            //throw $th;
            return response()->json(['message' => 'Token not found'], Response::HTTP_UNAUTHORIZED);

        }
        // return $this->respondWithToken(auth()->refresh());
        return 1;
    }
    public function me(){
        return response()->json(
            new UserResource(auth()->user())
        );
    }
    protected function respondWithToken($token,$refresh_token, $user){
        return response()->json([
            'access_token' => $token,
            'refresh_token' =>$refresh_token,
            'user' => new UserResource($user),
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 1
        ]);
    }

    private function setTokenAndRefeshTokenCookie($token, $refreshToken){
        $accessTokenCookie = cookie(
            'access_token', 
            $token, 
            auth()->factory()->getTTL() * 60,
            '/',
            null,
            true,
            true,
            false,
            'None'
        );
        $refresh_cookie = cookie(
            'refresh_token', 
            $refreshToken, 
            config('jwt.refresh_ttl'),
            '/',
            null,
            true,
            true,
            false,
            'None'
        );

        return [
            'accessTokenCookie' => $accessTokenCookie,
            'refreshTokenCookie' => $refresh_cookie,
        ];
    }

    private function getRefreshTokenData($user){
        return [
            'user_id' => $user->id,
            'expires_in' => time() + config('jwt.refresh_ttl'),
            'random' => time().md5(rand())
        ];
    }
}