(function($){
    var defaults = {
        imgSelected:".img3",
        imgArr:[],
        callback:function(){},
        timer:300
    };

    function appFn(options){
        var app = {
             eggs:null,
             egg:function(){//创建鸡蛋的构造函数
                    var _this = this;
                    _this.isLottery = true;
                    _this.status = 0;
                    _this.imgarr = options.imgArr;
             },
             stage:function(liSel){//场景生成
                    var _this = this;
                    _this.arr = function(liSel){
                            var arr = [];
                            for(var i = 0;i<$(liSel).length;i++){
                                arr[i] = $(liSel).eq(i).attr("class")
                            }
                            return arr
                    };
                    _this.rightNewarr = function(){
                            var arr = _this.arr(liSel);
                            var newarr = [];
                            for(var i = 0;i<arr.length;i++){
                                if(i>0){
                                    newarr[i] = arr[i-1]
                                }else{
                                    newarr[0] = arr[arr.length-1]
                                }
                            }
                            return newarr
                    };
                    _this.leftNewarr=function(){
                        var _this = this;
                        var arr = _this.arr(liSel);
                        var newarr = [];
                        for(var i = 0;i<arr.length;i++){
                            if(i<arr.length-1){
                                newarr[i] = arr[i+1]
                            }else{
                                newarr[arr.length-1] = arr[0]
                            }
                        }
                        return newarr
                    }
                    _this.rightRenderFn = function(liSel){
                            var newarr = _this.rightNewarr();
                            var center = _this.centerW;
                            for(var i = 0;i<newarr.length;i++){
                                $(liSel).eq(i).attr("class",newarr[i])
                                $(liSel).eq(i).css("transition","all 1s ease")
                            }
                    };
                    _this.leftRenderFn = function(liSel){
                            var newarr = _this.leftNewarr();
                            var center = _this.centerW;
                            for(var i = 0;i<newarr.length;i++){
                                $(liSel).eq(i).attr("class",newarr[i])
                                $(liSel).eq(i).css("transition","all 1s ease")
                            }
                    };
             },
             hit:function(liSel,len){//砸金蛋方法
                    var _this = this;
                    _this.eggs = function(){
                        var eggs = [];
                        var Egg = app.egg;
                        for(var i = 0;i<len;i++){
                            eggs.push(new Egg());
                        }
                        return eggs
                    };
                    _this.tamp = function(liSel,hammer,ind,callback){
                        var _this = this;
                        var imgSel = $(liSel).eq(ind).children("img");
                        hammer.removeClass("hammer_hover");
                        imgSel.removeClass("shake");
                        setTimeout(function(){
                            _this.anim(imgSel,hammer,ind,callback)
                        },100)
                    };
                    _this.hammer = function(imgSel,hammer,ind,callback){
                        $(hammer).addClass("hammer_hover");
                        if(imgSel){
                            setTimeout(function(){
                                    imgSel.attr("src",app.eggs[ind].imgarr[ind]);
                            },800)
                            setTimeout(function(){
                                imgSel.addClass("shake");
                            },400)
                        }
                    };
                    _this.ind = 60;
                    _this.anim = function(imgSel,hammer,ind,callback){
                        app.eggs[ind].status++;
                        var len = options.imgArr.length;
                        if(app.eggs[ind].status<len){
                                _this.hammer(imgSel,hammer,(app.eggs[ind].status))
                        }else{
                            _this.hammer(imgSel,hammer,len);
                            setTimeout(function(){
                                callback()
                            },options.timer)
                        }
                    }
             },
             swipe:function(ul,li,stage){
                    ul.swipe({
                        swipeLeft:function(){
                             stage.rightRenderFn(li);
                        },
                        swipeRight:function(){
                             stage.leftRenderFn(li);
                        }
                    });
             },
             init:function(ul,li,hammer,len){//砸金蛋方法执行
                var _this = this;
                var Stage =app.stage;
                var Hit =app.hit;
                var stage = new Stage(li);
                var tamp = new Hit(li,len);
                _this.eggs = tamp.eggs();
                var imgSelected = ul.children(options.imgSelected).find("img");
                ul.delegate(imgSelected,"click",function(){
                    var ind = ul.children(options.imgSelected).index();
                    if(ul.attr("data-type")&&(ul.attr("data-type")=="true")){
                        tamp.tamp(li,hammer,ind,function(){
                            options.callback();
                        });
                    }
                });
                app.swipe(ul,li,stage);
             }
        };
        return app;
    }
    
    $.fn.smashing = function(options){
         //具体实现的代码
         var options = $.extend({},defaults,options);
         var app = appFn(options);
         return this.each(function(){
            var me = $(this);
            var li = me.find("li");
            var ul = me.find("ul");
            var hammer = me.find("span");
            var len = li.length;
            app.init(ul,li,hammer,len)
         });
    }
})(jQuery);  

