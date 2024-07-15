<?php 
namespace App\Services\User;
use App\Services\BaseService;
use App\Repositories\User\UserRepository;

class UserService extends BaseService{

    protected $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function paginate($request){
        $user = $this->userRepository->pagination();
        return $user;
    }
}