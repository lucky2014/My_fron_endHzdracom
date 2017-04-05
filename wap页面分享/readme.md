# wap页面调用分享插件

分享到微信目前只支持QQ浏览器和UC浏览器，调用nativeShare插件实现。百度：html5如何调用浏览器分享到微信功能。

nativeShare是一个可以通过javascript直接调用原生分享的工具. 该工具具有以下特点:
支持原生微博、微信好友、微信朋友圈、QQ好友、QQ空间分享。

### 分享代码

注意QQ空间和QQ的分享，有summary字段。分享的图标HTML代码自己码，出来微信，其他3个要自己写哦！调用share函数的时候，只需要传递节点和分享的字段即可！

<pre>
//分享
share: function(dom, shareParams){
	var me = this;
	/*var shareParams = { //具体参考音频播放器 qryResourceInfo接口
		url: window.location.href,
		desc: obj.shortIntro,
		title: obj.name,
		img: coverUrl ? coverUrl : me.getDefaultCoverUrl(),
		resType: me.resType,
		resId: me.resourceId
	}
	*/
	var imgUrlPath = "http://122.224.218.58:8088/01/images/" || me.mainSiteUrl + "01/images/";
	shareParams.from = "推广工程移动阅读平台";
	if(shareParams.img.length<23){
		shareParams.img = imgUrlPath + shareParams.img.split("images")[1];
	}
	$(dom).delegate(".shareSina","click",function(){
		var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?appkey=1114248626&title='+shareParams.title+'&url='+encodeURIComponent(shareParams.url)+'&pic='+encodeURIComponent(shareParams.img);
		window.open(sharesinastring);
		shareBack(5);
	});
	$(dom).delegate(".shareQzone","click",function(){
		var sharesinastring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?appkey=H3PCYIjTmvQ7uyfe&title='+shareParams.title+'&url='+encodeURIComponent(shareParams.url)+'&desc='+shareParams.desc+'&pics='+encodeURIComponent(shareParams.img)+'&summary='+shareParams.desc;
		window.open(sharesinastring);
		shareBack(4);
	});
	$(dom).delegate(".shareQQ","click",function(){
		var sharesinastring = 'http://connect.qq.com/widget/shareqq/index.html?appkey=H3PCYIjTmvQ7uyfe&title='+shareParams.title+'&url='+encodeURIComponent(shareParams.url)+'&summary='+shareParams.desc+'&pics='+encodeURIComponent(shareParams.img);
		window.open(sharesinastring);
		shareBack(3);
	});
	$(dom).delegate(".shareWinxin","click",function(){
		shareBack(1);
	});
	$(dom).delegate(".shareFriends","click",function(){
		shareBack(2);
	});
	var share_obj = new nativeShare('shareMain',shareParams);

	function shareBack(plat){
		var data={
			resType: shareParams.resType,
			resId: shareParams.resId,
			shareChannel: plat,
			title: shareParams.title,
			linkUrl: shareParams.url,
			picUrl: shareParams.img,
			cus_txt: ""
		}
		var params = app.getParams(data);
		$.ajax({
			type: 'post',
			url: app.url,
			data: {cmd:"addShare",value:JSON.stringify(params)},
			dataType: "json",
			success: function(msg) {
				if (msg.resultCode == 1000) {

				}else{
					app.ajaxCommon(msg);
				}
			}
		})
	}
},
</pre>