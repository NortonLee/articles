---
layout: post
title: JQuery 阻止元素发生默认行为
category: 技术
tags: jquery
---

{{ page.title }}
===

当元素叠加的时候，如果每个元素都有自己的行为，那么就会发生事件冒泡。<br>
JQuery提供了解决这种情况的方式:<br>
preventDefault()方法可以组织元素发生默认行为，比如a标签的打开链接行为。<br>
使用方式：<br>
event.preventDefault();<br>