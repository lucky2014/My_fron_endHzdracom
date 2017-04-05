var initMyDates = {
	startTime: "",
	endTime: "",
	dataPicker:function(dataPicker,index,callback){
		var _this = this;
		var LF = ($('.input').eq(0).offset().left-3);
		var Tp = ($('.input').eq(0).offset().top+32);
		$(".ui-daterangepickercontain").attr("style","top:"+(Tp)+"px;left:"+LF+"px;");

	  	$(dataPicker).daterangepicker({
		    presetRanges:[
		        {text:'过去60天', dateStart:'today-59day', dateEnd:'today' },
		        {text:'过去30天', dateStart:'today-29day', dateEnd:'today' },
		        {text:'过去7天', dateStart:'today-6day', dateEnd:'today' },
		        {text:'今天', dateStart:'today', dateEnd:'today' },
		    ],
		    presets:{
		       dateRange:'自选'
		    },
		    startDate:moment().startOf('day'),
		    endDate:moment(),
		    rangeStartTitle:'起始日期',
		    rangeEndTitle:'结束日期',
		    nextLinkText:'下月',
		    prevLinkText:'上月',
		    doneButtonText:'确定',
		    cancelButtonText:'取消',
		    earliestDate:'',
		    latestDate:Date.parse('today'),
		    constrainDates:true,
		    rangeSplitter:'-',
		    dateFormat:'yy.mm.dd',
		    closeOnSelect:false,
		    onOpen:function(){
		    	$('body .ui-daterangepickercontain').eq(index).find(".ui-widget-content>li").not(".ui-daterangepicker-dateRange").parent().removeClass("hide");
		        $('body .ui-daterangepickercontain').eq(index).find(".ranges").css("left","0");
		        $('body .ui-daterangepickercontain').eq(index).find(".ui-daterangepicker-dateRange").click().parent().hide();
		        $(".ranges").hide();
		        $('body .ui-daterangepickercontain').eq(index).find(".ui-widget-content").show();
		        $(".ui-daterangepicker-dateRange").removeClass("ui-state-active");
		    },
		    onChange :function(){
		    	if(!$('body .ui-daterangepickercontain').eq(index).find(".ui-widget-content").hasClass("hide")){
		    		$('body .ui-daterangepickercontain').eq(index).find(".ranges").css("left","247px")
		    	}
		    	$('body .ui-daterangepickercontain').eq(index).find(".ui-widget-content>li").not(".ui-daterangepicker-dateRange").parent().addClass("hide");
	        	var data = {
	        		val:$("#datepicker").val()
	        	}

	        	//处理选中的日期成接口需要的参数
	        	if(data.val.indexOf("-") > 0 ){
				    
				}else{
					
				}
	        	callback();
		    },
	   });
	}
}
