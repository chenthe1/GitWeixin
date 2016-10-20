package com.bmhz.platform.wmm.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamOmitField;

/**
 * 百米盒子微信公众号项目
 *
 * File: Reply.java
 * 
 * Copyright (C): 2016
 *
 * Description:  自动回复信息类
 *
 * @author 陈升平
 * Notes: Reply.java 2016-10-19 下午18:56:14 CHENSP
 */
public class Reply implements Serializable {

	public static final String TEXT = "text";
	public static final String MUSIC = "music";
	public static final String NEWS = "news";
	
	public static final String ERROR_CONTENT = "查询失败，请检查你的回复是否正确。\n查询百米盒子正在开发中\n";
	public static final String WELCOME_CONTENT = "欢迎订阅百米盒子公众号!\n 小伙伴们正在开发中!\n";
	
	@XStreamOmitField
	private int id;//数据库存储id
	
	// 开发者微信号  
	@XStreamAlias("ToUserName")
    private String toUserName;  
    // 发送方帐号（一个OpenID）  
	@XStreamAlias("FromUserName")
    private String fromUserName;  
    // 消息创建时间 
	@XStreamAlias("CreateTime")
    private Date createTime;  
    // 消息类型（text/music/news）
	@XStreamAlias("MsgType")
    private String msgType;  
    
    //回复的消息内容,长度不超过2048字节 (文本消息专有)
	@XStreamAlias("Content")
    private String content;
    
    //音乐链接 (音乐消息专有)
	@XStreamAlias("MusicUrl")
    private String musicUrl;
    //高质量音乐链接，WIFI环境优先使用该链接播放音乐 (音乐消息专有)
	@XStreamAlias("HQMusicUrl")
    private String hQMusicUrl;
    
    //图文消息个数，限制为10条以内  (图文消息专有) 
	@XStreamAlias("ArticleCount")
    private int articleCount; 
    
    //多条图文消息信息，默认第一个item为大图
	@XStreamAlias("Articles")
    private List<Article> articles;

	public static void main(String[] args) {
		System.out.println("测试通过".length());
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getToUserName() {
		return toUserName;
	}

	public void setToUserName(String toUserName) {
		this.toUserName = toUserName;
	}

	public String getFromUserName() {
		return fromUserName;
	}

	public void setFromUserName(String fromUserName) {
		this.fromUserName = fromUserName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getMsgType() {
		return msgType;
	}

	public void setMsgType(String msgType) {
		this.msgType = msgType;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getMusicUrl() {
		return musicUrl;
	}

	public void setMusicUrl(String musicUrl) {
		this.musicUrl = musicUrl;
	}

	public String gethQMusicUrl() {
		return hQMusicUrl;
	}

	public void sethQMusicUrl(String hQMusicUrl) {
		this.hQMusicUrl = hQMusicUrl;
	}

	public int getArticleCount() {
		return articleCount;
	}

	public void setArticleCount(int articleCount) {
		this.articleCount = articleCount;
	}

	public List<Article> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}
}
