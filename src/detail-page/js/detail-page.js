;
(function($){
    $(function(){

        $("#imgPicDiv").on("mouseenter","",function(){
            $("#showimg").css("display","block");
            $("#showimg").css("background","red");
            $("#showimg").css("position","absolute");
            $(document).on("mousemove",function(evt){



                var oScale1 = $("#bigPic").height()/$("#imgPic").height();
                var oScale2 = $("#bigPic").width()/$("#imgPic").width();
                var oScale=(oScale1+oScale2)/2;
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

                $("#showimg").css("left",disX);
                $("#showimg").css("top",disY);
                var mX= -409 -(disX-182)*oScale;
                var mY= -498 -(disY-200)*oScale;
                $("#bigPic").css("left",mX);
                $("#bigPic").css("top",mY);



            })
        });












    })





})(jQuery);