package com.test;

import java.sql.*;

public class ConnectionTest {
    private static Connection con = null;// 创建一个数据库连接
    
    public static void main(String[] args){
        try
        {
            Class.forName("oracle.jdbc.driver.OracleDriver");// 加载Oracle驱动程序
            System.out.println("开始尝试连接数据库！");
            String url = "jdbc:oracle:thin:@122.232.28.54:1521:thinklan";// 127.0.0.1是本机地址，XE是精简版Oracle的默认数据库名
            String user = "tds";// 用户名,系统默认的账户名
            String password = "tds";// 你安装时选设置的密码
            con = DriverManager.getConnection(url, user, password);// 获取连接
            System.out.println("连接成功！");
            String sql = "select * from TBL_CORE_USERINFO";
            PreparedStatement pst = con.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();
            
            while (rs.next()) {
                System.out.println(rs.getString(2) + "\t" + rs.getString(4));
            }
            
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}
