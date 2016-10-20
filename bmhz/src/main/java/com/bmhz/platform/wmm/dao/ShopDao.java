package com.bmhz.platform.wmm.dao;

import org.springframework.stereotype.Component;

import com.bmhz.platform.util.ValidationUtil;
import com.bmhz.platform.wmm.model.ShopModel;

/**
 * 百米盒子微信公众号项目
 *
 * File: ShopDao.java
 *
 * Description:  商户DAO类
 *
 * @author 陈升平
 * Notes: ShopDao.java 2016-10-18 下午16:56:14 CHENSP
 */
@Component("shopDao")
public class ShopDao extends BaseDao{
	
	/**
	 * 根据商户ID获取商户数据
	 * @param ShopId OpenID
	 * @return  
	 */
	public ShopModel getShopById(int id) {
		return this.readSqlSession.selectOne("com.bmhz.platform.wmm.dao.ShopDao.getShopById",id);
	}
	
	/**
	 * 添加商户数据
	 * @param ShopModel ShopModel
	 * @return  
	 */
	public boolean createShopInfo(ShopModel ShopModel){
		Integer i = this.writerSqlSession.insert("com.bmhz.platform.wmm.dao.ShopDao.createShopInfo",ShopModel);
		if(i==1){
			return true;
		}
		return false;
	}
	
	/**
	 * 修改商户数据
	 * @param ShopModel shopModel
	 * @return  
	 */
	public boolean updateShopInfo(ShopModel ShopModel){
		Integer i = this.writerSqlSession.update("com.bmhz.platform.wmm.dao.ShopDao.updateShopInfo",ShopModel);
		if(i==0){
			return true;
		}
		return false;
	}
	
	/**
	 * 商户数据
	 * @param ShopId OpenID
	 * @return  
	 */
	public boolean deleteShopById(String ShopId){
		Integer i = this.writerSqlSession.delete("com.bmhz.platform.wmm.dao.ShopDao.deleteShopById",ShopId);
		if(i==1){
			return true;
		}
		return false;
	}
	
	/**
	 * 判断商户是否已存在
	 * @param ShopId OpenID
	 * @return  
	 */
	public boolean getShopIsExistById(String ShopId){
		ShopModel shop = this.readSqlSession.selectOne("com.bmhz.platform.wmm.dao.ShopDao.getShopIsExistById",ShopId);
		if(!ValidationUtil.isEmpty(shop.getId())){
			return true;
		}
		return false;
	}

}
