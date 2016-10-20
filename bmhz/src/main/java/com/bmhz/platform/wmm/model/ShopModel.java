package com.bmhz.platform.wmm.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 百米盒子微信公众号项目
 *
 * File: ShopModel.java
 * 
 * Copyright (C): 2016
 *
 * Description:  商户门店Model
 *
 * @author 陈升平
 * Notes: ShopModel.java 2016-10-14 下午01:56:14 CHENSP
 */
public class ShopModel implements Serializable {
	
	private int id;
	private int weixinId;
	private String name;
	private Date createTime;
	private Date updateTime;
	private int status;
	// private List<ShopDevModel> shopDevModel;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getWeixinId() {
		return weixinId;
	}
	public void setWeixinId(int weixinId) {
		this.weixinId = weixinId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	/*public List<ShopDevModel> getShopDevModel() {
		return shopDevModel;
	}
	public void setShopDevModel(List<ShopDevModel> shopDevModel) {
		this.shopDevModel = shopDevModel;
	}*/
}
