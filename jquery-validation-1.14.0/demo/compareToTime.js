define(function(require,exports,module){
	var $ = require("jquery");
    var setup = require("setup");
    require("validator");
    require("../../../../common.partial/commonTable.css");

    //默认时间
    var nowDate = require("../../../../common.datapicker/nowDate");
    $("#startTime").val(nowDate.getDate());

    require("../../../src/common.getProduct/index");
    require("../../../src/common.getCardColor/index");
    require("../../../src/common.getCardDays/index");

    var getUserInfo = require("../../../../common.getUserInfo/index");
    //判断是否登录
    getUserInfo.init();
    getUserInfo.navSelected("../"); //导航选中状态

     //日期控件
    require("../../../../common.lib/jquery.ui/datePicker.css");
    //小部件
    require("jqueryUiWidget");
    //base
    require("jqueryUiBase");
    require("datePicker");
    $(".datepicker").datepicker();

    var app = {
        days: 0, //有效天数
        dayLimit: "", // 可用时段（天）
        valTimeLen:  function(t){
            if(t.length>0){
                t.length = 2;
            }else{
                t = nowDate.formatterDate(t);
            }
            return t;
        },
        businessClick: function(){
            //业务
            $(".inputBox>div>input").focus(function(){
                $(this).next(".tip").show();
            }).blur(function(){
                $(this).next(".tip").hide();
            });

            //点击部分时段
            $(".dayLimitParent .button1").click(function(){
                var self = $(this);
                self.addClass("active").siblings().removeClass("active");
                var index = self.index();
                if(index == 1){
                    $("#dayLimit,#add").show();
                }else{
                    $("#dayLimit").hide();
                }
            });

            //点击新增时间段
            var timeLimitLen = 0;
            $("#add").click(function(){
                ++timeLimitLen;
                var self = $(this);
                $("#del,#timeLimit").show();
                $(".timeLimit"+timeLimitLen).show();
                if(timeLimitLen == 2){
                    self.hide(); 
                }
            });
            $("#del").click(function(){
                var self = $(this);
                $(".timeLimit"+timeLimitLen).hide();
                --timeLimitLen;
                if(timeLimitLen == 0){
                    self.hide(); 
                    $("#timeLimit").hide();
                    $("#add").show();
                }
            });

            //可用时间段验证
            $("#timeLimit input").blur(function(){
                var val = $(this).val(),valRet = [];
                if(val.indexOf(":")>0){
                    valRet = val.split(":"); 
                    $(this).val(app.valTimeLen(valRet[0])+":"+app.valTimeLen(valRet[1]));
                }
                return ;
            });

            //点击卡券生效类型
            $(".effectiveType>b,.effectiveType>span").click(function(){
                var self = $(this);
                self.parent().addClass("active").siblings().removeClass("active");
                var index = self.parent().attr("effectiveType");
                if(index == 2){ //有效天数不能点
                    app.days = 0;
                    $(".maskSpan").hide();
                }else{
                    app.days = $("#getCardDaysSec").attr("data-type");
                    $(".maskSpan").show();
                }
            });

            //流量和话费的时候，cost显示
            if($(".primary_category").attr("data-type") == 1 || $(".primary_category").attr("data-type") == 2){
                $("#cost").show();
            }
        },
        init: function(){
            app.businessClick();

            jQuery.validator.addMethod("timeLimit", function(value, element, param) {
                return /^([01]\d|2[0123]):([0-5]\d)$/.test(value); 
            }, $.validator.format("请输入正确的时间格式，如11:30！"));

            jQuery.validator.addMethod("compareTo", function(value, element, param) {
                var index = $(element).attr("index");
                var js_hour_start1 = $("input[name='js_hour_start"+index+"']").val().split(":");
                var js_hour_end1 = value.split(":");

                if(js_hour_end1[0]>js_hour_start1[0]){
                    return true;
                }else if( js_hour_end1[0] == js_hour_start1[0]){
                    if(js_hour_end1[1]>js_hour_start1[1]){
                        return true;
                    }else{
                        return false;   
                    }
                }else{
                    return false;  
                }
            }, $.validator.format("结束时间必须大于开始时间！"));

            //验证表单、提交
            $("#createCard").validate({
                rules: {
                    title: "required",
                    cost: "required number",
                    cardNum: "required digits",
                    limit: "required digits",
                    js_hour_start1: "timeLimit",
                    js_hour_end1: "timeLimit compareTo",
                    js_hour_start2: "timeLimit",
                    js_hour_end2: "timeLimit compareTo",
                },
                messages: {
                    title: "请输入卡券名称!",
                    cardNum: {
                        required: "请输入卡券数量！",
                        digits: "卡券数量必须是整数！"
                    },
                    limit: {
                        required: "请输入限领数量！",
                        digits: "限领数量必须是整数！"
                    },
                    cost: {
                        required: "请输入抵扣金额！",
                        number: "抵扣金额必须合法的是数字！",
                    },
                    js_hour_start1: {
                        required: "请输入卡券使用时间限制！",
                        timeLimit: "请输入正确的时间格式，如11:30！"
                    },
                    js_hour_end1: {
                        required: "请输入卡券使用时间限制！",
                        timeLimit: "请输入正确的时间格式，如11:30！",
                        compareTo: "结束时间必须大于开始时间！"
                    },
                    js_hour_start2: {
                        required: "请输入卡券使用时间限制！",
                        timeLimit: "请输入正确的时间格式，如11:30！"
                    },
                    js_hour_end2: {
                        required: "请输入卡券使用时间限制！",
                        timeLimit: "请输入正确的时间格式，如11:30！",
                        compareTo: "结束时间必须大于开始时间！"
                    },
                },
                submitHandler:function() { 
                    var merchantId = setup.getQueryString("merchantId");
                    var effectiveType = $(".effectiveType.active").attr("effectiveType"); //卡券生效类型

                    //可用时间段统计
                    $('input[name="dayLimit"]:checked').each(function(){
                        app.dayLimit += $(this).val()+",";
                    });

                    var timeList = $(".timeLimit:visible");
                    var timeLen = timeList.length;
                    var timeLimitStr = "";
                    for(var i=0; i<timeLen; i++){
                        timeLimitStr += timeList.eq(i).find("input:eq(0)").val()+"-"+timeList.eq(i).find("input:eq(1)").val()+",";
                    }
                    timeLimitStr = timeLimitStr.slice(0,timeLimitStr.length-1);

                    setup.commonAjax("card/createCard.do", {
                        cardType: $(".primary_category").attr("data-type") || 1,
                        title: $(".title").val(), 
                        cost: $(".cost").val(),
                        color: $(".primary_color>i").html(),
                        cardNum: $("#cardNum").val(),  
                        effectiveType: $(".effectiveType.active").attr("effectiveType"), 
                        
                        startTime: nowDate.getDate(), //开始时间
                        endTime: $(".datepicker").val(), //结束时间
                        lazyDays: 0, //当天生效，类型是1时为空
                        days: app.days, //延迟天数
                        limit: $("#limit").val(), //限领张数
                        remark: $(".remark").val(),
                        merchantId: merchantId || "423948471", //子商户ID
                        dayLimit: app.dayLimit.slice(0,app.dayLimit.length-1), //可用时段天
                        timeLimit: timeLimitStr, //可用时段分
                        customerUrl: $(".customerUrl").val(),
                    }, function(msg){
                        //console.log(JSON.stringify(msg,null,2));
                        location.href = "myWxcard.html?type=3&subType=0&cardId=" + msg.cardId + "&merchantId="+merchantId;
                    });
                }
            });
        }
    };
    app.init();
});

