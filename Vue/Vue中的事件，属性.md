# Vue中的事件，属性

标签（空格分隔）： Vue

---
## 1.事件对象 `$event`
vue中封装了事件对象，在事件调用的时候传入参数`$event`便可以使用 
```
<input type="button" value="按钮" @click="show($event)">  

 window.onload=function(){
    new Vue({
        el:'#box',
        data:{

        },
        methods:{
            show:function(ev){
                alert(ev.clientX);
            }
        }
    });
};
```
在这个`$event`中封装了原生JS的事件对象的各种方法，使用方法和原生JS完全相同。  

## 2.事件冒泡和默认事件
在vue中，有两种取消事件冒泡的方式：

 - 1.使用事件对象
 - 2.在绑定事件时使用vue内置的阻止事件冒泡的方法

### 2.1 使用事件对象组织事件冒泡和默认事件

```
<div id="box">
    <div @click="show2()">
        <input type="button" value="按钮" @click="show()" @mousemove="stop($event)">
    </div>
</div>

window.onload=function(){
    new Vue({
        el:'#box',
        data:{

        },
        methods:{
            show:function(ev){
                alert(1);
                ev.cancelBubble=true;
                
            },
            show2:function(){
                alert(2);
            },
            stop:function(ev){
                //在input框中阻止拖动选择文字
                ev.preventDefault();
            }
        }
    });
};
```
使用事件对象阻止事件冒泡和默认事件，使用Js的原生的方法即可。  

### 2.2使用Vue方法阻止  
```
 <div @click="show2()">
    <input type="button" value="按钮" @click.stop="show()" @mousemove.prevent="stop()">
</div>

 window.onload=function(){
    new Vue({
        el:'#box',
        data:{

        },
        methods:{
            show:function(){
                alert(1);
            },
            show2:function(){
                alert(2);
            },
            stop:function(){
                //在input框中阻止拖动选择文字
            }
        }
    });
};
```
Vue中提供了`.stop`和`.prevent`方法，分别来阻止事件冒泡和浏览器默认事件

## 3.键盘事件
### 3.1 keyCode
在Vue中封装了keyCode事件，可以在事件绑定的时候使用后缀来添加，类似组织事件冒泡的方法。
```
 <input type="text" @keydown.13="show()">
```
### 3.2 常用键盘按键  
在Vue中封装了常用的键盘按键的事件，例如回车,上下左右等等。
```
<input type="text" @keydown.enter="show()">
<input type="text" @keydown.up="show()">
<input type="text" @keydown.down="show()">
<input type="text" @keydown.left="show()">
<input type="text" @keydown.right="show()">
```
## 4.属性绑定
在Vue中使用v-bind来绑定在Vue实例中有体现属性

Vue不推荐使用这种方式，使用这样的方式可以展示出图片，但是会在控制台报错
```
<img src="{{url}}" />
```

Vue推荐使用v-bind来绑定属性
```
<img v-bind:src="url" />
```
`v-bind：src`可以简写为`：src`

### 4.1 class
当使用Vue中的数据来修改class的时候，有以下几种用法：

#### 4.1.1 使用数组进行class绑定
多个class绑定的时候，可以使用数组的形式去绑定，但是数组的值对应的是Vue对象中的数据。
```
<style>
    .red{  color:red;  }
    .blue{  background: blue;  }
</style>

<div id="box"  :class="[red,b]">AAAAA</div>

<script src="../js/vue.js"></script>
<script>
    new Vue({
        el:'#box',
        data:{
            red:'red',
            b:'blue'
        }
    });
</script>
```

#### 4.1.2 使用对象进行class的绑定
可以使用一个对像来绑定这个class，这种情况多用于在不同情况下添加或者取消class
```
<div id="box"  :class="{red:red,blue:b}">AAAAA</div>

<script src="../js/vue.js"></script>
<script>
    new Vue({
        el:'#box',
        data:{
            red:'red',
            b:true
        }
    });
</script>
```
在这种绑定方式下，class对应的对象的key是className,class对应的value是一个数据。当这个数据是false的时候就不添加这个class，反之添加这个class

也可以直接使用vue实例中的数据去绑定class
```
<div id="box"  :class="classJson">AAAAA</div>

<script src="../js/vue.js"></script>
<script>
    new Vue({
        el:'#box',
        data:{
            classJson:{
                red:true,
                blue:true
            }
        }
    });
</script>
```

### 4.2 style

#### 4.2.1 使用数组进行style绑定
可以使用数组对style进行绑定，但是style绑定的数组中的值必须在Vue实例中以对象的形式去展现
```
<div id="box">
    <p :style="[a,b]">AAAA</p>
</div>

<script>
    new Vue({
        el:'#box',
        data:{
            a:{
                color:'red'
            },
            b:{
                backgroundColor:'blue'
            }
        }
    });
</script>
```
符合样式必须使用驼峰命名法

#### 4.2.1 使用对象进行style绑定
```
<div id="box">
    <p :style="[a,b]">AAAA</p>
    <P :style="json">bbbbb</P>
</div>
<script>
    new Vue({
        el:'#box',
        data:{
            a:{
                color:'red'
            },
            b:{
                backgroundColor:'blue'
            },
            json:{
                color:'white',
                backgroundColor:'black'
            }
        }
    });
</script>
```

## 5 模板
### 5.1 数据只绑定一次
当在{{}}中的数据使用*时，数据更新不会触发页面的更新
```
<div id="box">
    <input type="text" v-model="msg">
    <hr>
    <p>{{msg}}</p>
    <p>{{*msg}}</p>
</div>
<script src="../js/vue.js"></script>
<script>
    new Vue({
        el: '#box',
        data:{
            msg:'ACS'
        }
    })
</script>
```
### 5.2html转意输出
如果在数据绑定的时候使用`{{{}}}`的时候，可以吧html转为真实的标签

### 5.3 过滤器
Vue.js 允许你自定义过滤器，被用作一些常见的文本格式化。过滤器应该被添加在 mustache 插值的尾部，由“管道符”指示：
```
{{ message | capitalize }}
```

**Vue 2.x 中，过滤器只能在 mustache 绑定中使用。为了在指令绑定中实现同样的行为，你应该使用计算属性。**

可以在Vue实例中的filters来自定义过滤器
```
new Vue({
  // ...
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```
过滤器可以串联：
```
{{ message | filterA | filterB }}
```
也可以接受参数
```
{{ message | filterA('arg1', arg2) }}
```
这里，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数。