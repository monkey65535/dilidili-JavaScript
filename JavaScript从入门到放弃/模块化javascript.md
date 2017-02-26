# 模块化javascript

标签（空格分隔）： javascript-magic

---

## 1.什么是模块化
目前最普遍的JavaScript运行平台便是浏览器，在浏览器中，所有的代码都运行在同一个全局上下文中。这使得你即使更改应用中的很小一部分，你也要担心可能会产生的命名冲突。

传统的JavaScript应用被分离在多个文件中，并且在构建的时候连接在一起，这稍显笨重。所以人们开始将每个文件内的代码都包在一个自执行函数中：(function() { ... })();。这种方法创建了一个本地作用域，于是最初的模块化的概念产生了。之后的CommonJS和AMD系统中所称的模块，也是由此实现的。

换句话说，现存的“模块”系统是使用已有的语言特性所实现的。

## 2.闭包模块（自执行函数）
```
(function(){
    //do something
})()
```
自执行函数可以有效的防止变量和函数名冲突（作用域的原因）

**在旧版的javascript中，所有的函数都是global对象下的一个属性（浏览器中的global是window）**

## 3.commonJS
>CommonJS API定义很多普通应用程序（主要指非浏览器的应用）使用的API，从而填补了这个空白。它的终极目标是提供一个类似Python，Ruby和Java标准库。这样的话，开发者可以使用CommonJS API编写应用程序，然后这些应用可以运行在不同的JavaScript解释器和不同的主机环境中

以上引用自百度百科-  -

commonJS的API主要引入了2个东西：
 - require - 用来加载一个模块
 - module.exports - 一个模块导出的内容

其中，`require`与ES6中的`import`一样，`module.exports`与ES6中的`export`一样  

练习使用babel来转换pie.js时遇到的问题：babel报错
```
G:\Learning\commonJS>babel-node
> import {pi,e} from "./constants";
SyntaxError: repl: Modules aren't supported in the REPL
> 1 | import {pi,e} from "./constants";
    | ^

> console.log('pie=',pi + e);

```
搜索stackoverflow解决
该错误消息说。
你不能在REPL使用ES6模块的语法，它是不受支持。
如果你想测试他们，你应该做一个`***.js`文件，把你的代码在那里，然后运行
解决办法：
```
G:\Learning\commonJS>babel-node --presets es2015 pie.js
pie= 5.85987

```
[stackOverflow问题链接](http://stackoverflow.com/questions/36197012/babel-node-es6-modules-arent-supported-in-the-repl)

回答问题：如果 require 一个模块三次，文件会被加载几次？  

文件只会被加载一次  
Node.js在载入模块时，如果之前该模块已经加载过则不会有重复开销，因为模块加载有缓存机制

[Node.js中相同模块是否会被加载多次？](https://cnodejs.org/topic/4f41f516c643fe221005115b)

默认导出：
设定文件默认值：
```
export default 42;
```
这个值会被babel编译为：
```
exports.default = 42;
```
Babel 将 ES6 模块的默认导出值转译成了 CommonJS 模块的 default 属性。
导入的这个 default 属性的方法被称为命名导入（Named Import）。
```
import answer from "./constants.js";
console.log(answer);
```
这里这个answer可以随意写成其它名字。  

![image_1atoj90ocp8p1bssvq5134nfr9.png-28.1kB][1]   
我们可以看到 answer 被重写成 _constants.default，这个 import 语法实际上访问了 CommonJS 模块的 default 属性。
## 4 ES6和commonJS的兼容性
ES6 和 CommonJS 模块之间最大的差别，就在于模块的默认导出是如何工作的。

CommonJS 其实并没有默认导出值这个概念。用 require 来加载一个模块会返回这个模块本身。

对比使用defaukt符导入的fs模块和使用通配符导入的fs模块  

使用default导入的fs
```
//这里是使用default导入的fs
"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

// Same as: require("fs").default
_fs2.default.readFileSync("package.json", "utf8");
```
使用通配符导入的fs模块
```
//这里是使用通配符导入的fs模块
"use strict";

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

fs.readFileSync("package.json", "utf8");
```

## 5.使用webpack
使用webpack打包后的文件，可以在浏览器中运行


  [1]: http://static.zybuluo.com/dilidili/7184gb1um8v326zarbg9i6zd/image_1atoj90ocp8p1bssvq5134nfr9.png