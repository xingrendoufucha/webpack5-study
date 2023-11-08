### webpack项目初始化
1. 项目根目录下执行`npm init`
2. 安装 webpack依赖 npm i webpack webpack-cli -D
3. 命令行执行打包/编译 npx webpack
 - 该命令会去node-modules下的.bin目录下找webpack
 - 然后再找node_modules/webpack/bin/webpack.js中的默认配置,其中入口目录就叫src,出口默认为dist

