# 初识VUE

标签（空格分隔）： Vue

---

## 1.概述  
Vue.js（读音 /vjuː/, 类似于 view）是一个构建数据驱动的 web 界面的库。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。

Vue.js 自身不是一个全能框架——它只聚焦于视图层。因此它非常容易学习，非常容易与其它库或已有项目整合。另一方面，在与相关工具和支持库一起使用时，Vue.js 也能完美地驱动复杂的单页应用。

## 2.MVVM  
### 3.1 MVC
MVC模式的意思是，软件可以分成三个部分:

 - 视图（View）：用户界面。
 - 控制器（Controller）：业务逻辑
 - 模型（Model）：数据保存

各部分通讯方式为：

 - View 传送指令到 Controller
 - Controller 完成业务逻辑后，要求 Model 改变状态
 - Model 将新的数据发送到 View，用户得到反馈

MVC框架的代表是`Backbone`  

### 3.2 MVP
MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。  

 - 各部分之间的通信，都是双向的。
 - View 与 Model 不发生联系，都通过 Presenter 传递。
 - View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。

### 3.3 MVVM  
MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。 
唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。Angular 和 Ember 都采用这种模式。  


  参考链接：[MVC，MVP 和 MVVM 的图示-阮一峰](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

## 4.数据绑定  
### 4.1 插值  
数据绑定最基础的形式是文本插值，使用 `{{  }}` 语法（双大括号）：  
```
<span>TEXT: {{ text }}</span>
```
 `{{  }}`  标签会被相应数据对象的 text 属性的值替换。每当这个属性变化时它也会更新。
也可以处理单次插值，后续数据变化就不在进行改变了
```
<span>TEXT: {{*text}}</span>
```

 `{{  }}` 还可以放在html内
 
```
<li data-id="{{id}}"></li>
```

**VUE指令和自身特性是不可以插值的，如果使用了插值，vue发出警告**

插值还可以绑定表达式：
```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}
```
这些表达式将在所属的 Vue 实例的作用域内计算。一个限制是每个绑定只能包含**单个表达式**，因此下面的语句是无效的：
```
<!-- 这是一个语句，不是一个表达式： -->
{{ var a = 1 }}

<!-- 流程控制也不可以，可改用三元表达式 -->
{{ if (ok) { return message } }}
```
在Vue2.0中，只有插值可以使用fifter过滤器

## 5 指令
>指令 (Directives) 是特殊的带有前缀 v- 的特性。指令的值限定为绑定表达式，因此上面提到的 JavaScript 表达式及过滤器规则在这里也适用。指令的职责就是当其表达式的值改变时把某些特殊的行为应用到 DOM 上。

### 5.1 v-if
v-if指令 根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是`<template>`，将提出它的内容作为条件块。  

注意：v-if指令操作的是 **DOM** ，当表达式为`true`的时候，会把绑定的元素添加到DOM中，如果表达式为`false`，对应的元素就会从DOM中移除

```
<h1 v-if="ok">Yes</h1>
```
在使用v-if的同时也可以添加一个v-else
```
<div id="dom">
    <h1 v-if="ok">我是对的</h1>
    <h2 v-else="ok">我是错的</h2>
</div>

<script>
var vue = new Vue({
    el:'#dom',
    data:{
        ok:true
    }
});
</script>
```
上面的例子中，当data中的ok为`true`的时候，显示h1，否则显示h2
如果需要对多个标签的添加，可以使用`template`标签。在页面中这个标签不会被输出
```
<template v-if="ok">
    <div class="aaa">这里是true的模块儿内容</div>
    <div class="aaa">这里是true的模块儿内容</div>
    <div class="aaa">这里是true的模块儿内容</div>
    <div class="aaa">这里是true的模块儿内容</div>
</template>
<template v-else="ok">
    <div class="aaa">false</div>
    <div class="aaa">false</div>
    <div class="aaa">false</div>
    <div class="aaa">false</div>
</template>
```

### 5.2 v-else
可以用 v-else 指令给 v-if 或 v-show 添加一个 “else 块”
```
<div id="dom">
    <h1 v-show="ok">我是对的</h1>
    <h2 v-else="ok">我是错的</h2>
</div>
```

### 5.3 v-show
另一个根据条件展示元素的选项是 v-show 指令。用法大体上一样：
```
<div id="dom">
    <h1 v-show="ok">我是对的</h1>
</div>
<script>
var vue = new Vue({
    el:'#dom',
    data:{
        ok:true,
        end:false
    }
})
</script>
```
不同的是有 v-show 的元素会始终渲染并保持在 DOM 中。v-show 是简单的切换元素的 CSS 属性 display。

![image_1atdbuqrp1bvn10rg147m1u2amgr9.png-11.4kB](http://static.zybuluo.com/dilidili/n270517gwqfm0vmpmq3d59hj/image_1atdbuqrp1bvn10rg147m1u2amgr9.png)

**注意 v-show 不支持 `<template>` 语法。**

如果对`template`语法使用v-show指令，那么不会被渲染，DOM结构中会出现下图的样子

![v-show template](http://static.zybuluo.com/dilidili/5wot8ax6soc7y14pxkt9nvma/image_1atdbfmsd15366p81h04m9g1a4c9.png )  

**将v-show用在组件上的时候，因为指令的优先级，v-else会出现问题，所以不要这么做。我们可以使用另外一个v-show标签替换v-else**
例如：
```
<div id="dom">
    <h1 v-show="ok">我是对的</h1>
    <h2 v-show="!ok">我是错的</h2>
</div>
<script>
var vue = new Vue({
    el:'#dom',
    data:{
        ok:true,
        end:false
    }
})
</script>
```
### 5.4 v-model
>可以用 v-model 指令在表单控件元素上创建双向数据绑定。根据控件类型它自动选取正确的方法更新元素。尽管有点神奇，v-model 不过是语法糖，在用户输入事件中更新数据，以及特别处理一些极端例子。  

#### 5.4.1 文本的双向数据绑定
```
<!--text-->
<div id="inp">
    <span>name:{{ data.message }}</span>
    <br>
    <input type="text" v-model="data.message">
    <br>
</div>

<script>
    var vue1 = new Vue({
        el:'#inp',
        data:{
            data:{
                message:'hello Vue!'
            }
        }
    });
</script>
```

#### 5.4.2 checkbox
单个checkbox的状态
```
<input type="checkbox" id="checkbox" v-model="data.checked">
<label for="checkbox">{{ data.checked }}</label>

<script>
    var vue1 = new Vue({
        el:'#inp',
        data:{
            data:{
                message:'hello Vue!',
                checked:null,
            }
        }
    });
</script>
```
多个勾选框，绑定到同一个数组：
```
<input type="checkbox" id="jack" value="Jack" v-model="data.checkNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="data.checkNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="data.checkNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ data.checkNames | json }}</span>

<!--这里的数据使用了json过滤器，将输出的数组转换为了json-->
<script>
    var vue1 = new Vue({
        el:'#inp',
        data:{
            data:{
                message:'hello Vue!',
                checked:null,
                checkNames:[]
            }
        }
    });
</script>
```
#### 5.4.3 radio
```
<input type="radio" id="one" value="One" v-model="data.packer">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="data.packer">
<label for="two">Two</label>
<br>
<span>Picked: {{ data.packer }}</span>

<script>
    var vue1 = new Vue({
        el:'#inp',
        data:{
            data:{
                message:'hello Vue!',
                checked:null,
                checkNames:[],
                packer:""
            }
        }
    });
</script>
```
#### 5.4.4 select
单选：
```
<select v-model="data.sel">
    <option selected>A</option>
    <option>B</option>
    <option>C</option>
</select>
<span>Selected: {{ data.sel }}</span>

<script>
    var vue1 = new Vue({
        el:'#inp',
        data:{
            data:{
                message:'hello Vue!',
                checked:null,
                checkNames:[],
                packer:"",
                sel:''
            }
        }
    });
</script>
```
多选（绑定到一个数组）：
```
<select v-model="data.selMul" multiple="multiple">
    <option selected>A</option>
    <option>B</option>
    <option>C</option>
</select>
<br>
<span>Selected: {{ data.selMul | json }}</span>
var vue1 = new Vue({
        el:'#inp',
        data:{
            data:{
                message:'hello Vue!',
                checked:null,
                checkNames:[],
                packer:"",
                sel:'',
                selMul:[]
            }
        }
    });
```
使用v-for渲染
```
<select v-model="data.moreSel">
    <option v-for="option in options" value="option.value">
        {{ option.text }}
    </option>
</select>
<span>Selected: {{ selected }}</span>

var vue1 = new Vue({
        el:'#inp',
        data:{
            data:{
                message:'hello Vue!',
                checked:null,
                checkNames:[],
                packer:"",
                sel:'',
                selMul:[]
            },
            selected: 'A',
            options: [
                { text: 'One', value: 'A' },
                { text: 'Two', value: 'B' },
                { text: 'Three', value: 'C' }
            ]

        }
    });
```
对于单选按钮，勾选框及选择框选项，v-model 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）,但是如果我们想给value绑定一个动态的值，那么可以使用v-bind去绑定，但是：
**这个属性的值可以不是字符串。**

#### 5.4.5 参数特性
v-model指令后面还可以添加多个参数：`lazy`,`number`,`debounce`  
##### 5.4.5.1 lazy
在默认情况下，v-model 在input 事件中同步输入框值与数据，可以添加一个特性 lazy，从而改到在 change 事件中同步：
```
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model="msg" lazy>
```
也就是说，添加了这个事件之后，实现绑定效果的事件从`oninput`改为了`onchange`。

##### 5.4.5.2 number
如果想自动将用户的输入转为 Number 类型（**如果原值的转换结果为 NaN 则返回原值**），可以添加一个特性 number：
```
<input v-model="age" number>
```
##### 5.4.5.3 debounce
debounce 设置一个最小的延时，在每次敲击之后延时同步输入框的值与数据。如果每次更新都要进行高耗操作（例如在输入提示中 Ajax 请求），它较为有用。

```
<input v-model="msg" debounce="500">
```
注意 debounce 参数不会延迟 input 事件：它延迟“写入”底层数据。因此在使用 debounce 时应当用 vm.$watch() 响应数据的变化。若想延迟 DOM 事件，应当使用 debounce 过滤器。  

### 5.5 v-for
可以使用 v-for 指令基于一个数组渲染一个列表。这个指令使用特殊的语法，形式为 item in items，items 是数据数组，item 是当前数组元素的**别名**：

```
<div id="app">
    <ul>
        <li v-for="todo in todos">{{todo.text}}</li>
    </ul>
</div>
<script>
    var vue = new Vue({
        el:'#app',
        data:{
            todos:[
                {text:'hello'},
                {text:'VUE'},
                {text:'and'},
                {text:'v-for'}
            ]
        }
    });
</script>
```
可以使用$index来呈现对应数组的索引值
```
<ul>
    <li v-for="todo in todos" data-index="{{$index}}">{{$index}} + {{todo.text}}</li>
</ul>
```
渲染出来的结果为：
![image_1atg8hmt1f5cfpbfcpnouqi49.png-6.6kB][1]

v-for也可以使用`<template>`语法来遍历生成一整块内容
```
<template v-for="temp in temps">
    <input type="text" value="{{$index}} + {{temp.value}}">
</template>

 var vue = new Vue({
        el:'#app',
        data:{
            temps:[
                {value:'1'},
                {value:'2'},
                {value:'3'},
                {value:'7'}
            ]
        }
    });
```
渲染结果
![image_1atg8lbb7ls8idttaa1v42skdm.png-14.1kB][2]
`<template>`标签在渲染的时候会被忽视

*v-for需要特殊的**别名** 形式为 `item in items` （items是数据数组，item是当前数组元素的别名。）v-for在开始运行时对传入的表达式进行了解析，不是 `item in/of items` 的语法形式会被提示警告信息。*      

![image_1atg8t3c81cuvkj82hcvcks3413.png-11.5kB][3]

从 1.0.17 开始可以使用 of 分隔符，更接近 JavaScript 遍历器语法：
```
<div v-for="item of items"></div>
```
#### 5.5.1 数组变动检测
Vue.js 包装了被观察数组的变异方法，故它们能触发视图更新。被包装的方法有：  

 - push()
 - pop()
 - shift()
 - unshift()
 - splice()
 - sort()
 - reverse()

vue中还封装了2个语法糖来设置和删除数组，分别是`$set`和`$remove`
```
//添加 vue是一个Vue类的实例，第一个参数是index，第二个参数是添加的内容
vue.temps.$set(0,{value:"110"});
//删除数组中的内容
var te = vue.temps[0]
vue.temps.$remove(te)
```
参考：[`Array.$set()`,`Array.$remove()`](http://vuejs.org.cn/api/#array-_24set_28index_2C_value_29)

也可以使用filter(), concat() 和 slice()来修改数组，他们不会修改原始数组而是会返回一个新的数组，可以直接使用新的数组来替换旧数组
例如：
```
 vue.temps = vue.temps.filter(function(temp){
    return temp.value.match(/7/);
})
```
这些方法的参数都是一个回调函数。  

#### 5.5.2 track-by
有时需要用全新对象（例如通过 API 调用创建的对象）替换数组。因为 v-for 默认通过数据对象的特征来决定对已有作用域和 DOM 元素的复用程度，这可能导致重新渲染整个列表。但是，如果每个对象都有一个唯一 ID 的属性，便可以使用 track-by 特性给 Vue.js 一个提示，Vue.js 因而能尽可能地复用已有实例。
例如，假定数据为：
```

{
  items: [
    { _uid: '88f869d', ... },
    { _uid: '7496c10', ... }
  ]
}
```
然后可以这样给出提示：
```
<div v-for="item in items" track-by="_uid">
  <!-- content -->
</div>
```
然后在替换数组 items 时，如果 Vue.js 遇到一个包含 _uid: '88f869d' 的新对象，它知道它可以复用这个已有对象的作用域与 DOM 元素。

**track-by="$index**    

如果没有唯一的键供追踪，可以使用 `track-by="$index"`，它强制让 v-for 进入原位更新模式：片断不会被移动，而是简单地以对应索引的新值刷新。这种模式也能处理数据数组中重复的值。

这让数据替换非常高效，但是也会付出一定的代价。因为这时 DOM 节点不再映射数组元素顺序的改变，不能同步临时状态（比如 <input> 元素的值）以及组件的私有状态。因此，**如果 v-for 块包含 <input> 元素或子组件，要小心使用 track-by="$index"**

#### 5.5.3 过滤器  
有时我们想显示过滤/排序过的数组，同时不实际修改或重置原始数据。有两个办法：

 1.创建一个计算属性，返回过滤/排序过的数组；
 2.使用内置的过滤器 filterBy 和 orderBy。
 
计算属性有更好的控制力，也更灵活，因为它是全功能 JavaScript。但是通常过滤器更方便

#### 5.5.4 对象v-for
也可以使用 v-for 遍历对象。除了 `$index` 之外，作用域内还可以访问另外一个特殊变量 `$key`。
```
<template v-for="value in objecs">
    <p>{{$key}} + {{$index}} + {{value}}</p>
</template>


var vue = new Vue({
        el:'#app',
        data:{
            objecs:{
                name:"daniu",
                sex:'girl',
                age:'30'
            }
        }
    });
```

### 5.6 v-text
更新元素的 textContent。
在内部， `{{}}` 插值也被编译为 textNode 的一个 v-text 指令。这个指令需要一个包装元素，不过性能稍好并且避免 FOUC (Flash of Uncompiled Content) 。

基本相当于innerText
```
<span v-text="msg"></span>
<!-- 相同 -->
<span>{{msg}}</span>
```
### 5.7 v-html
更新元素的 innerHTML。内容按普通 HTML 插入——数据绑定被忽略。如果想复用模板片断，应当使用 partials。

在内部， {{{ Mustache }}} 插值也会被编译为锚节点上的一个 v-html 指令。这个指令需要一个包装元素，不过性能稍好并且避免 FOUC (Flash of Uncompiled Content) 。

**在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上。**

```
<div v-html="html"></div>
<!-- 相同 -->
<div>{{{html}}}</div>
```







  [1]: http://static.zybuluo.com/dilidili/i390pthaa8q0l1jejr089svx/image_1atg8hmt1f5cfpbfcpnouqi49.png
  [2]: http://static.zybuluo.com/dilidili/ja0ak8hc3cpkr6wq5r81ez4d/image_1atg8lbb7ls8idttaa1v42skdm.png
  [3]: http://static.zybuluo.com/dilidili/jypv4u55n77e8f9a1c2cn7yq/image_1atg8t3c81cuvkj82hcvcks3413.png