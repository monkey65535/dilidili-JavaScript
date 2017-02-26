# Vue-组件间的通信

标签（空格分隔）：Vue

---
>组件意味着协同工作，通常父子组件会是这样的关系：  
组件 A 在它的模版中使用了组件 B。它们之间必然需要相互通信：父组件要给子组件传递数据，子组件需要将它内部发生的事情告知给父组件。  

>然而，在一个良好定义的接口中尽可能将父子组件解耦是很重要的。这保证了每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性。  

>在 Vue.js 中，父子组件的关系可以总结为 `props-down`, `events-up` 。父组件通过 `props` 向下传递数据给子组件，子组件通过 `events` 给父组件发送消息。  

## 1. 使用属性传递数据
每个组件实例都有自己独立的作用域，这意味着你不能并且不该在子组件的模板里直接引用父组件的数据。由父组件向子组件传递数据可以通过 `prop` 来完成。  

属性就是用来从父组件传递信息的自定义属性。子组件需要显式地用 `props` 选项 来明确声明它要接收的属性：  
```
<div id="app">
    <hello-span message="hello Vue!"></hello-span>
</div>
<script>
    Vue.component('hello-span',{
        template:'<span>{{message}}</span>',
        props:['message']
    });

    new Vue({
        el:"#app"
    })
</script>
```
注意：HTML属性是不区分大小写的，所以当使用非模板字符串的时候，需要使用短横分割命名标签名，使用驼峰命名法命名属性名
```
<div id="app">
    <hello-span my-mes="hello Vue!"></hello-span>
</div>
<script>
    Vue.component('hello-span',{
        template:'<span>{{myMes}}</span>',
        props:['myMes']
    });

    new Vue({
        el:"#app"
    })
</script>
```
如果不符合要求，浏览器会报错。

## 2.父组件传递给子组件
我们可以使用v-bind方法将组件的属性绑定到父组件的数据，这样，当父组件的数据发生变化的时候，就会传递给子组件。  
```
 <div id="app2">
   <!-- 可以使用v-bind方法将组件的属性绑定到父组件的数据，这样，当父组件的数据发生变化的时候，就会传递给子组件-->
    {{message}}
    <br>
    这里是子组件1
    <br>
    <child-com v-bind:message="message"></child-com>

    这里是子组件2
    <br>
    <child-com v-bind:options-obj="optionsObj"></child-com>
    这里是子组件3
    <br>
    <child-com></child-com>
</div>


<script>
    Vue.component('child-com',{
        //声明props
        props:["message",'optionsObj'],
        //设置模板
        template:'<p> hello 父组件信息{{message}} + 子组件的信息{{optionsObj}} </p>'
    });
    new Vue({
       el:'#app2',
        data:{
           message:'HELLO VUE',
            "optionsObj":[1,2,3]
        }
    });
</script>
```
实现的效果是这样的  
![image_1b2icd6bnf52149s9n4dfc1499.png-8kB][1]
在页面中的结构如下
![image_1b2ice0pdrj5i6cbg71h88b47m.png-17kB][2]  


## 3.单向数据流
在Vue的组件中，所有数据都是单向的。父组件的属性变化时，会传递给子组件。但并不会反向传递。这就避免了子组件不小心改变父组件状态的情况，使得应用的数据流更容易推理，而且，每次更新父组件，子组件的所有属性值都会被更新成最新值。
**不能在子组件内改变属性的值，否则控制台会报错**


