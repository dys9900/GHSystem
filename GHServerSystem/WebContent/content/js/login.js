/**
 * 
 */
/* 样式处理器 */
$(document).ready(function(){
	var width = $(window).width();
	var height = $(window).height();
	
	var t = $(".main");
	
	var mWidth = t.width();
	var mHeight = t.height();
	
	var offset = 40;
	
	$(".main").css({
		top: ((height - mHeight)/2 - offset) + "px",
		left: (width - mWidth)/2 + "px"
	});
	
	$("input").focus(function(){
		$(this).addClass("active");
	});

	$("input").blur(function(){
		$(this).removeClass("active");
	});
	
});

/* 事件处理器 */
$(document).ready(function(){
	
	$("#submit").click(function(){
		var fa = $(this);
		
		if(!fa.hasClass("loading")){
			var obj = $("#Login").serialize();
			$.ajax({
				type: "POST",
			    url: "json/login.do",
			    data: obj,// 要提交的表单
			    beforeSend: function(){
			    	fa.removeClass();
			    	fa.addClass("loading");
			    },
			    success: function (date) {
			    	fa.removeClass();
			    	if(date.r == 0){
			    		$("#LoginInfo").html("发生未知错误");
			    	}
			    	else if(date.r == 1){
			    		$("#LoginInfo").html();
				    	fa.html("登录成功");
				    	fa.addClass("success");
				    	window.location.href = "main.html";
			    	}
			    	else if(date.r == 2){
			    		$("#LoginInfo").html(date.m);
			    	}
			    	else if(date.r == 3){
			    		$("#LoginInfo").html(date.m);
			    	}
			    },
			    error: function (err) {
			    	fa.removeClass();
		    		$("#LoginInfo").html("连接服务器失败，请检查网络设置");
			    }
			});
		}
	});
	
	
});