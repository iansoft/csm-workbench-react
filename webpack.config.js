// $ webpack --display-error-details
// $ webpack --config XXX.js //使用另一份配置文件（比如webpack.config2.js）来打包
// $ webpack --watch //监听变动并自动打包$ webpack -p//压缩混淆脚本，这个非常非常重要！
// $ webpack -d//生成map映射文件，告知哪些模块被最终打包到哪里了

const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('csm.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');

const outputFolder = './csm_workbench/static/js'

module.exports = {
    devtool:"cheap-module-eval-source-map",
    entry: {
        dashboard:'./csm_entry/csm.dashboard.js',
        //app2:'./src/js/app2.js',
    },
    output: {
        path: outputFolder,
        filename: 'csm.[name].bundle.js',
        chunkFilename: "[name].js"
    },
    module: {
        //"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
        loaders: [
            //所有的.js文件都用babel-loader去处理，除了/node_modules中的文件/
            {test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            {test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/,},
            {test: /\.css$/, loader: 'style-loader!css-loader',exclude: /node_modules/,},
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap',exclude: /node_modules/,},	
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192',exclude: /node_modules/,}

            //{test: /\.js$/, loader: 'jsx-loader?harmony',exclude: /node_modules/,},	
            //{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }, 
        ]
    },
    plugins: [
        //使用压缩打包
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        //它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。
        commonsPlugin,
        //首先清空out folder
        new CleanPlugin(outputFolder),
        //独立打包css
        //new ExtractTextPlugin("[name].css")
    ],
    resolve:{
         //自动补全后缀
         extensions:['','.js','.jsx','.json','.css','.sass']
    }
};

