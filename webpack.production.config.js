// const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",   //唯一入口文件
    output: {
        // path: path.resolve(__dirname,'public'),    //打包后的文件存放的地方
        path: __dirname + '/build',    //打包后的文件存放的地方
        filename: "bundle-[hash].js"           //打包后输出文件的文件名
    },

    //配置本地服务器 devserver
    devServer: {
        contentBase: "./public",   //本地服务器所加载的页面所在的目录
        historyApiFallback: true,   //不跳转   如果设置为true，所有的跳转将指向index.html
        inline: true,  //实时刷新  设置为true，当源文件改变时会自动刷新页面
        port: "8090"   //设置默认监听端口，如果省略，默认为”8080“
    },

    //loader配置
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,  //用以匹配loaders所处理文件的拓展名(正则表达式必须)
                use: {
                    loader: "babel-loader",   //loader的名称（必须）

                    //babel配置单独放在.babelrc文件中
                    /*options: {
                        presets: [
                            "env","react"
                        ]
                    }*/
                },
                exclude: /node_module/,    //手动添加必须处理(include)的文件（文件夹）或屏蔽不需要处理(exclude)的文件（文件夹）（可选）
                // query：为loaders提供额外的设置选项（可选）
            },

            //css-loader,style-loader配置
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,   // 指定启用css modules
                            // localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    // 使用插件
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'  //new 一个这个插件的实例，并传入相关的参数
        }),
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),
        // 清除打包后的残余文件
        new CleanWebpackPlugin('build/*.*',{
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
};