<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/9
 * Time: 15:14
 */




header("Access-Control-Allow-Origin:*");  //这边先设置,允许跨域
header("Content-Type:Application/json;charset=utf-8");//再设置字符编码的格式
include "dbHelper.php";// 引进连接数据库的桥梁
session_start();  //初始化session
if ($_SERVER["REQUEST_METHOD"] == "POST") { //允许了跨域,即可以被找到,这个时候判断是不是POST请求,本端口,只支持post
    sleep(0.3);                 //来了就先睡眠半秒
    if ((isset($_REQUEST["uname"]) && isset($_REQUEST["upwd"]))) {
        $UNAME = $_POST["uname"];
        $UPWD = $_POST["upwd"];

        $sql = "SELECT `u_id`,`u_name`,`u_sex`,`u_tel`,`u_email` FROM userinfo WHERE u_name='" . $UNAME . "' AND u_pwd='" . $UPWD . "'";

        $reuslt = dbHelper($sql);

        $data=$reuslt->fetch_assoc();

        if ($reuslt->num_rows >= 1) {
            print_r(json_encode(Array("msg" => "登录成功", "status" => 1,"data"=> $data)));
            $_SESSION["userinfo"]=$data;   //给session赋值;
        } else {
            print_r(json_encode(Array("msg" => "用户名或密码不正确", "status" => 0)));
        }
    }
} else {   //如果是get请求,直接结束,打印返回值,
    print_r(json_encode(Array("msg" => "不支持get请求", "status" => -1)));
}