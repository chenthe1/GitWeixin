package com.bmhz.platform.wmm.service;

public interface WeixinService {
	
	/**
	 * 根据学生编号查询学生的老师留言信息记录（最近10次）
	 * @param studentid 学生编号
	 * @return 以字符串形式返回老师留言信息
	 */
	public abstract String getWeixinById(int weixinId);
	
}
