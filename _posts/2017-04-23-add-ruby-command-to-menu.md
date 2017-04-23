---
layout: post
title: Win10添加文件夹右键Ruby运行菜单
category: 技术
---
{{ page.title }}
===

> 本文记录在Win10环境下如何像Git一样，能够快速在项目文件夹中快速启动Ruby。

1. cmd命令行中输入regedit，打开windows注册表。
2. 在HKEY_CLASSES_ROOT下找到Directory。

    ![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170423\1.png)
3. Directory节点下找到Background的shell，新建key，名称定义为ruby_shell。

    ![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170423\2.png)
4. 在ruby_shell节点下，默认名称的Data可以设置注册命令的名称，新建一个字符串值Icon，指定一张菜单中命令展示的图标。

    ![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170423\3.png)
5. ruby_shell节点下新建key，名称为command，并在默认名称的Data中指定带ruby运行参数的cmd路径。这个路径可以从ruby运行窗口的快捷方式的属性中找到。

    ![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170423\4.png)
6. 不需要重启电脑，完成以上步骤后，在文件夹中空白部分右键菜单中，可以看到步骤4中设置的command命令名称了。

    ![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170423\5.png)

7. 如果需要在点击文件夹右键菜单中也展示上述命令，可以在HKEY_CLASSES_ROOT下找到Folder节点，同样在shell节点下重复上述操作即可。

> 在windows系统下操作注册表一定要慎重，一定要注意备份，出现问题可以随时还原。