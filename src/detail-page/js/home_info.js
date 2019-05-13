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
    $("#imgPic").attr("src",res.pro_imgs[1]);
    $("#bigPic").attr("src",res.pro_imgs[3]);
    $("#sm1").attr("src",res.pro_imgs[6]);
    $("#sm2").attr("src",res.pro_imgs[5]);
})









})
})(jQuery);