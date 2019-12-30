/* global __dirname */

var path = require('path');

module.exports = {
  module: {
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
        exclude: /(node_modules|vendor)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'vendor', 'lib'],
  },
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
