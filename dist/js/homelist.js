;(function ($) {
    $(function () {
        

        $.ajax({
            url:"./../server/homelist.php",
        }).then(function (res) {
               console.log(res)
            //    res.forEach((el,index) => {

            //     $(".itme").eq(index).find("img").attr("src",el.pro_imgs[0]);
            //     $(".itme").eq(index).find(".sub p").eq(0).text("名称:"+el.pro_name);
            //     $(".itme").eq(index).find(".sub p").eq(1).text("价格:"+el.pro_price);
            //     $(".itme").eq(index).find(".sub p").eq(2).text("描述:"+el.pro_info)
            //     $(".itme").eq(index).find(".sub p").eq(3).find("a").attr("href","goodsInfo.html?pro_id="+el.pro_id);
            // })
            
        })
    })
})(jQuery)