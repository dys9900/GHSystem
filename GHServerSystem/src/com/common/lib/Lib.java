package com.common.lib;

public class Lib {
	
	public static boolean isEmpty(String s){
		if("".equals(s) || null == s || s.length() == 0){
			return true;
		}
		return false;
	}
}
