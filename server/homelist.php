<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 14:23
 */


header("Access-Control-Allow-Origin:*");
header("Content-Type:Application/json;charset=utf-8");

$_pId = 0;
if (isset($_REQUEST["pro_id"])) {
    $_pId = $_REQUEST["pro_id"];
}

$dataListStr = file_get_contents("./data/data.json");

if ($_pId != 0) {
//如果传入了id过来,就通过id返回一条数据
    $arrData = json_decode($dataListStr); // 把字符串转换成Array;

    for ($i = 0; $i < count($arrData); $i++) {
        if ($arrData[$i]->pro_id == $_pId) {
            print_r(json_encode($arrData[$i]));
            break;
        }
    }
} else {
    //如果没有传id过来,就把所有的数据返回出去
    print_r($dataListStr);
}


