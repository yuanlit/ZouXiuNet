;
(function($){
    var uInfo=sessionStorage.getItem("userInfo"||'{}');
    var ouInfo=JSON.parse(uInfo);
    $(function(){
            if(ouInfo == null){
                $(".blue").on("click",function(){
                        layer.tips('亲,请先登录哦~', $(".blue"), {
                            tips: [2, '#3595CC'],
                            time: 4000,
                        });
                    });
            }else{
                $(".blue").attr("href","../../dist/index.html");

            }
    window.onload=function(){
     $.ajax({
                url:"../../server/checkeLogin.php",
            }).then(function(res){
                var oSession = res.data;  //直接拿到session返回的数据;
                if(res.status === 1&&ouInfo !=null){
                    $("#loginZone>a").remove();
                    var BOSS1 = ouInfo.u_name.slice(0, 12);
                    if(BOSS1 == "lianggaoquan"){
                        $(".toplink>li:eq(0)").append("<a style='color:orangered;font-size: 20px;text-shadow:1px 1px orangered ;position:fixed;left:38px;top: 10px;z-index:100;''>欢迎高董事长莅临小店视察!<span style='color:#1098EC;margin:0 10px;'></span></a>");
                        $(".toplink>li:eq(1)>a").remove();
                        $(".toplink>li:eq(2)>a").remove();
                        $(".toplink>li:eq(1)").append("<a style='color:blue;font-size: 20px;text-shadow:.5px .5px blue;position:fixed;left:58px;top: 40px;z-index:100;'>购物车&nbsp;&nbsp;自动隐藏&nbsp;!&nbsp;&nbsp;,整个走秀都是你的!</a>");
                    } else {
                        $("#loginZone").append("<a >欢迎<span style='color:#1098EC;margin:0 10px;font-size:16px'>" + oSession.u_name + "</span></a>");
                           //获取用户加购的所有商品
                        var u_id=ouInfo.u_id;
                        console.log(u_id)
                        $.ajax({
                            url:'../../server/cartlistByUId.php',
                            data:{u_id},
                        }).then(function(res){
                        $("#shopping-cart").remove();
                        $(".elements_list").css("display","block");
                        res.forEach(element=> {
                            console.log(element);
                            let str= "<tr><td><img src="+element.c_pro_img+" alt=''></td><td>"+element.c_pro_name+"</td><td>"+element.c_pro_price+"</td><td>"+element.c_pro_num+"</td><td>"+element.c_pro_total+"</td><td><button id='del_S'>移除</button></td></tr>";
                            $("#tab_list").append(str);
                        });

                        
                        })
                    }
                }
            })
    }

  

    })
})(jQuery);