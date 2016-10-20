package com.bmhz.platform.wmm.service;

import com.bmhz.platform.wmm.model.ShopModel;

/**
 * 百米盒子微信公众号项目
 *
 * File: ShopService.java
 *
 * Description:  商户Service接口
 *
 * @author 陈升平
 * Notes: ShopService.java 2016-10-18 下午14:56:14 CHENSP
 */
public interface ShopService {
	
	/**
	 * 根据商户ID获取数据
	 * @param id id
	 * @return  ShopModel
	 */
	public abstract ShopModel getShopById(int id);
	
	/**
	 * 添加商户数据
	 * @param ShopModel shopModel
	 * @return  
	 */
	public abstract boolean createShopInfo(ShopModel shopModel);
	
	/**
	 * 修改商户数据
	 * @param ShopModel shopModel
	 * @return  
	 */
	public abstract boolean updateShopInfo(ShopModel shopModel);
	
	/**
	 * 删除商户数据
	 * @param id id
	 * @return  
	 */
	public abstract boolean deleteShopById(String id);
	
	/**
	 * 判断商户是否已存在
	 * @param weixinId OpenID
	 * @return  
	 */
	public abstract boolean getShopIsExistById(String weixinId);
	
}
