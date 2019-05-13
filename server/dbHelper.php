<?php
//相当于一个桥梁
//先建立和数据库的连接,
//此过程当中,需要知道
//数据库主机的地址,
//以及名称,
//登录的密码,
//还有数据库的名称,
//以及数据库对应的端口
//new一个连接数据库的实例,new musqli(),分别填入以上的信息
//此步骤完成,已经连接了对应的数据库



//连接建立完成后
//设置一下对应的字符编码格式,与数据库选择的编码格式对应


//这个时候,就可以执行查询内容了,其实就是执行准备好的sql语句,用一个变量去接收,变量里面即时执行的结果
//执行结束了,就可以将新建的实例化连接桥梁关闭了;
//最后返回执行的结果
function dbHelper($sql)
{
    $dhHost = '127.0.0.1';
    $dbName = 'root';
    $dbPwd = '';
    $dataBase = 'xiunet';
    $dbPort = '3306';
    //1.创建连接
    $conn = new mysqli("$dhHost", $dbName, $dbPwd, $dataBase, $dbPort);
    //2.设置连接字符集
    mysqli_query($conn,"set names utf8");
    //4.执行查询
    $result=$conn->query($sql);
    $conn->close();
    return $result;
}
