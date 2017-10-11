package com.server.support;

import java.util.List;
import java.util.Vector;

import com.common.enums.Driver;

public class ConnPool {
	public static final int MAX_CONNECTION = 20;
	public static final int TIMEOUT_CONNECTION = 1000 * 10;
	
	private String driver;
	private String url;
	private String account;
	private String password;
	
	private int length;
	private boolean isActive;
	private String name;
	
	private List<ConnBean> activeConnection;
	private List<ConnBean> freeConnection;

	public ConnPool(){
		
	}
	public ConnPool(String driver, String url, String username, String password){
		this.setUrl(url);
		this.setAccount(username);
		this.setPassword(password);
	}
	
	public boolean init(){
		this.setActive(true);
		this.length = 0;
		this.activeConnection = new Vector<ConnBean>();
		this.freeConnection = new Vector<ConnBean>();
		return true;
	}
	
	public synchronized ConnBean newConnection(){
		ConnBean cb = new ConnBean(this.getLength());
		boolean result = cb.open(Driver.oracle, this.getUrl(), 
				this.getAccount(), this.getPassword());
		if(result){
			this.addLength();
			return cb;
		}
		else {
			System.out.println("创建数据库连接失败，请检查连接配置");
		}
		return null;
	}

	public synchronized boolean releaseConnection(ConnBean connBean){
		try {
			if(connBean.isValid()){
				this.activeConnection.remove(connBean);
				this.subLength();
			}
			else {
				this.activeConnection.remove(connBean);
				this.freeConnection.add(connBean);
			}
			notify();
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	public synchronized ConnBean getConnection(){
		
		return this.getConnection(0);
	}
	public synchronized ConnBean getConnection(int i){
		ConnBean cb = null;
		if(!this.freeConnection.isEmpty()){
			cb = this.freeConnection.get(0);
			this.freeConnection.remove(0);
			this.activeConnection.add(cb);
		}
		else if(this.getLength() < ConnPool.MAX_CONNECTION){
			cb = this.newConnection();
			if(cb != null){
				this.activeConnection.add(cb);
			}
		}
		//第三次就不要再等了，就以null返回
		else if(i < 2){
			try {
				wait(ConnPool.TIMEOUT_CONNECTION);
				cb = getConnection(i+1);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				System.out.println("线程获取链接时，意外被结束");
				e.printStackTrace();
			}
		}
		return cb;
	}
	
	public String getDriver() {
		return driver;
	}
	public void setDriver(String driver) {
		this.driver = driver;
	}
	
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	

	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}


	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}


	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	
	public int getLength() {
		return length;
	}
	public synchronized void addLength() {
		this.length++;
	}
	public synchronized void subLength() {
		this.length--;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
