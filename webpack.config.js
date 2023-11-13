const { merge } = require('webpack-merge')
const path = require('path')

module.exports = function(env, argv){
    switch (argv.mode) {
        case "development":
            return merge(require('./webpack.base'), require('./webpack.dev'))
        case "production":
            return merge(require('./webpack.base'), require('./webpack.pro'))
        default:
            throw new Error("No matching configuration was found!")
    }
}

// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         // 需要使用绝对路径
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].[contenthash].js',
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             title: 'webpack5-study',
//             filename: 'index.html',
//             template: path.resolve(__dirname, './src/index.html'), // 绝对路径
//             inject: 'body', // 把js文件插入到的位置
//         })
//     ],
//     devServer: {
//         port: '9999', // 端口号
//         open: true,  // 服务器启动后，是否自动使用默认浏览器打开  true/false
//         static: {
//             // 监听的静态资源目录是打包后的文件夹，本项目是dist
//             directory: path.join(__dirname, 'dist'),
//         },
//         hot: true, // 启用模块热更新
//         client: {
//             overlay: false, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。 true / false
//         },
//         watchFiles: ['./src/index.html'],
//     },
//     module: {
//         // 规则 --匹配规则以及匹配文件使用的loader
//         rules: [
//             {
//                 test: /\.css$/,
//                 // 从右往左执行
//                 use: ['style-loader', 'css-loader']
//             },
//             {
//                 test: /\.less$/,
//                 // 从右往左执行
//                 use: ['style-loader', 'css-loader', 'less-loader']
//             },
//             {
//                 test: /\.(jpg|png|gif|jpeg|svg)$/,
//                 // webpack内置的，b不用use可以直接指定type
//                 type: 'asset/resource'
//             }
//         ]
//     }
// }