/* eslint no-process-env: "off" */
/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint one-var: "off" */
/* eslint vars-on-top: "off" */

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
// var connect = require('express');
var commons = require('./webpack.config.js');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './public/js/index.js'
    ]
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {
    rules: commons.rules
  },
  resolve: {
    modules: commons.modules,
    alias: {}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development',
  devtool: 'source-map'
};

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  contentBase: __dirname + '/public',
  hot: true,
  inline: true
});

server.listen(8089, '0.0.0.0', function () {
  console.log('Application is available at', server.listeningApp._connectionKey);
});
