# 表单中的分页

- order: 2

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

<div id="pageTable" ></div>
<div id="current-tbl-page"></div>
<script>
seajs.use(['pagination','$'], function(Pagination,$) {

	var _size = 20, _total = 110;
	var tar = $("#pageTable");
	if(tar.data("pagesize")){
		_size = tar.data("pagesize");
	}else{
		tar.data("pagesize",_size);
	}

	var pageData = new Pagination(tar, {
		page : 1,
		redirectUrl : '',
		sizeList : [10,20,50],//For pagesize option select setting use!
		type : 'table',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
		size : _size,
		onPageChanged:function(page){
			pageData.setPaging({total:_total,page:page,size:jQuery("#pageTable").data("pagesize")});
			document.getElementById("current-tbl-page").innerHTML = "您当前点的是第"+page+"页";
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

<div id="pageTable" ></div>
<div id="current-tbl-page"></div>
<script>
seajs.use(['pagination','$'], function(Pagination,$) {

	var _size = 10, _total = 10;
	var tar = $("#pageTable");
	if(tar.data("pagesize")){
		_size = tar.data("pagesize");
	}else{
		tar.data("pagesize",_size);
	}

	var pageData = new Pagination(tar, {
		page : 1,
		redirectUrl : '',
		sizeList : [10,20,50],//For pagesize option select setting use!
		type : 'table',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
		size : _size,
		onPageChanged:function(page){
			pageData.setPaging({total:_total,page:page,size:jQuery("#pageTable").data("pagesize")});
			document.getElementById("current-tbl-page").innerHTML = "您当前点的是第"+page+"页";
		}
	})

	pageData.setPaging({total:_total,page:1,size:_size});

});
</script>
````
