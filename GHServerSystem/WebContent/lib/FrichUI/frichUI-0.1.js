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
			$("head").append(link);
		},
		change: function(root){
			var th = this;
			$(th.link).remove();
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
			
			this.theme = theme || this.FRICHUI_THEME_ORANGE;
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
	        var frame = $("<div class='" + frClass + "'></div>");

	        return frame;
	    },
	    createOl: function (frClass) {
	        var ol = $("<ol class='" + frClass + "'></ol>");

	        return ol;
	    },
	    createUl: function (frClass) {
	        var ul = $("<ul class='" + frClass + "'></ul>");

	        return ul;
	    },
	    createLi: function (frClass) {
	        var li = $("<li class='" + frClass + "'></li>");

	        return li;
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
	 * 3. 静态定义层
	 */
	
	/*
	 * 4. 开放接口
	 */
	window.F = window.frichUI = new FrichUI();
	
});