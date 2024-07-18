<?php
 
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\User\UserService;
use App\Repositories\User\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\UpdateByFieldRequest;

class UserController extends Controller
{
    
    protected $userService;
    protected $userRepository;
    public function __construct(UserService $userService,UserRepository $userRepository)
    {
        $this->userService = $userService;
        $this->userRepository = $userRepository;
    }

    public function index(Request $request){
        $user = $this->userService->paginate($request);
        return response()->json([
            'users' => $user->items(),
            'links' => $user->linkCollection(),
            'current_page' => $user->currentPage(),
            'last_page' => $user->lastPage()
        ]);
    }

    public function updateStatusByField(UpdateByFieldRequest $request, $id){
        $respository = 'App\Repositories\User\UserRepository';
        if($this->userService->updateByField($request, $id, $respository)){
            return response()->json([
                'message' => 'update data successfully!'
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'message' => 'update data failure!'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}