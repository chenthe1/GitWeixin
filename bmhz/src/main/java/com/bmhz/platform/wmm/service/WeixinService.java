package com.bmhz.platform.wmm.service;

import com.bmhz.platform.wmm.model.WeixinModel;

/**
 * 百米盒子微信公众号项目
 *
 * File: WeixinService.java
 *
 * Description:  微信Service接口
 *
 * @author 陈升平
 * Notes: WeixinService.java 2016-10-17 下午14:56:14 CHENSP
 */
public interface WeixinService {
	
	/**
	 * 根据微信OpenID获取微信数据
	 * @param weixinId OpenID
	 * @return  
	 */
	public abstract String getWeixinById(int weixinId);
	
	/**
	 * 添加微信号数据
	 * @param WeixinModel weixinModel
	 * @return  
	 */
	public abstract boolean createWeixinInfo(WeixinModel weixinModel);
	
	/**
	 * 取消微信号关注
	 * @param weixinId OpenID
	 * @return  
	 */
	public abstract boolean deleteWeixinById(String weixinId);
	
	/**
	 * 判断微信号是否已存在
	 * @param weixinId OpenID
	 * @return  
	 */
	public abstract boolean getWeixinById(String weixinId);
	
}
