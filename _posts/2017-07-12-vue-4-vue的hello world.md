---
layout: post
title: 四、Vue的hello world
category: Vue.js
---

{{ page.title }}
===
> 

### html
{% highlight html %}
    <div id="demo">
    {% raw %}
        {{ msg }}
    {% endraw %}
    </div>
{% endhighlight %}
### js
{% highlight javascript %}
   var vm = new Vue({
        el:'#demo',
        data:{
            msg:'hello world'
        }
    })
{% endhighlight %}

以上代码的几点说明：
1. html 代码中的 {% raw %}{{ msg }}{% endraw %} 为数据绑定
2. 在使用vue前，必须要通过构造器 new Vue({}) 进行实例化
3. 每个vue实例都会代理其data和methods对象里面的属性和方法。比如：vm.$data.msg === vm.msg
4. vue还有其他一些实例属性和方法，比如vm.$watch用来监控元素值变化的，更多请参考[官方文档](http://cn.vuejs.org/v2/api/#实例属性)