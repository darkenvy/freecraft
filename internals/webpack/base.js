const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = options => ({
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output),
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      // {
      //   test: /\.html/,
      //   use: 'html-loader',
      // },
      // {
      //   test: /\.json/,
      //   use: 'json-loader',
      // },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}}),
    new CopyWebpackPlugin([
      { from: 'app/static/', to: 'static/', toType: 'dir' },
    ]),
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js'],
    mainFields: ['browser', 'main'],
    alias: {},
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
});
