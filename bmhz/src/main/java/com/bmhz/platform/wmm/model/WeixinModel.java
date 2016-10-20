package com.bmhz.platform.wmm.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 百米盒子微信公众号项目
 *
 * File: weixinModel.java
 * 
 * Copyright (C): 2016
 *
 * Description:  商户门店Model
 *
 * @author 陈升平
 * Notes: weixinModel.java 2016-10-14 下午11:46:11 CHENSP
 */
public class WeixinModel implements Serializable {
	
	/**
	 * 
	 */
	private int id; 
	// 微信标识 
	private String openId;
	private String unionId;
	private String name;
	private Date createTime;
	private Date updateTime;
	private int status;
	// 商户数据 
	private List<ShopModel> shopModel;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getUnionId() {
		return unionId;
	}
	public void setUnionId(String unionId) {
		this.unionId = unionId;
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
	public List<ShopModel> getShopModel() {
		return shopModel;
	}
	public void setShopModel(List<ShopModel> shopModel) {
		this.shopModel = shopModel;
	}
}
