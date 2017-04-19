# 普通分页

- order: 1

---


## 注意

如果页面中已经引入[infovmcommon/css.vm](http://nwux.taobao.net/docs/vmcommon)则不需要引入其他css

否则需要引入:

- [global.css](https://s.tbcdn.cn/g/platform/common/s/1.0/global/global.css) 用于继承字体文件 (左右切换箭头是字体)
- [kuma.css](https://s.tbcdn.cn/g/alinw/kuma/2.1.0/kuma.css)
- [pagination.css](https://s.tbcdn.cn/g/alinw/pagination/2.0.0/pagination.css)

````iframe:200

<link type="text/css" rel="stylesheet" media="screen" href="https://s.tbcdn.cn/g/platform/common/s/1.0/global/global.css">
<link type="text/css" rel="stylesheet" media="screen" href="https://s.tbcdn.cn/g/alinw/kuma/2.1.0/kuma.css">
<link type="text/css" rel="stylesheet" media="screen" href="../src/pagination.css">

<div id="pageEl" ></div>
<div id="current-page"></div>
<script>
seajs.use(['pagination','$'], function(Pagination,$) {

	var _size = 10, _total = 100;
	var tar = $("#pageEl");
	if(tar.data("pagesize")){
		_size = tar.data("pagesize");
	}else{
		tar.data("pagesize",_size);
	}

	var pageData = new Pagination(tar, {
		page : 1,
		redirectUrl : '',
		sizeList : [10,20,50],//For pagesize option select setting use!
		type : 'common',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
		size : _size,
		onPageChanged:function(page){
			pageData.setPaging({total:_total,page:page,size:$("#pageEl").data("pagesize")});
			document.getElementById("current-page").innerHTML = "您当前点的是第"+page+"页";
		}
	})

	pageData.setPaging({total:_total,page:1,size:_size});

});
</script>
````

## 可配置

````iframe:200

<link type="text/css" rel="stylesheet" media="screen" href="https://s.tbcdn.cn/g/platform/common/s/1.0/global/global.css">
<link type="text/css" rel="stylesheet" media="screen" href="https://s.tbcdn.cn/g/alinw/kuma/2.1.0/kuma.css">
<link type="text/css" rel="stylesheet" media="screen" href="../src/pagination.css">

<div id="pageEl" ></div>
<div id="current-page"></div>
<script>
seajs.use(['pagination','$'], function(Pagination,$) {

	var _size = 10, _total = 100;
	var tar = $("#pageEl");
	if(tar.data("pagesize")){
		_size = tar.data("pagesize");
	}else{
		tar.data("pagesize",_size);
	}

	var pageData = new Pagination(tar, {
		page : 1,
		redirectUrl : '',
		sizeList : [10,20,50],//For pagesize option select setting use!
		type : 'common',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
		size : _size,
		showQuickTrigger:false,
		onPageChanged:function(page){
			pageData.setPaging({total:_total,page:page,size:$("#pageEl").data("pagesize")});
			document.getElementById("current-page").innerHTML = "您当前点的是第"+page+"页";
		}
	})

	pageData.setPaging({total:_total,page:1,size:_size});

});
</script>
````

## 只有一页的情况

````iframe:200

<link type="text/css" rel="stylesheet" media="screen" href="https://s.tbcdn.cn/g/platform/common/s/1.0/global/global.css">
<link type="text/css" rel="stylesheet" media="screen" href="https://s.tbcdn.cn/g/alinw/kuma/2.1.0/kuma.css">
<link type="text/css" rel="stylesheet" media="screen" href="../src/pagination.css">

<div id="pageEl" ></div>
<div id="current-page"></div>
<script>
seajs.use(['pagination','$'], function(Pagination,$) {

	var _size = 10, _total = 9;
	var tar = $("#pageEl");
	if(tar.data("pagesize")){
		_size = tar.data("pagesize");
	}else{
		tar.data("pagesize",_size);
	}

	var pageData = new Pagination(tar, {
		page : 1,
		redirectUrl : '',
		sizeList : [10,20,50],//For pagesize option select setting use!
		type : 'common',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
		size : _size,
		onPageChanged:function(page){
			pageData.setPaging({total:_total,page:page,size:$("#pageEl").data("pagesize")});
			document.getElementById("current-page").innerHTML = "您当前点的是第"+page+"页";
		}
	})

	pageData.setPaging({total:_total,page:1,size:_size});

});
</script>
````


## 英文版

````iframe:200

<link type="text/css" rel="stylesheet" media="screen" href="https://s.tbcdn.cn/g/platform/common/s/1.0/global/global.css">
<link type="text/css" rel="stylesheet" media="screen" href="https://s.tbcdn.cn/g/alinw/kuma/2.1.0/kuma.css">
<link type="text/css" rel="stylesheet" media="screen" href="../src/pagination.css">

<div id="pageEl" ></div>
<div id="current-page"></div>
<script>
seajs.use(['pagination','$'], function(Pagination,$) {

	var _size = 10, _total = 9;
	var tar = $("#pageEl");
	if(tar.data("pagesize")){
		_size = tar.data("pagesize");
	}else{
		tar.data("pagesize",_size);
	}

	var pageData = new Pagination(tar, {
		page : 1,
		redirectUrl : '',
		sizeList : [10,20,50],//For pagesize option select setting use!
		type : 'common',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
		size : _size,
		quickTriggerLabel   : '<div class="jump-to-page">Go to Page<input class="jump-to-page-input" type="text" class="ui-input" maxlength="6"/><a class="J_confirmJumpTo kuma-button kuma-button-swhite">Go</a>',
        sizeListPerPageLabel: 'Items Per Page',
        totalNumLabel       : '<div class="total-count">All <span class="total-count-num"></span> items</div>',
		onPageChanged:function(page){
			pageData.setPaging({total:_total,page:page,size:$("#pageEl").data("pagesize")});
			document.getElementById("current-page").innerHTML = "您当前点的是第"+page+"页";
		}
	})

	pageData.setPaging({total:_total,page:1,size:_size});

});
</script>
````