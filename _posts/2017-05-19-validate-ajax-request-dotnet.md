---
layout: post
title: .Net服务端验证客户端请求是否为ajax
category: 技术
tags: .NET
---

{{ page.title }}
===

> 最近在做服务器端拦截客户端请求，由于ajax和form直接提交方式不同，需要识别客户端的请求类型。

在MVC中，我们直接可以用Request.IsAjaxRequest()来判断，但是这个方法只是针对HttpRequestBase的，如果要在Global.asax中处理时会发现只有HttpRequest。
    
针对Global中处理有两种解决方法：
1. 直接在Header里面判断X-Reqeust-Width的值是否为XMLHttpRequest。
{% highlight C# %}
    if(HttpContext.Current.Request.Headers["X-Request-Width"] == "XMLHttpReqeust")
    {
        ...
    }
{% endhighlight %}
 2\. 使用HttpRequestWrapper将HttpReqeust包装成HttpRequestBase，然后使用IsAjaxReqeust方法验证。
{% highlight C# %}
    if (((new HttpRequestWrapper(curContext.Request)).IsAjaxRequest()))
    {
        ...
    }
{% endhighlight %}