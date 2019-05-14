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
//支持post请求

if (isset($_REQUEST["u_id"]) &&
    isset($_REQUEST["pro_id"]) &&
    isset($_REQUEST["pro_name"]) &&
    isset($_REQUEST["pro_price"]) &&
    isset($_REQUEST["pro_img"]) &&
    isset($_REQUEST["pro_num"])) {
    //1.要判断是否已经购买过,

    $queryPro = "SELECT * FROM `carts` WHERE c_pro_id='" . $_REQUEST["pro_id"] . "' AND c_u_id='" . $_REQUEST["u_id"] . "'";
    $result = dbHelper($queryPro);
    if ($result->num_rows >= 1) { //大于1,说明表里已经存在,只需要修改数量和金额

        $Total = $_REQUEST["pro_price"] * $_REQUEST["pro_num"];   //设置一个总价=单价*数量;


        $updateSQL = "UPDATE carts  SET c_pro_num='" . $_REQUEST["pro_num"] . "'  ,c_pro_total='" . $Total . "' WHERE c_u_id='" . $_REQUEST["u_id"] . "'  AND c_pro_id='" . $_REQUEST["pro_id"] . "'";
        $updateStatus = dbHelper($updateSQL);
        if ($updateStatus) {
            print_r(json_encode(Array("msg" => "购物车加入成功u", "status" => 1)));
        } else {
            print_r(json_encode(Array("msg" => "购物车加入失败u", "status" => 0)));
        }
    } else {
        //如果没购买 把产品的信息插入到购物车.
        $Total = $_REQUEST["pro_price"] * $_REQUEST["pro_num"];

        $insertSQL = "INSERT INTO carts (`c_pro_id`,`c_pro_name`,`c_pro_price`,`c_pro_num`,`c_pro_total`,`c_pro_img`,`c_u_id`) VALUES ('" . $_REQUEST["pro_id"] . "','" . $_REQUEST["pro_name"] . "','" . $_REQUEST["pro_price"] . "','" . $_REQUEST["pro_num"] . "','" . $Total . "','" . $_REQUEST["pro_img"] . "','" . $_REQUEST["u_id"] . "')";
        $inserStatus = dbHelper($insertSQL);
        if ($inserStatus) {
            print_r(json_encode(Array("msg" => "购物车加入成功I", "status" => 1)));
        } else {
            print_r(json_encode(Array("msg" => "购物车加入失败I", "status" => 0)));
        }
    }
} else {
    print_r(json_encode(Array("msg" => "参数不完整", "status" => -11)));
}
//1.用户id,谁购买

//2.产品名称,
//3 产品价格
//4 产品数量
//5.产品总金额 =产品价格*  产品数量
//6 产品的图片

