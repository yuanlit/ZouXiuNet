<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/14
 * Time: 14:20
 */
header("Access-Control-Allow-Origin:*");
header("Content-Type:Application/json;charset=utf-8");

include "dbHelper.php";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    print_r(json_encode(Array("msg" => "不支持get请求", "status" => -1)));
    return;
}
//仅支持post 请求
if (isset($_REQUEST["c_id"])){
    $sql="DELETE FROM carts WHERE c_id='".$_REQUEST["c_id"]."'";
    $result = dbHelper($sql);
    if ($result) {
        print_r(json_encode(Array("msg" => "删除成功", "status" => 1)));
    } else {
        print_r(json_encode(Array("msg" => "删除失败", "status" => 0)));
    }
}else{
    print_r(json_encode(Array("msg" => "参数不完整", "status" => -1)));
}