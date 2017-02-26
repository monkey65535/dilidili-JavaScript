# Vue-入门2

标签（空格分隔）：Vue

---

## 1.属性计算
vue中可以在html的插值中放入表达式
```
<div id="demo">
	<p>message:{{ message.split("").reverse().join("") }}</p>
</div>
<script>
	var vm = new Vue({
		el:'#demo',
		data:{
			message:'hello Vue!'
		}
	});
</script>
```
在模板中放入表达式非常便利，模板是为了描述视图的结构。但是在模板中放入太多逻辑，使得模板过重难以维护。  

为了便于维护，我们会把复杂的逻辑放入属性计算中，也就是Vue实例的选项参数中的`computed`属性中。  
```
<div id="demo">
	<p>{{rev}}</p>
</div>
<script>
	var vm = new Vue({
		el:'#demo',
		data:{
			message:'hello Vue!'
		},
		computed:{
			rev:function(){
				return this.message.split('').reverse().join("");
			}
		}
	});
</script>
```
对vue实例中的message修改，同时会在页面上反馈出来
```
vm.message = "这个是一个date!";
```
除了计算属性可以达到模板与逻辑分离，methods也可以实现  
```
<div id="demo">
	<p>{{rev}}</p>
	<p>{{revs()}}</p>
	<p>{{revs}}</p>
</div>
<script>
	var vm = new Vue({
		el:'#demo',
		data:{
			message:'hello Vue!'
		},
		computed:{
			rev:function(){
				return this.message.split('').reverse().join("");
			}
		},
		methods:{
			revs:function(){
				return this.message.split('').reverse().join('');
			}
		}
	});
	
	vm.message = "这是一个date!";
</script>
```
但是`methods`的计算和`computed`的计算有一些区别，他们之间最大的区别在于计算缓存。  

 - 计算缓存基于它依赖的数据，计算属性只有在它所依赖的数据发生改变改回重新执行得到值。如果数据不发生改变，多次访问计算属性，只会返回之前计算后的值，不会调用函数。  
 - 使用methods计算，每一次运算都会调用一次函数。  

所以：
**在计算大量数据的时候，推荐使用`computed` 而不希望使用缓存的时候，推荐使用`methods`**  

除了使用计算属性和methods之外，还可以讲逻辑放在watch中，观察数据改变做出相应的操作
```
<div id="demo">
	<input type="text"	v-model="que" />
	<p>{{que}}</p>
	<p>{{ans}}</p>
</div>
<script>
	var vm = new Vue({
		el:'#demo',
		data:{
			que:"",
			ans:'this is ans'
		},
		watch:{
			que:function(value){
				this.ans = "que has chenged"
			}
		}
	})
```
在这个例子中，当文本框输入内容之后，下方文本会变成*que has chenged*  
## 2.class与style绑定
> class和style可以使用 v-bind来绑定到元素上。
  v-bind在处理的时候只需要计算出表达式最终的字符串。
  v-bind:class 不止是可以用字符串，也可以使用对象或数组
  
### 2.1 class的绑定
```
<div id="demo">
	<p :class="className1">测试className为字符串</p>
	<p :class="{blue:isActive}">测试className为对象，如果isActive为true则添加</p>
	<p class="fontSize" :class="{red:isActive}">可以和普通的class特性共存</p>
	<p :class="classObj">绑定数据里的对象</p>
	<p :class="addClassObj">绑定计算属性，功能更加强大</p>
	<p :class='[isActive ? "red" : "","fontSize"]'>绑定数据里的数组,可以写三目表达式</p>
	<p :class='[{blue:isActive},"fontSize"]'>绑定数据里的数组,可使用对象形式代替三目表达式</p>
</div>

<script>
	var vm = new Vue({
		el:'#demo',
		data:{
			className1:'red',
			isActive:true,
			classObj:{
				red:false,
				fontSize:true
			}
		},
		computed:{
			addClassObj:function(){
				return {
					blue:this.isActive,
					fontSize:true
				}
			}
		}
	});
</script>
```
### 2.2 style的绑定
`v-bind`在处理的时候只需要计算出表达式最终的字符串
`v-bind:style`是一个对象的形式  

```
<div id="demo">
	<p v-bind:style="{color:'red','font-size':'50px'}">绑定对象字符串的形式</p>
	<p v-bind:style="styleObj">绑定数据中的对象</p>
	<p v-bind:style="[styleObj1,styleObj2]">绑定数组</p>
	<p v-bind:style="addStyleObj">使用计算属性</p>

</div>
<script>
var vm = new Vue({
			el:"#demo",
			data:{
				styleObj:{color:'blue','font-size':'30px'},
				styleObj1:{
					'font-size': "50px"
				},
				styleObj2:{
					border: '1px solid #000'
				}
			},
			computed:{
				addStyleObj:function (){
					//可以在这里做一系列操作
					return {
						color:'red',
						border: '1px solid #000'
					}	
				}
			}
		});
</script>
```

 




