<?php 
namespace App\Repositories;
use Illuminate\Database\Eloquent\Model;


class BaseRepository {
    
    protected $model;
    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    public function pagination(){
        return $this->model->paginate(10);
    }

    public function update($id, $payload){
        $model = $this->findById($id);
        $model->fill($payload);
        $model->save();
        return $model;
    }

    public function findById($id, $column = ["*"], $relation = []){
        return $this->model->select($column)->with($relation)->findOrFail($id);
    }
    public function deleteMultiple($selectedIds = []) {
        return $this->model->whereIn('id', $selectedIds)->delete();
    }
}