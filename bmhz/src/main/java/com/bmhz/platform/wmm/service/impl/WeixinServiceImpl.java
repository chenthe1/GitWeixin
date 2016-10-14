package com.bmhz.platform.wmm.service.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import com.bmhz.platform.wmm.dao.WeixinDao;
import com.bmhz.platform.wmm.model.WeixinModel;
import com.bmhz.platform.wmm.service.WeixinService;

public class WeixinServiceImpl implements WeixinService{
	
	@Resource(name="weixinDao")
	private WeixinDao weixinDao;
	
	/**
	 * 根据学生编号查询学生的老师留言信息记录（最近10次）
	 * @param studentid 学生编号
	 * @return 以字符串形式返回老师留言信息
	 */
	public String getWeixinById(int weixinId){
		StringBuilder sb = new StringBuilder();
		WeixinModel weixinModel = weixinDao.findWeixinById(weixinId);
		if(weixinModel == null){
			sb.append("您好，未找到编号为").append(weixinId).append("的学生！");
		}else{
			sb.append("您好，编号为").append(weixinId).append("的学生(").append(weixinModel.getName());
			/*List<StudentMessage> list = studentMessageDao.findStudentMessageByStudentId(weixinId, 10);
			if(list == null || list.size()<1 ){
				sb.append(")无老师留言！");
			}else{
				sb.append(")最近(10次)老师留言如下:");
				DateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
				for(StudentMessage sm : list){
					sb.append("\n留言时间：").append(sf.format(sm.getInserttime()))
					  .append("\n留言内容：").append(sm.getContent())
					  .append("\n------分割线-------");
				}
			}*/	
		}
		return sb.toString();
	}

}
