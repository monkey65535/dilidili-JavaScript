# Webpack

标签（空格分隔）： JavaScript从入门到放弃 webpack

---

## 1 webpack
>Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。   

[Webpack官方中文文档](http://webpackdoc.com/)  

## 2.安装
使用`npm` 全局安装安装`webpack`
```
npm install webpack -global     
```
然后在项目中添加依赖
```
//首先生成package.json文件
npm init
//将webpack添加到本地项目依赖中
npm install webpack --save-dev
```
**注意：不要在init的时候把项目命名为webpack 否则无法安装本地依赖**
## 3.尝试webpack打包
项目结构：
```
|  –  webpack 项目目录
       |  – index.html
       |  – style.css
       |  – entry.js        webpack入口文件
       |  – bundle.js       webpack打包输出文件
       |  – package.json    npm依赖文件
```
entry.js：
```
document.getElementById("app").innerHTML = "hello World";
```
index.html：
```
<div id="app"></div>
<script src="bundle.js"></script>
```
命令行：
```
webpack entry.js bundle.js
```
这样就能把`entry.js`打包输出为`bundle.js`

## 4. 项目模块化
在使用webpack打包的时候，它会分析项目文件和文件之间的依赖关系。
在文件目录下新建一个`name.js`
```
module.exports = "this is Webpack!"
```
然后在`entry.js`中使用require加载`name.js`
```
var name = require("./name");
//调用name
document.getElementById("app").innerHTML = "hello World" +name;
```
再次执行打包，刷新页面，会看到：hello Worldthis is Webpack!  
打开bundle.js，可以看到
![image_1aria3hktkmv18e91lsnnui1ksc9.png-33.9kB][1]

## 5 loader
>Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。  

>Loader 本身也是运行在 node.js 环境中的 JavaScript 模块，它通常会返回一个函数。大多数情况下，我们通过 npm 来管理 loader，但是你也可以在项目中自己写 loader 模块。  

>按照惯例，而非必须，loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。  
  
**Loader 可以在 require() 引用模块的时候添加，也可以在 webpack 全局配置中进行绑定，还可以通过命令行的方式使用。**  

如果我们想导入一个css文件`style.css`
首先创建一个`style.css`
然后将css-loader和style-loader加载进项目依赖
```
npm install css-loader style-loader --save-dev
```
在入口文件entry.js中载入css
```
var name = require("./name");
//使用css-loader和style-loader加载style.css
require('style!css!./style.css');

document.getElementById("app").innerHTML = "hello World~" +name;
```
如果每次 require CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情。我们可以根据模块类型（扩展名）来自动绑定需要的 loader。

将 entry.js 中的 require("!style!css!./style.css") 修改为 require("./style.css") ，然后执行：
```
 webpack entry.js bundle.js --module-bind 'css=style!css'

# 有些环境下可能需要使用双引号
 webpack entry.js bundle.js --module-bind "css=style!css"
```
显然，这两种使用 loader 的方式，效果是一样的。

## 6.webpack.config.js
>Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的 webpack.config.js 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 --config 选项来指定配置文件。  

创建一个webpack.config.js文件
```
module.exports = {
    //入口
    entry:'./entry.js',         //入口文件的路径
    //出口
    output:{
        path:__dirname,         //说明是要把输出的文件放在入口文件同目录下 这是一个node的变量，获取当前模块文件所在目录的完整绝对路径
        filename:'bundle.js'    //输入文件的文件名
    },
    //加载模块
    module:{
        loaders:[
            {
                test: /\.css$/,     //符合内容的文件用loader处理
                loader: 'style!css' //多个loader使用！链接
            }
        ]
    }
};
```
**注意：载入css文件需要在入口文件使用require加载这个css**  

## 7 生成suorce-map
```
$ webpack --devtool source-map
```
使用这个命令之后会在你的项目目录中生成一个对应你的打包文件的`.map`文件  

然后我们在回到控制台，在source栏目中可以看到以下内容
![image_1au9oh59o8i7aepmlb2bbpnc9.png-9.2kB][2]
 
也可以在webpack.config.js中配置source-map
```
module.exports = {
    entry:'./entry.js',        
    output:{
        path:__dirname,         
        filename:'bundle.js'   
    },
    module:{
        loaders:[
            {
                test: /\.css$/, 
                loader: 'style!css' 
            }
        ]
    }，
     //生成source-map文件
    devtool:'source-map'
};
```
## 8.webpack+babel  
使用webpack来编译babel，首先我们需要安装一个babel-loader，如果你没有安装babel的话，那么可以一起安装。我们把这些内容加载到项目依赖中
```
$ npm install babel-loader babel-core babel-preset-es2015 --save-dev
```  
然后我们回到编辑器中，添加一个babel的设置文件`.babelrc`，在文件内设置编译：
```
{
  "presets": ["es2015"]
}
```
然后在webpack中设置loader
```
module.exports = {
    entry:'./entry.js',        
    output:{
        path:__dirname,         
        filename:'bundle.js'   
    },
    module:{
        loaders:[
            {
                test: /\.css$/, 
                loader: 'style!css' 
            },
            {
                test:/\.js$/，
                loader:'babel
            }
        ]
    }，
    devtool:'source-map'
};
```
## 9 webpack-dev-server
这个模块可以给我们生成一个localhost服务器，还可以为我们提供热重载功能  

所谓热重载，就是我们在修改代码的时候会自动替换有变化的内容，而不需要刷新页面。

安装：
```
//首先需要在全局安装
$ npm install webpack-dev-server -g
//然后在再把它加载到项目依赖里面
$ npm install webpack-dev-server --save-dev
```
使用：
```
webpack-dev-server --inline --hot
```
使用命令后会在8080端口生成一个localhost服务器，提供了热重载功能。

实验过程中发现页面还是进行了刷新，难道是我的配置有问题？    

  [1]: http://static.zybuluo.com/dilidili/3qcgw40e2tj0ep5jkbhkjonz/image_1aria3hktkmv18e91lsnnui1ksc9.png
  [2]: http://static.zybuluo.com/dilidili/j5kzrf93veazxmtv879mu1v8/image_1au9oh59o8i7aepmlb2bbpnc9.png