package com.bmhz.platform.wmm.model;

import java.io.Serializable;

/**
 * 百米盒子微信公众号项目
 *
 * File: ShopDevModel.java
 * 
 * Copyright (C): 2016
 *
 * Description:  商户门店与设备Model
 *
 * @author 陈升平
 * Notes: ShopDevModel.java 2016-10-14 下午18:26:14 CHENSP
 */
public class ShopDevModel implements Serializable {
	
	private int shopId;
	private int devId;
	public int getShopId() {
		return shopId;
	}
	public void setShopId(int shopId) {
		this.shopId = shopId;
	}
	public int getDevId() {
		return devId;
	}
	public void setDevId(int devId) {
		this.devId = devId;
	}
}
