### webpack项目初始化
1. 项目根目录下执行`npm init`
2. 安装 webpack依赖 npm i webpack webpack-cli -D
3. 命令行执行打包/编译 npx webpack
 - 该命令会去node-modules下的.bin目录下找webpack
 - 然后再找node_modules/webpack/bin/webpack.js中的默认配置,其中入口目录就叫src,出口默认为dist

### webpack配置文件
- 配置文件须放在项目根目录下
- 默认名称为webpack.config.js，使用nodejs的语法
- entry 入口
- output 输出
- devServe  开发服务器 
 - npm install webpack-dev-server --save-dev
 - 运行命令 'npx webpack serve'

### 插件
 - html-webpack-plugin 
    - [html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin)
    - 处理html文件
### 模块
- css    
    - css-loader 让webpack可以识别css文件
    - style-loader 把css文件插入到html文件中
    - mini-css-extract-plugin 把css文件打包成单独文件
- file 图片文件等都可以使用webpack内置处理
 - [图片/文件处理](https://webpackjs.com/configuration/module/#moduleparser)