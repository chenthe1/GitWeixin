package com.bmhz.platform.wmm.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 百米盒子微信公众号项目
 *
 * File: devModel.java
 * 
 * Copyright (C): 2016
 *
 * Description:  设备盒子Model
 *
 * @author 陈升平
 * Notes: devModel.java 2016-10-14 下午17:56:14 CHENSP
 */
public class DevModel implements Serializable {
	
	private int id; 
	private String name;
	private String mac;
	private int scope; 
	private Date createTime;
	private Date updateTime;
	private int status;
	private List<ShopDevModel> shopDevModel;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getScope() {
		return scope;
	}
	public void setScope(int scope) {
		this.scope = scope;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMac() {
		return mac;
	}
	public void setMac(String mac) {
		this.mac = mac;
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
	public List<ShopDevModel> getShopDevModel() {
		return shopDevModel;
	}
	public void setShopDevModel(List<ShopDevModel> shopDevModel) {
		this.shopDevModel = shopDevModel;
	}
}
