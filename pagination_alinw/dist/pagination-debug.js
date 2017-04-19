define("alinw/pagination/2.0.11/pagination-debug", [ "$-debug", "alinw/select/2.0.0/select-debug", "arale/select/0.9.7/select-debug", "arale/overlay/1.1.1/overlay-debug", "arale/position/1.0.1/position-debug", "arale/iframe-shim/1.0.2/iframe-shim-debug", "arale/widget/1.1.1/widget-debug", "arale/base/1.1.1/base-debug", "arale/class/1.1.0/class-debug", "arale/events/1.1.0/events-debug", "arale/templatable/0.9.1/templatable-debug", "gallery/handlebars/1.0.2/handlebars-debug", "gallery/handlebars/1.0.2/runtime-debug" ], function(require, exports, module) {
    var pagination;
    var $ = require("$-debug");
    var Select = require("alinw/select/2.0.0/select-debug");
    var Pagination = function(element, options) {
        var defaults = {
            size: 10,
            page: 1,
            redirectUrl: "#page/",
            wrap: '<div class="kuma-pagination"><ul class="fd-clr"></ul></div>',
            type: "common",
            sizeList: [ 10, 20, 50 ],
            showQuickTrigger: true,
            showSizeList: true,
            showOnePage: true,
            showTotalNum: true,
            quickTriggerLabel: '<div class="jump-to-page">去第<input class="jump-to-page-input" type="text" class="ui-input" maxlength="6"/>页<a class="J_confirmJumpTo kuma-button kuma-button-swhite">确定</a>',
            sizeListPerPageLabel: "条/页",
            totalNumLabel: '<div class="total-count">共<span class="total-count-num"></span>条</div>'
        };
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();
    };
    $.extend(Pagination.prototype, {
        constructor: Pagination,
        init: function() {
            this.$el = $(this.element);
            this.pageSize = 10;
            this.ec = $({});
            var container = this.$container = $(this.options.wrap);
            this.$wrap = container.find("ul");
            this.$el.html(container);
            this.render();
            this.initEvents();
        },
        trigger: function() {
            this.ec.trigger.apply(this.ec, arguments);
        },
        on: function() {
            this.ec.on.apply(this.ec, arguments);
        },
        render: function() {
            var _this = this;
            if (this.options.showQuickTrigger && this.options.type === "common") {
                var $jumpToPageEl = $(this.options.quickTriggerLabel);
                $jumpToPageEl.insertAfter(_this.$wrap).on("click", ".J_confirmJumpTo", function(ev) {
                    var target = $jumpToPageEl.find(".jump-to-page-input");
                    var _pageNum = +target.val();
                    if (!/^[0-9]*$/.test(_pageNum)) {
                        //alert("请输入数字！");
                        return;
                    }
                    _this.page = _pageNum > _this.maxPage ? _this.maxPage : _this.page = _pageNum < 1 ? 1 : _pageNum;
                    _this.setPaging({
                        total: _this.total,
                        page: _this.page,
                        size: _this.pageSize
                    });
                    _this.trigger("pagination:goto", _this.page);
                    if (_this.options.onPageChanged && $.isFunction(_this.options.onPageChanged)) {
                        _this.options.onPageChanged.call(_this, _this.page);
                    }
                    target.val("");
                });
            }
            if (this.options.showSizeList) {
                var optHtml = "";
                for (var i = 0; i < this.options.sizeList.length; i++) {
                    var _num = this.options.sizeList[i];
                    optHtml += '<option value="' + _num + '">' + _num + "</option>";
                }
                var $selOpt = $('<select class="size-per-page">' + optHtml + "</select>" + '<span class="kuma-page-size-label">' + this.options.sizeListPerPageLabel + "</span>");
                $selOpt.insertAfter(this.$wrap);
                _this.$container.find("select").each(function() {
                    var select = _this.showSizeSelector = new Select({
                        trigger: this
                    }).on("change", function(target) {
                        var val = $(target).data("value");
                        _this.$el.data("pagesize", val);
                        _this.pageSize = val;
                        _this.setPaging({
                            total: _this.total,
                            page: 1,
                            size: val
                        });
                        _this.trigger("pagination:goto", 1);
                        if (_this.options.onPageChanged && $.isFunction(_this.options.onPageChanged)) {
                            _this.options.onPageChanged.call(_this, 1);
                        }
                    });
                    select.element.addClass("kuma-pagination-select");
                    switch (_this.options.type) {
                      case "table":
                        select.element.addClass("kuma-pagination-table-select");
                        break;

                      case "tiny":
                        select.element.addClass("kuma-pagination-tiny-select");
                        break;

                      case "common":
                        select.element.addClass("kuma-pagination-common-select");
                        break;
                    }
                });
            }
            if (this.options.showTotalNum) {
                var totalNumEl = $(this.options.totalNumLabel);
                totalNumEl.insertAfter(this.$wrap);
            }
            switch (this.options.type) {
              case "table":
                this.$container.addClass("kuma-pagination-table");
                this.$wrap.addClass("table-cell");
                break;

              case "tiny":
                this.$container.addClass("kuma-pagination-tiny");
                this.$wrap.addClass("tiny-cell");
                var $selOpt = $('<span class="tiny-current-num"></span>' + "/" + '<span class="tiny-total-num"></span>');
                $selOpt.insertBefore(this.$wrap);
                break;

              case "common":
                this.$container.addClass("kuma-pagination-common");
                this.$wrap.addClass("common-cell");
                break;
            }
        },
        initEvents: function() {
            //TODO : Add test
            this.$wrap.on("click", "li:not(.disabled)", $.proxy(this.onPagingClicked, this));
            this.on("page_updated", $.proxy(this.refreshPaging, this));
        },
        refreshPaging: function() {
            var _this = this, startPage, endPage, firstPage = this.page - 1 > 0 ? this.page - 1 : 1, lastPage = this.page + 1 < this.maxPage ? this.page + 1 : this.maxPage, $prev, $next;
            //remove events
            this.$wrap.find("li").off("**");
            this.$wrap.empty();
            //TODO here should add first page!
            // 首页的功能不需要
            // if (_this.options.redirectUrl) {
            //     $first = $('<li data-index="1"><a href="' + _this.options.redirectUrl + firstPage + '" title="首页"><span>&#xe64a;</span></a></li>').appendTo(_this.$wrap);
            // } else {
            //     $first = $('<li data-index="1"><a href="' + "javascript:;" + '" title="首页"><span>&#xe64a;</span></a></li>').appendTo(_this.$wrap);
            // }
            $prev = this.options.redirectUrl ? $('<li class="prev" data-index="prev"><a href="' + this.options.redirectUrl + firstPage + '" title="prev" class="kuma-icon kuma-icon-chevron-left"></a></li>').appendTo(this.$wrap) : $('<li class="prev" data-index="prev"><a href="' + "javascript:;" + '" title="prev" class="kuma-icon kuma-icon-chevron-left"></a></li>').appendTo(this.$wrap);
            if (this.page == 1) {
                $prev.addClass("disabled");
            }
            if (this.maxPage >= 1 && this.options.type !== "tiny") {
                if (this.options.redirectUrl) {
                    this.$wrap.append($('<li data-index="1"><a href="' + this.options.redirectUrl + 1 + '">1</a></li>'));
                } else {
                    this.$wrap.append($('<li data-index="1"><a href="' + "javascript:;" + '">1</a></li>'));
                }
            }
            if (this.maxPage > 1 && this.options.type !== "tiny") {
                startPage = this.page - 2 > 2 ? this.page - 2 : 2;
                endPage = this.page + 2 < this.maxPage ? this.page + 2 : this.maxPage - 1;
                if (this.page - 2 > 2) {
                    this.$wrap.append($('<li class="disabled no-page"><a href="javascript:;" style="border:0 none;">…</a></li>'));
                }
                for (startPage; startPage <= endPage; startPage++) {
                    if (this.options.redirectUrl) {
                        var $li = $('<li data-index="' + startPage + '"><a href="' + this.options.redirectUrl + startPage + '">' + startPage + "</a></li>").appendTo(this.$wrap);
                    } else {
                        var $li = $('<li data-index="' + startPage + '"><a href="' + "javascript:;" + '">' + startPage + "</a></li>").appendTo(this.$wrap);
                    }
                }
                if (this.page + 3 < this.maxPage) {
                    this.$wrap.append($('<li class="disabled no-page"><a href="javascript:;" >…</a></li>'));
                }
                if (!this.options.redirectUrl) {
                    this.$wrap.append($('<li data-index="' + this.maxPage + '"><a href="javascript:;">' + this.maxPage + "</a></li>"));
                } else {
                    this.$wrap.append($('<li data-index="' + this.maxPage + '"><a href="' + this.options.redirectUrl + this.maxPage + '">' + this.maxPage + "</a></li>"));
                }
            }
            //刷新分页的时候,把总数也刷新下
            this.$container.find(".total-count-num").text(this.total);
            if (this.options.type === "tiny") {
                this.$container.find(".tiny-total-num").text(this.maxPage);
                this.$container.find(".tiny-current-num").text(this.page);
            }
            if (this.options.redirectUrl) {
                $next = $('<li class="next" data-index="next"><a class="kuma-icon kuma-icon-chevron-right" href="' + this.options.redirectUrl + lastPage + '" title="next"></a></li>').appendTo(this.$wrap);
            } else {
                $next = $('<li class="next" data-index="next"><a class="kuma-icon kuma-icon-chevron-right" href="' + "javascript:;" + '" title="next"></a></li>').appendTo(this.$wrap);
            }
            // 末页的功能不需要
            // if (_this.options.redirectUrl) {
            //     $last = $('<li data-index="' + _this.maxPage + '"><a href="' + _this.options.redirectUrl + lastPage + '" title="末页"><span>&#xe64b;</span></a></li>' + $extends).appendTo(_this.$wrap);
            // } else {
            //     $last = $('<li data-index="' + _this.maxPage + '"><a href="' + "javascript:;" + '" title="末页"><span>&#xe64b;</span></a></li>' + $extends).appendTo(_this.$wrap);
            // }
            //TODO here should add last page!  and more [total page,page size settings!]
            if (this.page == this.maxPage) {
                $next.addClass("disabled");
            }
            this.$wrap.find("li[data-index=" + this.page + "]").addClass("active");
            //make sure is this OK？ TODO
            this.$wrap.find("li").addClass("fd-clr");
        },
        onPagingClicked: function(e) {
            var _this = this, $target = $(e.currentTarget), index = $target.data("index"), page = 1;
            if ($target.hasClass("active")) {
                return;
            }
            this.$wrap.find("li").removeClass("active");
            $target.addClass("active");
            switch (index) {
              case "prev":
                page = _this.page - 1 < 1 ? 1 : _this.page - 1;
                break;

              case "next":
                page = _this.page + 1 > _this.maxPage ? _this.maxPage : _this.page + 1;
                break;

              case "first":
                page = 1;
                break;

              case "last":
                page = _this.maxPage;
                break;

              default:
                page = index;
                break;
            }
            this.trigger("pagination:goto", this.page);
            if (this.options.onPageChanged && $.isFunction(this.options.onPageChanged)) {
                this.options.onPageChanged.call(_this, page);
            }
        },
        setPaging: function(options) {
            this.total = options.total;
            this.page = options.page;
            this.pageSize = options.size ? options.size : this.options.size;
            this.maxPage = Math.ceil(this.total / this.pageSize);
            this.trigger("page_updated");
            if (!this.options.showOnePage) {
                if (this.options.type == "table") {
                    if (this.total < 10) {
                        this.$container.hide();
                    } else {
                        this.$container.show();
                    }
                } else {
                    if (this.maxPage <= 1) {
                        this.$container.hide();
                    } else {
                        this.$container.show();
                    }
                }
            }
            //如果页面pagesize与sizeList相匹配，则让sizeList选中
            var _this = this;
            if (_this.options.showSizeList) {
                $.each(_this.options.sizeList, function(i, item) {
                    if (_this.pageSize == item) {
                        //_this.showSizeSelector.select(i);
                        // select 方法对导致onchange事件触发，此处仅更改序号
                        _this.showSizeSelector.set("selectedIndex", i);
                    }
                });
            }
            return this;
        },
        destroy: function() {
            //2.0.7版本开始新增
            this.$container.remove();
            if (this.hasOwnProperty("element")) {
                delete this.element;
            }
            if (this.hasOwnProperty("$el")) {
                delete this.$el;
            }
            if (this.hasOwnProperty("$container")) {
                delete this.$container;
            }
            if (this.hasOwnProperty("$wrap")) {
                delete this.$wrap;
            }
            if (this.hasOwnProperty("ec")) {
                delete this.ec;
            }
            //2.0.11 fixed remove kuma-select
            if (this.options.showSizeList) {
                this.showSizeSelector.destroy();
            }
            if (this.hasOwnProperty("options")) {
                delete this.options;
            }
        }
    });
    module.exports = Pagination;
});
