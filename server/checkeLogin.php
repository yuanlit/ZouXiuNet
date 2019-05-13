<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/10
 * Time: 19:41
 */

header("Access-Control-Allow-Origin:*");  //这边先设置,允许跨域
header("Content-Type:Application/json;charset=utf-8");//再设置字符编码的格式
session_start();  //开启session

$name=$_SESSION["userinfo"];
if (!isset($_SESSION["userinfo"])){
    print_r(json_encode(Array("msg" => "抱歉,请先登录", "status" => -1)));
}else{
    print_r(json_encode(Array("msg" => "已登录", "status" => 1,"data"=>$name)));
}