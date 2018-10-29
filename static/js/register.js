$(function () {
    var flag1 = false;
    var flag2 = false;
    var flag3 = false;
    var flag4 = false;
    var flag5 = false;
    //设置手机号
    function mobile(num) {
        if( /^((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+(\d{8})$/.test(num) == false ) {
            //改变输入的提示信息
            $("#phonenum").attr({"class": "u-btn-user txtno"});
            $(".user").attr({"class": "user no"});
            $(".tips1").html("手机号不正确");
            flag1 = false;
        } else {
            $("#phonenum").attr({"class": "u-btn-user txtyes"});
            $(".user").attr({"class": "user yes"});
            $(".tips1").html("");
            flag1 = true;
        }
    }
    $("#phonenum").keyup(function () {
        mobile( $("#phonenum").val() );//传参
    });
    $("#phonenum").focus(function () {
        $("#txt1").fadeIn("slow");
    });
    $("#phonenum").blur(function () {
        $("#txt1").fadeOut(200);

    });

    //设置密码
    function password(pwd) {
        if( /(?=.*[\d]+)(?=.*[a-zA-Z]+)(?=.*[^a-zA-Z0-9]+).{6,20}/.test(pwd) == false ) {
            //改变输入的提示信息
            $("#pwd").attr({"class": "u-btn-pwd txtno"});//文本框的颜色
            $(".pwd").attr({"class": "pwd no"});//文本框中的图标
            $(".tips2").html("密码不正确");
            flag2 = false;
        } else {
            $("#pwd").attr({"class": "u-btn-pwd txtyes"});
            $(".pwd").attr({"class": "pwd yes"});
            $(".tips2").html("");
            flag2 = true;
        }
    }
    $("#pwd").keyup(function () {
        password( $("#pwd").val() );//传参
    });
    $("#pwd").focus(function () {
        $("#txt2").fadeIn("slow");
    });
    $("#pwd").blur(function () {
        $("#txt2").fadeOut(200);
    });


    //验证码
    //改变验证码
    function checkCode(valCode, code) {
        //验证码不正确
        if( !(valCode == code) ) {
            $("#code").attr({"class": "u-btn-code txtno"});
            $(".code").attr({"class": "code no"});
            $(".tips3").html("验证码不正确");
            flag3 = false;
        } else {
            $("#code").attr({"class": "u-btn-code txtyes"});
            $(".code").attr({"class": "code yes"});
            $(".tips3").html("");
            flag3 = true;
        }
    }
    //两次验证码验证
    var valCode = "";
    $("#code").keyup(function () {
        //获取验证码
        valCode = $("#code2").val();
        checkCode( valCode, $("#code").val() );//传参
    });
    //随机产生验证码
    $(".change").click(function () {
        valCode = parseInt( Math.random()*9000+1000 );
        $("#code2").val(valCode);
    });

    $("#code").focus(function () {
        $("#txt3").fadeIn("slow");
    });
    $("#code").blur(function () {
        $("#txt3").fadeOut(200);
    });
    

    //短信验证码
    function checkMsgCode(msg) {
    	if( /^\d{6}$/.test(msg) == false ) {
    		//改变输入的提示信息
            $("#msg").attr({"class": "u-btn-msg txtno"});//文本框的颜色
            $(".msg").attr({"class": "msg no"});//文本框中的图标
            $(".tips4").html("短信验证码不正确");
    		flag4 = false;
    	} else {
    		$("#msg").attr({"class": "u-btn-msg txtyes"});
            $(".msg").attr({"class": "msg yes"});
            $(".tips4").html("");
    		flag4 = true;
    	}
    }
    //输入
    $("#msg").keyup(function () {
        checkMsgCode( $("#msg").val() );//传参
    });
    $("#msg").focus(function () {
        $("#txt4").fadeIn("slow");
    });
    $("#msg").blur(function () {
        $("#txt4").fadeOut(200);
    });
    
    
    //好友校验码
    function checkFrdCode(frdCode) {
    	if( /^[0-9a-zA-Z]{6}$/.test(frdCode) == false) {
    		//改变输入的提示信息
            $("#frd").attr({"class": "u-btn-frd txtno"});//文本框的颜色
            $(".frd").attr({"class": "frd no"});//文本框中的图标
            $(".tips5").html("好友推荐码不正确");
    		flag5 = false;
    	} else {
    		$("#frd").attr({"class": "u-btn-frd txtyes"});
            $(".frd").attr({"class": "frd yes"});
            $(".tips5").html("");
    		flag5 = true;
    	}
    }
    //输入
    $("#frd").keyup(function () {
        checkFrdCode( $("#frd").val() );//传参
    });
    $("#frd").focus(function () {
        $("#txt5").fadeIn("slow");
    });
    $("#frd").blur(function () {
        $("#txt5").fadeOut(200);
    });
   
	

    //注册
    $("#reg").click(function () {
        //ajax
        var xhr = new XMLHttpRequest();
        xhr.open("post", "http://127.0.0.1/Go Shopping2/MMLOO_SHOP/php/register.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var str = "username="+$("#phonenum").val() + "&pwd="+$("#pwd").val();
      	console.log(str);//得到正确的值
        xhr.send(str);
        xhr.onreadystatechange = function () {
            if (xhr.readyState==4 && xhr.status==200) {
                //console.log(xhr.responseText);
                //json解析
                var regTxt = JSON.parse(xhr.responseText);
                console.log(regTxt);
                //判断是否注册成功
		        if( flag1&&flag2&&flag3&&flag4&&flag5 ) {
		        	//成功
		        	if(regTxt.status == 1) {
		        		alert(regTxt.msg);
		        		location.href = "login.html";
		        	} 
		        	//失败
		        	else {
		        		alert(regTxt.msg);
		        	}
		        }
		        if(!flag1) {
		            $(".tips1").html("手机号不正确");
		        }
		        if(!flag2) {
		            $(".tips2").html("密码不正确");
		        }
		        if(!flag3) {
		            $(".tips3").html("验证码不正确");
		        }
		        if(!flag4) {
		            $(".tips4").html("短信验证码不正确");
		        }
		        if(!flag5) {
		            $(".tips5").html("好友推荐码不正确");
		        }
                
            }
        }
		
    });
















})