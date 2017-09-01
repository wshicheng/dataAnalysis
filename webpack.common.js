 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const webpack = require('webpack')
 const ExtractTextPlugin = require('extract-text-webpack-plugin');

 // Create multiple instances
 const extractCSS = new ExtractTextPlugin('[name].[hash].css');
 const extractLESS = new ExtractTextPlugin('[name]-[hash].css');
 const extractSASS = new ExtractTextPlugin('[name]-[hash].css');
 module.exports = {
     entry: {
         app: './src/app.js'
     },
     output: {
         filename: '[name].bundle.js',
         path: path.resolve(__dirname, 'dist'),
         publicPath: '/'
     },
     module: {
         rules: [{
            test: /\.(less|css)$/,
            use:[ 'style-loader','css-loader','less-loader'],
          },
             {
                 test: /\.scss$/,
                 use: extractSASS.extract(['css-loader', 'sass-loader'])
             },
             // {
             //     test: /\.scss$/,
             //     use: ExtractTextPlugin.extract({
             //       fallback: 'style-loader',
             //       //resolve-url-loader may be chained before sass-loader if necessary
             //       use: ['css-loader', 'sass-loader']
             //     })
             //   },
             {
                 test: /\.ts$/,
                 use: 'ts-loader'
             },
             {
                 test: /\.(js|jsx)$/,
                 exclude: /node_modules/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             },
             {
                 test: /\.vue$/,
                 loader: 'vue-loader',
                 options: {
                     loaders: {
                         css: ExtractTextPlugin.extract({
                             use: 'css-loader',
                             fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                         })
                     }
                 }
             },
             {
                 test: /\.(png|svg|jpg|gif)$/,
                 use: [
                     'file-loader'
                 ]
             },
             {
                 test: /\.(woff|woff2|eot|ttf|otf)$/,
                 use: [
                     'file-loader'
                 ]
             },
             {
                 test: /\.(csv|tsv)$/,
                 use: [
                     'csv-loader'
                 ]
             },
             {
                 test: /\.xml$/,
                 use: [
                     'xml-loader'
                 ]
             }
         ]
     },
     plugins: [
         new CleanWebpackPlugin(['dist']),
         new HtmlWebpackPlugin({
             title: 'Production',
             template: './src/template/index.html'
         }),
         new webpack.optimize.CommonsChunkPlugin({
             name: 'common' // Specify the common bundle's name.
         }),
         new webpack.HashedModuleIdsPlugin({
             hashFunction: 'sha256',
             hashDigest: 'hex',
             hashDigestLength: 20
         }),
         extractCSS,
         extractLESS,
         extractSASS
     ]
 };