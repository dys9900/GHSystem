package com.server.support;


import org.w3c.dom.NodeList;
import org.w3c.dom.Node;

import com.common.xml.XmlHelper;

public class Dao {
	public static final String ORACLE = "oracle";

	public static ConnPool[] connPools;
	public static boolean isInit = false;
	
	public static void init(String path){
		if(!Dao.isInit){
			XmlHelper.setPath(path);
			
			//读取xml文件、获取所有的connection节点
			NodeList nl = XmlHelper.read("connection");

			//判断是否获取成功
			if(nl!=null){
				//初始化线程池
				int l = nl.getLength();
				Dao.connPools = new ConnPool[l];
				
				for(int i=0; i<l; i++){
					NodeList childs = XmlHelper.childs(nl, i);
					Dao.connPools[i] = new ConnPool();
					
					for(int j=0; j<childs.getLength(); j++){
						Node n = childs.item(j);
						
						switch(n.getNodeName()){
							case "name":
								Dao.connPools[i].setName(XmlHelper.value(n));
								break;
							case "url":
								Dao.connPools[i].setUrl(XmlHelper.value(n));
								break;
							case "username":
								Dao.connPools[i].setAccount(XmlHelper.value(n));
								break;
							case "password":
								Dao.connPools[i].setPassword(XmlHelper.value(n));
								break;
						}
					}
					
					//启动线程池
					Dao.connPools[i].init();
					
					Dao.isInit = true;
				}
			}
			else{
				System.out.println("Dao：读取xml文件出错，可能是数据库连接配置有问题");
			}
		}
		
	}
	
	public static ConnBean getConn(String name){
		ConnPool connPool = Dao.getConnPool(name);
		if(connPool == null) {
			System.out.println("Dao: 数据库连接池建立失败，可能是数据库连接配置有问题");
			return null;
		}
		return connPool.getConnection();
	}
	
	public static boolean freeConn(String name, ConnBean conn){
		ConnPool connPool = Dao.getConnPool(name);
		return connPool.releaseConnection(conn);
	}
	
	public static ConnPool getConnPool(String name){
		ConnPool connPool = null;
		
		for(int i=0; i<Dao.connPools.length; i++){
			if(connPools[i].getName().equals(name)){
				connPool = connPools[i];
			}
		}
		return connPool;
	}
}
