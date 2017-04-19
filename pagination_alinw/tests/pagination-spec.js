define(function (require) {

    var Pagination = require('../src/pagination');
//    require('../src/pagination.css');
    var expect = require('expect');
    var sinon = require('sinon');
    var $ = require('$');

    mocha.setup({
        ignoreLeaks: true,
        timeout    : 0
    });

    describe('pagination', function () {
        var example;

        afterEach(function () {
            example && example.remove();
            example = null;
        })
        it('should render normal pagination', function () {
            example = $('<div id="pageEl"></div>');
            example.appendTo($('body'));
            var _size = 10, _total = 100;
            var tar = $("#pageEl");
            if (tar.data("pagesize")) {
                _size = tar.data("pagesize");
            } else {
                tar.data("pagesize", _size);
            }

            var pagination = new Pagination(tar, {
                page         : 1,
                redirectUrl  : '',
                sizeList     : [10, 20, 50],//For pagesize option select setting use!
                type         : 'common',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
                size         : _size,
                onPageChanged: function (page) {
                    pagination.setPaging({total: _total, page: page, size: $("#pageEl").data("pagesize")});
                }
            })
            pagination.setPaging({total: _total, page: 1, size: _size});
            expect(tar.find('.kuma-pagination').length).to.be(1);
            expect(tar.find('.common-cell').length).to.be(1);
            expect(tar.find('.jump-to-page').length).to.be(1);
            expect(tar.find('.prev').hasClass('disabled')).to.be(true);
            expect(tar.find('.next').hasClass('disabled')).to.be(false);
            expect(tar.find('li[data-index="1"]').hasClass('active')).to.be(true);
        });

        it('should render table pagination', function () {
            example = $('<div id="pageEl"></div>');
            example.appendTo($('body'));
            var _size = 10, _total = 100;
            var tar = $("#pageEl");
            if (tar.data("pagesize")) {
                _size = tar.data("pagesize");
            } else {
                tar.data("pagesize", _size);
            }

            var pagination = new Pagination(tar, {
                page         : 1,
                redirectUrl  : '',
                sizeList     : [10, 20, 50],//For pagesize option select setting use!
                type         : 'table',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
                size         : _size,
                onPageChanged: function (page) {
                    pagination.setPaging({total: _total, page: page, size: $("#pageEl").data("pagesize")});
                }
            });
            pagination.setPaging({total: _total, page: 1, size: _size});
            expect(tar.find('.kuma-pagination').length).to.be(1);
            expect(tar.find('.table-cell').length).to.be(1);
            expect(tar.find('.jump-to-page').length).to.be(0);
            expect(tar.find('.total-count').length).to.be(1);
            expect(tar.find('.kuma-select').length).to.be(1);
            expect(tar.find('.prev').hasClass('disabled')).to.be(true);
            expect(tar.find('.next').hasClass('disabled')).to.be(false);
            expect(tar.find('li[data-index="1"]').hasClass('active')).to.be(true);
        });

        it('less than 10 should hide select', function () {
            example = $('<div id="pageEl"></div>');
            example.appendTo($('body'));
            var _size = 10, _total = 10;
            var tar = $("#pageEl");
            if (tar.data("pagesize")) {
                _size = tar.data("pagesize");
            } else {
                tar.data("pagesize", _size);
            }

            var pagination = new Pagination(tar, {
                page         : 1,
                redirectUrl  : '',
                sizeList     : [10, 20, 50],//For pagesize option select setting use!
                type         : 'table',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
                size         : _size,
                onPageChanged: function (page) {
                    pagination.setPaging({total: _total, page: page, size: $("#pageEl").data("pagesize")});
                }
            });
            pagination.setPaging({total: _total, page: 1, size: _size});
            expect(tar.find('.kuma-pagination').length).to.be(1);
            expect(tar.find('.table-cell').length).to.be(1);
            expect(tar.find('.jump-to-page').length).to.be(0);
            expect(tar.find('.total-count').length).to.be(1);
            expect(tar.find('.kuma-select').length).to.be(1);
            expect(tar.find('.prev').hasClass('disabled')).to.be(true);
            expect(tar.find('.next').hasClass('disabled')).to.be(true);
            expect(tar.find('li[data-index="1"]').hasClass('active')).to.be(true);
        });

        it('click should change hash', function () {
            example = $('<div id="pageEl"></div>');
            example.appendTo($('body'));
            var _size = 10, _total = 100;
            var tar = $("#pageEl");
            if (tar.data("pagesize")) {
                _size = tar.data("pagesize");
            } else {
                tar.data("pagesize", _size);
            }

            var pagination = new Pagination(tar, {
                page         : 1,
                redirectUrl  : '#page',
                sizeList     : [10, 20, 50],//For pagesize option select setting use!
                type         : 'common',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
                size         : _size,
                onPageChanged: function (page) {
                    pagination.setPaging({total: _total, page: page, size: $("#pageEl").data("pagesize")});
                }
            });
            pagination.setPaging({total: _total, page: 1, size: _size});
            tar.find('li[data-index="2"]').find('a')[0].click()
            expect(location.hash).to.be('#page2');
            location.hash=""
        });


        it('destroy', function () {
            example = $('<div id="pageEl"></div>');
            example.appendTo($('body'));
            var _size = 10, _total = 100;
            var tar = $("#pageEl");
            if (tar.data("pagesize")) {
                _size = tar.data("pagesize");
            } else {
                tar.data("pagesize", _size);
            }

            var pagination = new Pagination(tar, {
                page         : 1,
                redirectUrl  : '#page',
                sizeList     : [10, 20, 50],//For pagesize option select setting use!
                type         : 'common',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
                size         : _size,
                onPageChanged: function (page) {
                    pagination.setPaging({total: _total, page: page, size: $("#pageEl").data("pagesize")});
                }
            });
            pagination.setPaging({total: _total, page: 1, size: _size});
            tar.find('li[data-index="2"]').find('a')[0].click()
            pagination.destroy();

        });


    });

});
