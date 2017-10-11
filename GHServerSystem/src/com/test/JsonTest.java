package com.test;

import java.util.List;
import java.util.Vector;

import net.sf.json.JSONObject;

public class JsonTest {
	
	
	public static void main(String[] args) {
		Student s1 = new Student(1, "Frich");
		Student s2 = new Student(2, "Kyrie");
		
		List<Student> l = new Vector<Student>();
		l.add(s1);
		l.add(s2);
		
		JSONObject j = JSONObject.fromObject(s1);
		System.out.println(j.toString());
		
	}
}
