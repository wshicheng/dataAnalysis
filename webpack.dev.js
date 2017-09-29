 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const path = require('path');
 module.exports = merge(common, {
   devtool: 'inline-source-map',
   devServer: {
     disableHostCheck: true,
     port:3000,
     contentBase: './build',
     inline: true,
     historyApiFallback: true
   }
 });