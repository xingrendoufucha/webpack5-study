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
    - 抽离样式为独立的css文件
        - mini-css-extract-plugin   这个和style-loader冲突  二选一;抽离样式为独立的css文件
        - css-minimizer-webpack-plugin 经过上一步处理后，css文件被单独打包，但并没有压缩处理。 这个插件使用[cssnano](https://cssnano.co/ )优化和压缩 CSS
    - css自动添加前缀 使用postcss-loader autoprefixer
    - es6转es5使用babel-loader @babel/core @babel/preset-env
- file 图片文件等都可以使用webpack内置处理
- 优化图片(将指定大小的图片转为base64，虽会增加文件大小，但减少了请求次数)
    - 在loader中配置,会将小于指定masSize的图片转换成base64，减少网络请求
    - [图片/文件处理](https://webpackjs.com/configuration/module/#moduleparser)
     ```js
    {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        // webpack内置的，不用use可以直接指定type
        type: 'asset',
        parser:{
            dataUrlCondition: {
                maxSize: 6 * 1024 // 小于6kb的文件将会被转换成base64，不再额外发送请求去请求文件
            }
        }
    }
    ```
### 合并webpack配置项
- 安装webpack-merge包 'npm i webpack-merge -D'
###　优化图片(压缩)
- 安装image-minimizer-webpack-plugin imagemin包压缩图片 'npm i image-minimizer-webpack-plugin imagemin -D'
- 安装 npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev 
    - npm装包的时候可能会报错,修改本地host文件 185.199.108.133   raw.githubusercontent.com  然后再npm,失败的话重试几次,可能就成功了
- [使用image-minimizer-webpack-plugin](https://www.npmjs.com/package/image-minimizer-webpack-plugin)
    ```js
    const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                      // Lossless optimization with custom option
                      // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 3 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                              "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    addAttributesToSVGElement: {
                                                        params: {
                                                            attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ]
    }
    ```