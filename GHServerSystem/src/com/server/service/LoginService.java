package com.server.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.common.lib.Lib;
import com.server.app.LoginApp;
import com.server.model.UserModel;

public class LoginService implements IService{
	private LoginApp loginApp = new LoginApp();
	
	public UserModel dTO(String user, String pasd) {
		UserModel userModel = new UserModel();
		userModel.setO_USERNAME(user);
		userModel.setO_PASSWORD(pasd);
		return userModel;
	}

	public UserModel check(UserModel userModel) {
		userModel = loginApp.check(userModel);
		
		if(Lib.isEmpty(userModel.getO_USERID())){
			return null;
		}
		return userModel;
	}
	
	public boolean isValid(UserModel userModel){
		if(!Lib.isEmpty(userModel.getO_PERIODEND())){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				Date now = new Date();
				Date time = sdf.parse(userModel.getO_PERIODEND());
				if(time.getTime() < now.getTime()){
					return false;
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return true;
	}
}
