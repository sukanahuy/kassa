<?php 
namespace App\lib;

use Carbon\Carbon;

class Tools  {
    public function __construct() {
        
    }

    protected function now($format = "Y-m-d H:i:s"){
        return Carbon::parse(date($format, time()));
    }

    protected function check_ext($filename, $type){
        $ext = strtolower(pathinfo($filename)['extension']);
        $extensions = [
            'image' => ['png', 'jpeg', 'jpg', 'svg', 'gif'],
            'sound' => ['mp3', 'wav', 'aac'],
            'excel' => ['xls', 'xlsx', 'csv'],
            'word' => ['doc', 'docx'],
            'txt' => ['txt'],
            'archive' => ['zip', 'rar', 'tar']
        ];
        $valid = false;
        if(array_key_exists($type, $extensions)){
            if(in_array($ext, $extensions[$type])) $valid = true;
        }
        return $valid;
    }

    protected function check_phone($phone, $iso='ua'){
        $reg_exp = "//";
        switch($iso) {
            case 'ua':{
                $reg_exp = '/[+380]\s\([0-9]{2}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/';
                break;
                }
            default:{
                break;
                }
        }
        return preg_match($reg_exp, $phone);
    }

    protected function check_email_valid($email = ''){
        $is_valid = false;
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) $is_valid = true;
        return $is_valid;
    }

    public function post($param) {
        return request()->input($param);
    }

    public function files($param) {
        return request()->file($param);
    }

    protected function get_months($lang = '', $format = 0){
        $months = [
            'ua' => [
                ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червеня', 'Липня', 'Серпня', 'Вересня', 'Жовтня','Листопада', 'Грудня'],
                ['Cіч.', 'Лют.', 'Бер.', 'Кві.', 'Тра.', 'Чер.', 'Лип.', 'Сер.', 'Вер.', 'Жов.', 'Лис.', 'Гру.'],
                ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            ],
            'ru' => [
                ['Января', 'Февраля', 'Март', 'Апреля', 'Мая', 'Июля', 'Июня', 'Августа', 'Сентября', 'Октября','Ноября', 'Декабря'],
                ['Янв.', 'Фев.', 'Мар.', 'Апр.', 'Мая', 'Июл.', 'Июн.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
                ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            ],
            'en' => [
                ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'],
                ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
                ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            ],
            'de' => [
                ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober','November', 'Dezember'],
                ['Jan.', 'Feb.', 'März.', 'Apr.', 'Mai', 'Juni.', 'Juli.', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],
                ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            ],
        ];

        if ($lang == '') $lang = Config::get('app.locale');
        $lang = strtolower(trim($lang));
        if((int)$format > count($months)) $format = (count($months) - 1); 
        return array_key_exists($lang, $months) ? $months[$lang][(int)$format] : [];
    }

    public static function to_object($array = array()) {
        $o = new \stdClass;
        foreach ($array as $k => $v) {
            if (strlen($k)) {
               if (is_array($v)) {
                    $o->{$k} = self::to_object($v);
               }else{
                    $o->{$k} = $v;
               }
            }
        }
        return $o;
    }

    public function translit($string) {
        $converter = array(
            'а' => 'a',   'б' => 'b',   'в' => 'v',
            'г' => 'g',   'д' => 'd',   'е' => 'e',
            'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
            'и' => 'i',   'й' => 'y',   'к' => 'k',
            'л' => 'l',   'м' => 'm',   'н' => 'n',
            'о' => 'o',   'п' => 'p',   'р' => 'r',
            'с' => 's',   'т' => 't',   'у' => 'u',
            'ф' => 'f',   'х' => 'h',   'ц' => 'c',
            'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
            'ь' => '\'',  'ы' => 'y',   'ъ' => '\'',
            'э' => 'e',   'ю' => 'yu',  'я' => 'ya',
            
            'А' => 'A',   'Б' => 'B',   'В' => 'V',
            'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
            'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
            'И' => 'I',   'Й' => 'Y',   'К' => 'K',
            'Л' => 'L',   'М' => 'M',   'Н' => 'N',
            'О' => 'O',   'П' => 'P',   'Р' => 'R',
            'С' => 'S',   'Т' => 'T',   'У' => 'U',
            'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
            'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
            'Ь' => '\'',  'Ы' => 'Y',   'Ъ' => '\'',
            'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',
        );
        return strtr($string, $converter);
    }

    public function make_url($str){
        $str = $this->translit($str);
        $str = strtolower($str);
        $str = preg_replace('~[^-a-z0-9_]+~u', '-', $str);
        $str = trim($str, "-");
        return $str;
    }
}
