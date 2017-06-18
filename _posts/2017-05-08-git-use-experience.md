---
layout: post
title: Git使用经验记录
category: 工具
tags: Git
---

{{ page.title }}
===

> 本文记录使用Git代码管理工具实用的经验记录。

1. 修改Repository为taobao镜像
> --registry https://registry.npm.taobao.org <br>
>例如: npm install packagename --registry https://registry.npm.taobao.org

2. 对比两个分支修改的文件,--stat显示文件，不加该参数显示文件内容。
> git diff branch1 branch2 --stat

3. 添加git命令别名，可以使用命令设置:
> git config --global alias.st status

   当然也可以在.gitconfig文件中一次性设置好：
    > [alias]  
    >  co = checkout<br>
    st = status<br>
    ci = commit<br>
    br = branch<br>
    dt = difftool<br>
    mt = mergetool<br>
    last = 'log -1'<br>
4. 设置文本编辑器，用来commit时候填写comments。
> [core]<br>
> editor = \"D:\\Program Files (x86)\\Tools\\Notepad.exe\"

5. 撤销单个文件
> git checkout -- filepath

6. 查看所有分支
> git branch -a

7. 查看远端分支
> git branch -r

8. 基于分支新建一个分支
> git co -b based_on_branch new_branch

9. Git Flow
> ![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170618\1.png)