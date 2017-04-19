# Pagination 统一分页控件

- name: pagination
- category: components
- title: Pagination 统一分页控件
- tags:  pagination,page,分页,内外分页,表格分页
- description: 统一分页控件，提供简单的分页逻辑以及样式，目前提供三种不同形式的分页，已国际化
- maintainers: 九神(67732),张顺(24668)
- version: 2.0.11
- lastupdate: 2015-07-06
- screenshots: http://gtms02.alicdn.com/tps/i2/TB1Y9lXIFXXXXaNXVXXsDuJ5pXX-1084-500.png_500x1000.jpg

-------

**TL;DR**

1. Pagination 是信息平台分页控件，主要用于简单的分页切换。
1. 以下为具体的几种 demo 的展示效果：

	![效果图](http://gtms02.alicdn.com/tps/i2/TB1Y9lXIFXXXXaNXVXXsDuJ5pXX-1084-500.png_500x1000.jpg)
	
1. 这个组件基于Seajs模块化方式加载，如果项目未使用请移步[Seajs官网](http://seajs.org/)了解

## Usage 最佳实践

### 组件初始化

页面容器准备：在需要显示分页的区域增加如下结构，`class` 或者 `id` 可以自定义，没有特殊要求，推荐用于绑定 JS 事件的 `class` 或者 `id` 以 `J_` 开头，之后为驼峰。

````html
<div id="J_Pagination" ></div>
````

Seajs别名配置：

````javascript
//注意：已经存在 seajs config 的情况下，只需要加入 pagination 这一行
seajs.config({
    "pagination": "alinw/pagination/2.0.11/pagination"
});
````

初始化代码：

````html
<script type="text/javascript">
//在一个标准的Seajs模块中去初始化
var $ = require('$');
var Pagination = require("pagination"); //如果不配置别名，则require('alinw/pagination/2.0.11/pagination');
 
var _size = 10, _total = 100;

var tar = $("#J_Pagination");
    if(tar.data("pagesize")){
        _size = tar.data("pagesize");
    }else{
        tar.data("pagesize",_size);
    }
var pageData = new Pagination(tar, {
    page : 1,
    redirectUrl : '#page/1', // 如果不想在 hash 上反应，则设置为 '',
    sizeList : [10,20,50] , //  每一页多少条
    type : 'common', // 分页的类型，下面有参数说明  
    size : _size,
    onPageChanged:function(page){
            pageData.setPaging({total:_total,page:page,size:$("#J_Pagination").data("pagesize")});
        }
})
</script>
````

组件样式：需要自行引入样式

```
<link type="text/css" rel="stylesheet" media="screen" href="//alinw.alicdn.com/alinw/pagination/2.0.11/pagination.css">
```

### 可用配置

- 第一个参数为必选，需要传入`jQuery对象` 或者 `Selector`
- 第二个参数为配置项，配置项详细说明如下。

| 配置项 | 必填 | 默认值 | 功能/备注 |
|---|----|---|----|
|quickTriggerLabel|optional|`<div class="jump-to-page">去第<input class="jump-to-page-input" type="text" class="ui-input" maxlength="6"/>页<a class="J_confirmJumpTo kuma-button kuma-button-swhite">确定</a>`|去第几页的结构，请参考 example 中的英文版，结构请不要动，有可能会有 bug|
|sizeListPerPageLabel|optional|条/页|每页显示多少条的文案,比较戳. 请参考example中的英文版. 结构请不要动,有可能会有bug|
|totalNumLabel|optional|`<div class="total-count">共<span class="total-count-num"></span>条</div>`|总页数的英文,比较戳. 请参考example中的英文版. 结构请不要动,有可能会有bug
|showSizeList|optional|true|是否显示SizeList|
|showQuickTrigger|optional|true|是否显示快速到达第几页|
|showOnePage|optional|true|showOnePage 为 如果只有一页的情况，是否需要显示分页组件。如果showOnePage配置为false，有以下两种情况，如果type为common或者tiny时，分页控件不显示，如果type为table时，并且总条数小于**10**条，分页控件不显示|
|showTotalNum|optional|true|showTotalNum 为true时,会显示总条数。type为tiny的时候,不识别这一项|
|page|optional|1|初始化时候的默认选中页|
|size|optional|10|每页显示多少条|
|type|optional|common|分页控件类型，如果type为common时，为普通分页控件，如果type为table时，为表格用控件|
|sizeList|optional|[10,20,50]|当type为table时生效，是每页显示条数集合，用于渲染下拉框|
|redirectUrl|optional|''|改变页面url，redirectUrl为hash值。如'/#page'。渲染分页组件的时候，会将页数待在redirectUrl后。如果redirectUrl为空，则不会发生redirect|
|onPageChanged|optional|function(){}|当前页数发生变化时，比如点击了其他页，会触发的回调，回调参数：当前页数。

### 国际化

需要手动修改配置，参数请看上方可用配置，使用请参考 example 中。

## API 接口

本组件无外部接口可用

## Events 事件

`.on('pagination:goto')`

```
.on('pagination:goto',function(page){
    ...
})
```
## Links 相关链接

- [Demo 演示](examples/)
- [History](history.html)
- [Fire a bug/Issues 提Bug](http://gitlab.alibaba-inc.com/alinw/pagination/issues)
- [Seajs官网](http://seajs.org/)