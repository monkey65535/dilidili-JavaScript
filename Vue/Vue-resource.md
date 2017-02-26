# Vue-resource

标签（空格分隔）： Vue

---
Vue本身并不支持数据交互，所以我们可以使用Vue-resourec来实现与后端的数据交互

## 1.使用Vue-resource
可以在Vue下面引入Vue-resource来使用Vue-resource
```
<script src="js/vue.js"></script>
<script src="js/vue-resource.min.js"></script>
```
当引入Vue-resourec的时候，会在Vue实例身上绑定一个`$http`对象，所有的数据交互方法都会在这个对象下进行。
**Vue-resource方法遵循ES6的Promises语法。**

## 2.get

###  2.1使用get方法请求一个数据
get方法的第一个参数是url
```
获取一个普通文本数据:
var vm = new Vue({
    el:'body',
    data:{},
    methods:{
        show:function(){
            this.$http.get('a.txt').then(function(res){
                console.log(res);
            },function(res){
                alert(res.status);
            });
        }
    }
});
```
其中，返回的参数是一个对象
![image_1b3mhcj7q59cabt1s91fi7t829.png-13.9kB][1]
对象的status是状态码

### 2.2 使用get发送数据
get方法的第二个参数是数据。
```
var vm = new Vue({
    el:'body',
    data:{},
    methods:{
        show:function(){
            this.$http.get('a.php,{
                a:1,
                b:2
            }').then(function(res){
                console.log(res);
            },function(res){
                alert(res.status);
            });
        }
    }
});
```

## 3.post
在原生的AJAX中，使用POST方法需要设置请求头
```
ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
```
同样的，在Vue-resource中也需要设置请求头。  
我们在`$http.post`的第三个参数去设置请求头：
```
var vm = new Vue({
    el:'body',
    data:{},
    methods:{
        show:function(){
            this.$http.get('a.php',{
                a:1,
                b:2
            },{
                emulateJSON:true
            }).then(function(res){
                console.log(res.body);
            },function(res){
                alert(res.status);
            });
        }
    }
});
```

## 4.JSONP
Vue-resource使用JSONP的方式如下(以百度为例)
```
var vm = new Vue({
    el:'body',
    data:{},
    methods:{
        show:function(){
            this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
                word:'a'
            },{
                jsonp:'cb'
            }).then(function(res){
                console.log(res);
            },function(res){
                console.log(res);
            })
        }
    }
});
```
JSONP使用get方法，所以不需要设置请求头，但是需要设置callback。
Vue-resource设置callback的方法和jQuery类似，在第三个参数中设置jsonp，value就是callback函数的名字。


一个案例：
简单的百度搜索
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="force-rendering" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>weibo</title>
    <style>
        .grey{
            background: #eee;
        }
    </style>
</head>
<body>
<div id="box">
    <input type="text" v-model="search" @input="searchFn($event)" @keydown.down.prevent="downFn()" @keydown.up.prevent="upFn()" @keydown.enter="baidu()">
    <ul searchData.length !== 0>
        <li v-for="value in searchData" :class="{grey:this.nowIndex == $index}">{{$index}} + {{value}}</li>
    </ul>
    <p v-show="searchData.length === 0">暂无数据</p>

</div>

<script src="js/vue.js"></script>
<script src="../vue-resource.js"></script>
<script>
    new Vue({
        el:'#box',
        data:{
            searchData:[],
            search:'',
            nowIndex:-1
        },
        methods:{
            searchFn:function(ev){
                if(ev.keyCode == 38 || ev.keyCode == 40){
                    return;
                }

                this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
                    wd:this.search
                },{
                    jsonp:'cb'
                }).then(function(re){
                    this.searchData = re.data.s;
                },function(re){
                    alert(re.status);
                });
            },
            downFn:function(){
                this.nowIndex ++;
                if(this.nowIndex >= this.searchData.length){
                    this.nowIndex = -1;
                }
                this.search = this.searchData[this.nowIndex];
            },
            upFn:function(){
               this.nowIndex --;
               if(this.nowIndex <=-1){
                   this.nowIndex =this.searchData.length-1;
               }
                this.search = this.searchData[this.nowIndex];
            },
            baidu:function(){
                window.open('https://www.baidu.com/s?wd='+this.search);
                this.search = "";
            }
        }
    })
</script>
</body>
</html>
```

  [1]: http://static.zybuluo.com/dilidili/gcywu2o6yguwvhox9aqmf81a/image_1b3mhcj7q59cabt1s91fi7t829.png