---
layout: post
title: AngularJs - $http拦截器
category: 技术
tags: angularjs
---

{{ page.title }}
===

> 有时候系统会需要在客户端向服务器端发送请求时，以及服务端响应客户端时全局做一些处理，比如记录请求日志，处理异常等。angular提供了$http模块，我们可以添加对应的拦截器进行处理。

{% highlight js %}
angular.module("myApp", [])  
    .factory('httpInterceptor', [ '$q', '$injector',function($q, $injector) {  
        var httpInterceptor = {  
            'responseError' : function(response) {  
                //响应出错
                return $q.reject(response);  
            },  
            'response' : function(response) {  
                //成功响应  
                return response;  
            },  
            'request' : function(config) {  
                //成功请求 
                return config;  
            },  
            'requestError' : function(config){  
                //请求错误  
                return $q.reject(config);  
            }  
        }  
    return httpInterceptor;  
}
{% endhighlight %}

使用$httpProvider在config()中注册拦截器。

{% highlight js %}
angular.module("myApp", [])  
.config([ '$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('httpInterceptor');  
} ]);
{% endhighlight %}