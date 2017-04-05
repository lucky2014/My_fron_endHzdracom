(function($){
	var defaults = {
        bgImg : "img/gua_image.png",
        prizeName : "谢谢参与",
        canvasColor : "#ccc",
        width: 300,
        height: 300,
        canvasWidth: 200,
        canvasHeight: 200,
        top: 50,
        left: 50,
        fontColor:"#000",
        callback:function(){}
    };
    var lottey=function(options){
    	var canvas=document.getElementById("scratchCanvas");
    	var cxt=canvas.getContext("2d");
    	function layer(){
    		// console.log(options.width)
    		cxt.fillStyle=options.canvasColor;
			cxt.fillRect(options.left,options.top,options.canvasWidth,options.canvasHeight);
			cxt.globalCompositeOperation = 'destination-out';
		}
		function getTop(e){
  			var offset=e.offsetTop;
  			if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
  			return offset;
		}
		function getLeft(e){
  			var offset=e.offsetLeft;
  			if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
  			return offset;
		}
		var img = new Image();
    	img.addEventListener('load',function(e){  
			var ctx;
			var w = options.width, h = options.height; 
			var offsetX = canvas.offsetLeft, offsetY = canvas.offsetTop; 
			var mousedown = false;               
			function eventDown(e){                 
				e.preventDefault();                
				mousedown=true;          
			}
			function eventUp(e){            
				e.preventDefault();                 
				mousedown=false;
				options.callback();
			}               
			function eventMove(e){                 
				e.preventDefault();               
				if(mousedown){                     
					if(e.changedTouches){                         
						e=e.changedTouches[e.changedTouches.length-1];                     
					}
					var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,                         
					y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
					                  
					cxt.beginPath();                     
					cxt.arc(x-getLeft(canvas)+0,y-getTop(canvas)+0, 15, 0, Math.PI * 2);
					cxt.fill();         
				}
			}   
			layer(); 
			canvas.addEventListener('touchstart', eventDown);             
			canvas.addEventListener('touchend', eventUp);             
			canvas.addEventListener('touchmove', eventMove);             
			canvas.addEventListener('mousedown', eventDown);             
			canvas.addEventListener('mouseup', eventUp);             
			canvas.addEventListener('mousemove', eventMove);
		})
		img.src = options.bgImg;
	}
    $.fn.scratch = function(options){ 
         var options = $.extend({},defaults,options);
         return this.each(function(){
         	 var self=$(this)
             //对每个options的操作
             self.html('<img src="'+options.bgImg+'" alt="" id="scratchImg"><p id="scratchP" style="display:none;">'+options.prizeName+'</p><canvas id="scratchCanvas"></canvas>');
             setTimeout(function(){$("#scratchP").show();},100)
             self.css({"position":"relative","width":options.width,"height":options.height})
             $("#scratchCanvas").attr("width",options.width).attr("height",options.height);
			 $("#scratchP").css({"margin-top":-$("#scratchP").height()/2,"margin-left":-$("#scratchP").width()/2,"color":options.fontColor})

			 lottey(options);
         });
    };
})(jQuery);