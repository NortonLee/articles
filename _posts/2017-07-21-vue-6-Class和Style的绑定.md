---
layout: post
title: 六、Class和Style的绑定
category: Vue.js
---

{{ page.title }}
===
>

1. class对象语法
语法：v-bind:class="{'css样式1': 真值表达式1, 'css样式2': 真值表达式2}"。
该指令可以与普通的class共同使用。
{% highlight html %}
   <div id="app" class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>
{% endhighlight %}
{% highlight js %}
   var vm = new Vue({
        el: '#app',
        data: {
            isA: true,
            isB: false
        }
    })
{% endhighlight %}
最终页面将渲染为：
{% highlight html %}
   <div id="app" class="static class-a"></div>
{% endhighlight %}

2\. class数组语法
v-bind:class 指令可以接收一个数组，以应用一个class列表。
{% highlight html %}
   <div id="app" class="static" v-bind:class="[classA,classB]"></div>
{% endhighlight %}
{% highlight js %}
   var vm = new Vue({
        el: '#app',
        data: {
            classA: 'class-a',
            classB: 'class-b'
        }
    })
{% endhighlight %}
最终页面将渲染为：
{% highlight html %}
   <div id="app" class="static class-a"></div>
{% endhighlight %}

3\. style对象语法
语法：v-bind:style="{属性名1：表达式1, 属性名2：表达式2}"
{% highlight html %}
   <div id="app" v-bind:style="{ margin: marginValue, text-align: textAlign }"></div>
{% endhighlight %}
{% highlight js %}
   var vm = new Vue({
        el: '#app',
        data: {
            marginValue: "10px",
            textAlign: "center"
        }
    })
{% endhighlight %}
最终页面将渲染为：
{% highlight html %}
   <div id="app" style="margin:10px;text-align:center;"></div>
{% endhighlight %}
该指令也可以与普通的style属性同时存在。

4\. style数组语法
v-bind:style 指令也可以接收一个数组，会将多个样式应用到该元素上。
{% highlight html %}
   <div id="app" v-bind:style="[styleA,styleB]"></div>
{% endhighlight %}
{% highlight js %}
   var vm = new Vue({
        el: '#app',
        data: {
            styleA: 'margin:10px',
            styleB: 'text-align:center'
        }
    })
{% endhighlight %}
最终页面将渲染为：
{% highlight html %}
   <div id="app" style="margin:10px;text-align:center;"></div>
{% endhighlight %}
