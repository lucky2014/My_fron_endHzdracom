/*global angular,alert,w5cValidator*/
(function () {
    "use strict";
    var aMailServices = angular.module("AMail", []);
    
    function emailRouteConfig($routeProvider){
        $routeProvider.when("/", {
            controller: ListController,
            templateUrl: "list.html"
        }).when("/view/:id", {
            controller: DetailController,
            templateUrl: "detail.html"
        }).otherwise({
            ewdirectTo: "/"
        });
    }

    aMailServices.config(emailRouteConfig);

    var messages = [{
        id:0, sender:"jeac@qq.com",subject:"Hi there,old friend", 
        date:"Dec 7, 2013 12:12:00",recipients: ["177681@qq.com"],
        "message": "Hey,we should get together for ..."
    },
    {
        id:0, sender:"jeac@qq.com",subject:"Hi there,old friend", 
        date:"Dec 7, 2013 12:12:00",recipients: ["177681@qq.com"],
        "message": "Hey,we should get together for ..."
    },
    {
        id:0, sender:"jeac@qq.com",subject:"Hi there,old friend", 
        date:"Dec 7, 2013 12:12:00",recipients: ["177681@qq.com"],
        "message": "Hey,we should get together for ..."
    }];

    function ListController($scope){
        $scope.message = messages;
    }

    function DetailController($scope,$routeParams){
        $scope.message = messages[$routeParams.id];
    }


})();