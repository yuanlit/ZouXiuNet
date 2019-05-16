;
(function($){
    var uInfo=sessionStorage.getItem("userInfo"||'{}');
    var ouInfo=JSON.parse(uInfo);
    $(function(){
            if(ouInfo == null){
                $(".blue").on("click",function(){
                        layer.tips('亲,请先登录哦~', $(".blue"), {
                            tips: [2, '#3595CC'],
                            time: 4000,
                        });
                    });
            }else{
                $(".blue").attr("href","../index_page/index.html");
            }
    window.onload=function(){
     $.ajax({
                url:"../../server/checkeLogin.php",
            }).then(function(res){
                var oSession = res.data;  //直接拿到session返回的数据;
                if(res.status === 1&&ouInfo !=null){
                    $("#loginZone>a").remove();
                    var BOSS1 = ouInfo.u_name.slice(0, 12);
                    if(BOSS1 == "lianggaoquan"){
                        $(".toplink>li:eq(0)").append("<a style='color:orangered;font-size: 20px;text-shadow:1px 1px orangered ;position:fixed;left:38px;top: 10px;z-index:100;''>欢迎高董事长莅临小店视察!<span style='color:#1098EC;margin:0 10px;'></span></a>");
                        $(".toplink>li:eq(1)>a").remove();
                        $(".toplink>li:eq(2)>a").remove();
                        $(".toplink>li:eq(1)").append("<a style='color:blue;font-size: 20px;text-shadow:.5px .5px blue;position:fixed;left:58px;top: 40px;z-index:100;'>购物车&nbsp;&nbsp;自动隐藏&nbsp;!&nbsp;&nbsp;,整个走秀都是你的!</a>");
                    } else {
                        $("#loginZone").append("<a >欢迎<span style='color:#1098EC;margin:0 10px;font-size:16px'>" + oSession.u_name + "</span></a>");
                           //获取用户加购的所有商品
                        var u_id=ouInfo.u_id;
                        $.ajax({
                            url:'../../server/cartlistByUId.php', //通过此端口调回当前id加购的全部商品
                            data:{u_id},
                        }).then(function(res){
                        console.log(res);
                        
                        var result_num=0;   //声明一个所有商品总数
                        $("#shopping-cart").remove();
                        $(".elements_list").css("display","block");
                        $("#zhuijia").css("display","block");
                        res.forEach(element=> {
                            let str_info=JSON.stringify(element)
                            result_num += element.c_pro_num-0;
                            let str= "<tr data-info="+str_info+
                            "><td><img src="+element.c_pro_img+
                            " alt=''></td><td>"+element.c_pro_name+
                            "</td><td>"+element.c_pro_price+
                            "</td><td><button id='num_jian' class='c_num'>"+'－'+
                            "</button><input id='num_c' value="+element.c_pro_num+
                            " disabled='true'><button id='num_jia' class='c_num'>"+'＋'+
                            "</button></td><td>"+element.c_pro_total+"</td><td><button onclick=del("+element.c_id+
                            ",this) id='del_S'>移除</button></td></tr>";
                            $("#tab_list").append(str);
                        });
                        console.log(result_num);  //所有商品的总数
                        })
                    }
                }
            })
    }

    //控制商品的数量
    
    $("#tab_list").on("click",".c_num",function(){
        var data = $(this).parents("tr").data("info");
        console.log(data);
        if(this.id === "num_jia"){
            var S_num =$(this).prev("#num_c").val();
            ++S_num;
            if(S_num <=1){
                S_num=1;
            }
            data.c_pro_num = S_num;
        }else if(this.id === "num_jian"){
            var S_num =$(this).next("#num_c").val();
            --S_num;
            if(S_num <=1){
                S_num=1;
            }
            data.c_pro_num = S_num;
            $(this).prev("#num_c").attr("value",res.c_pro_num);
        }
        console.log(data);
       $.ajax({
            url:"../../server/cartsServer.php",
            type:"post",
            dataType:"json",
            data:data,
        }).then(function(res){
            console.log(res);
            
            $(this).prev("#num_c").attr("value",res.c_pro_num);
        })
    })
 
    })


    
})(jQuery);
function del(c_id,obj){

    $.ajax({
        url:"http:../../server/deleteByC_Id.php",
        type:"post",
        data:{'c_id':c_id},
        dataType:"json",
    }).done(function(res){
        console.log(111)
        if(res.status ==1){
            layer.alert('删除成功', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
                ,anim: 3 //动画类型
              });
            $(obj).parents("tr").remove();
        }else{
            layer.alert('删除失败', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
                ,anim: 4 //动画类型
              });
        }
    })
    }