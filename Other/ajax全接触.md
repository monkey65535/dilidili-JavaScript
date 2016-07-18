# ajax全接触

标签（空格分隔）： JavaScript 从入门到一脸懵逼

## ajax 全称与介绍

- Ansychronous Javascript and XML  异步的js和xml
- ajax是一种前后端数据交互的一种技术,它能做的也仅仅是数据交互。
- 新手学习ajax的难点并不在于它的本身，而是拿到数据之后如何进行操作。

## ajax 有具有的优点
- 传输数据，不用跳转页面，在本页面请求服务器。
- 实时验证，减少用户返工率，增强用户体验。

## 第一个ajax示例
> * 请自行搭建php环境
    * windows下集成安装包 http://www.33lc.com/soft/27806.html
    * max 下搭建php环境  手动：http://my.oschina.net/joanfen/blog/171109
           * 集成安装包：https://www.mamp.info/en/downloads/
           * 3.5版本注册码：MP-DED4-0A88-3A11-F9FDE
```
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	<!--<form action="php/get.php" method="get">-->
		用户名:<input type="text" name="user" id="text"><span id="span"></span><br>
		密码:<input type="password">
		<!--<input type="submit" value="提交"/>-->
		<input type="button" value="提交" id="btn"/>
	<!--</form>-->
<script>
	var Text = document.getElementById('text');
	var span = document.getElementById('span');
	Text.onblur = function(){
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function (){
			if(ajax.readyState == 4){
				if(ajax.status >= 200 && ajax.status < 300 || ajax.status == 304){
				    span.innerHTML = ajax.responseText;
				}else{
				    document.write('数据传输错误,错误信息：' + ajax.states);
				}
			}
		}
		ajax.open('get','php/get.php?user='+this.value,true);
		ajax.send(null);
		/*ajax.onload = function(){
			span.innerHTML = ajax.responseText;
		}*/	
	}
</script>
</body>
</html>
```
> 对应PHP部分
```
<?php
header('content-type:text/html;charset=utf-8');
//echo phpinfo();
$username = $_GET['user'];
$users = array('abc','abc123','love1314','papapa','asdasd','111');
//echo $users[0];
echo $username;
if( in_array( $username , $users ) ){
	echo '用户名已经被注册了！';
}else{
	echo '用户名可以注册';
}
?>
```

## ajax 使用的流程
- 创建ajax对象
- open()
- 如果是post方式需要 setRequestHeader()
- send()
- 监听事件 onreadystatechange
- 返回数据 resposText

##创建 ajax 对象
```
//在现代标准下
var xhr = new XMLHttpRequest();
//如果需要兼容老版本IE（7以下）
/*
 * IE5是第一个引入XHR对象的浏览器。在IE5中，XHR对象是通过MSXML库中的一个ActiveX
 * 对象实现的。因此在IE中可能会遇到3个不同的版本即：
 * MSXML2.XHttp  MSXML2.XHttp.3.0  MSXML2.XHttp.6.0
 */
function createXHR(){
    if(typeof XMLHttpRequest != 'undefined'){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject != 'undefined'){
        if(typeof arguments.callee.activeXString != 'string'){
            var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
            for(var i=0,len=versions.length; i<len; i++){
                try{
                    new ActiveXObect(versions[i]);
                    arguments.callee.activeXString=versions[i];
                    break;
                }catch(e){
                    console.log(e);
                }
            }
            return new ActiveXObect(arguments.callee.activeXString);
        }
    }else{
        throw new Error("NoXHRobjectavailable.");
    }
}
```
### open()
>在使用xhr的时候要调用的第一个方法是open(),它接受3个参数：要发送的请求类型('get' / 'post')，要请求的URL和表示是否异步发送请求的布尔值。
```
xhr.open('get','xxx.php',true);
```
- 这行代码会启动一个针对xxx.php的get请求。有关这行代码,需要说明两点：一是URL相对于执行代码的当前页面或者是绝对路径；二是open()方法并不会真正的发送请求，只是启动一个请求以用来发送。
- 只能向同一个域中使用相同的端口和协议的URL发送请求。

### send()
> 要发送特定的请求必须使用第二个方法 send()
```
xhr.open('get','xxx.php',false);
xhr.send(null);
```
- 这里的send()方法接收一个参数，即要作为请求主体发送的数据（post方式,后面详解）。如果不需要通过请求主体（get方式，后面详解）发送数据，则必须传入null，因为这个参数对于有些浏览器是必要的。一旦调用了  send() 方法后,请求就会被发送到服务器。
- 由于上面的代码open中最后一个参数是false，也就是说这次请求时同步的，所以在未等到服务器响应之前，js的后续代码是不会执行的。在得到服务器响应后，得到的数据会自动填充到XHR对象的属性下面，具体如下：

 > * responseText : 作为响应返回的文本数据，也就是字符串类型。
 > * responseXML : 如果响应的主题内容类型是 'text/xml'或者'application/xml'，那么这个属性会包含响应
    数据的XML DOC 文档。
 > * status : 响应的HTTP状态。
 > * statusText : HTTP状态说明。（例如：not find）

- 在接到响应后，第一步是检查status的属性，用来确定响应是否已经成功返回。一般代表成功的标志范围[200,300) | 304，此时responseText属性的内容就已经就绪了，而且在内容类型正确的情况下,responseXML也应该能够访问了。代码304表示请求的资源并没有修改法，可以直接使用浏览器中已经缓存好的版本，当然，这也意味着响应是有效的。

- 这里建议使用 status 来决定下一步的操作，因为statusText在跨浏览器使用的时候不太可靠。另外无论内容类型是什么，响应的主体内容都会被保存到responseText中，而对于非XML而言，responseXML属性的值为null。

