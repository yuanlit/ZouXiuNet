;
(function($){
    $(function(){
        $(".register-form ul li").on("click", function () {
            $(this).find("i").addClass("hover");
        });
        $.idcode.setCode(); //加载生成验证码的方法

        $("form").validate({
            messages:{
                uname:"用户名不能为空",
                upwd:"密码不能为空",
            },
            rules:{
                uname:'required',
                upwd:'required',
            },
            submitHandler:function(){
                var IsBy = $.idcode.validateCode(); //调用返回值,为一个布尔值
                if(IsBy != true){
                    layer.msg('验证码错误,请重新输入');
                    return false;
                }
                $.ajax({
                    url:"../../../xiunet/server/loginServer.php",
                    type:"post",
                    data:$("form").serialize(),
                    dataType:"json",
                }).then(function (res) {
                    //console.log(res);   //打印的ajax 请求的结果
                    if (res.status == 1) {
                        // layer.alert(res.msg, {
                        //     icon: 1,
                        //     skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
                        // });
                        var index = layer.load(0, {
                            shade: [0.5,'#fff'] //0.1透明度的白色背景
                        });
                        //把当前登陆者的信息保存到 本地仓库
                        // localStorage 能存50M,永久保存在本地浏览器,如不手动清除,不会消失
                        // sessionStorage 页面打开的打开与关闭就是他的生命周期
                        sessionStorage.setItem("userInfo", JSON.stringify(res.data));

                        let timer= setTimeout(function(){
                            layer.close(index);
                            window.open(url="../../dist/index.html");
                            clearInterval(timer)
                        },2000);
                    }else{
                       layer.alert(res.msg, {
                            icon: 2,
                            skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
                        })
                    }
                })
                // return false;
            } 
        })
    });
})(jQuery);