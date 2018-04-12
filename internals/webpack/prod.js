const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const htmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPluginConfig = new htmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body',
});

const uglifyjsOptions = {
  cache: true,
  parallel: true,
  uglifyOptions: {
    compress: true,
    ecma: 6,
    mangle: true
  },
  sourceMap: true
};

const splitChunks = {
  chunks: 'all',
  minSize: 0,
  maxAsyncRequests: Infinity,
  maxInitialRequests: Infinity,
  name: true,
  cacheGroups: {
    default: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      priority: -20,
      reuseExistingChunk: true,
    },
    vendors: {
      name: 'vendors',
      enforce: true,
      test: function(module) {
        return (
          module.resource &&
          (module.resource.startsWith(root('node_modules')) ||
            module.resource.startsWith(root('vendor')))
        );
      },
      priority: -10,
      reuseExistingChunk: true,
    },
    commons: {
      name: 'commons',
      chunks: 'initial',
      minChunks: 2,
      test: function(module) {
        return module.resource && module.resource.startsWith(root('app'));
      },
      priority: -5,
      reuseExistingChunk: true,
    },
  },
};

module.exports = require('./base')({
  entry: {
    app: path.join(process.cwd(), 'app/index.js'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    htmlWebpackPluginConfig,
    new BundleAnalyzerPlugin({ 'process.env.NODE_ENV': '"production"'}),
  ],
  optimization: {
    optimization: { splitChunks },
    minimizer: [ new UglifyJsPlugin(uglifyjsOptions) ]
  },
  mode: 'production',
});