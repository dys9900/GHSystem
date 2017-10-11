package com.browser.servlet;

import net.sf.json.JSONObject;

public interface IServlet {
	
	/*
	 * 基本状态\
	 * r: 标记最终的状态enum类型
	 * 
	 */
	
	default String success(String msg) {
		JSONObject js = new JSONObject();
		js.put("r", "1");
		js.put("m", msg);
		return js.toString();
	}

	default String error(int number, String msg) {
		JSONObject js = new JSONObject();
		if(number <= 1) {
			System.out.println("IServlet： 回传编号必须大于1");
		}
		js.put("r", number);
		js.put("m", msg);
		return js.toString();
	}

	default String unknow(String msg) {
		JSONObject js = new JSONObject();
		js.put("r", "0");
		js.put("m", msg);
		return js.toString();
	}
}
