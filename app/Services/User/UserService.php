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
        $agrument = $this->paginateAgrument($request);
        $user = $this->userRepository->pagination([...$agrument]);
        return $user;
    }

    private function paginateAgrument($request){
        $result = [
            'perpage' => $request->input('perpage') ?? 10,
            'keyword' => [
                'search' => $request->input('keyword') ?? '',
                'fields' => ['name', 'email']
            ],
            'select' => ['*'],
            'orderBy' => $request->input('sort') ? explode(',', $request->input('sort')) : ['id', 'desc']
        ];
        
        if ($request->has('publish') && $request->input('publish') != 0) {
            $result['condition'] = [
                'publish' => $request->integer('publish'),
            ];
        }
        
        return $result;
        
    }
}