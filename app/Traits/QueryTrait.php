<?php
namespace App\Traits;
trait QueryTrait{

    public function scopeCondition($query, $condition){
        if(isset($condition) && is_array($condition) && count($condition)){
            foreach($condition as $key => $val){
                $query->where($key, $val);
            }
        }
        return $query;
    }

    public function scopeKeyword($query, $keyword){
        if(isset($keyword) && is_array($keyword) && count($keyword)){
            if(!empty($keyword['search'])){
                if(count($keyword['fields'])){
                    $query->where(function($subQuery) use ($keyword){
                        foreach($keyword['fields'] as $val){
                            $subQuery->orWhere($val, 'LIKE', '%'.$keyword['search'].'%');
                        }
                    });
                    
                }else{
                    $query->where('name', 'LIKE', '%'.$keyword['search'].'%');
                }
            }
        }
        return $query;
    }
}