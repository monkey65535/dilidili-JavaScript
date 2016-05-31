# jQuery之$()下的常用方法 01

标签（空格分隔）： JavaScript从入门到放弃之jQuery

$()下的常用方法

### 过滤 filter() 与 not () 与 has()
```
<html>
<script src="jquery-2.2.4.js"></script>
<script>
/*
 * filter() : 过滤 只操作满足条件的
 * not() : 过滤，值操作不满足条件的
 * has() : 包含的意思，看是否包含
 */
$(function (){
    //$('div').filter('.box').css('background','red');
    //$('div').not('.box').css('background','red');
    $('div').has('span').css('background','red');
})
/*
 * has() 是去查找内部 是否包含  而filter() 和 not()
 * 是去查找自身是否含有指定属性等
 */
</script>
</head>
<body>
    <div class="box">div1</div>
    <div>div2</div>
    <div><span></span>div3</div>
</body>
</html>
```
### next() 与 prve()
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<script src="jquery-2.2.4.js"></script>
<script>
/*
* next()  选择下一个兄弟节点
* prev()  选择下一个兄弟节点
*/
$(function (){
    $('div').next().css('background','red');
    $('p').prev().css('background','red');
})
</script>
</head>
<body>
    <div>div</div>
    <span>span</span>
    <p>p</p>
</body>
</html>
```
### find() 与 eq() 与attr()
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<script src="jquery-2.2.4.js"></script>
<script>
/*
 * find() 对找到的元素进行操作
 * eq()   对找到一组元素对应下标的那个
 * index() 索引值 在所有兄弟节点中的位置
 * attr() 一个参数获用来获取元素的某个属性，两个参数用来设置
 */
$(function (){
    $('div').find('h2').css('background','red');
    //找到div下的所有h2标签
    $('div').find('h2').eq(1).css('background','red');
    alert($('#h3').index()); //1
    $('div').find('h2').filter('[title="111"]').css('background','red');
    $('div').find('h2').eq(0).attr('title','222');
    alert($('div').find('h2').eq(0).attr('title'));
})
</script>
</head>
<body>
<div>
	<h2 tittle="111">h2</h2>
	<h3 id="h3">h3</h2>
	<h2>h2</h2>
	<h2>h2</h2>
	<h3>h3</h3>
</div>
<h2>h2</h2>
</body>
</html>
```



