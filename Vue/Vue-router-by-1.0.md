# Vue-router-by-1.0

标签（空格分隔）： Vue

---
>[在web开发中，“route”是指根据url分配到对应的处理程序 --by 知乎 贺师俊][1]。

## 1. 开始使用Vue-router
本笔记中的vue-router版本为vue-router ver0.7.3,后续会在新的笔记中实现基于2.0的路由。 

`<script src="../js/vue.js"></script>`
`<script src='../js/vue-router.js'></script>`  

## 2. 在html中定义router的步骤
在Vue-router实现的单页应用中，并不使用a标签的href属性来是实现跳转，而是通过`v-link`属性来绑定路由跳转地址。  同时，我们需要一个`router-view`组件来展示路由切换后的显示。    

现在假设我们需要实现一个有首页和新闻两个页面的简单的单页应用。
```
<div id="box">
  <ul>
      <li><a v-link="{path:'/home'}">home</a></li>
      <li><a v-link="{path:'/news'}">news</a></li>
  </ul>
  <div>
      <router-view></router-view>
  </div>
</div>
```
为了使当前页面和其他页面的导航有所区别，我们可以设置一个active状态。
```
.v-link-active{
    font-size: 24px;
    color: darkred;
}
```
`v-link-active`会默认的添加给对应当前页面的导航。
## 3.在JS中定义router的步骤
在页面中定义router需要六个步骤
### 3.1 准备一个根组件（App）
```
var App = Vue.extend();
```
### 3.2 准备好Home，News组件
```
var Home = Vue.extend({
    template:'<h3>我是Home</h3>'
});
var News = Vue.extend({
    template:'<h3>我是News</h3>'
});
```
### 3.3 声明router
```
var router  = new VueRouter();
```
### 3.4 关联组件
使用router实例的map方法来关联组件，实现路由跳转。
```
router.map({
    'home':{
        component:Home
    },
    'news':{
        component:News
    }
})
```
### 3.5 启动路由
声明router实例的start方法，关联root组件，启动路由。
```
router.start(App,'#box');
```
### 3.6 设置默认页面
使用router的redirect来定义root页面。

```
router.redirect({
    '/':'./home'
})
```
这样，就使用Vue-router完成了一个简单的单页应用。

### 4.router的嵌套
由于这个页面实在是太简单的，我们需要给页面添加一个注册和登录。  

我们需要给首页下面添加两个子导航，注册和登录。同时他们也需要一个`router-view`组件来展示内容。
```
<div id="box">
    <ul>
        <li><a v-link="{path:'/home'}">主页</a></li>
        <li><a v-link="{path:'/news'}">新闻</a></li>
    </ul>
    <div>
        <router-view></router-view>
    </div>
</div>

//组件模版
<template id="home">
    <h3>我是主页</h3>
    <div>
        <a v-link="{path:'/home/login'}">登录</a>
        <a v-link="{path:'/home/reg'}">注册</a>
    </div>
    <div>
        <router-view></router-view>
    </div>
</template>

<template id="news">
    <h3>我是新闻</h3>
</template>
```
那么在关联router组件的时候，就需要关联这些嵌套了
```
router.map({
    'home': {
        component: Home,
        subRoutes: {
            //每一个子路由都是一个组建
            'login': {
               component:{
                    template: '<strong>我是登录信息</strong>'
               }
            },
            'reg': {
                component:{
                    template: '<strong>我是注册信息</strong>'
                }
            }
        }
    },
    'news': {
        component: News
    }
})
```
使用subRoutes来关联嵌套路由的组件。   

其他步骤与上面无钱套的路由完全一样。 

整合方法  

```
//1.准备一个根组建（App）
var App = Vue.extend();
//2.准备好Home，News组建
var Home = Vue.extend({
	template: '#home'
});

var News = Vue.extend({
	template: '#news'
});

//3. 准备路由
var router = new VueRouter();

//4 关联组建
router.map({
    'home': {
        component: Home,
        subRoutes: {
            //每一个子路由都是一个组建
            'login': {
               component:{
                    template: '<strong>我是登录信息</strong>'
               }
            },
            'reg': {
                component:{
                    template: '<strong>我是注册信息</strong>'
                }
            }
        }
    },
    'news': {
        component: News
    }
})

//5 启动路由 绑定根组建和容器
router.start(App, '#box');

//6.设置默认跳转
router.redirect({
    '/': './home'
})
```

## 5. 获取路由信息
有了注册登录，那么我们就为新闻页也增加一些二级页面吧，我们需要新闻列表！
```
<div id="box">
    <ul>
        <li><a v-link="{path:'/home'}">主页</a></li>
        <li><a v-link="{path:'/news'}">新闻</a></li>
    </ul>
    <div>
        <router-view></router-view>
    </div>
</div>

<template id="home">
    <h3>我是主页</h3>
    <div>
        <a v-link="{path:'/home/login'}">登录</a>
        <a v-link="{path:'/home/reg'}">注册</a>
    </div>
    <div>
        <router-view></router-view>
    </div>
</template>

<template id="news">
    <h3>我是新闻</h3>
    <div>
        <a v-link="{path:'/news/detail/001'}">新闻001</a>
		<a v-link="{path:'/news/detail/002'}">新闻002</a>
    </div>
     <router-view></router-view>
</template>

<template id="detail">
    <p>{{$route.params |json}}</p>
    <p>{{$route.path}}</p>
    <p>{{$route.query |json}}</p>
    <p>这里是新闻{{$route.params.id}}</p>
</template>
```
遍历出的detiel的id可以在路由中用以下方式来定义:
```
router.map({
    'home': {
        component: Home,
        subRoutes: {
            //每一个子路由都是一个组建
            'login': {
               component:{
                    template: '<strong>我是登录信息</strong>'
               }
            },
            'reg': {
                component:{
                    template: '<strong>我是注册信息</strong>'
                }
            }
        }
    },
    'news': {
        component: News,
        subRoutes:{
            '/detail/:id':{
                component:Detail
            }
        }
    }
})
```
在路由中，我们可以通过以下方法来获取路由的数据  

 - `$route.params` 可以获取在url中传递的参数
 - `$route.path` 可以输出当前的路径
 - `$route.query` 可以获取当前url中传递的数据  
 - 
![image_1b700pjdq1bd9o3osqmsvctp29.png-7.8kB][2]


  [1]: http://zhihu.com/question/46767015/answer/102879598
  [2]: http://static.zybuluo.com/dilidili/ih6rcck2ekkmeb9onjmt5d7k/image_1b700pjdq1bd9o3osqmsvctp29.png