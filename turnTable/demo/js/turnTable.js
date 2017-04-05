(function($){
	var defaults = {
        prizeName : ["100M流量","200M流量","iphone","打我呀","打我也不给"],
        index : 3,
        prize : 4,
        cycle:50,
        isRandom:true, //奖品是否随机摆放
        callBack:function(){}
    };
    function lotteryFn(options){
    	var lottery={
			count:8,	
			timer:0,	
			speed:20,	
			times:0,	
			cycle:options.cycle,	
			init:function(id){
				if ($("#"+id).find(".lottery-unit").length>0) {
					$lottery = $("#"+id);
					$units = $lottery.find(".lottery-unit");
					this.obj = $lottery;
					this.count = $units.length;
					$lottery.find(".lottery-unit-"+options.index).addClass("current");
				};
			},
			roll:function(){
				var index = options.index;
				var count = this.count;
				var lottery = this.obj;
				$(lottery).find(".lottery-unit-"+index).removeClass("current");
				index += 1;
				if (index>count-1) {
					index = 0;
				};
				$(lottery).find(".lottery-unit-"+index).addClass("current");
				options.index=index;
				return false;
			},
			stop:function(index){
				this.prize=index;
				return false;
			},
			randomGe:function(arr){
				var len=arr.length;
				if (options.isRandom) {
					var nArr=[];
					for(var i=0;i<8;i++){
						var n=8-i
						var ran=Math.random()*n|0;
						if (ran<len) {
							var num=arr.splice(ran,1)[0];
							len--
						}else{
							num="谢谢参与";
						}
						$(".lottery-unit-"+i).children(".box").html(num);
					}
				}else{
					for(var i=0;i<8;i++){
						if (i<len) {
							var num=arr.splice(ran,1)[0];
						}else{
							num="谢谢参与";
						}
						$(".lottery-unit-"+i).children(".box").html(num);
					}
				}
			}
		};
		return lottery
	}

    $.fn.turnTable = function(options){ 
         var options = $.extend({},defaults,options);
         return this.each(function(){
			var lottery=lotteryFn(options)
			lottery.randomGe(options.prizeName);
			lottery.init(this.id);
			function roll(){
				lottery.times += 1;
				lottery.roll();
				if (lottery.times > lottery.cycle+10 && options.prize==options.index) {
					clearTimeout(lottery.timer);
					lottery.prize=-1;
					lottery.times=0;
					options.callBack();
				}else{
					if (lottery.times<lottery.cycle) {
						lottery.speed -= 10;
					}else if(lottery.times==lottery.cycle) {
						var index = options.prize;
						console.log(index)
						options.prize = index;		
					}else{
						if (lottery.times > lottery.cycle+10 && ((options.prize==0 && options.index==7) || lottery.prize==options.index+1)) {
							lottery.speed += 110;
						}else{
							lottery.speed += 20;
						}
					}
					if (lottery.speed<40) {
						lottery.speed=40;
					};
					lottery.timer = setTimeout(roll,lottery.speed);
				}
				return false;
			}
			var click=false;
			
			$(this).delegate("#beginButton","click",function(){
				if (click) {
					return false;
				}else{
					lottery.speed=100;
					roll();
					click=true;
					return false;
				}
			});
         });
    };
})(jQuery)