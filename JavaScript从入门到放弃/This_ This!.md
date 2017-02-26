# This? This! 

标签（空格分隔）： javascript-magic

---

## 1.什么是this
>this是Javascript语言的一个关键字。
它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。  

## 2.this的四种情况
### 2.1 纯粹的函数被调用
函数被直接调用的时候，`this`指向`global`
```
function fn(){
    console.log(this);
}
//node
module.exports =fn();
```
在浏览器中执行，`this`指向`window`（浏览器中的`global`是`window`）：
![image_1aucg49b0f1ur25od1nfl1aga9.png-102kB][1]
在node 环境下执行，`this`指向`global`：
![image_1aucg63nk1tmkvma1ulj51p12rnm.png-47.8kB][2]

### 2.2 作为对象的方法调用
当函数被作为对象的方法调用的时候，`this`指向这个对象
```
function fn() {
    console.log(this);
}
var a= {};
a.o = fn;
a.o();      //a
```
### 2.3 构造函数中的this
所谓构造函数，就是通过这个函数生成一个新对象（object）。这时，`this`就指这个新对象。

```
function fn() {
    console.log(this);
}
var a = new fn();
```



  [1]: http://static.zybuluo.com/dilidili/78yyq9irivxqiosxat5ek3dp/image_1aucg49b0f1ur25od1nfl1aga9.png
  [2]: http://static.zybuluo.com/dilidili/ufardf3ltw3d4ipgg0qx0x81/image_1aucg63nk1tmkvma1ulj51p12rnm.png