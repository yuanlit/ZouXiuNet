;
(function($){
$(function(){
    //定义全局方法
function getParams(str){
    var str = str.split("=")[1];
    return str;
}
//发送ajax请求
$.ajax({
    url:"../../server/homelist.php",
    data:{"pro_id": getParams(location.search)}
}).then(function(res){
    // console.log(res)
    //将各个商品的特有属性,动态添加
    $(".pro_name").text(res.pro_name);
    $("#imgPic").attr("src",res.pro_imgs[1]);
    $("#bigPic").attr("src",res.pro_imgs[3]);
    $("#sm1").attr("src",res.pro_imgs[5]);
    $("#sm2").attr("src",res.pro_imgs[6]);
    $("#pro_id").text("商品编号 :"+res.pro_id);
    $(".pro_price").text(res.pro_price);
    //判断点击的是哪一个小图,然后根据小图显示上方的大图
    $("#smallPic").on("click","dd",function(evt){
        if($(this).index()==0){
            $(this).addClass("dc").siblings().removeClass("dc");
         $("#imgPic").attr("src",res.pro_imgs[1]);
        $("#bigPic").attr("src",res.pro_imgs[3]);  
        }else if($(this).index()==1){
            $(this).addClass("dc").siblings().removeClass("dc");
            $("#imgPic").attr("src",res.pro_imgs[2]);
            $("#bigPic").attr("src",res.pro_imgs[4]); 
        }  
    });
    //将请求返回的信息存入装图片的盒子中,便于之后操作可以直接拿去,不用再次调用ajax;
    $("#picBox").attr("data-info",JSON.stringify(res));

})
//计算数据库中商品同一商品的数量;







//点击购买,加入购物车;并将数据存入后台;
$("#user_buy_btn").on("click",function(){
    var goods_data = $("#picBox").data("info"); //获取图片盒子中隐藏的商品信息
    var u_id=JSON.parse(sessionStorage.getItem("userInfo")).u_id;
    var SQLnum=0;
        $.ajax({
            url:'http://127.0.0.1/xiunet/server/cartlistByUId.php',
            data:{u_id},
        }).then(function(res){
        res.forEach(function(value,index,array){
        if(value.c_pro_id==goods_data.pro_id){
            SQLnum=res[index].c_pro_num;
            console.log("同一商品,当前用户购物车后台已存在"+SQLnum+"件")
        }
         });
         var jixujiagou_num=$("#inputQuantity").val();   //
         console.log("现在加购"+jixujiagou_num+"件");
        goods_data.pro_img=goods_data.pro_imgs[1];
        goods_data.u_id=u_id;
       
        goods_data.pro_num=Number(jixujiagou_num)+Number(SQLnum);
        console.log("后台购物车累计"+goods_data.pro_num+"件");
        $.ajax({
            url:"http://127.0.0.1/xiunet/server/cartsServer.php",
            data:goods_data,
            dataType:"json",
            type:"post",
        }).done(function(res){
            if(res.status==1){
                console.log("状态:成功");
            }else{
                console.log("状态:失败");
            }
            // 数据已经准备好,先去创建端口
        })
    })




















 
})
})
})(jQuery);