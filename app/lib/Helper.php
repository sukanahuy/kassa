<?php 
    namespace App\lib;
    use App\Models\{ 
        Test
     };

     use DB;
     use App\lib\Tools;

    class Helper extends Tools{
        public function getTest(){
            // $res = Test::find(1); // get one by id
            // $res = Test::where(['id'=>1])->first(); // as one
            // $res = Test::where('id','>',0)->get(); // as list
            // $res = Test::whereId(1)->get(); // as list
            // return $res;

            // $new_test = new Test();
            // $new_test->name = "asd";
            // $new_test->save();

            // DB::table('test')->where(1)->update([
            //     'name' => 'asdasd'
            // ]);

            // session()->put('a', '2');
            // session()->get('a');
            // session()->forget('a');
            // session()->flush();

            DB::table('test')->insertGetId([
                    'name' => 'asdasd'
                ]);
            return DB::table('test')->whereId(1)->get();
        }
        public function getTestApi($resp = []){
            $resp['items'] = $this->getTest();
            return $resp;
        }
    }
?>