<?php 
namespace App\Repositories\User;
use App\Repositories\BaseRepository;
use App\Models\User;

class UserRepository extends BaseRepository{

    protected $model;
    public function __construct(User $model)
    {
        $this->model = $model;
    }

}