package com.bmhz.platform.wmm.dao;

import com.bmhz.platform.wmm.model.WeixinModel;

public class WeixinDao extends BaseDao{
	
	public WeixinModel findWeixinById(int id) {
		return this.readSqlSession.selectOne("com.bmhz.platform.wmm.dao.WeixinDao.findWeixinById",id);
	}

}
