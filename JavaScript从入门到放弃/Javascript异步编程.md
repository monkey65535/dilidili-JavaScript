# Javascript异步编程

标签（空格分隔）： JavaScript从入门到放弃

---

## 1.同步，异步
javascript是一个单线程语言，所谓单线程，就是指就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。   
这个模式的优势是执行环境简单，但是缺点也很多，比如一旦某个流程中间被阻塞，后续代码将不再执行。   

为了解决这个问题，Javascript语言将任务的执行模式分成两种：同步（`Synchronous`）和异步（`Asynchronous`）。

### 1.1 同步
>"同步模式"就是上一段的模式，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；  

### 1.2 异步  
>"异步模式"则完全不同，每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。  

## 2.异步编程的实现方式
### 2.1 回调函数
回调函数是异步编程最常见的实现方式。  
例如：
```
fn1();
fn2()
```
如果fn1是一个很耗时的任务，那么可以把fn2写成fn1的回调函数来执行
```
function fn1(callback){
    setTimeout(function(){
        ...fn1的代码
        callback();
    },1000);
}
```
那么执行的时候会这么写
```
fn1(fn2);
```
回调函数的优点是简单、容易理解和部署。
缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数。  

### ２.２ Promises对象
promises对象是commonJS中提出的一个规范，目的是为了为异步编程提供统一的接口。在ECMAScriipt6中，新增了promises对象，于是我们可以在原生JS中很开心的去使用它了。    

>promises对象思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。

上面的例子如果使用promises实现，调用的时候会写成这样：
```
fn1().then(fn2);
```
看起来是不是简洁明了，通俗易懂？ 比回调函数美观多了~  
#### 2.2.1 Promises对象的特点  

##### 1.对象的状态不受外界影响。
Promise对象代表一个异步操作，有三种状态：

 - `Pending`（进行中）
 - `Resolved`（已完成，又称`Fulfilled`）
 - `Rejected`（已失败）

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。  

##### 2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。
Promise对象的状态改变，只有两种可能：

 - 从`Pending`变为`Resolved`
 - 从`Pending`变为`Rejected`

只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果  

*Promise对象与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的,而promise对象你如果错过了它再去监听，依然会获取一个状态*

##### 3.promise的缺点  

1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消
2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
3. 当处于`Pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

#### 2.2.2 promise对象的使用
ES6规定，promise对象是一个构造函数，用来生成promise实例。
![image_1b02cbteh1onl1shi1uvb2g92pd9.png-28.7kB][1]
就是这样咯-  -
那么我们如果需要使用promise，那就要先new一个看看咯
```
var p = new Promise(function(resolve, reject){
    //做一些异步操作
    setTimeout(function(){
        console.log('执行完成');
         resolve('随便什么数据');
    }, 2000);
});
```
在上面的代码中，我们执行了一个异步操作，也就是setTimeout，2秒后，输出“执行完成”，并且调用resolve方法。
代码执行内容是2秒之后输出“执行完成”，并执行resolve回调函数。 
运行代码，你会发现2秒之后执行了这些内容。但是我们只是new了一个新的promise对象，并没有调用它。我们传进去的函数就已经执行了，这是需要注意的一个细节。所以我们用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数。  

```
function runAsync() {
    	var p = new Promise(function(resolve, reject) {
    		//做一些异步操作
    		setTimeout(function() {
    			console.log('执行完成');
    			resolve("上下上下左右左右BABA开始")
    		}, 2000);
    	});
    	return p;
    }
```
在这个函数中，我们把新new的promise对象return了出来，这也就意味着，函数执行之后可以得到一个promise对象。那么，then方法和catch方法就有了用武之地了。  

```
runAsync().then(function(data){
		console.log(data);
		//后面还可以用这个data去做其他事
	})
```
执行这段代码，你会发现控制台显示出*执行完成*后会显示*上下上下左右左右BABA开始*。  

原来then里面的函数就跟我们平时的回调函数一个意思，能够在 `runAsync` 这个异步任务执行完成之后被执行。这就是 `Promise` 的作用了，简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。

常用的链式操作的promise应该是这么写的：
```
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return runAsync3();
})
.then(function(data){
    console.log(data);
});
```
其中的各个回调是这么定义的
```
function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;            
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;            
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;            
}
```

#### 2.2.3 reject的用法
们光用了resolve，还没用reject呢，它是做什么的呢？事实上，我们前面的例子都是只有“执行成功”的回调，还没有“失败”的情况，reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调
```
function getNumber() {
	var p = new Promise(function(resolve, reject) {
		//做一些异步操作
		setTimeout(function() {
			var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
			if(num <= 5) {
				resolve(num);
			} else {
				reject('数字太大了');
			}
		}, 3000);
	});
	return p;
}

getNumber()
	.then(
		function(data) {
			console.log('resolved');
			console.log(data);
		},
		function(reason, data) {
			console.log('rejected');
			console.log(reason);
		}
	);
```




  [1]: http://static.zybuluo.com/dilidili/qwx0jhqsxsqxbcsl92047tbf/image_1b02cbteh1onl1shi1uvb2g92pd9.png