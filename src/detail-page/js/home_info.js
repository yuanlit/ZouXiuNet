;
(function($){
$(function(){
  //定义全局方法
    function getParams(str){
        var str = str.split("=")[1];
        return str;
    }
//判断用户购买的商品,不能为负数;

    var jixujiagou_num=$("#inputQuantity").val();
    var flag=true;
        //点击购买,加入购物车;并将数据存入后台;
        $("#user_buy_btn").on("click",function(){
            if(sessionStorage.getItem("userInfo") == null){
                layer.tips('亲,请先登录哦~', $("#user_buy_btn"), {
                    tips: [1, '#3595CC'],
                    time: 4000,
                });
                return;
            }
            if(flag){
                flag=false;
            var goods_data = $("#picBox").data("info"); //获取图片盒子中隐藏的商品信息
                
            var u_id=JSON.parse(sessionStorage.getItem("userInfo"||'{}')).u_id;
            var SQLnum=0;
                        $.ajax({
                            url:'../../server/cartlistByUId.php',
                            data:{u_id},
                        }).then(function(res){
                        //需要获取同一用户的所有商品数量
                    
                        var res_num=0;
                        res.forEach(function(value,index,array){
                            res_num += Number(res[index].c_pro_num);
                        if(value.c_pro_id==goods_data.pro_id){  //判断同一件商品,同一个用户在后台有多少件;
                            SQLnum=res[index].c_pro_num;
                            console.log("同一商品,当前用户购物车后台已存在"+SQLnum+"件")
                        }
                         });
                         var jixujiagou_num=$("#inputQuantity").val();   //同一件商品现在加购的数量
                         res_num += Number(jixujiagou_num);
                         console.log("现在加购"+jixujiagou_num+"件");
                        goods_data.pro_img=goods_data.pro_imgs[1];
                        goods_data.u_id=u_id;
                       
                        goods_data.pro_num=Number(jixujiagou_num)+Number(SQLnum);
                        console.log("后台购物车累计"+goods_data.pro_num+"件");   //同一件商品,后台的数量
                        console.log(goods_data);
                        
                        $.ajax({
                            url:"../../server/cartsServer.php",
                            data:goods_data,
                            dataType:"json",
                            type:"post",
                        }).done(function(res){
                            if(res.status==1){
                                console.log("状态:成功");
                                layer.tips('加购成功~', $("#user_buy_btn"), {
                                    tips: [3, '#3595CC'],
                                    time: 1000,
                                });
    
                                var cloneImg=$("#imgPic").clone(true);
                                $(cloneImg).css("position","absolute");
                                $(cloneImg).attr("id","cloneImg");
                                $(cloneImg).css("left",0);
                                $(cloneImg).css("top",0);
                                $(cloneImg).css("z-index",1000)
                                // $("#imgPic").after(cloneImg);
                                $("#imgPicMask").append(cloneImg);
                                $(cloneImg).animate({width:"200px",left:"500px",opacity:".7"},1000,function(){
                                    $(cloneImg).animate({width:"0",height:"0",left:"160px",top:"-170px"},1000,function(){
                                        $(cloneImg).remove();
                                         $("#res_num").text(res_num);
                                         flag=true;
                                    })
                                }) 
                            }else{
                                console.log("状态:失败");
                                layer.tips('加购失败~', $("#user_buy_btn"), {
                                    tips: [3, '#3595CC'],
                                    time: 4000,
                                });
                            }
                            // 数据已经准备好,先去创建端口
                        })
                    })

            }
            })



    
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

})
})(jQuery);