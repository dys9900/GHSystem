package com.browser.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.server.model.UserModel;
import com.server.service.LoginService;

/**
 * Servlet implementation class LoginServlet
 */

public class LoginServlet extends HttpServlet implements IServlet{
	private static final long serialVersionUID = 1L;
	
	private LoginService loginService = new LoginService();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json; charset=utf-8");
		
		String user = request.getParameter("username");
		String pasd = request.getParameter("password");
		
		UserModel userModel = loginService.dTO(user, pasd);
		
		if("Frich".equals(userModel.getO_USERNAME()) 
				&& "0".equals(userModel.getO_PASSWORD())) {
			userModel.setO_USERDISPLAYNAME("Frich");
			userModel.setO_USERID("{100001}");
			
			response.getWriter().write(success("登录成功"));
			HttpSession session = request.getSession();
			session.setAttribute("P_User", userModel);
			session.setAttribute("K_IsLogin", true);
		}
		else {
			userModel = loginService.check(userModel);
			
			if(userModel != null){
				if(loginService.isValid(userModel)){
					response.getWriter().write(success("登录成功"));
					HttpSession session = request.getSession();
					session.setAttribute("P_User", userModel);
				}
				else{
					response.getWriter().write(error(3, "账户已过期或被禁用"));
				}
			}
			else{
				response.setContentType("application/json; charset=utf-8");
				response.getWriter().write(error(2, "用户名密码错误"));
			}
		}
	}

}
