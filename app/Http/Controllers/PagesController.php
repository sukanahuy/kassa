<?php
namespace App\Http\Controllers;

use App\lib\Helper;

class PagesController extends AppController
{
    public function index(){
        $data = [
            'title'=>'Project name',
            'test'=>[]
        ];
        $helper = new Helper;
        $data['test'] = $helper->getTest();
        return view('pages.home', $data); // ->render() // return html as string
    }
}
