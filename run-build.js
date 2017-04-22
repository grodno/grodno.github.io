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
      './app/index.js'
    ]
  },
  output: {
    path: __dirname + '/assets',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {
    loaders: commons.loaders
  },
  resolve: {
    modulesDirectories: commons.modulesDirectories,
    alias: {}
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' })
  ],
  devtoolLineToLine: true
};

var compiler = webpack(config);

compiler.run(()=>{
  console.log('Compiled successfully');
});
