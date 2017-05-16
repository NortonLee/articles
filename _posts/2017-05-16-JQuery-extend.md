---
layout: post
title: JQuery $.extend()的使用
category: 技术
tags: jquery
---

{{ page.title }}
===

1. 合并多个对象
{% highlight js %}
var Css1={size: "10px",style: "oblique"} 
var Css2={size: "12px",style: "oblique",weight: "bolder"} 
$.extend(Css1,Css2) 

//结果:Css1的size属性被覆盖,而且继承了Css2的weight属性 
// Css1 = {size: "12px",style: "oblique",weight: "bolder"} 
{% endhighlight %}

2\. 深度嵌套对象
{% highlight js %}
$.extend( 
    { name: "John", location: { city: "Boston" } }, 
    { last: "Resig", location: { state: "MA" } 
}); 

 //结果：{ name: "John", last: "Resig", location: { state: "MA" } }

//深层合并
$.extend(true, 
    { name: "John", location: { city: "Boston" } }, 
    { last: "Resig", location: { state: "MA" } 
}); 

//结果：
{ name: "John", last: "Resig", location: { city: "Boston", state: "MA" } } 
{% endhighlight %}

3\.给JQuery添加静态方法
{% highlight js %}
$.extend({ 
    add:function(a,b){return a+b;}, 
    minus:function(a,b){return a-b}, 
    multiply:function(a,b){return a*b;}, 
    divide:function(a,b){return Math.floor(a/b);} 
}); 

var sum = $.add(3,5)+$.minus(3,5)+$.multiply(3,5)+$.divide(5,7); 
console.log(sum);
{% endhighlight %}

4\. 扩展方法

JQuery提供两种扩展方法：
$.fn.extend(obj);//扩展实例方法
$.extend(ojb);//扩展静态方法
{% highlight js %}
$.fn.extend({name:function(){
    console.log("1")
},age:12})
a=$('body')
a.name() //1
{% endhighlight %}
