const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")


module.exports = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/,
                // 从右往左执行
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                // 从右往左执行
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[contenthash].css",
        }),
    ],
    optimization: {
        minimize: true,
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
            new CssMinimizerPlugin({
                exclude: /node_modules/
            }),
            new TerserPlugin({
                exclude: /node_modules/,
                extractComments: false
            })
        ],
        splitChunks: {
            chunks: 'all',
            // minSize: 20000,
            // minRemainingSize: 0,
            // minChunks: 1,
            // maxAsyncRequests: 30,
            // maxInitialRequests: 30,
            // enforceSizeThreshold: 50000,
            // cacheGroups: {
            //   defaultVendors: {
            //     test: /[\\/]node_modules[\\/]/,
            //     priority: -10,
            //     reuseExistingChunk: true,
            //   },
            //   default: {
            //     minChunks: 2,
            //     priority: -20,
            //     reuseExistingChunk: true,
            //   },
            // },
        }
    }
}