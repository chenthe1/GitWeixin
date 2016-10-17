package com.bmhz.platform.wmm.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * 百米盒子微信公众号项目
 *
 * File: ManagerInterceptor.java
 *
 * Description:  用于过滤未登陆用户访问管理内容的拦截器
 *
 * @author 陈升平
 * Notes: ManagerInterceptor.java 2016-10-14 下午01:56:14 CHENSP
 */
public class ManagerInterceptor implements HandlerInterceptor{

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object obj, Exception e)
			throws Exception {
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object obj, ModelAndView mav) throws Exception {
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object obj) throws Exception {
		request.setCharacterEncoding("UTF-8");
		if(request.getSession().getAttribute("user")!=null){
			return true;
		}else{
			response.sendRedirect(request.getContextPath()+"/");
			//System.out.println("request.getSession().getAttribute(\"user\")"+request.getSession().getAttribute("user"));
			return false;
		}
	}
}
