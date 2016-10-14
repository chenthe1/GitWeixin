-- ------------------------------------------------------------------------------------------------------------------
-- BEGIN--------------------------------百米盒子微信项目-------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------
-- 
-- 
-- BEGIN------------------------------创建 db_bmhz 库----------------------------------------------
CREATE DATABASE
IF NOT EXISTS `db_bmhz` DEFAULT CHARSET=utf8;
USE `db_bmhz`;
-- END------------------------------创建 db_bmhz 库------------------------------------------------
-- ----  
-- 
-- BEGIN --- 基础数据相关表 ----------------------------------------------------------------------------------------------------
-- BEGIN--------------------------------t_weixin_list ---20161014---------------------------
-- 微信表：关注公众号的微信用户   
CREATE TABLE
IF NOT EXISTS `db_bmhz`.`t_weixin_list`(
	`id` INT unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
	`openId` VARCHAR(32)NOT NULL COMMENT '微信OpenID', 
	`name` VARCHAR(32) NULL COMMENT '用户备注名称等', 
	`createTime` timestamp NULL COMMENT '关注时间',
	`updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`status` TINYINT(1) DEFAULT 1 COMMENT '状态:0删除，1正常',
	PRIMARY KEY(`id`)
)ENGINE = INNODB DEFAULT CHARSET=utf8;
-- END---------------------------------t_weixin_list ------20161014-------------------------
--  
--  
-- BEGIN--------------------------------t_shop_list ---20161014---------------------------
-- 店铺商户表：通过公众号分类的商户    
CREATE TABLE
IF NOT EXISTS `db_bmhz`.`t_shop_list`(
	`id` INT unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
	`weixinId` INT unsigned NOT NULL COMMENT '商户ID',
	`name` VARCHAR(32) NULL COMMENT '商户备注名称等', 
	`createTime` timestamp NULL COMMENT '创建时间',
	`updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`status` TINYINT(1) DEFAULT 1 COMMENT '状态:0删除，1正常',
	PRIMARY KEY(`id`),
	INDEX `weixinId`(`weixinId`) 
)ENGINE = INNODB DEFAULT CHARSET=utf8;
-- END---------------------------------t_shop_list ------20161014-------------------------
-- 
-- 
-- BEGIN--------------------------------t_dev_list ---20161014---------------------------
-- 设备表：商户表    
CREATE TABLE 
IF NOT EXISTS `db_bmhz`.`t_dev_list`(
	`id` INT unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
	`name` VARCHAR(32) NULL COMMENT '设备备注名称等', 
	`mac` VARCHAR(32) NOT NULL COMMENT '设备Mac', 
	`scope` INT(4) NULL DEFAULT 100 COMMENT '探测范围',
	`createTime` timestamp NULL COMMENT '创建时间',
	`updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`status` TINYINT(1) DEFAULT 1 COMMENT '状态:0删除，1正常',
	PRIMARY KEY(`id`) 
)ENGINE = INNODB DEFAULT CHARSET=utf8;
-- END---------------------------------t_dev_list ------20161014-------------------------
--
-- BEGIN--------------------------------t_shop_dev_list ---20161014---------------------------
-- 店铺商户表：通过公众号分类的商户    
CREATE TABLE 
IF NOT EXISTS `db_bmhz`.`t_shop_dev_list` (
  `shopId` INT unsigned NOT NULL COMMENT '商户ID',
  `devId` INT unsigned NOT NULL COMMENT '设备ID', 
  PRIMARY KEY (`shopId`, `devId`)
) ENGINE = INNODB DEFAULT CHARSET=utf8;
-- END---------------------------------t_shop_dev_list ------20161014-------------------------
-- 
-- BEGIN --- 基础数据相关表 ------------------------------------------------------------------------------------------------------
--  

