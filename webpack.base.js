const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    entry: './src/main.js',
    output: {
        // 需要使用绝对路径
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    module: {
        // 规则 --匹配规则以及匹配文件使用的loader
        rules: [
            // 处理字体文件
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[contenthash][ext]'
                }
            },
            
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack5-study',
            filename: 'index.html', // 默认值为index.html
            template: path.resolve(__dirname, './src/index.html'), // 绝对路径
            inject: 'body', // 把js文件插入到的位置
        }),
        
    ],
    // 1. 直接这样使用也可以生效,不过需要在index.html中手动使用script引入jquery cnd
    // externals:{
    //     jquery: 'jQuery'
    // },
    // 2. 或者这样使用
    // - key ru[jquery]是将来在模块里import的名字
    // - 数组第一项是对应的cdn地址
    // - 数组第二项第三方包在window上暴露的对象
    externalsType: 'script',
    externals: {
        // jquery: ['https://code.jquery.com/jquery-3.1.0.js', '$']
        jquery: ['https://code.jquery.com/jquery-3.1.0.js', 'jQuery']
    }
}