package com.bmhz.platform.wmm.dao;

import org.springframework.stereotype.Component;

import com.bmhz.platform.util.ValidationUtil;
import com.bmhz.platform.wmm.model.WeixinModel;

/**
 * 百米盒子微信公众号项目
 *
 * File: WeixinDao.java
 *
 * Description:  微信DAO类
 *
 * @author 陈升平
 * Notes: WeixinDao.java 2016-10-14 下午14:56:14 CHENSP
 */
@Component("weixinDao")
public class WeixinDao extends BaseDao{
	
	/**
	 * 根据微信OpenID获取微信数据
	 * @param weixinId OpenID
	 * @return  
	 */
	public WeixinModel findWeixinById(int id) {
		return this.readSqlSession.selectOne("com.bmhz.platform.wmm.dao.WeixinDao.findWeixinById",id);
	}
	
	/**
	 * 添加微信号数据
	 * @param WeixinModel weixinModel
	 * @return  
	 */
	public boolean createWeixinInfo(WeixinModel weixinModel){
		Integer i = this.writerSqlSession.insert("com.bmhz.platform.wmm.dao.WeixinDao.createWeixinInfo",weixinModel);
		if(i==1){
			return true;
		}
		return false;
	}
	
	/**
	 * 取消微信号关注
	 * @param weixinId OpenID
	 * @return  
	 */
	public boolean deleteWeixinById(String weixinId){
		Integer i = this.writerSqlSession.update("com.bmhz.platform.wmm.dao.WeixinDao.deleteWeixinById",weixinId);
		if(i==1){
			return true;
		}
		return false;
	}
	
	/**
	 * 判断微信号是否已存在
	 * @param weixinId OpenID
	 * @return  
	 */
	public boolean getWeixinIsExistById(String openId){
		WeixinModel weixin = this.readSqlSession.selectOne("com.bmhz.platform.wmm.dao.WeixinDao.getWeixinIsExistById",openId);
		if(!ValidationUtil.isEmpty(weixin.getOpenId())){
			return true;
		}
		return false; 
	}

}
