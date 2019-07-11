/* eslint no-process-env: "off" */
/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint one-var: "off" */
/* eslint vars-on-top: "off" */
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
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
};

var compiler = webpack(config);

compiler.run(() => {
  console.log('Compiled successfully');
});
