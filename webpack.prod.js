 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const BabiliPlugin = require("babili-webpack-plugin");
 const common = require('./webpack.common.js');
const path = require('path')
 module.exports = merge(common, {
     devtool: 'sourceMap',
     plugins: [
         new BabiliPlugin(),
     ]
 });