- 在大多数情况下，我们并不需要阻塞模式，也就是需要设置为异步，来让后续的代码继续执行，所以当open()中最后一个参数设置为true的时候，为了能够在完成请求后再执行相应的操作，此时就可以来检测XHR对象的readyState属性，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下：

 > * 0 : 未初始化。尚未调用open()方法
 > * 1 : 启动。 已经调用open()方法 但是尚未调用send()方法
 > * 2 : 发送。 已经调用send()方法，但是尚未收到响应
 > * 3 : 接收。 已经接收到部分响应的内容 
 > * 4 : 完成。 已经收到全部的响应，并且可以在客户端使用了。

- 只要readyState属性的值有一个变为另外一个都会触发readystatechange事件。所以可以利用这个时间来判断readyState的值，通常我们只对4感兴趣,因为这个时候所有数据都已经准备就绪，我们可以直接使用了。

- 在调用open()之前，必须指定onreadystatechange事件处理程序，才能保证跨浏览器的兼容性。
    * 并非所有浏览器都兼容DOM2级方法所以一般使用DOM0级
    * 这里并没有像onreadystatechange传递event对象，必须通过XHR对象本身来执行    
    * 不能使用this，因为在某些浏览器下this会导致函数体执行失败

## GET 请求
- 大小（体积）有限制，每个浏览器地址栏长度是不一样的，如果长度超过范围，提交时超出部分会被截掉。
- 信息会被浏览器缓存（跟用户信息相关的请求，就不能用get）
- 使用 get 请求经常会发生的一个错误，就是查询字符串的格式有问题。查询字符串中每个参数的名称和值都必须使用encodeURIComponent()来进行编码，然后才能放到URL末尾。
而且所有的名-值都必须使用 & 符号 来分隔.

- 对于 encodeURI 和 encodeURIComponent() 的区别
  http://www.jb51.net/article/22880.htm

```
function enURI(url,name,value){
    url += (url.indexOf('?') == -1 ? '?' : '&');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value) + new Date.getTime();
    retur url;
}
```
- 上面这个 enURI 函数包含3个参数:要添加的URL地址，参数的名称和参数的值，使用这个函数可以可靠的用于XHR对象。通过get方式发送请求的时候，如果URL地址一直没变，那么浏览器会将URL和返回的数据缓存到本地，这个时候，就不会及时的反应服务器端的变化。所以在发送URL地址时，加一个随机数或者时间戳，这个时候改变URL，就能实现实时反应变化。
- 对于只需要对单独数据进行处理的情况，使用以下的方法
```
function enURI(data) {
	var dataArr = data.split('&');
	var enArr = [];
	for (var i=0,len=dataArr.length; i<len; i++){
		var tempArr = dataArr[i].split('=');
		var tempStr = encodeURIComponent(tempArr[0]) + '=' + encodeURIComponent(tempArr[1]);
		enArr.push(tempStr);
	}
	return enArr.join('&') + new Date().getTime();
}
```

## POST 请求

- 使用频率仅次于GET的POST请求，通常用于向服务器发送应该被保存的数据。POST请求应该把数据作为请求主体来提交，而GET请求通常不是这样的。POST请求的主题可以包含非常多的数据，而且 格式不限。在open()方法的第一个参数传入一个'post'就可以初始化一个POST请求
- 例如：
    ```
    xhr.open('post','xxx.php',true);
    ```
- 发送POST请求的第二步，就是设置请求头 xhr.setRequestHeader() 来模仿表单的提交。
  同时指定了编码类型。
- 例如：
    ```
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    ```
- open的第二个参数不用拼接字段，字段拼接要放进send中,并且不再需要编码。
- 例如：
    ```
    xhr.send('name=value');
    ```

## ajax 方法的封装
```
function ajax(json) {

	var settings = {
		method: json.method || 'get',
		url: json.url || '',
		data: json.data || '',
		type: json.type || 'json',
		succ: json.succ || '',
		fail: json.fail || ''
	};

	var xhr = createXHR();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
				if (settings.succ && typeof settings.succ === 'function') {
					if (settings.type.toLowerCase() === 'json') {
						settings.succ(JSON.parse(xhr.responseText));
					} else if (settings.type.toLowerCase() === 'xml') {
						settings.succ(xhr.responseXML);
					} else {
						settings.succ(xhr.responseText);
					}
				}
			} else {
				if (settings.fail && typeof settings.fail === 'function') {
					settings.fail(xhr.status);
				}
			}
		}
	}

	if (settings.method.toLowerCase() === 'get' && settings.data) {
		settings.url = settings.url + '?' + enURI(settings.data);
	}

	xhr.open(settings.method, settings.url, true);

	if (settings.method.toLowerCase() === 'get') {
		xhr.send(null);
	} else {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(settings.data);
	}
}

function enURI(data) {
	var dataArr = data.split('&');
	var enArr = [];
	for (var i = 0, len = dataArr.length; i < len; i++) {
		var tempArr = dataArr[i].split('=');
		var tempStr = encodeURIComponent(tempArr[0]) + '=' + encodeURIComponent(tempArr[1]);
		enArr.push(tempStr);
	}
	return enArr.join('&') + new Date().getTime();
}

function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != 'undefined') {
		if (typeof arguments.callee.ActiveXString != 'string') {
			var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
			for (var i = 0, len = versions.length; i < len; i++) {
				try {
					new ActiveXObject(versions[i]);
					arguments.callee.ActiveXString = versions[i];
					break;
				} catch (e) {
					console.log(e);
				}
			}
		}
		return new ActiveXObject(arguments.callee.ActiveXString);
	} else {
		throw new Error('No XHR object available!');
	}
}
```




















