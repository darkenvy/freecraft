const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack/dev');
const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  silent: true,
  stats: 'errors-only',
});
const fs = middleware.filesystem;

// function developmentMiddleware(app, options) {
// }

module.exports = (app, options) => {
  // developmentMiddleware(app, options);
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res) => fs.readFile(
    path.join(compiler.outputPath, 'index.html'), (err, file) => err ? res.send(404) : res.send(file.toString())
  ));

  return app;
};
