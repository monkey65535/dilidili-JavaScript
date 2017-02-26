# EcmaScript 2015

标签（空格分隔）： EcmaScript

---
## 1.let
`let`会增加一个块级作用域`{}`,在这个代码块中使用`let`声明的函数的作用域在`{}`中，`var`只有两个作用域，全局和函数
```
{
    let b = 10;
}
console.log(b);
```
 `var`会有一个预解析的过程，而`let`是没有预解析的过程的（没有变量提升）
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
for(let i=0; i<button.length; i++){
    //这里就是i的作用域
    button[i].onclick = function(){
        console.log(i);
    }
}
```
## 2.const
声明一个常量
```
const a = 1;
```
**常量的值是不可被重新赋值！**  

如果对这个值进行了再次赋值，那么会直接报错。
```
const a = 1;
a = 100;      //报错
```
但是如果是对const已声明的值进行修改，那么不会报错
比如：
```
const obj = {
    name:xiaoming
}
obj = 1;                //报错
obj.name = "aaa"        //可以修改
```
又或者说
```
const arr = [];
arr.push(1,2,3,4,5);
console.log(arr);
```

## 3.解构赋值

### 3.1 变量的解构赋值
>ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

### 3.1数组的解构赋值
语法：
```
var/let [变量1，变量2，变量3，···，变量n] = array；
```
规则：
把arrar中从0开始的每一个值按照顺序赋值给变量(如果没有对应变量就不会赋值)
### 3.2 对象的解构赋值
语法：
```
var {变量1，变量2，变量3，···，变量n} = object;
```
实例：
```
function food() {

    return {
        cake:"cake",
        drink:'greenTea',
        fruit:'apple'
    }
}

let {
//这个对象中，key需要对应需要结构的key，value是把原对象赋值给的变量
//比如，cake对应返回对像中的cake，然后把food().cake赋值给了foodCake
    cake:foodCake,
    drink:foodDrink,
    fruit:foodFruit
} = food();

console.log(foodCake,foodDrink,foodFruit);
```
## 4.模板字符串
>模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。 

```
var n = "aaaaa"
var str1 = `<div>
                <div>${这里面可以随意进行JS的操作（变量，for循环，判断等等）}</div>
            </div>`
```
平常的字符串如果想要折行，需要在折行的位置加上`\n`
反引号里面随意折行
### 4.1 标签函数
```
let cake = "cake",
    drink = "greenTea";
    
//标签函数是这么写的
let food = tog`这里有${cake}和${drink}`;

function tog(strings, ...values) {
    //看一下两个参数
    console.log(strings);
    console.log(values);
}
```
![image_1aua0sv6sr3ruakdvg1ik0m6h9.png-15.2kB][1]
这里的两个值，strings为模板字符串中的文本部分，而values是模板字符串中的修改部分的合集（`${}`)包括的。
这样就可以很方便的进行操作了。  

## 5.字符串方法
### 5.1 startsWith
查看字符串是否是由参数开头，返回一个对应的`Boolean`值
```
let cake = "cake",
    drink = "greenTea";
let food = `这里有${cake}和${drink}`;
food.startsWith('这里');        //true
food.startsWith("!");           //false
```
### 5.2 endsWith
查看字符串是否是由参数结尾，返回一个对应的`Boolean`值，用法与startsWith相同

### 5.3 includes
查看字符串是否包含某一部分，返回一个对应的`Boolean`值，用法与startsWith相同

## 6.Function
### 6.1 函数默认值
ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。
```
function food(cake,fruit = "apple") {
    return `${cake} ${fruit}`
}

console.log(food("cake"));          //cake apple
console.log(food("cake","banner")); //cake banner
```

### 7 扩展运算符(...)
扩展运算符(...)来展开内容
```
let a = [1,2,3,4];
console.log(a);
console.log(...a);

let b = [5,...a];
console.log(b);
```
![image_1aua26sp21c253sb1o1o1sm39f6m.png-11.8kB][2]

resize操作符(...)表示更多参数

  [1]: http://static.zybuluo.com/dilidili/p3ryd9rud0uy82ct35cx55ip/image_1aua0sv6sr3ruakdvg1ik0m6h9.png
  [2]: http://static.zybuluo.com/dilidili/nknpds9flg5zd9578f5ymmsw/image_1aua26sp21c253sb1o1o1sm39f6m.png