---
layout: post
title: 使用Jekyll搭建GitHub Project Pages
category: 工具
---
{{ page.title }}
===
> 本文记录使用Jekyll搭建个人博客并且部署到GitHub。

1. Windows环境下Ruby, GEM 环境配置
    * 安装rubyinstaller
    * 安装RubyGems 包管理工具

        ruby setup.rb
2. Jekyll 安装

    gem install jekyll
3. 项目结构目录

    ![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170425\1.png)
    * _drafts 草稿，未发布的文章，在.gitignore中排除该目录。
    * _includes 存放一些公用文件，比如头部、尾部模版。
    * _layouts 输出模版
    * _posts 存放已经完成的文章
    * _site Jekyll 生成的静态网站目录，在.gitignore中排除该目录。
    * assets 存放样式、js脚本、图片等资源文件。
4. 文章列表展示
5. 文章分类
6. 列表分页
7. 使用评论插件
8. 使用文章分享插件
9. 本地中文路径编码
    
   > 修改安装目录\Ruby22-x64\lib\ruby\2.2.0\webrick\httpservlet下的filehandler.rb文件

{% highlight python %}
path = req.path_info.dup.force_encoding(Encoding.find("filesystem"))
+ path.force_encoding("UTF-8") # 加入编码
trailing_pathsep?(req.path_info)
{% endhighlight %}

{% highlight python %}
break if base == "/"
+ base.force_encoding("UTF-8") #加入編碼
break unless File.directory?(File.expand_path(res.filename + base))
{% endhighlight %}

10. 访问统计