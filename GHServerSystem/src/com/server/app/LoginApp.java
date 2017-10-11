package com.server.app;

import com.server.dao.UserDao;
import com.server.iDao.IUserDao;
import com.server.model.UserModel;

public class LoginApp {
	
	private IUserDao userHandler = new UserDao();

	public UserModel check(UserModel userModel) {
		// TODO Auto-generated method stub
		userModel = userHandler.select(userModel);
		return userModel;
	}
	
	
}
