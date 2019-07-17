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
      './lib/armatura/index.js'
    ]
  },
  output: {
    path: __dirname + '/docs',
    filename: 'armatura.js',
    devtoolModuleFilenameTemplate: '[resource-path]',
    library: 'armatura',
    libraryTarget: 'umd',
  },
  module: commons.module,
  resolve: commons.resolve,
  mode: 'development',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
};

var compiler = webpack(config);

compiler.run(() => {
  console.log('Compiled successfully');
});
