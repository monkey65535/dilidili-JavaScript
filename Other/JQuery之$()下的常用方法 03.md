# JQuery之$()下的常用方法 03

标签（空格分隔）： JavaScript从入门到放弃

---

### addClass 与 removeClass
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<script src="jquery-2.2.4.js"></script>
<script>
/*
 * addClass 添加class
 * removeclass 移除class
 */
$(function (){
    //$('div').addClass('box2 box3 box4')
    $('div').removeClass('box2')
})
</script>
</head>
<body>
    <div class="box1 box2"></div>
</body>
</html>
```
### width() 与 innerWidth() 与 outerWidth()
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style>
.box1 { width: 100px; height: 100px; background: red; padding: 10px; border: 2px solid blue; margin: 10px; }
</style>
<script src="jquery-2.2.4.js"></script>
<script>
/*
 * width()  本身宽度  不包括 边框  padding  maring
 * innerWidth()  本身宽度 和 padding
 * outerWidth()  本身宽度 和 padding 和 border 
 * outerWidth(true)  本身宽度 和 padding 和 border 和 margin
 */
$(function (){  //都不带单位
    alert($('div').width());   //100
    alert($('div').innerWidth());  //120
    alert($('div').outerWidth());	//124
    alert($('div').outerWidth(true));   //144
})
</script>
</head>
<body>
    <div class="box1"></div>
</body>
</html>
```

