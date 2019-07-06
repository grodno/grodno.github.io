/* global __dirname */

var path = require('path');

module.exports = {
  rules: [
    {
      test: /(\.jpg|\.jpeg|\.png|\.eot|\.ttf|\.svg|\.woff|\.woff2)$/,
      loader: 'file-loader?name=assets/[name]-[sha1:hash].[ext]'
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'fast-sass-loader',
          options: {
            outputStyle: 'expanded',
            includePaths: [path.resolve(__dirname, './src/styles')]
          }
        }

      ]
    },
    {
      test: /\.html$/,
      loader: 'raw-loader'
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      ]
    }
  ],
  // resolve modules
  modules: ['node_modules', 'vendor', 'lib'],
};
