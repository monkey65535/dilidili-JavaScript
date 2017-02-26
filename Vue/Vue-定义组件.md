# Vue-定义组件

标签（空格分隔）： Vue

---
>组件可以扩展html元素，封装可重用的代码，是自定义元素，由vue编译器提供特殊功能。  

## 1. 定义组件
### 1.局部定义组件
如果想局部的定义组件，我们可以使用Vue对象中的`comonent`属性，在其中定义。
```
var vm = new Vue({
    el:'#app',
    data:{
        
    },
    component:{
        'ui-button':'<button> a button</button>'
    }
})
```
然后在页面中调用这个ui-button组件
```
<div id="app">
    <ui-button></ui-button>
    <ui-button></ui-button>
    <ui-button></ui-button>
</div>
```
![image_1b1tl7fi81789ietlh915itq0o9.png-2kB][1]    

![image_1b1tl85qdq4govprhg15101ijum.png-6.6kB][2]  

在局部范围内定义的组件，我们只能在这个vue对象中去使用。

### 1.2 全局定义组件
当我们想全局定义组件的时候，我们就需要使用Vue的component方法了。
```
Vue.compinent();
```
这个方法有两个参数，第一个参数是组件的名字，第二个参数是一些相关的选项（object）
```
 Vue.component('ui-button',{
    template:'<button>this is a component button</button>'
});
```
使用这个方法定义的组件，我们可以在任意的vue实例中去注册使用它。
![image_1b1tlk0141uvb1qkr1f2m1cbucj21g.png-6.1kB][3]  

![image_1b1tlkaqqvtm1r9v1552qn016sh1t.png-3.2kB][4]  

### 1.3自定义组件的限制：
当使用 DOM 作为模版时（例如，将el选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 `<ul>` ， `<ol>`， `<table>` ， `<select>` 限制了能被它包裹的元素，`<option>`只能出现在其它元素内部。    

在自定义组件中使用这些受限制的元素时会导致一些问题。  

例如：
```
<table>
    <my-row></my-row>
</table>
```
在这里，自定义组件会被任务是无效内容，在渲染的时候会导致错误。我们可以使用特殊属性`is` 
```
<table>
   <tr is="my-row"></tr>
</table>
```
应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：  

 - `<script type="text/x-template">`
 - JavaScript内联模版字符串
 - .vue 组件

因此，有必要的话请使用字符串模版。

### 1.4 组件中的data
组件中的data必须是是函数，如果不是函数，浏览器会发出警告。  
```
var vm = new Vue({
    el:'#app',
    data:{

    }
});  

Vue.component('my-span',{
    template:'<span>{{message}}</span>',
    data:{
        massage:'hello'
    }
})
```
![image_1b209gug5bvqv617g61kgj1q0g9.png-6.1kB][5]

为什么必须是一个函数？我们来看下面这个例子：
```
<div id="demo">
    <s-button></s-button>
    <s-button></s-button>
    <s-button></s-button>
</div>

<script>
    var data = {count:0};
    Vue.component('s-button',{
        template:'<button v-on:click="count++">{{count}}</button>',
        data:function(){
            return data;
        }
    });
    new Vue({
        el:'#demo'
    });
</script>
```
当点击组件中的button的时候，由于是对同一个对象进行的修改，导致所有button中的data同时被修改。  

如果我们换一种写法：
```
Vue.component('s-button',{
    template:'<button v-on:click="count++">{{count}}</button>',
    data:function(){
        return {
            count:0
        }
    }
});

new Vue({
    el:'#demo'
});
```
这样，每个组件的data就独立了出来，不会相互影响了。  



  [1]: http://static.zybuluo.com/dilidili/ow7xehgq4ay4us2qrf65l47o/image_1b1tl7fi81789ietlh915itq0o9.png
  [2]: http://static.zybuluo.com/dilidili/07ab4w19n2m8yvcis66ru4gb/image_1b1tl85qdq4govprhg15101ijum.png
  [3]: http://static.zybuluo.com/dilidili/5uya0prpbj1zykkymhs0mee3/image_1b1tlk0141uvb1qkr1f2m1cbucj21g.png
  [4]: http://static.zybuluo.com/dilidili/3t954b3n7z32uafzwrv4wwg5/image_1b1tlkaqqvtm1r9v1552qn016sh1t.png
  [5]: http://static.zybuluo.com/dilidili/2s753uy3bpx70xt0i5w26nb0/image_1b209gug5bvqv617g61kgj1q0g9.png