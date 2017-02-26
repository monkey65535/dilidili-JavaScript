# Vue-定义过渡

标签（空格分隔）： Vue

---

## 1. Vue-transition
Vue 提供了 transition 的封装组件,可以在许多状况实现动画效果。
在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡  

 - 条件渲染 （使用 `v-if`）
 - 条件展示 （使用 ` v-show`）
 - 动态组件
 - 组件根节点

**本质上来说，Vue的transition还是基于CSS3的transition来实现的。**

## 2.简单的Vue过渡
```
//html
<div id="box">
    <input type="button" name="" value="按钮" @click="move">
    <div id="div1" v-show="change" transition="fade"></div>
</div>

//css
.fade-transition{
    transition: .2s all ease;
}
.fade-enter{
    opacity: 0;
}
.fade-leave{
    opacity: 0;
}

//js
new Vue({
    el:'#box',
    data:{
        change:true
    },
    methods:{
        move(){
            this.change = !this.change;
        }
    }
});
```
这样就可以实现一个简单的淡入淡出效果。

### 3.使用animate.css实现过渡动画
我们可以配合 `animate.css` 来实现常用的过渡动画.
```
<div id="box">
    <input type="button" name="" value="按钮" @click="move">
    <div id="div1" class="animated" v-show="change" transition="bounce"></div>
</div>

<script src="../js/vue.js"></script>
<script>
    new Vue({
        el:'#box',
        data:{
            change:true
        },
        methods:{
            move(){
                this.change = !this.change;
            }
        },
        transitions:{       //在这里定义所有的动画
            bounce:{
                enterClass:'zoomInLeft',    //进入动画
                leaveClass:'zoomOutDown'    //离开动画
            }
        }
    });
</script>
```





