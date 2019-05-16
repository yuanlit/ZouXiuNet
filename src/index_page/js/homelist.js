;(function ($) {
    $(function () {
        

        $.ajax({
            url:"../../server/homelist.php",
        }).then(function (res) {
               res.forEach((el,index) => {

                $(".itme").eq(index).find("img").attr("src",el.pro_imgs[0]);
                $(".itme").eq(index).find(".sub p").eq(0).text(el.pro_name);
                $(".itme").eq(index).find(".sub p").eq(1).text("¥  "+el.pro_price);
                $(".itme").eq(index).find(".sub p").eq(2).text(el.pro_info)
                $(".itme").eq(index).find(".sub p").eq(3).find("a").attr("href","../detail-page/detail-page.html?pro_id="+el.pro_id);
            })
            
        })
    })
})(jQuery)