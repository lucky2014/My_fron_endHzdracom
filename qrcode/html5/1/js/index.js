	$(".m3 p").html($(".lis>img.ran1").attr("data-text"));
	var init = {
		centerW:parseInt($(".lis>img").eq(0).css("left")),
		logoMLf:window.innerWidth,
		typerInd:0,
		typerTimer:1000,
		sec3:0,
		t:800,
		arr:function(imgSel){
			var arr = [];
			for(var i = 0;i<$(imgSel).length;i++){
				arr[i] = $(imgSel).eq(i).attr("class")
			}
			return arr
		},
		leftNewarr:function(){
			var _this = this;
			var arr = _this.arr(".lis>img");
			var newarr = [];
			for(var i = 0;i<arr.length;i++){
				if(i<arr.length-1){
					newarr[i] = arr[i+1]
				}else{
					newarr[arr.length-1] = arr[0]
				}
			}
			return newarr
		},
		rightNewarr:function(arr){
			var _this = this;
			var arr = _this.arr(".lis>img");
			var newarr = [];
			for(var i = 0;i<arr.length;i++){
				if(i>0){
					newarr[i] = arr[i-1]
				}else{
					newarr[0] = arr[arr.length-1]
				}
			}
			return newarr
		},
		leftRenderFn:function(){
			var _this = this;
			var newarr = _this.leftNewarr();
			var center = _this.centerW;
			for(var i = 0;i<newarr.length;i++){
				$(".lis>img").eq(i).attr("class",newarr[i])
			}
		},
		rightRenderFn:function(){
			var _this = this;
			var newarr = _this.rightNewarr();
			var center = _this.centerW;
			for(var i = 0;i<newarr.length;i++){
				$(".lis>img").eq(i).attr("class",newarr[i])
			}
		},
		togglew:window.innerWidth/2+240,
		clk:function(){
			var _this = this;
			$(".lis>img").swipe({
			    swipeLeft:function(){
			    	console.log(2)
			        _this.leftRenderFn();
					$(".m3").css("margin-left",_this.togglew+"px");
					$(".m3").animate({
						marginLeft:0
					},_this.t);
			        $(".m3 p").html($(".lis>img.ran1").attr("data-text"));
			    },
			    swipeRight:function(){
			       _this.rightRenderFn();
					//$(".m3").addClass("toggle_right");
					$(".m3").css("margin-left","-"+_this.togglew+"px");
					if(!$(".m3").is(":animated")){
						$(".m3").animate({
							marginLeft:0
						},_this.t);
					}
			       $(".m3 p").html($(".lis>img.ran1").attr("data-text"));
			    }
			});
		},
		typerRender:function(typerSel,html){//打字机展现
			console.log($(typerSel).is(":animated"))
			if(!$(typerSel).is(":animated")){
				var arr = $(typerSel).html().split(""),result="";
				$(typerSel).html("");
				this.typerFn(typerSel,html,arr)
			}else{
				return false;
			}
		},
		typerFn:function(typerSel,html,arr){
			var _this = this;
			if(arr.length){
				setTimeout(function(){
					result = arr.shift();
					$(typerSel).append(result);
					_this.typerFn(typerSel,html,arr)
				},300)
			}
		},
		sec2Animate:function(){
			$(".sec2 h2").addClass("parabola");
			setTimeout(function(){
				$(".sec2 .box p").show();
				init.typerRender(".sec2 .box p",this.text_rt);
			},2000)
			$(".sec2 ul li p span").addClass("rotate");
			$(".sec2 ul li p").addClass("translate2");
			$(".sec2 ul li i").addClass("scaleAnimate");
		},
		sec3Animate:function(){
			$(".section3 h2").addClass("parabola");
			$(".sec3").addClass("sec3_animate");
				setTimeout(function(){
					$(".section3 .box p").show();
					init.typerRender(".section3 .box p",this.text_rt);
				},1000)
		},
		sec4Animate:function(){
			$(".section4 h2").addClass("parabola");
			$(".sec4").addClass("sec4_scale");
			$(".m3").addClass("sec4_animate");
				setTimeout(function(){
					$(".section4 .box p").show();
					init.typerRender(".section4 .box p",this.text_rt);
				},1000)
				$("#product .lis").addClass("sec4_scale");
		},
		sec5Animate:function(){
			$(".section5 h2").addClass("parabola");
			$(".section ul li:nth-child(2n+1) p,.section ul li:nth-child(2n+1) i").addClass("sec5_animate1");
			$(".section ul li:nth-child(2n) p,.section ul li:nth-child(2n) i").addClass("sec5_animate2");
			setTimeout(function(){
				$(".section ul li:nth-child(2n+1) p,.section ul li:nth-child(2n+1) i").removeClass("sec5_animate1");
				$(".section ul li:nth-child(2n) p,.section ul li:nth-child(2n) i").removeClass("sec5_animate2");
				$(".section ul li i").addClass("sec5_rotate");
			},2000);
			setTimeout(function(){
					$(".section5 .box p").show();
					init.typerRender(".section5 .box p",this.text_rt);
				},1000)
		},
		animate:function(){
			$(".logo").addClass("translate");
			$(".section1>p").addClass("scale");
		}
	};
		init.clk();
