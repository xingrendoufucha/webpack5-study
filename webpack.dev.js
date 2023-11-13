const path = require('path')
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                // 从右往左执行
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                // 从右往左执行
                use: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
    },
    devServer: {
        port: '9999', // 端口号
        open: true,  // 服务器启动后，是否自动使用默认浏览器打开  true/false
        static: {
            // 监听的静态资源目录是打包后的文件夹，本项目是dist
            directory: path.join(__dirname, 'dist'),
        },
        hot: true, // 启用模块热更新
        compress: true, // 压缩代码
        client: {
            overlay: false, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。 true / false
        },
        watchFiles: ['./src/index.html'],
    },
}