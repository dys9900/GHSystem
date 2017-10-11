package com.server.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.server.iDao.IUserDao;
import com.server.map.Map;
import com.server.model.UserModel;
import com.server.support.ConnBean;
import com.server.support.Dao;

public class UserDao extends Dao implements IUserDao{

	public ResultSet selectAll(){
		//ArrayList<UserModel> users = new ArrayList<UserModel>();
		
		
		
		return null;
	}

	public UserModel select(UserModel userModel) {
		// TODO Auto-generated method stub
		ConnBean cb = Dao.getConn(Dao.ORACLE);
		if(cb != null){
			Connection cn = cb.getConn();
			try {
				//DTO操作
				PreparedStatement pst = cn.prepareStatement("select O_USERID, O_USERDISPLAYNAME, O_PERIODEND, "
						+ "O_USERROLEID, O_USERROLENAME,  O_USERDEPARTID, O_USERDEPARTNAME, O_USERNO "
						+ "from " + Map.USERMODEL 
						+ " where O_USERNAME = ? and O_PASSWORD = ?");
				pst.setString(1, userModel.O_USERNAME);
				pst.setString(2, userModel.O_PASSWORD);
				ResultSet rs = pst.executeQuery();
				if(rs.next())
				{
					userModel.setO_USERID(rs.getString(1));
					userModel.setO_USERDISPLAYNAME(rs.getString(2));
					userModel.setO_PERIODEND(rs.getString(3));
					userModel.setO_USERROLEID(rs.getString(4));
					userModel.setO_USERROLENAME(rs.getString(5));
					userModel.setO_USERDEPARTID(rs.getString(6));
					userModel.setO_USERDEPARTNAME(rs.getString(7));
					userModel.setO_USERNO(rs.getInt(8));
				}
				while(rs.next()){
					System.out.println("UserDao：发现重名重密码的用户");
				}
				rs.close();
				pst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Dao.freeConn(Dao.ORACLE, cb);
		}
		return userModel;
	}	
	
}
