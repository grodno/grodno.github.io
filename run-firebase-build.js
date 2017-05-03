/* eslint no-process-env: "off" */
/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint one-var: "off" */
/* eslint vars-on-top: "off" */
var webpack = require('webpack');
var commons = require('./webpack.config.js');

var config = {
  entry: {
    index: [
      './src/mova/index.js'
    ]
  },
  output: {
    path: __dirname + '/functions',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[resource-path]',
    library: 'module.exports',
    libraryTarget: 'assign'
  },
  module: {
    loaders: commons.loaders
  },
  resolve: {
    modulesDirectories: commons.modulesDirectories,
    alias: {}
  },
  externals: {
    'firebase-functions': 'require("firebase-functions")'
  }
};

var compiler = webpack(config);

compiler.run(()=>{
  console.log('firebase: Compiled successfully');
});
