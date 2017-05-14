---
layout: post
title: 前端CSS使用经验记录
category: 技术
tags: 前端 css
---

{{ page.title }}
===

> 本文记录在前端开发中经常使用的一些样式处理。

1. div中文本换行展示
> white-space:normal;

2. 禁止页面选中复制
>-moz-user-select: none; <br>
>-webkit-user-select: none; <br>
>-ms-user-select: none; <br>
>-khtml-user-select: none; <br>
>user-select: none; <br>

3. 圆角边框
> border-radius:15px;

4. CSS3动画效果

    >div{<br>
    >   animation: myfirst 5s;<br>
    >   -moz-animation: myfirst 5s;	/* Firefox */<br>
    >   -webkit-animation: myfirst 5s;	/* Safari 和 Chrome */<br>
    >   -o-animation: myfirst 5s;	/* Opera */<br>
    >}

    >@keyframes myfirst<br>
    >{<br>
    >   from {background: red;}<br>
    >   to {background: yellow;}<br>
    >}<br>
    >
    >@-moz-keyframes myfirst /* Firefox */<br>
    >{
    >   from {background: red;}<br>
    >   o {background: yellow;}<br>
    >}<br>
    >
    >@-webkit-keyframes myfirst /* Safari 和 Chrome */<br>
    >{
    >   from {background: red;}<br>
    >   to {background: yellow;}<br>
    >}<br>
    >
    >@-o-keyframes myfirst /* Opera */<br>
    >{
    >   from {background: red;}<br>
    >   to {background: yellow;}<br>
    >}

5. CSS3过度效果
<table style="width: 80%;background:#333;font-size:80%;text-align:center;" border="0" cellspacing="1" cellpadding="1">
    <tbody style="background:#fff;">
        <tr>
            <th style="width:30%;">属性</th>
            <th>描述</th>
        </tr>
        <tr>
            <td>transition</td>
            <td>简写属性，用于在一个属性中设置四个过渡属性。</td>
        </tr>
        <tr>
            <td>transition-property</td>
            <td>规定应用过渡的 CSS 属性的名称。</td>
        </tr>
        <tr>
            <td>transition-duration</td>
            <td>定义过渡效果花费的时间。默认是 0。</td>
        </tr>
        <tr>
            <td>transition-timing-function</td>
            <td>规定过渡效果的时间曲线。默认是 "ease"。</td>
        </tr>
        <tr>
           <td>transition-delay</td>
            <td>规定过渡效果何时开始。默认是 0。</td>
        </tr>
    </tbody>
</table>