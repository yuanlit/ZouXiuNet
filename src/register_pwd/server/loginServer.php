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
if ($_SERVER["REQUEST_METHOD"] == "POST") { //允许了跨域,即可以被找到,这个时候判断是不是POST请求,本端口,只支持post
    sleep(0.5);                 //来了就先睡眠半秒
    if ((isset($_REQUEST["uname"]) && isset($_REQUEST["upwd"]))) {
        $UNAME = $_POST["uname"];
        $UPWD = $_POST["upwd"];

        $sql = "SELECT `u_id`,`u_name`,`u_sex`,`u_tel`,`u_email` FROM userinfo WHERE u_name='" . $UNAME . "' AND u_pwd='" . $UPWD . "'";

        $reuslt = dbHelper($sql);

        if ($reuslt->num_rows >= 1) {
            print_r(json_encode(Array("msg" => "登录成功", "status" => 1,"data"=> $reuslt->fetch_assoc())));
            //->fetch_assoc()返回根据从结果集取得的行生成的关联数组，如果没有更多行，则返回 false。
        } else {
            print_r(json_encode(Array("msg" => "登录失败", "status" => 0)));
        }
    }


} else {   //如果是get请求,直接结束,打印返回值,
    print_r(json_encode(Array("msg" => "不支持get请求", "status" => -1)));
}