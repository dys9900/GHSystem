package com.browser.servlet;

import net.sf.json.JSONObject;

public interface IServlet {
	
	/*
	 * ����״̬\
	 * r: ������յ�״̬enum����
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
			System.out.println("IServlet�� �ش���ű������1");
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
