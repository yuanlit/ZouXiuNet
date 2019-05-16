


//放大镜
;
(function($){
    $(function(){
        $("#imgPicDiv").on("mouseenter","",function(){
            $("#showimg").css("display","block");
            $("#bigPicDiv").css("display","block");
            $("#showimg").css("background","red");
            $("#showimg").css("position","absolute");
            $(document).on("mousemove",function(evt){
                // 准备小盒子移动的距离
                var oScale1 = $("#bigPic").height()/$("#imgPic").height();  //计算比例
                var oScale2 = $("#bigPic").width()/$("#imgPic").width();
                // var oScale=(oScale1+oScale2)/2;
                var disX = evt.pageX-$("#imgPicDiv").offset().left-$("#showimg").width()/2;
                var disY = evt.pageY-$("#imgPicDiv").offset().top-$("#showimg").height()/2;
                if(disX <= 0){
                    disX = 0;
                }else if( disX >= $("#imgPicDiv").width()-$("#showimg").width()){
                    disX = $("#imgPicDiv").width()-$("#showimg").width();
                    // console.log(111);
                }
                if(disY <= 0){
                    disY = 0;
                }else if(disY >= $("#imgPicDiv").height()-$("#showimg").height()){
                    disY = $("#imgPicDiv").height()-$("#showimg").height()
                }
                //让小盒子移动  
                $("#showimg").css("left",disX);
                $("#showimg").css("top",disY);
                //让大盒子的图移动
                var mX= -409 -(disX-182)*oScale2;
                var mY= -458 -(disY-200)*oScale1;
                $("#bigPic").css("left",mX);
                $("#bigPic").css("top",mY);
            });
            $("#imgPicDiv").on("mouseleave",function(){
                $(document).off("mousemove");
                $("#imgPicDiv").off("mouseleave"); 
                $("#showimg").css("display","none");
                $("#bigPicDiv").css("display","none");
            })
        });

        //设置商品的数量控制
        var S_num=$("#inputQuantity").val();
        $(".down").on("click",function(){
            S_num--;
            if(S_num <=1){
                S_num=1;
            }
            $("#inputQuantity").attr("value",S_num);
        })
        $(".up").on("click",function(){
            S_num++;
            if(S_num <=1){
                S_num=1;
            }
            $("#inputQuantity").attr("value",S_num);
        })

    })





})(jQuery);