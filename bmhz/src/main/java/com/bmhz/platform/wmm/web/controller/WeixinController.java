package com.bmhz.platform.wmm.web.controller;

import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bmhz.platform.util.ValidationUtil;
import com.bmhz.platform.util.WeixinUtil;
import com.bmhz.platform.wmm.model.Message;
import com.bmhz.platform.wmm.model.Reply;
import com.bmhz.platform.wmm.model.WeixinModel;
import com.bmhz.platform.wmm.service.WeixinService;

/**
 * 百米盒子微信公众号项目
 *
 * File: WeixinController.java
 *
 * Description:  接收微信公众号接收数据
 *
 * @author 陈升平
 * Notes: WeixinController.java 2016-10-14 下午14:56:14 CHENSP
 */
@Controller
public class WeixinController {
	
	/**
	 *  LOG
	 */
	private Logger logger = Logger.getLogger(WeixinController.class);
	
	private static final String TOKEN = "chenspTest";
	
	public static int pagesize = 10;
	
	@Resource(name="weixinService")
	private WeixinService weixinService;
	
	// @RequestMapping(value="/bm/test",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	@RequestMapping(value="/test",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	@ResponseBody
	public String test(HttpServletRequest request){
		System.out.println("ddddddddddddddddddddd");
		return weixinService.getWeixinById(2)+"DFFFFFFFFFDD";
	}
	
	/**
	 * 接收微信公众号接收的消息，处理后再做相应的回复
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/weixin",method=RequestMethod.POST,produces="text/html;charset=UTF-8")
	@ResponseBody
	public String replyMessage(HttpServletRequest request){
		//仅处理微信服务端发的请求
		if (checkWeixinReques(request)) {
			Map<String, String> requestMap = WeixinUtil.parseXml(request);
			Message message = WeixinUtil.mapToMessage(requestMap);
			logger.error("--------------------------AAAAAAA------------------------------");
			// 保存和取消微信相关数据
			if(message.getEvent().equals("subscribe")){
				logger.error("------------------------AA--保存和------------------------------");
				this.createWeixinInfo(message);
				logger.error("------------------------BB--保存和------------------------------");
			}else if(message.getEvent().equals("unsubscribe")){
				logger.error("-----------------------AA---取消微信------------------------------");
				weixinService.deleteWeixinById(message.getFromUserName());
				logger.error("-----------------------BB---取消微信------------------------------");
			}
			logger.error("--------------------------BBBBBBBBBBB-----------------------------");
			
			// weixinService.addMessage(message); //保存接受消息到数据库
			String replyContent = Reply.WELCOME_CONTENT;
			String type = message.getMsgType();
			if (type.equals(Message.TEXT)) {//仅处理文本回复内容
				String content = message.getContent();//消息内容
				String [] cs = content.split("_");//消息内容都以下划线_分隔
				if(cs.length == 2){
					int studentid ;//学生编号
					String process = cs[1];//操作
					try {
						studentid = Integer.parseInt(cs[0]);
						/*if("考试".equals(process)){
							replyContent = weixinService.getSingleExamMarkStringByStudentId(studentid);
						}else if("考试历史".equals(process)){
							replyContent = weixinService.getExamMarkHistoryStringByStudentId(studentid);
						}else if("留言".equals(process)){
							replyContent = weixinService.getSingleStudentMessageByStudentId(studentid);
						}else if("留言历史".equals(process)){
							replyContent = weixinService.getStudentMessageHistoryByStudentId(studentid);
						}else if("动态".equals(process)){
							replyContent = weixinService.getSingleClassesNewsByStudentId(studentid);
						}else if("动态历史".equals(process)){
							replyContent = weixinService.getClassesNewsHistoryByStudentId(studentid);
						} */
					} catch (NumberFormatException e) {
						replyContent = Reply.ERROR_CONTENT;
					}
				}
			}
			//拼装回复消息
			Reply reply = new Reply();
			reply.setToUserName(message.getFromUserName());
			reply.setFromUserName(message.getToUserName());
			reply.setCreateTime(new Date());
			reply.setMsgType(Reply.TEXT);
			reply.setContent(replyContent);
			// weixinService.addReply(reply); //保存回复消息到数据库
			//将回复消息序列化为xml形式
			String back = WeixinUtil.replyToXml(reply);
			System.out.println(back);
			return back;
		}else{ 
			return "error";
		}
	}
	
	/**
	 * 创建绑定微信用户数据 
	 * @return
	 */
	private boolean createWeixinInfo(Message message) {
		logger.error("--------------------------AA------------------------------");
		if(!ValidationUtil.isEmpty(message.getFromUserName())){
			logger.error("--------------------------BB------------------------------"+message.getFromUserName()+"****");
			if(!weixinService.getWeixinIsExistById(message.getFromUserName())){
				logger.error("--------------------------CC------------------------------");
				WeixinModel weixinModel = new WeixinModel();
				weixinModel.setOpenId(message.getFromUserName());
				weixinModel.setName(message.getFromUserName());
				weixinModel.setCreateTime(message.getCreateTime());
				// weixinModel.setUnionId(unionId);
				weixinService.createWeixinInfo(weixinModel);
				logger.error("--------------------------DD------------------------------");
				return true;
			}
			logger.error("--------------------------E------------------------------");
		}
		return false;
	}
	
	/**
	 * 微信公众平台验证URL是否有效使用的接口
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/weixin",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	@ResponseBody
	public String initWeixinURL(HttpServletRequest request){
		String echostr = request.getParameter("echostr");
		if (checkWeixinReques(request) && echostr != null) {
			return echostr;
		}else{
			return "error";
		}
	}
	
	/**
	 * 根据token计算signature验证是否为微信服务端发送的消息
	 * @param request
	 * @return
	 */
	private static boolean checkWeixinReques(HttpServletRequest request){
		String signature = request.getParameter("signature");
		String timestamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		if (signature != null && timestamp != null && nonce != null ) {
			String[] strSet = new String[] { TOKEN, timestamp, nonce };
			java.util.Arrays.sort(strSet);
			String key = "";
			for (String string : strSet) {
				key = key + string;
			}
			String pwd = WeixinUtil.sha1(key);
			return pwd.equals(signature);
		}else {
			return false;
		}
	}
	
	/**
	 * 收到消息列表页面
	 */
	@RequestMapping(value="/manager/messages",method=RequestMethod.GET)
	public ModelAndView listMessage(String pagenum){
		ModelAndView mv=new ModelAndView();
		mv.addObject("sidebar","messages");
		mv.setViewName("messages");
		int num = 1;
		if(null!=pagenum){
			num = Integer.parseInt(pagenum);
		}
		/*List<Message> list = weixinService.listMessage((num-1)*pagesize, pagesize);
		mv.addObject("messageList", list);
		mv.addObject("pagenum", num);
		mv.addObject("length", list.size());*/
		return mv;
	}
	
	
	/**
	 * 回复消息列表页面
	 */
	@RequestMapping(value="/manager/replys",method=RequestMethod.GET)
	public ModelAndView listReply(String pagenum){
		ModelAndView mv=new ModelAndView();
		mv.addObject("sidebar","replys");
		mv.setViewName("replys");
		int num = 1;
		if(null!=pagenum){
			num = Integer.parseInt(pagenum);
		}
		/*List<Reply> list = weixinService.listReply((num-1)*pagesize, pagesize);
		mv.addObject("replyList", list);
		mv.addObject("pagenum", num);
		mv.addObject("length", list.size());*/
		return mv;
	}
	
}
