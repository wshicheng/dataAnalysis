 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const webpack = require('webpack')
 const ExtractTextPlugin = require('extract-text-webpack-plugin');

 // Create multiple instances
 const extractCSS = new ExtractTextPlugin('__bundle_build__/[name].[hash].css');
 const extractLESS = new ExtractTextPlugin('__bundle_build__/[name]-[hash].css');
 const extractSASS = new ExtractTextPlugin('__bundle_build__/[name]-[hash].css');
 module.exports = {
     entry: {
         app: './src/app.js'
     },
     output:{
        filename: '__bundle_build__/[name].[hash].js', 
        path: path.resolve(__dirname, 'build'), 
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
                 use: {
                    loader: 'file-loader',
                    options: {
                      name: '__images_build__/[name]?[hash:8].[ext]'
                    }
                  }
                // loader: "file?name=__images_build__/[name].[ext]"
                //  use: [
                //      'file-loader'
                //  ]
             },
             {
                 test: /\.(woff|woff2|eot|ttf|otf)$/,
                 use: {
                    loader: 'file-loader',
                    options: {
                      name: '__images_build__/[name]?[hash:8].[ext]'
                    }
                  }
                // loader: "file?name=[name].[ext]"
                //  use: [
                //      'file-loader'
                //  ]
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
         new CleanWebpackPlugin(['build']),
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