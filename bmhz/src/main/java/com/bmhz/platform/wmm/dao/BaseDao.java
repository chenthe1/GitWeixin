package com.bmhz.platform.wmm.dao;

import javax.annotation.Resource;
import org.mybatis.spring.SqlSessionTemplate;

/**
 * 百米盒子微信公众号项目
 *
 * File: BaseDao.java
 * 
 * Copyright (C): 2016
 *
 * Description:  读写分离公共类
 *
 * @author 陈升平
 * Notes: BaseDao.java 2016-10-14 下午18:36:14 CHENSP
 */
public class BaseDao {

	@Resource(name="readSqlSession")
	public SqlSessionTemplate readSqlSession;
	
	@Resource(name="writerSqlSession")
	public SqlSessionTemplate writerSqlSession;
	
}
