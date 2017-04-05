<%@page import="java.io.PrintWriter"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	JSONArray array=getData();
	PrintWriter writer=response.getWriter();
	JSONObject o=getRand(array);
	writer.write(o.getString("prize")+","+o.getString("name"));
	writer.flush();
	writer.close();
%>
<%!
	public JSONObject getRand(JSONArray array){
		JSONObject o=null;
		//1.总中奖概率
		Integer gjSum=0;
		for(int i=0;i<array.size();i++){
			JSONObject ob=JSONObject.fromObject(array.get(i));
			gjSum+=ob.getInt("prob");
		}
		//2.计算概率
		for(int i=0;i<array.size();i++){
			JSONObject ob=JSONObject.fromObject(array.get(i));
			Integer num=(int) (Math.random()*gjSum+1);
			if(num<=ob.getInt("prob")){
				o=ob;
				break;
			}else{
				gjSum-=ob.getInt("prob");
			}
		}
		return o;
	}
	public JSONArray getData(){
		JSONArray array=new JSONArray();
		JSONObject object=new JSONObject();
		object.put("id", "1");
		object.put("prize","一等奖");
		object.put("name","Iphone 6S");
		object.put("num","1");
		object.put("prob","1");
		array.add(object);
		object=new JSONObject();
		object.put("id", "2");
		object.put("prize","二等奖");
		object.put("name","Ipad mini一台");
		object.put("num","2");
		object.put("prob","2");
		array.add(object);
		object=new JSONObject();
		object.put("id", "3");
		object.put("prize","三等奖");
		object.put("name","128G 金士顿U盘一个");
		object.put("num","8");
		object.put("prob","5");
		array.add(object);
		object=new JSONObject();
		object.put("id", "4");
		object.put("prize","四等奖");
		object.put("name","爱国者充电宝一个");
		object.put("num","10");
		object.put("prob","10");
		array.add(object);
		object=new JSONObject();
		object.put("id", "5");
		object.put("prize","五等奖");
		object.put("name","购物优惠券一张");
		object.put("num","500");
		object.put("prob","79");
		array.add(object);
		return array;
	}
%>
