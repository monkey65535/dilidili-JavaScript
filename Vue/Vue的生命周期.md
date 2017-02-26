# Vue的生命周期

标签（空格分隔）： Vue

---

## 1. Vue的生命周期（Ver 1.0）
> Vue 实例在创建时有一系列初始化步骤——例如，建立数据观察，编译模板，挂载 DOM 实例，数据变化时更新 DOM。在此过程中，它也将调用一些生命周期钩子，这样我们就可以执行一些自定义逻辑。  

**在实例生命周期的不同阶段，还会调用其它的钩子，如 `mounted`、 `updated`、`destroyed`。钩子的`this`指向调用它的Vue实例。**   

![image_1b48fvb5u1c4tbhv140ng4qj1tm.png-189.6kB][1]  

## 2.钩子函数
### 2.1 created  
当Vue类被实例化之后，会触发`created`钩子函数。

### 2.2 beforeCompile
当Vue实例在编译之前，会触发`beforeCompile`钩子函数。
### 2.3 compiled
当Vue实例被编译之后，会触发`compiled`钩子函数。
### 2.4 ready
当Vue实例的内容被插入到文档中的时候，会触发`ready`钩子函数
### 2.5 beforeDestroy
当Vue实例被销毁之前，会触发`beforeDestroy`钩子函数
###２.6 destroyed 
当Vue实例被销毁之后，会触发`destroyed`钩子函数
**destroyed的触发方式与其它钩子函数不同。**
### 2.7 代码展示：
```
var vm=new Vue({
    el:'#box',
    data:{
        msg:'well'
    },
    created:function(){
        alert('实例已经创建');
    },
    beforeCompile:function(){
        alert('编译之前');
    },
    compiled:function(){
        alert('编译之后');
    },
    ready:function(){
        alert('插入到文档中');
    },
    beforeDestroy:function(){
        alert('销毁之前');
    },
    destroyed:function(){
        alert('销毁之后');
    }
});

/*点击页面销毁vue对象*/
document.onclick=function(){
    vm.$destroy();
};
```


  [1]: http://static.zybuluo.com/dilidili/rwmp329wlw0tqwbs4uwqr2u9/image_1b48fvb5u1c4tbhv140ng4qj1tm.png