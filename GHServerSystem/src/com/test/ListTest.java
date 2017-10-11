package com.test;

import java.util.Iterator;
import java.util.List;
import java.util.Vector;

public class ListTest {
	
	public static void main(String[] args){
		List<String> free = new Vector<String>();
		
		free.add("hello");
		free.add("world");
		
		Iterator<String> i = free.iterator();
		while(i.hasNext()){
			System.out.println(i.next());
		}
		
		free.remove("as");
		i = free.iterator();
		while(i.hasNext()){
			System.out.println(i.next());
		}
	}
}
