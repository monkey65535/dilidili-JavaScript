# jQuery方法之DOM操作 04

标签（空格分隔）： JavaScript从入门到放弃

---

### insertBefore() 与 insertAfter()
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<script src="jquery-2.2.4.js"></script>
<script>
/*
 * insertBefore() *剪切功能，把某个元素添加到某个元素前面
 * insertAfter() *剪切功能，把某个元素添加到某个元素的后面
 */
$(function (){
    //$('div').insertBefore($('p'));
    $('div').insertAfter($('span'));
})
</script>
</head>
<body>
	<p>p</p>
    <div>div</div>
    <span>span</span>
</body>
</html>
```
### appendTo() 与 prependTo()
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<script src="jquery-2.2.4.js"></script>
<script>
/*
 * appendTo() *剪切功能，把某个元素添加到某个元素内部的最后位置
 * prependTo() *剪切功能，把某个元素添加到某个元素内部的开始位置
 */
$(function (){
    $('span').appendTo($('div'));
    $('span').prependTo($('div'));
})
</script>
</head>
<body>
	<p>p</p>
    <div>div</div>
    <span>span</span>
</body>
</html>
```

### before() 与 after() 与 append() 与 prepend()
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<script src="jquery-2.2.4.js"></script>
<script>
/*
 * before()  *某个元素的前面是另一个元素 
 * after()   *某个元素的后面是另一个元素
 * append()  *某个元素内最后的节点后添加另外一个元素
 * prepend() *某个元素内第一个节点前添加另外一个元素
 * 
 */
$(function (){
    //$('span').append($('div'));
    //$('span').prepend($('div'));
    //$('div').before($('span'));
    //$('span').after($('div'));
})
</script>
</head>
<body>
	<p>p</p>
    <div>div</div>
    <span>span</span>
</body>
</html>
```
## before() 与 insertBefore() 之间的区别
```
$('div').insertBefore($('span')); //的意思 是把div添加到p的前面
$('div').before($('span')); //的意思 是div的前面是span
```
```
$('span').before($('div')); 和 $('div').insertBefore($('span'));
的意思是一样的，但是在链式操作中 是有区别的 例：
```
```
$('div').insertBefore($('span')).css('display','none'); 操作的是div
$('span').before($('div')).css('background','red');操作的是span
```
类似 after() 与 insertAfter() 、append() 与 appendTo()、prepend() 与 prependTo() 都是这样的意义。

