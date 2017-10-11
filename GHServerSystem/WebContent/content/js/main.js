/**
 * 
 */
function height(div){
	var realHeight = $(div).height();
	var borderHeight = parseInt($(div).css("border-top-width")) 
	+ parseInt($(div).css("border-bottom-width"));
	var paddingHeight = parseInt($(div).css("padding-top")) 
	+ parseInt($(div).css("padding-bottom"));
	return realHeight + borderHeight + paddingHeight;
}
function width(div){
	var realHeight = $(div).width();
	var borderHeight = parseInt($(div).css("border-left-width")) 
	+ parseInt($(div).css("border-right-width"));
	var paddingHeight = parseInt($(div).css("padding-left")) 
	+ parseInt($(div).css("padding-right"));
	return realHeight + borderHeight + paddingHeight;
}

function initLayout(){
	var view = $(window).height();
	
	var header = height($(".head"));
	
	var borderHeight = parseInt($(".main").css("border-top-width")) 
	+ parseInt($(".main").css("border-bottom-width"));
	var paddingHeight = parseInt($(".main").css("padding-top")) 
	+ parseInt($(".main").css("padding-bottom"));
	
	$(".main").height(view - header - borderHeight - paddingHeight);
	
	//$(".logo").width(width($(".navigation")));
}

$(document).ready(function(){
	initLayout();
	$(window).resize(initLayout);
	
});