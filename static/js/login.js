$(function() {
    var flag1 = false;
    var flag2 = false;
    //手机号/用户名/邮箱
    function checkUser(username) {
        if(  /^\w[0-9a-zA-Z_]{5,8}$/.test(username) || ( /^1[234578]\d{10}$/.test(username)) 
            ) {
            flag1 = false;
            $(".username").attr({"class":"username no"});
            $("#txt").html("用户名输入不合法");
        } else {
            flag1 = true;
            $(".username").attr({"class":"username yes"});
            $("#txt").html("");
        }
    }
    //用户名
    $(".username").keyup(function () {
        var user = $(".username").val();
        checkUser(user); 
    });

    //密码
    function checkPwd(password) {
        if( (/(?=.*[\d]+)(?=.*[a-zA-Z]+)(?=.*[^a-zA-Z0-9]+).{6,20}/).test(password) == false) {
            flag2 = false;
            $(".pwd").attr({"class":"pwd no"});
            $("#pwdtxt").html("密码输入不合法");
        } else {
            flag2 = true;
            $(".pwd").attr({"class":"pwd yes"});
            $("#pwdtxt").html("");
        }
    }
    //kyeup
    $(".pwd").keyup(function () {
        var pwd = $(".pwd").val();
        checkPwd(pwd); 
    });

    //登录
    $(".loginbtn").click(function () {
    	//ajax
        var xhr = new XMLHttpRequest();
        xhr.open("post", "http://127.0.0.1/Go Shopping2/MMLOO_SHOP/php/login.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var str = "username="+$(".username").val() + "&pwd="+$(".pwd").val();
        xhr.send(str);
        xhr.onreadystatechange = function () {
            if (xhr.readyState==4 && xhr.status==200) {
                
                //json解析
                var loginTxt = JSON.parse(xhr.responseText);
                //判断
				if( !(flag1) ) {
		            $(".username").addClass("no");
		            $("#txt").html("用户名输入不合法");
		        } 
		        else if( !(flag2) ) {
		            $(".pwd").addClass("no");
		            $("#pwdtxt").html("密码输入不合法");
		        } 
		        //登录成功
		        else if(loginTxt.status == 1) {
        			alert(loginTxt.msg);
        			window.location.href = "index.html";
        		} 
        		else {
        			alert(loginTxt.msg);
        		}
        	}
        	
        }
        
                   
    });

})