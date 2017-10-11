package com.browser.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.server.support.Dao;

/**
 * Servlet implementation class InitServlet
 */

public class InitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InitServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    @Override
    public void init() throws ServletException{
    	String path = getServletContext().getRealPath("WEB-INF\\config.xml");
    	Dao.init(path);
    }
}
