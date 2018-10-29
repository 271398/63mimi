$(function () {
	//大轮播图效果
	showBgImgs();
	function showBgImgs() {
		var list = $("#list");
	    var ali = $("#list li");//数组
	    var list2 = $("#list2");
	    var ali2 = $("#list2 li");
	    var bglft = $(".lunbo-lft");
	    var bgrgt = $(".lunbo-rgtbg");
	    var bg = ["#e01a19","#f96ea9","#43bf9b","#693e74","#d93b3c","#d40c16"];
	    //初始化
	    var size = ali.length; 
	    var liW = ali.eq(0).width();
	    list.css({"width": size*liW });//ul总的宽度
	
	    //自动轮播
	    var index = 0;
	    var timer = setInterval( function() {
	        move();
	        index++;
	    }, 3000);
	    function move() {
	        //右边界
	        if( index>=size ) {
	            list.css({"left": 0});
	            index = 1;
	        }
	        //左边界
	        if ( index<0 ) {
	            list.css({"left": -liW*(size-1)});
	            index = size - 2;
	        }
	        list.stop(true).animate({"left": -index*liW}, 300);
	        
	        //active
	        ali2.eq(index).attr({"class": "active"});
	        ali2.eq(index).siblings().removeClass();
	        if( index==size-1 ) {
	            ali2.eq(0).attr({"class": "active"});
	            ali2.eq(0).siblings().removeClass();
	        }
	        //添加背景颜色
	        bglft.css({"background": bg[index]});
	        bgrgt.css({"background": bg[index]});
	    }
	    //上一页
	    $("#pre").click(function() {
	        index++;
	        move();
	    });
	    //下一页
	    $("#next").click(function() {
	        index--;
	        move();
	    });
	
	    //小图移入
	    ali2.stop(true).mouseenter(function (){
	        index = $(this).index();
	        move();
	    });
	    //移入移出大图
	    list.stop(true).mouseenter(function (){
	        clearInterval(timer);
	        $("#pre").show();
	        $("#next").show();
	    });
	    list.stop(true).mouseleave(function (){
	        clearInterval(timer);
	        timer = setInterval(function() {
	            index++;
	            move();
	        }, 3000);
	    });

	}
	
	//中型轮播效果
	showMidImgs();
	function showMidImgs() {
		var box = $(".midbox, .midbox2, .midbox3, .midbox4");
	    var list = $("#mid-lb, #mid-lb2, #mid-lb3, #mid-lb4");
	    var ali = $("#mid-lb li, #mid-lb2 li, #mid-lb3 li, #mid-lb4 li");
	    //初始化
	    var size = ali.length/4; //6
	    var liW = ali.eq(0).width();
	
	    //播放
	    var index = 0;
	    var timer = setInterval(function() {
	        move();
	        index++;
	    }, 3000);
	    
	    //移动
	    function move() {
	        //右边界
	        if( index>=size-1 ) { //第五张是第一张
	            list.css({"left": 0});
	            index = 1;
	        }
	        //左边界
	        if( index<0 ) {
	            index = size-1;
	            list.css({"left": -liW*index});
	        }
	        list.stop(true).animate({"left": -liW*index}, 2000);
	    }
	    
	    //移入移出
	    $(".midlunbo").stop(true).mouseenter(function() {
	    	clearInterval(timer);
	    });
	    $(".midlunbo").stop(true).mouseleave(function() {
	    	timer = setInterval(function() {
	    		move();
	    		index++;
	    	}, 3000);
	    });
	    //公司办公
	    //上一页
	    $("#midpre").stop(true).click(function() {
	        index--;
	        move();
	    });
	    //下一页
	    $("#midnext").stop(true).click(function() {
	        index++;
	        move();
	    });
	
	    //员工福利
	    //上一页
	    $("#midpre2").stop(true).click(function() {
	        index--;
	        move();
	    });
	    //下一页
	    $("#midnext2").stop(true).click(function() {
	        index++;
	        move();
	    });
	
	    //商务礼赠
	    //上一页
	    $("#midpre3").stop(true).click(function() {
	        index--;
	        move();
	    });
	    //下一页
	    $("#midnext3").stop(true).click(function() {
	        index++;
	        move();
	    });
	
	    //促销推荐
	    //上一页
	    $("#midpre4").stop(true).click(function() {
	        index--;
	        move();
	    });
	    //下一页
	    $("#midnext4").stop(true).click(function() {
	        index++;
	        move();
	    });
		
	}
	
	
	
	//小轮播图效果
	showMinImgs();
	function showMinImgs() {
	    var box = $(".lftbox, .lftbox2, .lftbox3, .lftbox4");
	    var list = $("#lftlunbo, #lftlunbo2, #lftlunbo3, #lftlunbo4");
	    var ali = $("#lftlunbo li, #lftlunbo2 li, #lftlunbo3 li, #lftlunbo4 li");
	    var minpre = $("#minpre, #minpre2, #minpre3, #minpre4");
	    var minnext = $("#minnext, #minnext2, #minnext3, #minnext4");
	
	    //初始化
	    var size = ali.length/4;
	    var liH = ali.eq(0).height();
	
	    //定时播放
	    var index = 0;
	    var timer = setInterval(function () {
	        move();
	        index++;
	    }, 3000);
	
	    //移动
	    function move() {
	        //下边界
	        if( index>size-3) {
	            list.css({"top": 0});
	            index = 1;
	        }
	        //上边界
	        if( index<0 ) {
	            list.css({"top": -liH*(size-3)});
	            index = size-4;
	        }
	        list.stop(true).animate({"top": -liH*index}, 1000);
	    }
	    
		//移入移出
	    $(".lftbox").stop(true).mouseenter(function() {
	    	clearInterval(timer);
	    });
	    $(".lftbox").stop(true).mouseleave(function() {
	    	timer = setInterval(function() {
	    		move();
	    		index++;
	    	}, 3000);
	    });
	    
	    //上下页
	    minpre.stop(true).click(function () {
	        move();
	        index--;
	    });
	    minnext.stop(true).click(function () {
	        move();
	        index++;
	    });
	
	}
	
	
	//排行榜折叠效果
	slideDown();
	function slideDown() {
		//默认第一个显示
		$(".goods-rgt ul#slide li").eq(0).find("dl").slideDown();
		$(".goods-rgt ul#slide2 li").eq(0).find("dl").slideDown();
		$(".goods-rgt ul#slide3 li").eq(0).find("dl").slideDown();
		$(".goods-rgt ul#slide4 li").eq(0).find("dl").slideDown();
		
		//1F
		$(".goods-rgt ul#slide li").stop(true).mouseenter(function() {
			$(this).find("dl").stop(true).slideDown().end().siblings().find("dl").stop(true).slideUp();
		
		});
		$(".goods-rgt ul#slide li").stop(true).mouseleave(function() {
			$(this).find("dl").stop(true).slideDown().end().siblings().find("dl").stop(true).slideUp();
		
		});
		
		//2F
		$(".goods-rgt ul#slide2 li").stop(true).mouseenter(function() {
			$(this).find("dl").stop(true).slideDown().end().siblings().find("dl").stop(true).slideUp();
		
		});
		$(".goods-rgt ul#slide2 li").stop(true).mouseleave(function() {
			$(this).find("dl").stop(true).slideDown().end().siblings().find("dl").stop(true).slideUp();
			
		});
		
		//3F
		$(".goods-rgt ul#slide3 li").stop(true).mouseenter(function() {
			$(this).find("dl").stop(true).slideDown().end().siblings().find("dl").stop(true).slideUp();
		
		});
		$(".goods-rgt ul#slide3 li").stop(true).mouseleave(function() {
			$(this).find("dl").stop(true).slideDown().end().siblings().find("dl").stop(true).slideUp();
			
		});
		
		//4F
		$(".goods-rgt ul#slide4 li").stop(true).mouseenter(function() {
			$(this).find("dl").stop(true).slideDown().end().siblings().find("dl").slideUp();
			
		});
		$(".goods-rgt ul#slide4 li").stop(true).mouseleave(function() {
			$(this).find("dl").stop(true).slideDown().end().siblings().find("dl").slideUp();
			
		});
	}
	
    
    //动态创建节点
    dynamicNode();
    function dynamicNode() {
    	var arr = [];
	    //获取json数据
	    $.get("http://127.0.0.1:8020/Go Shopping2/MMLOO_SHOP/json/goods.json", function(data) {
			//获取json数据
	        arr = data;
	        //遍历json数据
	        for(var i=0; i<arr.length; i++) {
	            var obj = arr[i];
	            //创建节点
	            var li = $("<li></li>").appendTo(".goods");
	            $("<img src="+ obj.headImg +">").appendTo(li);
	            $("<p class='name'>"+ obj.name +"</p>").appendTo(li);
	            $("<span class='unit'>"+ obj.unit +"</span>").appendTo(li);
	            $("<span class='price'>"+ obj.price +"</span>").appendTo(li);
	        }
	        //点击商品
	        $(".goods").on("click", "li", function() {
	            var index = $(this).index();
	            var obj = arr[index]; //获取当前商品对象（里面包含属性）
	
	            //进入详情页
	            location.href = "details.html?id=" + obj.id;
	
	        });
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
    
    //透明度轮播
    
    
    //楼梯效果
    floorEffect();
    function floorEffect() {
    	
    	var isMoving = false;
    	//获取指定div的高度和固定的高度
    	var top = $(".salearea").position().top;  //867
    	var myTop = 655;
   
	    //指定选中哪个楼层
	    $(".cnt li").click(function() {
	    	//确定是哪个页面
	    	var index = $(this).index();
	    	//防止滚动条滚动span一路显示
	    	isMoving = true;
	    	//选中/未选中状态
	    	$(this).find("span").addClass("activeFloor")
	    	.parent().siblings().find("span").removeClass("activeFloor");
	    	
	    	switch(index) {
	    		case 0: $("html, body").stop(true).animate({scrollTop: 0}, 1000, function() { isMoving = false});
	    			break;
	    		case 1: $("html, body").stop(true).animate({scrollTop: top}, 1000, function() { isMoving = false});
	    			break;
	    		case 2: $("html, body").stop(true).animate({scrollTop: top+myTop}, 1000, function() { isMoving = false});
	    			break;
	    		case 3: $("html, body").stop(true).animate({scrollTop: top+myTop*(index-1)}, 1000, function() { isMoving = false});
	    			break;
	    		case 4: $("html, body").stop(true).animate({scrollTop: top+myTop*(index-1)}, 1000, function() { isMoving = false});
	    			break;
	    		case 5: $("html, body").stop(true).animate({scrollTop: top+myTop*(index-1)}, 1000, function() { isMoving = false});
	    			break;
	    		case 6: $("html, body").stop(true).animate({scrollTop: top+myTop*(index-1)+50}, 1000, function() { isMoving = false});
	    			break;
	    		case 7: $("html, body").stop(true).animate({scrollTop: top+myTop*(index-2)+600}, 1000, function() { isMoving = false});
	    			break;
	    	}
	    	
	    })
	    
	    
		//滚动条滚动
	    $(window).scroll(function() {
	    	//滚动获取scrollTop、页面高度值
    		var scrollTop = $(window).scrollTop();
	    	var winH = $(window).height()/2;
		    if(!isMoving) {		
		    	if ( scrollTop+winH >= top+myTop*6+105) {
		    		$(".cnt li").eq(7).find("span").addClass("activeFloor")
	    			.parent().siblings().find("span").removeClass("activeFloor");
		    	}
	    		else if( scrollTop+winH >= top+myTop*5+50 ) {
					$(".cnt li").eq(6).find("span").addClass("activeFloor")
	    			.parent().siblings().find("span").removeClass("activeFloor");
	    			
	    		} else if( scrollTop+winH >= top+myTop*4 ) {
	    			$(".cnt li").eq(5).find("span").addClass("activeFloor")
	    			.parent().siblings().find("span").removeClass("activeFloor");
	    			
	    		} else if( scrollTop+winH >= top+myTop*3 ) {
	    			$(".cnt li").eq(4).find("span").addClass("activeFloor")
	    			.parent().siblings().find("span").removeClass("activeFloor");
	    			
	    		} else if( scrollTop+winH >= top+myTop*2  ) {
	    			$(".cnt li").eq(3).find("span").addClass("activeFloor")
	    			.parent().siblings().find("span").removeClass("activeFloor");
	    		} else if( scrollTop+winH >= top+myTop ) {
	    			$(".cnt li").eq(2).find("span").addClass("activeFloor")
	    			.parent().siblings().find("span").removeClass("activeFloor");
	    			
	    		} else if( scrollTop+winH >= top ) {
	    			$(".cnt li").eq(1).find("span").addClass("activeFloor")
	    			.parent().siblings().find("span").removeClass("activeFloor");
	    		} else {
	    			$(".cnt li").eq(0).find("span").addClass("activeFloor")
	    			.parent().siblings().find("span").removeClass("activeFloor");
	    		}
		    	
		    }
	    
	    
    	})
	    
	}
	
});