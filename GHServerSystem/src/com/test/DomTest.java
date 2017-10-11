package com.test;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

public class DomTest {
	
	public static void main(String[] args){
		
		File f = new File("D:\\apache-tomcat-8.0.39\\wtpwebapps\\GHSystem\\WEB-INF\\config.xml");
		try {
			DocumentBuilderFactory df = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = df.newDocumentBuilder();
			Document doc = builder.parse(f);
			NodeList nl = doc.getElementsByTagName("connection");
			for (int i = 0; i < nl.getLength(); i++) {
				System.out.println("���ӳ�" + i + ": " + doc.getElementsByTagName("name").item(0).getFirstChild().getNodeValue());
				System.out.println("��ַ: " + doc.getElementsByTagName("url").item(0).getFirstChild().getNodeValue());
				System.out.println("�˻�: " + doc.getElementsByTagName("username").item(0).getFirstChild().getNodeValue());
				System.out.println("����: " + doc.getElementsByTagName("password").item(0).getFirstChild().getNodeValue());
		    }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}
