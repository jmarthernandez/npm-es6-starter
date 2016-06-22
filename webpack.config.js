const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  lib: path.join(__dirname, 'lib'),
  build: path.join(__dirname, 'build'),
};

process.env.BABEL_ENV = TARGET;
const common = {
  entry: {
    app: PATHS.lib,
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  resolve: {
    root: [
      path.resolve('lib'),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app,
      },
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint-loader'],
        include: PATHS.app,
      },
    ],
  },
};

// default configuration
if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  });
}
