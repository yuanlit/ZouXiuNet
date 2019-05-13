;
(function($){
    $(function(){

        $("#imgPicDiv").on("mouseenter","",function(){
            $("#showimg").css("display","block");
            $("#showimg").css("background","red");
            $("#showimg").css("position","absolute");
            $(document).on("mousemove",function(evt){

          
                
                var disX = evt.pageX-$("#imgPicDiv").offset().left-$("#showimg").width()/2;
                var disY = evt.pageY-$("#imgPicDiv").offset().top-$("#showimg").height()/2;
                if(disX <= 0){
                    disX = 0;
                }else if( disX >= $("#imgPicDiv").width()-$("#showimg").width()){
                    disX == $("#imgPicDiv").width()-$("#showimg").width();
                    console.log(111);
                }
                $("#showimg").css("left",disX);
                $("#showimg").css("top",disY);
                console.log(disX,disY);
            })
        });












    })





})(jQuery);