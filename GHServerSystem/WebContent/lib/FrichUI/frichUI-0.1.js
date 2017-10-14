/**
 * 
 */

(function(global, factory){

	factory(global);
	
})(window, function(global){
	/*
	 * 1. common 基础支持层
	 */
	var FRICHUI_ROOT = "FrichUI/";
	
	var reg1 = /\{[^{}]+\}/g;		//匹配字符串，用于model检验
	
	/*
	 * 2. FrichUI 模块层
	 */

	/*
	 * 2.1 样式主题
	 */
	var Theme = function(path, name, file){
		this.path = path;
		this.name = name;
		this.file = file || "frichUI.css";
		
	};
	Theme.prototype = {
		/*
		 * 私有成员声明
		 * @path
		 * @name
		 * @file
		 * 
		 * @link
		 */
		init: function(root){
			var th = this;
			this.link = $("<link>").attr({
				href: root + th.path,
				rel: "stylesheet",
				type: "text/css"
			});
			
			var link = this.link;
			$(document).ready(function(){
				$("head").append(link);
			});
		},
		change: function(root){
			var th = this;
			$(ducment).ready(function(){
				$(th.link).remove();
			})
			th.init(root);
		}
	};
	
	/*
	 * 2.2 FrichUI核心件
	 */
	var FrichUI = function(){
		
	};
	FrichUI.prototype = {
		/*
		 * 私有成员声明
		 * 
		// 全局控制
		root: null,
		
		// 皮肤
		theme: null,
		
		// 工厂制作后的产品集
		entity: null,
		
		//工厂集
		Menu
		
		*/

		/*
		 * 私有成员声明
		 */
		//皮肤1	淡蓝绿(默认)
		FRICHUI_THEME_AQUAMARINE: new Theme("Themes/Aquamarine/frichUI.css", "aquamarine"),
		//皮肤2	暗色
		FRICHUI_THEME_DARK: new Theme("Themes/Dark/frichUI.css", "dark"),
		
		/*
		 * 公共接口定义
		 */
		init: function(root, theme){
			this.root = root || FRICHUI_ROOT;
			
			this.theme = theme || this.FRICHUI_THEME_AQUAMARINE;
			this.theme.init(this.root);
			
			this.entity = new Array();
		},
		
		path: function(root){
			this.root = root || FRICHUI_ROOT;
			
			this.theme.init(this.root);
		},
		
		entitys: function(id){
			var result;
			$.each(this.entity, function(i, item){
				if(item.id == id)
				{
					result = item;
					return;
				}
			});
			return result;
		},
		
		push: function(obj){
			this.entity.push(obj);
		}
		
	};
	FrichUI.prototype.Theme = Theme;
	
	/*
	 * 2.3 工厂核心件
	 * @数据组件	
	 * 2.3.1表格
	 * 2.3.2菜单、多级无序列表
	 * 2.3.3多级有序列表
	 * @控制组件	
	 * 2.3.5会话组件
	 * 
	 */
	var Factory = function(){
		
	}
	Factory.prototype = {
		defaul: {
			id: "",
			width: "extend",
			height: "extend"
		},
		id: function(div, options) {
	        var result;
	        if(options.id == "extend") {
	            result = $(div).attr("id");
	            if(!result || typeof(result) == undefined) {
	                console.error("you must set a id for the initialized div or in options");
	            }
	        }
	        else {
	            result = options.id;
	        }
	        options.id = result;
	        return result;
	    },
		weight: function (div, options) {
	        var result;
	        if (options.width == "extend") {
	            result = $(div).width();
	            if (result == 0) {
	                console.error("you must set the width in 'css' or options");
	            }
	            result += "px";
	        }
	        else if (options.width == "auto") {
	            result = "100%";
	        }
	        else {
	            result = options.width;
	        }
	        op.width = result;
	        return result;
		},
		height: function (div, options) {
	        var result;
	        if (options.height == "extend") {
	            result = $(div).height();
	            if (result == 0) {
	                console.error("you must set the height in 'css' or options");
	            }
	            result += "px"
	        }
	        else if (options.height == "auto") {
	            result = "100%";
	        }
	        else {
	            result = options.height;
	        }
	        options.height = result;
	        return result;
		},
	    createFrame: function (frClass) {
	        var frame = $("<div></div>");
	        frame.attr({
	    		class: frClass,
	    	});
	        return frame;
	    },
	    createDiv: function (frClass, value) {
	        var div = $("<div></div>");
	        div.attr({
	    		class: frClass,
	    	});
	        div.append(value);
	        return div;
	    },
	    createOl: function (frClass) {
	        var ol = $("<ol></ol>");
	        ol.attr({
	    		class: frClass,
	    	});
	        return ol;
	    },
	    createUl: function (frClass) {
	        var ul = $("<ul></ul>");
	        ul.attr({
	    		class: frClass,
	    	});
	        return ul;
	    },
	    createLi: function (frClass) {
	        var li = $("<li></li>");
	        li.attr({
	    		class: frClass,
	    	});
	        return li;
	    },
	    createH: function (i, frClass, value) {
	        var h = $("<h"+ i +"></h"+ i +">");

	    	h.attr({
	    		class: frClass,
	    	});
	    	h.append(value);
	        return h;
	    },
	    createI: function (frClass) {
	        var i = $("<i></i>");
	    	i.attr({
	    		class: frClass,
	    	});
	        return i;
	    },
	    createA: function(frClass, value, href){
	    	var a = $("<a></a>");
	    	a.attr({
	    		class: frClass,
	    		href: href
	    	})
	    	a.append(value);
	        return a;
	    },
		initCreate: function(dom, customer){
			options = $.extend(true, {}, this.defaul, customer);
			
			return options;
		}
	}
	
	var Entity = function(){
		
	}
	Entity.prototype = {
		
	}
	
	/*
	 * 2.3.1 表格组件
	 */
	var TableFactory = function(){
		
	}
	
	/*
	 * 2.3.2 菜单组件
	 */
	var MenuFactory = function(){
		Factory.call(this);
		
		this.defaul = $.extend(true, {}, this.defaul, {
			model: "<a href=\"{h}\"><label>{v}</label></a>",
			data: null
		});
		
		this.createOLLI = function(model, data, level){
			var ol = this.createOl("frichUI_Menu_House " + "frichUI_Menu_Level" + level);
			
			var param = model.match(reg1);
			for(var a in param){
				param[a] = param[a].replace(/\{/, '').replace(/\}/, '');
			}
			
			for(var i=0; i<data.length; i++){
				var li = this.createLi("frichUI_Menu_Room");
				
				var str = model;
				for(var j=0; j<param.length; j++){
					var d = data[i][param[j]];
					if(typeof(d) != "undefined" && d){
						var reg = new RegExp("\{"+param[j]+"\}", "g");
						str = str.replace(reg, d);
					}
				}
				
				li.append(str);
				
				if(typeof(data[i].c) != "undefined" && data[i].c && !$.isEmptyObject(data[i].c)){
					li.append(this.createOLLI(model, data[i].c, level+1));
				}
				
				ol.append(li);
			}
			
			return ol;
		};
		
	}
	MenuFactory.prototype = new Factory();

	MenuFactory.prototype.make = function(dom, customer){
		var options = this.initCreate(dom, customer);
		
		/* 创建基架 */
		var frame = this.createFrame('frichUI_Menu_Frame');
		
		frame.append(this.createOLLI(options.model, options.data, 1));
		
		frame.appendTo(dom);
		
		menuEntity = new MenuEntity(frame, options);
		frichUI.push(menuEntity);
		
		return menuEntity;
	};
	
	/* 菜单持久化实体Entity */
	var MenuEntity = function(frame, options){
		this.id = options.id;
		this.frame = frame;
		this.options = options;

		$(frame).find("a").bind('click', function(event){
			var fh = $(this).parent(".frichUI_Menu_Room");
			
			if(!fh.hasClass("frichUI_Menu_Showed"))
			{
				// 设置滑动效果
				fh.css("height", "auto");
				var AutoHeight = fh.height();
				fh.css("height", "35px");
				fh.animate({height: AutoHeight + "px"}, (AutoHeight-35) * 2.5, function(){
					fh.css("height", "auto");
				});
				fh.addClass("frichUI_Menu_Showed");
				
			}
			else if(fh.hasClass("frichUI_Menu_Select"))
			{
				fh.css("height", "auto");
				var AutoHeight = fh.height();
				fh.animate({height: "35px"}, (AutoHeight-35) * 2.5);
				fh.removeClass("frichUI_Menu_Showed");
			}
			else
			{
				var fr = fh.parents(".frichUI_Menu_Select");
				if(fr.length != 0)
				{
					fh.css("height", "auto");
					var AutoHeight = fh.height();
					fh.animate({height: "35px"}, (AutoHeight-30) * 2.5);
					fh.removeClass("frichUI_Menu_Showed");
				}
			}
		});
		
		$(frame).find(".frichUI_Menu_Level1").children(".frichUI_Menu_Room").bind('click', function(event){
			var fa = $(this);

			$(frame).find(".frichUI_Menu_Room").removeClass("frichUI_Menu_Select");
			fa.addClass("frichUI_Menu_Select");
			
		});
	}
	
	FrichUI.prototype.Menu = new MenuFactory();
	/*
	 * 2.3.3 多级列表组件
	 */
	
	
	/*
	 * 2.3.4 表格组件
	 */
	
	
	/*
	 * 2.3.5 会话组件
	 */	
	var DialogFactory = function(){
		Factory.call(this);
		
		this.tools = {
			close: "FrichUI_Dialog_Close",
			full: "FrichUI_Dialog_Full",
			min: "FrichUI_Dialog_Min"
		}
		
		this.icons = {
			info: "FrichUI_Dialog_Info",
			help: "FrichUI_Dialog_Help",
			warnning: "FrichUI_Dialog_Warning",
			success: "FrichUI_Dialog_Success",
			error: "FrichUI_Dialog_Error"
		}
		
		this.control = {
			yes: "FrichUI_Dialog_Yes",
			no: "FrichUI_Dialog_No",
			confirm: "FrichUI_Dialog_Confirm",
			cancle: "FrichUI_Dialog_Cancle"
		}
		
		this.defaul = $.extend(true, {}, this.defaul, {
			type: "info",
			enableCover: true,
			closeClick: function(){
				alert("点击了关闭");
			},
			yesClick: function(){
				alert("点击了是");
			},
			noClick: function(){
				alert("点击了否");
			},
			confirmClick: function(){
				alert("点击了确定");
			},
			cancleClick: function(){
				alert("点击了取消");
			}
		});
		
		this.infoDefaul = $.extend(true, {}, this.defaul, {
			title: "消息框",
			tools: ["close"],
			icon: "info",
			message: "这是一个消息框",
			control: ["confirm"]
		});

		this.helpDefaul = $.extend(true, {}, this.defaul, {
			title: "询问框",
			tools: ["close"],
			icon: "help",
			message: "这是一个询问框",
			control: ["yes", "no", "cancle"]
		});
		
		this.warnningDefaul = $.extend(true, {}, this.defaul, {
			title: "警告框",
			tools: ["close"],
			icon: "warnning",
			message: "这是一个警告框",
			control: ["confirm", "cancle"]
		});
		
		this.successDefaul = $.extend(true, {}, this.defaul, {
			title: "成功框",
			tools: ["close"],
			icon: "success",
			message: "这是一个成功框",
			control: ["confirm"]
		});
		
		this.errorDefaul = $.extend(true, {}, this.defaul, {
			title: "错误框",
			tools: ["close"],
			icon: "error",
			message: "这是一个错误框",
			control: ["confirm"]
		});
		
		this.createTitle = function(options){
			var title = this.createDiv("FrichUI_Dialog_Title");
			
			var h5 = this.createH(5, "FrichUI_Dialog_Name", options.title);
			
			title.append(h5);
			
			var def = {
				close: false,
				min: false,
				full: false
			}
			
			for(var i=0; i<options.tools.length; i++){
				switch(options.tools[i]){
					case "close":
						def.close = true;
						break;
					case "min":
						def.min = true;
						break;
					case "full":
						def.full = true;
						break;
					default: break;
				}
			}
			
			if(def.close){
				var tool = this.createI(this.tools.close);
				title.append(tool);
			}
			if(def.full){
				var tool = this.createI(this.tools.full);
				title.append(tool);
			}
			if(def.min){
				var tool = this.createI(this.tools.min);
				title.append(tool);
			}
			
			return title;
		}
		
		this.createContent = function(options){
			var content = this.createDiv("FrichUI_Dialog_Content");

			for(var i in this.icons){
				if(i == options.icon){
					var icon = this.createI(this.icons[i]);
					content.append(icon);
				}
			}

			var a = this.createA(undefined, options.message);
			
			content.append(a);
			return content;
		}

		this.createFoot = function(options){
			var foot = this.createDiv("FrichUI_Dialog_Foot");
			
			var def = {
				yes: false,
				no: false,
				confirm: false,
				cancle: false,
			}
			
			for(var i=0; i<options.control.length; i++){
				switch(options.control[i]){
					case "yes":
						def.yes = true;
						break;
					case "no":
						def.no = true;
						break;
					case "confirm":
						def.confirm = true;
						break;
					case "cancle":
						def.cancle = true;
						break;
					default: break;
				}
			}
			
			if(def.cancle){
				var control = this.createA(this.control.cancle, "取消");
				foot.append(control);
			}
			if(def.no){
				var control = this.createA(this.control.no, "否");
				foot.append(control);
			}
			if(def.yes){
				var control = this.createA(this.control.yes, "是");
				foot.append(control);
			}
			if(def.confirm){
				var control = this.createA(this.control.confirm, "确定");
				foot.append(control);
			}
			
			return foot;
		}
		
	}

	DialogFactory.prototype = new Factory();
	
	DialogFactory.prototype.make = function(dom, customer){
		var options = this.initCreate(dom, customer);
		
		switch(options.type){
			case "info":
				options = $.extend(true, {}, this.infoDefaul, options);
				break;
			case "help":
				options = $.extend(true, {}, this.helpDefaul, options);
				break;
			case "warnning":
				options = $.extend(true, {}, this.warnningDefaul, options);
				break;
			case "success":
				options = $.extend(true, {}, this.successDefaul, options);
				break;
			case "error":
				options = $.extend(true, {}, this.errorDefaul, options);
				break;
			default: break;
		}
		
		/* 添加遮罩层 */
		var cover;
		if(options.enableCover){
			cover = this.createFrame("FrichUI_Cover");
		}
		else {
			cover = null;
		}
		
		/* 创建基架 */
		var frame = this.createFrame("FrichUI_Dialog_Frame");
		
		frame.append(this.createTitle(options));

		frame.append(this.createContent(options));

		frame.append(this.createFoot(options));

		if(cover){
			frame.appendTo(cover);
			cover.appendTo($(document).find("body").eq(0));
		}
		
		/* 创建Dialog实体 */
		return 0;
	};

	FrichUI.prototype.Dialog = new DialogFactory();
	/*
	 * 3. 静态定义层
	 */
	
	/*
	 * 4. 开放接口
	 */
	window.F = window.frichUI = new FrichUI();
	
});