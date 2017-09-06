---
title: 批量生成SQL辅助工具
category: 工具
tags: 辅助工具
---

{{ page.title }}
===
<html>

<head>
    <title></title>
    <script src="{{ BASE_PATH }}/articles/assets/js/vue.min.js"></script>
</head>

<body>
    <div id="app">
        <div>
            <textarea rows="20" style="width:48%" placeholder="原始字符串" v-model="originalStr"></textarea>
            <textarea rows="20" style="width:48%" placeholder="生成字符串" v-model="generateStr"></textarea>
        </div>
        <div><a href="/articles/">返回</a></div>
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            originalStr: '',
            generateStr: ''
        },
        watch: {
            "originalStr": function (nVal, oVal) {
                this.generateStr = '';
                var _self = this;
                if (nVal) {
                    var array = nVal.split('\n');
                    array.forEach(function (item, index) {
                        if (index == array.length - 1) {
                            _self.generateStr += "'" + item + "'";
                        } else {
                            _self.generateStr += "'" + item + "',\n";
                        }
                    });
                } else {
                    _self.generateStr = '';
                }
            }
        }
    });

</script>

</html>