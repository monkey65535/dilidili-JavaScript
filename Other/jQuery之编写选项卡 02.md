# jQuery之编写选项卡 02

标签（空格分隔）： JavaScript从入门到放弃

---

利用01的内容编写选项卡
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style>
input { border: none; background: deepskyblue; margin-bottom: 10px; }
div { width: 100px; height: 100px; border: 2px solid salmon; display: none; }
.active { background: darkmagenta; }
</style>
<script src="jquery-2.2.4.js"></script>
<script>
//原生的写法
/*window.onload = function (){
    var aInp = document.getElementsByTagName('input');
    var aDiv = document.getElementsByTagName('div');
    for(var i=0; i<aInp.length; i++){
    aInp[i].index = i;;
        aInp[i].onclick = function (){
        	for(var i=0; i<aInp.length; i++){
        		aInp[i].className = '';
        		aDiv[i].style.display = 'none';
        	}
        	this.className = 'active';
        	aDiv[this.index].style.display = 'block';
        }
    }
}*/
//JQ的写法
$(function (){
    $('input').click(function (){
        $('input').attr('class','');
        $('div').css('display','none');
        $(this).attr('class','active');
        $('div').eq($(this).index()).css('display','block');	
    })
})
</script>
</head>
<body>
    <input class="active" type="button" id="" value="1" />
    <input type="button" id="" value="2" />
    <input type="button" id="" value="3" />
    <div style="display: block;">111</div>
    <div>222</div>
    <div>333</div>
</body>
</html>
```