<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/14
 * Time: 15:24
 */
header("Access-Control-Allow-Origin:*");
header("Content-Type:Application/json;charset=utf-8");

if (isset($_REQUEST["u_id"])) {
    include "dbHelper.php";

    $sql = "SELECT * FROM `carts` WHERE c_u_id='" . $_REQUEST["u_id"] . "'";

   $result=dbHelper($sql);
   //创建一个新的数组
   $resultArr=array();

   while($row=$result->fetch_assoc()){
         array_push($resultArr,$row);
   }

   print_r(json_encode($resultArr));


} else {
    print_r(json_encode(Array("msg" => "参数不完整,请先登录", "status" => -12)));
}