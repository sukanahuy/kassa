<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\lib\Helper;

class AjaxController extends BaseController {
    public function reception(Request $request){
		// $action = $request->input('action');
    	$helper = new Helper();
		$action = $helper->post('action');
    	$response = array('status' => 'failed', 'message'=>'Unknown error');
		
    	switch ($action) {
			case 'get_test':
				$response = $helper->getTestApi($response);
				break;
            default:
    			break;
		}
		
    	return response()->json($response);
    }
}