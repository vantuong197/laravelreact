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
            $singularModel = Str::singular($model);
            $modelClass = Str::studly($singularModel);
            $folder = Str::studly(current(explode('_', $singularModel)));
            $repository = app("App\\Repositories\\{$folder}\\{$modelClass}Repository");
            $result = $repository->deleteMultiple($selectedIds);
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
}