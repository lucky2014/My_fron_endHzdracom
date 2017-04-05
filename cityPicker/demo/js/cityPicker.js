;(function($){ 
	//flag=1，渲染的是省份，点击的是省份
	var settings = null;

	var defaultParams = {
		url: "",
		hasCountry: false,
		data: { parentId: 1}
	};

    //请求接口，获取返回数据
	function getData(settings,dom,flag,countryDom){
		$.ajax({
			type: 'post',
			url: settings.url,
			data: settings.data,
			dataType: 'json',
			success:function(result){
				//console.log(JSON.stringify(result.citylist,null,2))
				if (result.citylist.length>0) {
					var str = "";
					for(var i=0;i<result.citylist.length;i++){
						str += '<li name="'+result.citylist[i].p+'">'+result.citylist[i].p+'</li>';
					}
					dom.find("ul").html(str);
					
					if(flag == 3){
						dom.find("p i").text(result.returnObject[0].areaName).attr("parentId",result.returnObject[0].id);
					}else if(flag == 2){
						dom.find("p i").text(result.returnObject[0].areaName).attr("parentId",result.returnObject[0].id);
						countryDom.find("p i").text("请选择县").attr("parentId",0);
					}
				}
			}
		});
	}

	//点击li
	function liClick(settings,dom,flag,cityDom,countryDom){
		dom.delegate("li","click",function(e){
	        var me = $(this);
	        e.stopPropagation();

	        var name = me.attr("name");

	        dom.find("i").text(me.text()).attr("name",name);
	        me.parent().addClass("hide");

	        settings.data = {name: name};

	        if(flag == 1){
	        	getData(settings,cityDom,2,countryDom);  //渲染省份
	        }else if(flag == 2){
	        	if(settings.hasCountry){
	        		getData(settings,countryDom,3);
	        	}
	        	
	        }
	    });
	}

	//点击请选择
    function defaultClick(dom){
		dom.delegate("p","click",function(e){
	        var me = $(this);
	        e.stopPropagation();

	        if(me.next().hasClass("hide")){
	        	me.next().removeClass("hide");
	        }else{
	        	me.next().addClass("hide");
	        }
	    });
	}

	$.fn.cityPicker = function( options ) {
		settings = $.extend( {}, defaultParams, options );

		return this.each(function(){
            var _this = $(this);

            var provinceDom = _this.find("div").eq(0);
            var cityDom = _this.find("div").eq(1);
            var countryDom = _this.find("div").eq(2);

		    getData(settings,provinceDom,1,cityDom);  //渲染省份
		    liClick(settings,provinceDom,1,cityDom,countryDom);
			defaultClick(provinceDom);

			liClick(settings,cityDom,2,cityDom,countryDom);
			defaultClick(cityDom);

			if(settings.hasCountry){
				countryDom.attr("style","");
				liClick(settings,countryDom,3,cityDom,countryDom);
				defaultClick(countryDom);
			}else{
				countryDom.attr("style","display:none");
			}
			
		    //点击其他地方隐藏列表
			$(document).click(function(){
				if(!provinceDom.find("ul").hasClass("hide")){
					provinceDom.find("ul").addClass("hide");
				}

				if(!cityDom.find("ul").hasClass("hide")){
					cityDom.find("ul").addClass("hide");
				}

				if(!countryDom.find("ul").hasClass("hide")){
					countryDom.find("ul").addClass("hide");
				}
			});

        });
	};
})(jQuery); 