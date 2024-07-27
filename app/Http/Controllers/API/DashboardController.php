<?php
 
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
class DashboardController extends Controller
{
    public function __construct()
    {
    }

    public function deleteBatch(Request $request){
        DB::beginTransaction();
        try {
            $selectedIds = $request->input('selectedListIds');
            $model = $request->input('model');
            if(!is_array($selectedIds) || count($selectedIds) == 0){
                return response()->json([
                    'error' => 'id list not found'
                ], Response::HTTP_BAD_REQUEST);
            }
            $result = $this->callRepository($model)->deleteBatch($selectedIds);
            DB::commit();
            $message = '';
            if($result > 1){
                $message = "Delete {$result} records successfully!";
            }else{
                $message = "Delete {$result} record successfully!";
            }
            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);

        } catch (\Exception $th) {
            //throw $th;

            DB::rollBack();
            return response()->json([
                'error' => 'An error occurred, please try again'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateBatch(Request $request){
        DB::beginTransaction();
        try {
            $selectedIds = $request->input('selectedListIds');
            $model = $request->input('model');
            $selectedVal = $request->input('selectedValue');
            $updateField = $request->input('field');
            if(!is_array($selectedIds) || count($selectedIds) == 0){
                return response()->json([
                    'error' => 'id list not found'
                ], Response::HTTP_BAD_REQUEST);
            }

            $whereIn = [
                'whereInField' => 'id',
                'whereInVal' => $selectedIds
            ];

            $payload[$updateField] = $selectedVal;
            $result = $this->callRepository($model)->updateBatch($payload, $whereIn);
            DB::commit();
            $message = '';
            if($result > 1){
                $message = "Update {$result} records successfully!";
            }else{
                $message = "Update {$result} record successfully!";
            }
            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);

        } catch (\Exception $th) {
            //throw $th;

            DB::rollBack();
            return response()->json([
                'error' => 'An error occurred, please try again'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function callRepository($model){
        $singularModel = Str::singular($model);
        $modelClass = Str::studly($singularModel);
        $folder = Str::studly(current(explode('_', $singularModel)));
        $repository = app("App\\Repositories\\{$folder}\\{$modelClass}Repository");

        return $repository;
    }
}