# EcmaScript6

标签（空格分隔）： JavaScript从入门到放弃

---

## 1.ECMA6 ECMA2015
ECMA6是2015年推出的ECMAScript的新版本。

在chrome下如果想使用ECMA6，需要加上严格模式
```
"use strict"
```
在firefox中使用需要在script标签中加上type属性
```

```
## 2. 变量
### 2.1 let
在chrome中，如果不加严格模式，let无法在全局作用域中使用(会报错)

与`var`的区别：

`let`会增加一个块级作用域`{}`,在这个代码块中使用`let`声明的函数的作用域在`{}`中，`var`只有两个作用域，全局和函数
```
{
    let b = 10;
}
console.log(b);
```
 `var`会有一个预解析的过程，而`let`是没有预解析的过程的
```
{
    console.log(b);     //报错
    let b = 10;
}
```
从当前作用域到`let`声明之间的位置，有一个说法叫 **暂存死区**

`let`的使用
```
var button = document.getElementsByTagName("button");
for(let i=0; i<button.lengrh; i++){
    //这里就是i的作用域
    button[i].onclick = function(){
        console.log(i);
    }
}
```
### 2.2 const
声明一个常量
```
const a = 1;
```
**常量的值是不可改变的！**   如果对这个值进行了修改，那么会直接报错。

但是如果常量声明的是一个对象，那么对象里的属性是可以进行修改的
```
const obj = {
    name:xiaoming
}
obj = 1;                //报错
obj.name = "aaa"        //可以修改
```
### 2.3 变量的解构赋值
>ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

以前，为变量赋值，只能直接指定值。
```
var arr  = [1,2,3,4]
var a = arr[0];
var b = arr[1];
var c = arr[2];
```
在ECMA6中可以这么写：
```
var [n1,n2,n3] = arr;
console.log(n1,n2,n3);
```
#### 2.3.1 数组的解构赋值
语法：
```
var/let [变量1，变量2，变量3，···，变量n] = array；
```
规则：
把arrar中从0开始的每一个值按照顺序赋值给变量(如果没有对应变量就不会赋值)
#### 2.3.2 对象的解构赋值
语法：
```
var {变量1，变量2，变量3，···，变量n} = object;
```
规则：
把object中的属性赋值给 **同名** 的变量
```
 var obj = {
    a:1,
    b:2,
    c:[1,2,3,4]，
    d：function(){
        console.log(1);
    }
}
var {a,b,c,d} = obj;
//如果在这里修改c的值
c=1;
console.log(obj.c);     
//不发生修改 因为修改的只是变量c的值，而不是object.c
```
## 3 字符串的拓展
### 3.1 Unicode表示法
```
str.repart(num)
```
把字符串str复制num份
```
str.charCodeAt()            //只能识别2个字节
str.codePointAt()           //可以识别4个字节
str.formCharCode(unicode)   //无法操作4个字节的字符
str.fromCodePoint(Unicode)  //可以操作4个字节的字符编码
```
大多数用于操作字符表情。

str.includes()
参数：
1.要查找的字符串
2.起始位置

返回值：
返回一个布尔值，表示参数字符串是否在原字符串的头部
```
var str = "miaomiao"
str.includes(m);        //true
```
### 3.2 模板字符串
>模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。 

```
var n = "aaaaa"
var str1 = `<div>
                <div>${这里面可以随意进行JS的操作（变量，for循环，判断等等）}</div>
            </div>`
```
平常的字符串如果想要折行，需要在折行的位置加上`\`
反引号里面随意折行
## 4.数字的拓展
### 4.1 二进制表示法和八进制表示法
>ES6提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。

如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
### 4.2 Math
#### Math.trunc()
直接将数字的小数点去掉

#### Math.sign()
判断数字的正负值
参数为正数，返回+1；
参数为负数，返回-1；
参数为0，返回0；
参数为-0，返回-0;
其他值，返回NaN。

#### Math.hypot()
Math.hypot方法返回所有参数的平方和的平方根。（勾股定理）
如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回NaN。

## 5.数组方法
### 5.1 array.from()
Array.from方法用于将两类对象转为真正的数组
**在ECMA6中，字符串也是类数组**
### 5.2 array.of()
Array.of()方法用于将一组参数，转换为数组
###5.3 array.find()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
### 5.4 arr.fill()
填充数组
接受三个参数：填充内容，起始位置，结束位置
```
var arr = ["abc",444,666,"ddd"];
arr.fill('nzp',2,3);
console.log(arr);           //["abc", 444, "nzp", "ddd"]
```
### 5.5 for of
用来遍历对象的属性值，默认只能遍历数组对象，对象本身不能遍历，因为对象没有部署遍历接口
#### 5.5.1 array.keys()
用于for of对数组键名的遍历
#### 5.5.2 arr.entries()
用于for of对数组键值对的遍历
```
var arr = ["aaa","bbb",333,444];
//遍历key
for(let key of arr.keys()){
	console.log(key);
}
//遍历value
for(let key of arr.values()){
	console.log(key);
}
//遍历key和value
for(let [key,value] of arr.entries()){
	console.log(key,value);
}
```
### 5.6 数组推导
>ES6提供简洁写法，允许直接通过现有数组生成新数组，这被称为数组推导（array comprehension）。

```
var arr = [1,2,3,4];
var arr1 = [for(i of arr) if(i<3) i*2];
console.log(arr1);
```
## 6.对象方法
### 6.1 对象的扩展写法
>ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
```
var birth = '2000/01/01';
var Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};
```
这种写法用于函数的返回值的话会非常的方便
```
function getPoint() {
  var x = 1;
  var y = 10;
  return {x, y};
}

getPoint()
// {x:1, y:10}
```
同时，方法也可以简写
```
var o = {
  method() {
    return "Hello!";
  }
};

// 等同于

var o = {
  method: function() {
    return "Hello!";
  }
};
```
### 6.2 属性名表达式
ES6允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内。
在ES6之前，定义对象的属性有2中方法：
```
1.直接用标识符或者表达式做为属性名，如果是表达式，需要放在方括号内
obj.abc = true;
obj["a"+"bc"] = 123;
2.如果使用字面量方式定义对象（使用大括号）,这里不允许使用表达式作为属性名
var obj = {
    abc:123,
    def:456
}
```
在ES6中，我们可以使用表达式作为属性名,表达式放在方括号内即可
```
var obj = {
    ["a"+"bc"]:123,
    def:456
}
```
**注意：属性名表达式和简洁表示法不能同时使用，会出现报错！**  
### 6.3 对象方法的扩展
#### 6.3.1 Object.is()
>ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。  
```
Object.is('foo', 'foo')         //true;
Object.is(-0, 0)                //false
Object.is(NaN, NaN)             //true
```
**不同之处只有两个：一是+0不等于-0，二是NaN等于自身。**

#### 6.3.2 Object.assign（）
>Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

**注意,Object.assign方法是浅拷贝 
如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性**

Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
```
var obj1 = {};
var obj2 = {
	b:2,
	a:4
};
var obj3 = {
	c:3
	a:2
};
Object.assign(obj1,obj2,obj3);
console.log(obj1)
```
### 6.4 Proxy
没看懂什么意思-  -
好像是用于面向对象里修改默认参数？
周五让老师再讲一下