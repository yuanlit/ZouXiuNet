<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/9
 * Time: 15:14
 */
header("Access-Control-Allow-Origin:*"); //允许跨域
header("Content-Type:Application/json;charset=utf-8");  // 设置本端口的字符集
include "dbHelper.php";    //引进连接数据库的桥梁
if ($_SERVER["REQUEST_METHOD"] == "POST") {   // 判断请求是否是post
    sleep(2);
    if((isset($_REQUEST["uname"])&&isset($_REQUEST["upwd"]))){  //判断请求,这个用户名和密码是不是都有了
        $UNAME=$_POST["uname"];   //
        $UPWD=$_POST["upwd"];
        $USEX=$_POST["usex"];
        $UTEL=$_POST["utel"];
        $UEMAIL=$_POST["uemail"];
        $sql="INSERT INTO `userinfo` (`u_name`,`u_pwd`,`u_sex`,`u_tel`,`u_email`)
VALUES('".$UNAME."','".$UPWD."','".$USEX."','".$UTEL."','".$UEMAIL."')";

        $reuslt=dbHelper($sql);  //接收桥梁传送过来的结果

       if($reuslt>=1){
           print_r(json_encode(Array("msg" => "注册成功", "status" => 1)));
       }else{
           print_r(json_encode(Array("msg" => "注册失败", "status" => 0)));
       }
    }
} else {  //get请求直接返回一个数组
    print_r(json_encode(Array("msg" => "不支持get请求", "status" => -1)));
}