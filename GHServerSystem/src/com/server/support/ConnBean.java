package com.server.support;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnBean {

	private int id;
	private Connection conn;
	
	private boolean isActive;
	
	public ConnBean(int id){
		this.setId(id);
	}
	
	public boolean open(String driver, String url, String account, String password){
		this.conn = null;
		try
		{
			Class.forName(driver);
			this.conn = DriverManager.getConnection(url, account, password);			
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean close(){
		try
		{
			this.conn.close();
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public Connection getConn() {
		return conn;
	}
	public void setConn(Connection conn) {
		this.conn = conn;
	}
	
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public boolean isValid() {
		// TODO Auto-generated method stub
		boolean result = false;
		try {
			if(this.conn.isClosed() || this.conn == null){
				result = true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
}
