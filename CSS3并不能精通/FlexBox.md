# FlexBox

标签（空格分隔）： CSS3并不能精通

---



flexbox的出现是为了解决复杂的web布局，因为这种布局方式很灵活。容器的子元素可以任意方向进行排列。

属性： 

1.将容器转换为flex布局  

```
display: flex | inline-flex
```
2.创建主轴，同时定义主轴的伸缩方向 
```
flex-direction: row | row-reverse | column | column-reverse
```
![主轴方向](http://img.blog.csdn.net/20150616140933077)  
 
- row:主轴从左到右伸缩  
- row-reverse:与row伸缩方向相反  
- column：主轴从上到下进行伸缩  
- column-reverse：与column伸缩方向相反  

3.order可以改变伸缩项目在他们伸缩容器中出现的顺序。  

```
order: <integer> 
```

![order](http://img.blog.csdn.net/20150616144249372)  

4.flex-wrap用来定义伸缩容器里是单行还是多行显示，侧轴的方向决定了新行堆放的方向。 

```
flex-wrap: nowrap | wrap | wrap-reverse 
```
 
- nowarp  伸缩容器单行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列。  
- wrap：伸缩容器多行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列。  
- wrap-reverse：伸缩容器多行显示，“ltr”排版下，伸缩项目从右向左排列；“rtl”排版下，伸缩项目从左到右排列。（和wrap相反）  
![flex-warp](http://img.blog.csdn.net/20150616144822191)  

5.flex-flow：这个是flex-direction和flex-warp的和写，默认属性为row || nowrap  

```
flex-flow: <‘flex-direction’> || <‘flex-wrap’>  
```  

6.justify-content:这个是用来定义伸缩项目沿着主轴线的对齐方式。  

```
justify-content: flex-start | flex-end | center | space-between | space-around;  
```  
当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。  

- flex-start(默认值)：伸缩项目向一行的起始位置靠齐。
- flex-end：伸缩项目向一行的结束位置靠齐。  
- center：伸缩项目向一行的中间位置靠齐。  
- space-between：伸缩项目会平均地分布在行里。第一个伸缩项目一行中的最开始位置，最后一个伸缩项目在一行中最终点位置。  
- space-around：伸缩项目会平均地分布在行里，两端保留一半的空间。  
![justify-content](http://img.blog.csdn.net/20150616151746589)  

7.align-content(flex-content)：这个属性主要用来调准伸缩行在伸缩容器里的对齐方式。类似于伸缩项目在主轴上使用“justify-content”一样。  

```
 align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```  
![align-content](http://img.blog.csdn.net/20150616163037523)  

8.align-items(flex-container)：
```
align-items: flex-start | flex-end | center | baseline | stretch
```    
- lex-start：伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起始的边。
- flex-end：伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点的边 。
- center：伸缩项目的外边距盒在该行的侧轴上居中放置。
- baseline：伸缩项目根据他们的基线对齐。
- stretch（默认值）：伸缩项目拉伸填充整个伸缩容器。此值会使项目的外边距盒的尺寸在遵照「min/max-width/height」属性的限制下尽可能接近所在行的尺寸。  
![align-items](http://img.blog.csdn.net/20150616152600533)  

9.align-self：用来在单独的伸缩项目上覆写默认的对齐方式。  
```
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```  
![align-self](http://img.blog.csdn.net/20150616162253991)  

10.flex-grow：根据需要用来定义伸缩项目的扩展能力。它接受一个不带单位的值做为一个比例。主要用来决定伸缩容器剩余空间按比例应扩展多少空间。  
```
flex-grow: <number>; /* default 0 */
```  
如果所有伸缩项目的“flex-grow”设置了“1”，那么每个伸缩项目将设置为一个大小相等的剩余空间。如果你给其中一个伸缩项目设置了“flex-grow”值为“2”，那么这个伸缩项目所占的剩余空间是其他伸缩项目所占剩余空间的两倍。如下图：  
![flex-grow](http://img.blog.csdn.net/20150616153319255)  

12.flex-basis（flex items）:这个用来设置伸缩基准值，剩余的空间按比率进行伸缩。  
```
flex-basis: <length> | auto; /* default auto */ 
```  
如果设置为“0”，不考虑剩余空白空间。如果设置为自动，则按照flex-grow值分配剩余空白空间。如图所示：  
![flex-basis](http://img.blog.csdn.net/20150616160709459)  

13.flex（flex items）:这是“flex-grow”、“flex-shrink”和“flex-basis”三个属性的缩写。其中第二个和第三个参数（flex-shrink、flex-basis）是可选参数。默认值为“0 1 auto”。  
```
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```

