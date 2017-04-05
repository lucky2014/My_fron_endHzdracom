window.onload = function(){
	var aUl = document.getElementsByTagname("ul");
	var obtn = true;

	window.onscroll = function(){
		var viewHeight = document.documentElement.clientHeight;
		var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
	
		for(var i=0; i<aUl.length;i++){
			var aLi = aUl[i].getElementsByTagname("li");
			var lastLi = aUl[aUl.length-1];

			if(posTop(lastLi)< viewHeight + scrollHeight && obtn){
				obtn = false;
				ajax("xxx.php?page=1&len=9", function(str){ //ajax请求是需要一段时间的，肯定比onscroll慢很多，所以如果不阻止请求的话，会有很多次请求
					var json = eval('('+ str +')');

					if(json.code){
						obtn = true;
					}

					for (var i = json.list.length; i++) {
						var list = json.list[i];

						for (var j = 0;j < list.src.length; j++) {
							var oLi = document.createElement("li");
							oLi.innerHTML = '<img src="'+ list.src[j] +'"><p>'+ list.title[j] +'</p>';
							aUl.appendChild(oLi);
						};
					};
				});
			}

		}
	};

	function posTop(obj){
		var top = 0;
		while(obj){
			top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return top;
	}
};


var data = {
	code:0, //1可以继续发生ajax请求
	list: [
		{
			src: ["imgs/1.jpg","imgs/2.jpg","imgs/3.jpg"],
			title: ["2222","2222","2222"]
		},
		{
			src: ["imgs/4.jpg","imgs/5.jpg","imgs/6.jpg"],
			title: ["2222","2222","2222"]
		},
		{
			src: ["imgs/7.jpg","imgs/8.jpg","imgs/9.jpg"],
			title: ["2222","2222","2222"]
		}
	]
}