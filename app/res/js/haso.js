"use strict";angular.module("haso",["ngRoute","ngResource"]).config(["$routeProvider",function(a){a.when("/",{redirectTo:"/welcome"}).when("/welcome",{templateUrl:"template/page/home.htm",controller:"homeController"})}]).run(["$rootScope","$templateCache","$timeout",function(a,b){a.domain=document.domain.replace(/^(.+?\.)??(?=(test\.)?[^.]+\.\w+$)/,""),a.timestamp=parseInt(Date.now()/1e3,10),b.put("template/common/wrapper.htm",'<div class="wrapper"><header></header><div class="container" ng-view></div><footer></footer></div>'),b.put("template/common/header.htm",'<div class="header"><div class="logo"><h1><a href="/">一起装逼吧</a></h1></div><div class="clearfix"></div><ul class="nav"><li ng-repeat="nav in navs" ng-init="lock=false" ng-mouseenter="lock=!lock" ng-mouseleave="lock=!lock"><a ng-href="{{ nav.url }}" ng-bind="nav.name"></a><ul ng-if="nav.items" ng-show="lock"><li ng-repeat="child in nav.items"><a ng-href="{{ child.url }}" ng-bind="child.name"></a></li></ul></li></ul></div>'),b.put("template/common/footer.htm",'<div class="footer"><a href="http://www.miibeian.gov.cn/">鄂ICP备88888888号</a> · <a href="">关于装逼</a> · <a href="">投放广告</a> · <a href="">友情链接</a></div>'),b.put("template/page/home.htm",'<div class="content"><article></article></div><div class="sidebar"></div>'),b.put("template/module/article.htm",'<ul class="article"><li ng-repeat="article in articles"><a class="thumbs" style="background-image:url({{ article.thumbs }});"></a><div class="details"><div class="comment">{{ article.comment }}</div><span><a href="{{ article.url }}">{{ article.tags }}</a> , {{ article.postdate | formatDate }}</span><a href="{{ article.url }}"><h2>{{ article.subject }}</h2></a><p>{{ article.description }}</p><div class="star"><i class="icon-star-o"></i>{{ article.like }}</div></div></li></ul>')}]).directive("wrapper",function(){return{restrict:"E",replace:!0,templateUrl:"template/common/wrapper.htm"}}).directive("header",function(){return{restrict:"E",replace:!0,controller:["$scope","$resource",function(a,b){b("data/navs.json").query(function(b){var c=[];angular.forEach(b,function(a){angular.forEach(a,function(a){c.push(a)})}),angular.forEach(c,function(a,b){var d=[];angular.forEach(a.items,function(a){d.push(a)}),c[b].items=d}),a.navs=c})}],templateUrl:"template/common/header.htm"}}).directive("article",function(){return{restrict:"E",replace:!0,templateUrl:"template/module/article.htm"}}).directive("footer",function(){return{restrict:"E",replace:!0,templateUrl:"template/common/footer.htm"}}).controller("homeController",["$scope","$http",function(a,b){b.get("data/article.json").success(function(b){a.articles=b})}]).filter("formatDate",["$filter",function(a){return function(b){if(b.length<13)return b;var c=Date.now(),d=parseInt((c-b)/1e3,10);return 0>d?"刚刚":60>d?d+"秒前":3600>d?Math.ceil(d/60)+"分钟前":(d=(new Date(a("date")(c,"yyyy-MM-dd")).getTime()-new Date(a("date")(b,"yyyy-MM-dd")).getTime())/1e3,0==d?a("date")(b,"HH:ii"):86400==d?"昨天"+a("date")(b,"HH:ii"):172800==d?"前天"+a("date")(b,"HH:ii"):new Date(a("date")(c,"yyyy")).getTime()==new Date(a("date")(b,"yyyy")).getTime()?a("date")(b,"MM-dd HH:mm"):void 0)}}]);