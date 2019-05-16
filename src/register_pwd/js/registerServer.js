;(function($){
    $(function(){
        $(".register-form ul li").on("click",function(){
            $(this).find("i").addClass("hover")
        });
        $.idcode.setCode(); //加载生成验证码方法

        //自定义表单校验的规则
            //校验用户名
        $.validator.addMethod("isCheckUser",function(val,ele,para){
            var reg = /^[a-zA-Z_]+\d+$/g;
            return reg.test(val);
        });
            //校验电话号码
        $.validator.addMethod("isCheckTel",function(val,ele,para){
            var reg =  /^1[34578]\d{9}$/;
            return reg.test(val);
        });
        $("form").validate({
            messages:{
                uname : {
                    required : "用户名不能为空",
                    rangelength: "长度需{0}到{1}位之间",
                    "isCheckUser":"用户名不合法",
                },
                upwd: {
                    required: "密码必填哦",
                    rangelength: "密码必须是{0}-{1}位",
                },
                upwd1: {
                    equalTo: "2次密码不一致哦~"
                },
                uemail: {
                    required: "邮箱不能为空",
                    email: "邮箱不合法"
                },
                utel: {
                    'isCheckTel': "手机号不合法"
                }
            },
            rules:{
                uname:{
                    required:true,  //true开启必填的提示
                    rangelength:[6,18],
                    "isCheckUser":true,
                },
                upwd: {
                    required: true,
                    rangelength: [6, 18],
                },
                upwd1: {
                    equalTo: "#upwd"
                },
                uemail: {
                    required: true,
                    email: true,
                },
                utel: {
                    'isCheckTel': true,
                }
            },
            submitHandler:function(){  //等价于submit事件
                var IsBy = $.idcode.validateCode(); //此方法,内部判断验证码是否正确
                if(IsBy != true){
                    layer.alert("验证码错误");
                    return false;
                }
 
                //以上把校验完成,可判定数据格式没有问题,完成收集
                //以下,发送到后台
                var index;
                $.ajax({
                    url: "../../server/registerServer.php",
                    type: "post",
                    dataType: "json",
                    data: $("form").serialize(),
                    //发送之前执行
                    beforeSend:function () {
                        index = layer.load(2, {shade: false}); //0代表加载的风格，支持0-2
                    },
                    //成功或失败都调用complete
                    complete:function () {
                        layer.close(index);
                    }
                }).then(function(res){
                    if (res.status===1) {
                        layer.confirm('恭喜你,注册成功,是否现在登录', {
                            btn: ['立即前往','取消'],
                        }, function(){
                            window.location="login_pwd.html";
                        }, function(){
                            layer.msg('那也可以', {
                                time: 2000, //20s后自动关闭
                                btn: ['明白了', '知道了'],
                            });
                        });
                    }else{
                        layer.alert(res.msg)
                    }
                });
                return false;
            }
        })
    });
})(jQuery);
