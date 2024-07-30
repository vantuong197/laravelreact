<?php 
namespace App\Repositories;
use Illuminate\Database\Eloquent\Model;


class BaseRepository {
    
    protected $model;
    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    public function pagination($params = []){
        return $this->model
            ->select($params['select'])
            ->condition($params['condition'] ?? [])
            ->keyword($params['keyword'])
            ->paginate($params['perpage']); 
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
    public function deleteBatch($selectedIds = []) {
        return $this->model->whereIn('id', $selectedIds)->delete();
    }

    public function updateBatch($payload = [], $whereIn = [], $condition=[]){
        return $this->model->whereIn($whereIn['whereInField'], $whereIn['whereInVal'])->update($payload);  
    }
}