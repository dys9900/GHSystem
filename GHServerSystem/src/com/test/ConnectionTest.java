package com.test;

import java.sql.*;

public class ConnectionTest {
    private static Connection con = null;// ����һ�����ݿ�����
    
    public static void main(String[] args){
        try
        {
            Class.forName("oracle.jdbc.driver.OracleDriver");// ����Oracle��������
            System.out.println("��ʼ�����������ݿ⣡");
            String url = "jdbc:oracle:thin:@122.232.28.54:1521:thinklan";// 127.0.0.1�Ǳ�����ַ��XE�Ǿ����Oracle��Ĭ�����ݿ���
            String user = "tds";// �û���,ϵͳĬ�ϵ��˻���
            String password = "tds";// �㰲װʱѡ���õ�����
            con = DriverManager.getConnection(url, user, password);// ��ȡ����
            System.out.println("���ӳɹ���");
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
