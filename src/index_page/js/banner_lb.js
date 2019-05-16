;(function($){
    $(function(){
        //定义一个全局变量num;
        var flag=true;
        var num = 0;
        /*给小点绑定点击事件,改变当前num的值*/
        $(".dian").on("mouseenter","li",function(){
            clearInterval(document.timer);
            if(flag){
                flag=false;
                num =$(this).index();
                let position_on = -(num)*1200;
                $(".banner>.banner_home").animate({left:position_on},200,function(){
                    $(".dian>li:eq("+num+")").addClass("on").siblings().removeClass("on");
                    flag=true;
                })  
            }     
        });
        window.banner_Go =function(){
            document.timer = setInterval(function(){
                num++;
                let position = -num*1200;
                if(num <= 6){
                    $(".banner>.banner_home").animate({left:position},500,function(){
                        if(num === 6){
                            num = 0;
                            $(".banner>.banner_home").animate({left : 0}, 0, function(){
                            });
                        }
                        $(".dian>li:eq("+num+")").addClass("on").siblings().removeClass("on");
                    });
                }
            },2500);
        };
        window.banner_Go();
        $(".banner>.banner_home").hover(function(){
            clearInterval(document.timer);
        },function(){
            window.banner_Go();
        });
    });
})(jQuery);

