---
layout: post
title: Git使用经验记录
category: 工具
tags: Git
---

{{ page.title }}
===

> 本文记录使用Git代码管理工具适用的经验记录。

1. 修改Repository为taobao镜像
> --registry https://registry.npm.taobao.org <br>
>例如: npm install packagename --registry https://registry.npm.taobao.org

2. 对比两个分支修改的文件,--stat显示文件，不加该参数显示文件内容。
> git diff branch1 branch2 --stat