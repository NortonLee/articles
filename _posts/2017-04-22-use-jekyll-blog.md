---
layout: post
title: 使用Jekyll搭建GitHub Project Pages
category: 工具
tags: GitPages 静态博客 Jekyll
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
{% highlight html %}
<div id="home">
  {\% for category in site.categories \%}
    <div class="category"> \{\{ category | first \}\} (\{\{ category.last.size \}\}) </div>
    <ul class="posts">
    \{\% for post in site.posts \%\}
        \{\% if category.first == post.category \%\}
        <li>
          <span>\{\{ post.date | date: "%d/%m/%Y" \}\}</span> 
          <a href="/articles{{ post.url }}">\{\{ post.title \}\}</a>
        </li>
        \{\% endif \%\}
    \{\% endfor \%\}
  </ul>
  \{\% endfor \%\}
</div>
{% endhighlight %}
高亮部分代码需要添加转义，所以看到的内容多了个\字符。site.categories会查找config文件中定义的分类，或者在每个页面指定的分类集合。

5\. 文章分类

site.categories
上述文章列表中已经提到分类。

6\. 列表分页

7\. 使用评论插件

之前的Coolde博客中使用的是<strong>多说</strong>评论插件，前段时间收到通知，多说即将要关闭评论服务了，所以在本博中使用的是<strong>畅言</strong>。使用方式也是在需要出现评论的页面上引入js。不过畅言插件需要使用的域名必须要备案，否则只能试用。

![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170501\1.png)

如上图所示，我在文章详情的模版页中加入畅言提供的js，这样所有详情页面便会有畅言的评论功能了。
8\. 使用文章分享插件
>  文章分享使用的是bShare社会化分享插件，在文章详情页面添加以下js即可。

{% highlight js %}
<a class="bshareDiv" href="http://www.bshare.cn/share">分享按钮</a>
<script type="text/javascript" charset="utf-8" 
        src="http://static.bshare.cn/b/buttonLite.js#uuid=&amp;style=3&amp;fs=4&amp;textcolor=#000&amp;bgcolor=#DDD&amp;text=分享到">
</script>
{% endhighlight %}
9\. 本地中文路径编码
>
    修改安装目录\Ruby22-x64\lib\ruby\2.2.0\webrick\httpservlet下的filehandler.rb文件

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

 10\. 访问统计

 访问统计使用的是百度的网站统计，注册后获取js追踪代码，既可在百度统计管理后台看到对应的访客数据。
 {% highlight js %}
 <script>
    var _hmt = _hmt || [];
    (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?1a6df2e9fe5e42319ae9746603c45f5f";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
    })();
</script>
{% endhighlight %}

将以上代码添加到模版文件的head部位就可以了。

![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170501\10.png)


 11\. 404页面配置

使用腾讯公益404页面，在项目根目录下添加404.html页面，加入以下代码：
{% highlight js %}
<script type="text/javascript" 
        src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" 
        charset="utf-8" 
        homePageUrl="/" 
        homePageName="返回继续">
</script>
{% endhighlight %}

12\. CDN配置

由于GitHub服务器在国外，国内访问有时候会非常慢，选择了几款CDN产品，目前腾讯云有赠送几个月的CDN产品试用，所以就拿腾讯云练手了。

![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170501\5.png)

 添加域名后会给你的网站分配一个加速域名，www.coolde.cn.cdn.dnsv1.com，这个域名是加速域名到CDN节点的地址，直接访问无法获取到资源。

![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170501\6.png)

然后将需要加速的域名国内访问解析到上述的加速域名上，国外仍然保持直接访问github服务器。

![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170501\9.png)

设置完成后ping所要加速的域名，如果返回包含spcdntip节点的内容，说明CDN配置成功！

![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170501\7.png)

接下来在CDN配置中设置缓存配置，一般将静态资源比如html，js，css等不经常修改的文件设置稍微长时间的刷新时间，如果有动态内容比如aspx，php，jsp等文件，一般设置较短时间的刷新时间。当然可以根据自身情况，设置对应文件的刷新时长。

![content-image]({{ BASE_PATH }}\articles\assets\images\2017-doc\20170501\8.png)

如果修改了长刷新时间较长的文件内容，但又想立即看到更新，便可以使用上述功能进行手动更新，可以更新某一个文件或者某一个目录下所有文件。

以上CDN配置完成后，国内访问基本可以达到秒开的速度，体验还是非常不错的！