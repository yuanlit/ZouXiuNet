;(function($){
    $(function(){



















        window.onload=function(){
            //登录页面跳转状态
            var uInfo=sessionStorage.getItem("userInfo");
            var ouInfo=JSON.parse(uInfo);
            // console.log(uInfo);
            if(ouInfo == null){
                $(".cart_list").on("click",function(){
                        layer.tips('亲,请先登录哦~', $(".cart_list"), {
                            tips: [2, '#3595CC'],
                            time: 4000,
                        });
                    });
            }else{
                $(this).attr("href","../src/register_pwd/login_pwd.html")
            }

            $.ajax({
                url:"../server/checkeLogin.php",
            }).then(function(res){
                //console.log(res);
                var oSession = res.data;  //直接拿到session返回的数据;
                //var str = JSON.stringify(res.data);
                // sessionStorage.setItem("userInfo",str);
                // var data = sessionStorage.getItem("userInfo");
                // var oData = JSON.parse(data);
                if(res.status === 1&&ouInfo !=null){
                    $(".toplink>li:eq(0)>a").remove();
                    //console.log(ouInfo);
                    var BOSS1 = ouInfo.u_name.slice(0, 12);
                    if(BOSS1 == "lianggaoquan"){
                        $(".toplink>li:eq(0)").append("<a style='color:orangered;font-size: 20px;text-shadow:1px 1px orangered ;position:fixed;left:38px;top: 10px;z-index:100;''>欢迎高董事长莅临小店视察!<span style='color:#1098EC;margin:0 10px;'></span></a>");
                        $(".toplink>li:eq(1)>a").remove();
                        $(".toplink>li:eq(2)>a").remove();
                        $(".toplink>li:eq(1)").append("<a style='color:blue;font-size: 20px;text-shadow:.5px .5px blue;position:fixed;left:58px;top: 40px;z-index:100;'>购物车&nbsp;&nbsp;自动隐藏&nbsp;!&nbsp;&nbsp;,整个走秀都是你的!</a>");
                    } else {
                        $(".toplink>li:eq(0)").append("<a >欢迎<span style='color:#1098EC;margin:0 10px;font-size:16px'>" + oSession.u_name + "</span></a>");
                    }
                }
            })
        }
    })
})(jQuery);