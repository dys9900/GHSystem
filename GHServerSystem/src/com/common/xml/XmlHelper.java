package com.common.xml;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class XmlHelper {

	//private static String path = "D:\\workCenter\\GHSystem\\WebContent\\WEB-INF\\config.xml";
	
	private static String path;
	
	public static String getPath() {
		return path;
	}
	public static void setPath(String path) {
		XmlHelper.path = path;
	}
	
	
	public static NodeList read(String name){
		File f = new File(path);
		try {
			DocumentBuilderFactory df = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = df.newDocumentBuilder();
			Document doc = builder.parse(f);
			NodeList connections = doc.getElementsByTagName(name);
			return connections;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public static NodeList childs(NodeList nl, int i) {
		return XmlHelper.childs(nl.item(i));
	}
	
	public static NodeList childs(Node n) {
		return n.getChildNodes();
	}
	
	public static String value(Node n) {
		return n.getFirstChild().getNodeValue();
	}
}
