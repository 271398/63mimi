$(function () {
	//添加商品
	addGds();
	function addGds() {
	 	var addgds = $(".addgds");
        //传过来的id ?id=1002&name=lisi
        var param = location.search.substring(1);
        var id = getParams(param, "id");
        //获取json数据
        var arr = [];
        $.get("http://127.0.0.1:8020/Go Shopping2/MMLOO_SHOP/json/goods.json", function(data) {
            arr = data;
            console.log(arr);
            //选出所点击的商品
            for(var i=0; i<arr.length; i++) {
                var obj = arr[i];
                if(obj.id == id) {
                    loadUl(obj);
                }
            }
            //添加购物车
            addgds.click(function() {
        	 	for(var i=0; i<arr.length; i++) {
        	 		obj=arr[i]
        	 	  	if(obj.id == id) {
            	 	  	var arr2 = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
                        
                        //是否有相同商品
                        var isExist = false;  //默认没有商品
                        for(var j=0; j<arr2.length; j++) {
                        	
                            if(arr2[j].id == obj.id) {
                                arr2[j].num++; //创建一个数量属性
                                isExist = true;
                                break;
                            }
                        }
                        if(isExist == false) {
                            obj.num = 1;
                            obj.flag = true; //默认选中
                            //加入属性
                            arr2.push(obj);
                        }
              			//设置cookie 
                        $.cookie("cart", JSON.stringify(arr2), {expires:30, path:"/"});
						location.href = "tb-cart.html";
       				}
               	}
            });
            
        });
        //加载页面
        function loadUl(obj) {
            $("img.myImgs").attr({"src": obj.headImg});
            $(".name").html(obj.name);
            $(".price").html(obj.price);
            $(".unit").html(obj.unit);
        }
        //获取id
        function getParams(str, name) {
            var arr = str.split("&");
            for(var i=0; i<arr.length; i++) {
                var str1 = arr[i];
                var arr1 = str1.split("=")
                if(arr1[0] == name) {
                    return arr1[1];
                };
            }
            return "";
        }
		
	}
	
	
	//放大镜
	magnify();
	function magnify() {
	    var imgbox = $(".u-gdsbox");//装图的盒子
	    var floatbox = $("#u-floatbox"); //放大镜
	    var bigArea = $("#showImg"); //显示大图
	    var smallImg = $(".u-gdsbox img");
	    var bigImg = $("#showImg img");
	    var ali = $("#u-mingds li"); //小图
	    var minImg = $("#u-mingds li img");
	    
	    imgbox.mousemove(function(e) {
	        //放大倍数
	        floatbox.width( smallImg.width() * bigArea.width() / bigImg.width() );
	        floatbox.height( smallImg.height() * bigArea.height() / bigImg.height() );
	        //放大系数
	        var scale = bigImg.width() / smallImg.width();
	        //显示放大镜.大图区域
	        floatbox.show();
	        bigArea.show();
	        disx = e.pageX - $(this).offset().left - floatbox.width()/2;
	        disy = e.pageY - $(this).offset().top - floatbox.height()/2;
	        //水平方向
	        if(disx < 0) {
	            disx = 0;
	        } else if( disx > imgbox.width() - floatbox.width() ) {
	            disx = imgbox.width() - floatbox.width();
	        }
	        //垂直方向
	        if(disy < 0) {
	            disy = 0;
	        } else if( disy > imgbox.height() - floatbox.height() ) {
	            disy = disy > imgbox.height() - floatbox.height();
	        }
	        //移动
	        floatbox.css({"left": disx, "top": disy});
	        //放大
	        bigImg.css({"left": -disx * scale, "top": -disy * scale});
	    });
	    //移出放大镜和大图
	    imgbox.mouseleave(function () {
	        floatbox.hide();
	        bigArea.hide();
	    });
	    //获取图片的src
	    minImg.click(function() {
	        smallImg.attr("src", $(this).attr("src"));
	        bigImg.attr("src", $(this).attr("src"));
	
	    });
	}
	
	
	//右侧工具栏
    rightTools();
    function rightTools() {
    	var ali = $(".u-bar-t li");
	    var aA = $(".u-bar-t li a");
	    var aSpan = $(".u-bar-t li span");
	
	    var kefu = $(".kefu");
	    var erweima = $(".erweima");
	    var toTop = $(".toTop");
	
	    //移动
	    //客服
	    ali.eq(0).stop(true).mouseenter(function() {
	        kefu.animate({"right": 40, "opacity": 0.5}, 300);
	        aA.eq(0).css({"background": "#ff3b30"});
	        kefu.animate({"opacity": 1}, 50);
	    });
	    ali.eq(0).stop(true).mouseleave(function() {
	        kefu.animate({"opacity": 0.5}, 50);
	        aA.eq(0).css({"background": ""});
	        kefu.animate({"right": -82}, 300);
	    });
	
	    //二维码
	    ali.eq(3).stop(true).mouseenter(function() {
	        erweima.animate({"right": 40, "opacity": 0.5}, 300);
	        aA.eq(3).css({"background": "#ff3b30"});
	        erweima.animate({"opacity": 1}, 50);
	    });
	    ali.eq(3).stop(true).mouseleave(function() {
	        erweima.animate({"opacity": 0.5}, 50);
	        aA.eq(3).css({"background": ""});
	        erweima.animate({"right": -154}, 300);
	    });
	
	    //回到顶部
	    ali.eq(4).stop(true).mouseenter(function() {
	        toTop.animate({"right": 40, "opacity": 0.5}, 300);
	        aA.eq(4).css({"background": "#ff3b30"});
	        toTop.animate({"opacity": 1}, 50);
	    });
	    ali.eq(4).stop(true).mouseleave(function() {
	        toTop.animate({"opacity": 0.5}, 50);
	        aA.eq(4).css({"background": ""});
	        toTop.animate({"right": -82}, 300);
	    });
	    
	    $(".toTop").click(function() {
	        $("html,body").stop(true).animate({"scrollTop": 0}, 1000);
	    });

    }
	
	
	
	
	//购物车飞入效果
	gdsFly();
	function gdsFly() {
		
		
		
		
	}
	


});