## 4.子组件与父组件的通讯
在Vue的组件中，如果子组件想与父组件通讯，需要使用事件绑定来实现,并通过`$emit`和`v-on`来将数据发送给父组件
```
<div id="box">
    {{a}}
    <!--组件-->
    <father-com></father-com>
</div>

var Vm = new Vue({
    el: '#box',
    data: {
        a: 10000
    },
    components: {
        'father-com': {
            template: `<h3>{{aa}} ==> {{childrenData}}</h3>
       <child-com :my-id="aId" @child-data="childFn"><child-com>`,
       //父组建的v-on要绑定在子组件调用的地方
            data() {
                return {
                    aa: '这里是父组建',
                    aId: 10,
                    childrenData:"暂无数据"
                }
            },
            components: {
                'child-com': {
                    template: '<p>{{bbb}},==>> 来自父组建的数据：{{myId}}</p> <input type="button" name="" value=" send" @click="sendFn">',
                    data() {
                        return {
                            bbb: '这里是子组件的数据',
                            bId: 20,
                            send:'这里是子组件的数据'
                        }
                    },
                    props:['myId'],
                    methods:{
                        sendFn:function(){
                            this.$emit('child-data',this.send);
                        }
                    }
                }
            },
            methods:{
                childFn:function(re){
                    this.childrenData = re;
                }
            }
        }
    }
});
```
以上案例，在点击子组件的时候，触发`sendFn`方法，通过Vue实例的`$emit`方法，将数据发送给父组件。  
所以说，Vue的组件间的通讯可以总结为：    

**props down Events up**

## 5. slot
`slot`在`Vue`中是一个占位符，可以让组建的HTML中的内容不被Template覆盖的显示出来  

给`slot`添加`name`可以展示不同的内容，需要在对应内容的容器添加`slot`属性，必须与template中的`slot`中的name对应

```
<div id="box">
    <father-com>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </father-com>
</div>


var Vm = new Vue({
    el: '#box',
    data: {
        a: 10000
    },
    components: {
        'father-com': {
            template: `<h3>{{aa}} ==> {{childrenData}}</h3>
               <slot></slot>`,
            data() {
                return {
                    aa: '这里是父组建',
                    aId: 10,
                    childrenData:"暂无数据"
                }
            }
        }
    }
});
```
![image_1b6vti0re1cd3f7711h01e7e1tcn9.png-4kB][3]  

如果不绑定name，那么重复调用slot的时候会重复渲染出所有的内容    
```
<div id="box">
    <father-com>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ol>

    </father-com>
</div>

var Vm = new Vue({
    el: '#box',
    data: {
        a: 10000
    },
    components: {
        'father-com': {
            template: `<h3>{{aa}} ==> {{childrenData}}</h3>
               <slot></slot>  
               <slot></slot>`,
            data() {
                return {
                    aa: '这里是父组建',
                    aId: 10,
                    childrenData:"暂无数据"
                }
            }
        }
    }
});
```
![image_1b6vtm93o1nk43k9oga7v1a5um.png-6.7kB][4]

为了避免`slot`中的内容重复渲染，所以需要在template中给`slot`声明name属性,同时在页面调组件的时候声明对应的`slot`属性
```
 <div id="box">
    <father-com>
        <ul slot="ulS">
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        <ol slot="olS">
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ol>

    </father-com>
</div>

var Vm = new Vue({
    el: '#box',
    data: {
        a: 10000
    },
    components: {
        'father-com': {
            template: `<h3>{{aa}} ==> {{childrenData}}</h3>
               <slot name="olS"></slot>  
               <slot name="ulS"></slot>`,
            data() {
                return {
                    aa: '这里是父组建',
                    aId: 10,
                    childrenData:"暂无数据"
                }
            }
        }
    }
});
```    

![image_1b6vtr6sf1lrv1cbm1jbd6d1fup13.png-4.7kB][5]


  [1]: http://static.zybuluo.com/dilidili/946q5661gp2cjl1coseyeorf/image_1b2icd6bnf52149s9n4dfc1499.png
  [2]: http://static.zybuluo.com/dilidili/emhz1ez5blwppwfjqpeoplao/image_1b2ice0pdrj5i6cbg71h88b47m.png
  [3]: http://static.zybuluo.com/dilidili/5wwiax5rshi2zt3wijwyb7r3/image_1b6vti0re1cd3f7711h01e7e1tcn9.png
  [4]: http://static.zybuluo.com/dilidili/3mhts6nrducq1yoqfkd51r4j/image_1b6vtm93o1nk43k9oga7v1a5um.png
  [5]: http://static.zybuluo.com/dilidili/26z17y4cwtd8s49d4jfpb57a/image_1b6vtr6sf1lrv1cbm1jbd6d1fup13.png