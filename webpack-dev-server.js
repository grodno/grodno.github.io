/* eslint no-process-env: "off" */
/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint one-var: "off" */
/* eslint vars-on-top: "off" */
const path = require('path');

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var commons = require('./ops/webpack.config.js');

var config = {
  entry: {
    index: [
      './app/index.js'
    ]
  },
  output: {
    path: __dirname + '/docs',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: commons.module,
  resolve: commons.resolve,
  mode: 'development',
  devtool: 'source-map',
  // optimization: commons.optimization
};

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  contentBase: __dirname + '/docs',
  hot: true,
  inline: true
});

server.listen(8089, '0.0.0.0', function () {
  console.log('Application is available at', server.listeningApp._connectionKey);
});
