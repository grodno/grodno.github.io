/* eslint no-process-env: "off" */
/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint one-var: "off" */
/* eslint vars-on-top: "off" */
const path = require('path');

var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
// var connect = require('express');
var commons = require('./devops/webpack.config.js');

var config = {
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8089',
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html'
    })
  ],
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/](web_modules|node_modules|modules)[\\/]/,
          priority: -10,

          name: 'vendors',
          chunks: 'all'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: true
  }
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
