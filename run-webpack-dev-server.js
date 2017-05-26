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
      'webpack-dev-server/client?http://localhost:8082',
      'webpack/hot/only-dev-server',
      './app/index.js'
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
  ]
  // devtoolLineToLine: true
};

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  contentBase: __dirname + '/public',
  // debug: true,
  hot: true,
  // verbose: true,
  stats: {
    colors: true,
    assets:       false,
    chunks:       false,
    chunkModules: false,
    modules:      true
  }
});

server.listen(8082, '0.0.0.0', function () {
  console.log('Demo is available at', server.listeningApp._connectionKey);
});
