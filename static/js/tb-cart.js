$(function() {
    // bottomline-move
    function lineMove() {
        var ul = $(".h-m-lft");
        var line = $("#btmline");
        var ali = $(".h-m-lft li");
        //动画移动
        ali.stop(true).mouseenter(function() {
            line.animate({"left": $(this).index() * line.width()}, 120);
        });
        $(".h-m-lft").mouseleave(function() {
        	line.animate({"left": 0}, 120);
        	
        });
    }
    lineMove();
    
    
	//购物车
    //添加商品（商品保存在cookie中）
    refresh();//刷新
    function refresh() {
    	//默认清除原节点
    	$(".cnt-m").find(".cnt-m-gds").remove();
    	
    	//获取cookie中的商品数据
        var arr = $.cookie("cart"); 
        if(arr) {
            arr = JSON.parse(arr);
            var sum =0
			//总价
            var totalPrice = 0.00;
            for(var i=0; i<arr.length; i++) {
                var obj = arr[i];
				
				var newdiv = $(".cnt-m-gds").eq(0).clone(true).css("display","block")
                			.appendTo(".cnt-m");
                //修改list1
                newdiv.find(".img").attr("src",obj.headImg)	
                newdiv.find(".list1 li").eq(1).children(0).html(obj.name);
                newdiv.find(".gds-num").val(obj.num)
                //修改list2
                newdiv.find(".list2 li p").html(obj.name);
                newdiv.find(".list2 li span").html(obj.price);
                //修改list3 
                newdiv.find(".list3 li span").html(obj.price * obj.num);
                
                //商品数量
//              $(".gds-pay-rgt").find("#choNum").html(obj.num);
                
                //默认选中
               	if(obj.flag) {
        			newdiv.find(".select").css({"background": "#f90"});
        		} 
        		else {
        			newdiv.find(".select").css({"background": "#fff"});
        		}
            		
				//显示总价
				if(obj.flag) {
                	sum += obj.price * obj.num;
                    $(".cost").html(sum);
            	} 
                else {
                    $(".cost").html(sum);
               	}
                
            }
        //没有商品
        } 
        else {
            console.log("购物车还没有商品，请先添加！");
        }
    }
   
   //选中某个商品
	// var arr = JSON.parse($.cookie("cart"));
	// var index = 0;
	// //商品数量
	// var num = 0;
   // 	$(".cnt-m").on("click", ".select", function() {
   // 		//console.log($(this))
	// 	var index = $(this).index(".cnt-m .list1 li .select");
	// 	//console.log(index,arr[index].flag,arr)
	// 	if(!arr[index].flag) {
	// 		$(this).css({"background": "#f90"});
	// 		arr[index].flag = true;
	// 		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
	// 		 console.log($.cookie("cart"));
	// 	}
	// 	else {
	// 		console.log($.cookie("cart"));
	// 		$(this).css({"background": "#fff"});
	// 		console.log(index)
	// 		arr[index].flag = false;
	// 		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
	// 		console.log($.cookie("cart"));
	// 	}
   //
	// 	//选中某个商品改变商品的数量
	// 	if(arr[index].flag == true) {
	// 		$(".gds-pay-rgt").find("#choNum").html(++num);
	// 	}
	// 	if(arr[index].flag == false) {
	// 		$(".gds-pay-rgt").find("#choNum").html(--num);
	// 	}
	//
	//
	// 	//调用
   //      isAllSelect();
   //      accSelect();
   //      refresh();
	// });
	
	//刷新后显示的商品数量
	for(var j=0; j<arr.length; j++) {
    	//console.log(arr.length);
    	if(arr[j].flag == true) {
    		$(".gds-pay-rgt").find("#choNum").html(++num);
    	}
    }
    
   
    //添加商品+
    $(".list2 li").on("click", ".add", function() {
    	console.log("我被点击了");
    	var index = $(this).index(".list2 li .add");
        //获取cookie
		var arr = JSON.parse( $.cookie("cart") );
		//在购物车页面和cookie中同步显示商品数量
		$(".gds-num").eq(index).val(arr[index-1].num++);
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		//刷新节点数据
		refresh();
    
    });
    
    
    //减少商品-
    $(".list2 li").on("click", ".reduce", function() {
    	//选中所点击商品的下标
    	var index = $(this).index(".list2 li .reduce");
    	var arr = JSON.parse($.cookie("cart"));
    	//在购物车页面和cookie中同步显示商品数量
    	$(this).find(".gds-num").html(arr[index-1].num--);
    	if( (arr[index-1].num)<1 ) {
    		arr[index-1].num = 1;
    	}
    	//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
    });
   
    //点击删除按钮
    $(".list3 li").on("click", ".del", function() {
    	var index = $(this).index(".list3 .del")-1;
    	var arr = JSON.parse($.cookie("cart"));
    	//删除当前商品
    	arr.splice(index, 1); 
    	//修改cookie中的数据
    	$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
    	isAllSelect();
    	accSelect();
    	refresh();
    });
	
	//刷新后就判断是否全选
	isAllSelect();
    function isAllSelect(){
		var arr = $.cookie("cart"); //购物车中有商品
		//为undefined时 
		if (!arr) {
			return;
		}
		var arr = JSON.parse($.cookie("cart"));
		//console.log(arr);
		var sum = 0;
		for (var i=0; i<arr.length; i++) {
			sum += arr[i].flag;
		}
		//全选
		if (arr.length!=0 && sum==arr.length) {
			$(".allSelect").addClass("flag");
		}
		//未全选
		else {
			$(".allSelect").removeClass("flag");
		}
	}
    
    //点击全选
	$(".g-cnt").find(".allSelect").click(function(){
		var arr = $.cookie("cart");
		if (!arr) {
			return;
		}
		var arr = JSON.parse($.cookie("cart"));
		//全选
		if(!$(".allSelect").hasClass("flag")){
			for (var i=0; i<arr.length; i++) {
				arr[i].flag= true;
			}	
			$(".allSelect").addClass("flag");
			$(".gds-pay-rgt").find("#choNum").html(arr.length);
		}
		//全不选
		else {
			$(".allSelect").removeClass("flag")
			for (var i=0; i<arr.length; i++) {
				arr[i].flag= false;
			}
		}
		
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		//刷新
		console.log($.cookie("cart"))
		accSelect();
		refresh();
	});
	
	//删除所选中的商品
	$("#delSelect").click(function(){
		//确认是否删除商品
		var status = confirm("是否要删除选中的商品？");
		//获取cookie
		var arr = JSON.parse($.cookie("cart"));
		
		//将未选中的商品添加到新数组newArr中，再将newArr保存到cookie
		if (status) {
			var newArr = [];
			for (var i=0; i<arr.length; i++) {
				if (!arr[i].flag) {
					newArr.push(arr[i]);
				}
			}
			//覆盖原来的cookie
			$.cookie("cart", JSON.stringify(newArr), {expires:30, path:"/"});
		}
		isAllSelect();
		accSelect();
		//刷新节点数据
		refresh();
	});
	
	//结算
	accSelect();
	function accSelect() {
		//状态
		var state = accState();
		if( $(".allSelect").hasClass("flag") || state){
			$(".account-bg").attr("class", "account-bg active");
		}
		else {
			$(".account-bg").attr("class", "account-bg");
			$(".cost").html(0.00);
			$(".gds-pay-rgt").find("#choNum").html(0);
		}
		refresh();
	}
	
	//结算状态
	function accState() {
		var arr = JSON.parse($.cookie("cart"));
		for(var i=0; i<arr.length; i++) {
			var obj = arr[i];
			if (obj.flag == true) {
				return true;
			}
		}
	}
           

})