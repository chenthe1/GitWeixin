package com.bmhz.platform.wmm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.bmhz.platform.wmm.dao.ShopDao;
import com.bmhz.platform.wmm.model.ShopModel;
import com.bmhz.platform.wmm.service.ShopService;

/**
 * 百米盒子微信公众号项目
 *
 * File: ShopServiceImpl.java
 *
 * Description:  商户Service实现类
 *
 * @author 陈升平
 * Notes: ShopServiceImpl.java 2016-10-14 下午14:56:14 CHENSP
 */
@Component
@Service("shopService")
public class ShopServiceImpl implements ShopService{
	
	@Autowired
	private ShopDao shopDao;
	
	/**
	 * 根据商户ID获取商户数据
	 * @param ShopId OpenID
	 * @return  
	 */
	public ShopModel getShopById(int id){
		return shopDao.getShopById(id);
	}
	
	/**
	 * 添加商户数据
	 * @param ShopModel ShopModel
	 * @return  
	 */
	public boolean createShopInfo(ShopModel shopModel){
		return shopDao.createShopInfo(shopModel);
	}
	
	/**
	 * 修改商户数据
	 * @param ShopModel shopModel
	 * @return  
	 */
	public boolean updateShopInfo(ShopModel shopModel){
		return shopDao.updateShopInfo(shopModel);
	}
	
	/**
	 * 删除商户数据
	 * @param ShopId OpenID
	 * @return  
	 */
	public boolean deleteShopById(String shopId){
		return shopDao.deleteShopById(shopId);
	}
	
	/**
	 * 判断商户是否已存在
	 * @param ShopId OpenID
	 * @return  
	 */
	public boolean getShopIsExistById(String shopId){
		return shopDao.getShopIsExistById(shopId);
	}

}
