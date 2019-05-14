;
(function($){
$(function(){
    function getParams(str){
    var str = str.split("=")[1];
    return str;
}
$.ajax({
    url:"../../server/homelist.php",
    data:{"pro_id": getParams(location.search)}
}).then(function(res){
    console.log(res)
    $(".pro_name").text(res.pro_name);
    $("#imgPic").attr("src",res.pro_imgs[1]);
    $("#bigPic").attr("src",res.pro_imgs[3]);
    $("#sm1").attr("src",res.pro_imgs[5]);
    $("#sm2").attr("src",res.pro_imgs[6]);
    $("#pro_id").text("商品编号 :"+res.pro_id);
    $(".pro_price").text(res.pro_price);
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
    })
})


})
})(jQuery);