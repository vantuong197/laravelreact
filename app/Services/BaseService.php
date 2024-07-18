<?php 
namespace App\Services;
use Illuminate\Support\Facades\DB;


class BaseService {
    
    public function __construct()
    {
        
    }

    public function updateByField($request,$id, $respository) {
        DB::beginTransaction();

        try {
            $column = $request->input('column');
            $value = $request->input('value');
            $payload[$column] = $value === true ? 2 : 1;

            $respository = app($respository);
            $modelCollection = $respository->update($id, $payload);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            //throw $th;

            DB::rollBack();
            return false;
        }

    }
}