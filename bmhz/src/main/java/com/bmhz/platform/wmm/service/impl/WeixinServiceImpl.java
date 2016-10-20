package com.bmhz.platform.wmm.service.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.bmhz.platform.wmm.dao.WeixinDao;
import com.bmhz.platform.wmm.model.WeixinModel;
import com.bmhz.platform.wmm.service.WeixinService;

/**
 * 百米盒子微信公众号项目
 *
 * File: WeixinServiceImpl.java
 *
 * Description:  微信Service实现类
 *
 * @author 陈升平
 * Notes: WeixinServiceImpl.java 2016-10-14 下午14:56:14 CHENSP
 */
@Component
@Service("weixinService")
public class WeixinServiceImpl implements WeixinService{
	
	@Autowired
	private WeixinDao weixinDao;
	
	/**
	 * 根据微信OpenID获取微信数据
	 * @param weixinId OpenID
	 * @return  
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
	
	/**
	 * 添加微信号数据
	 * @param WeixinModel weixinModel
	 * @return  
	 */
	public boolean createWeixinInfo(WeixinModel weixinModel){
		return weixinDao.createWeixinInfo(weixinModel);
	}
	
	/**
	 * 取消微信号关注
	 * @param weixinId OpenID
	 * @return  
	 */
	public boolean deleteWeixinById(String weixinId){
		return weixinDao.deleteWeixinById(weixinId);
	}
	
	/**
	 * 判断微信号是否已存在
	 * @param weixinId OpenID
	 * @return  
	 */
	public boolean getWeixinIsExistById(String openId){
		return weixinDao.getWeixinIsExistById(openId);
	}

}
