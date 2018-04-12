const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const pkg = require(path.join(process.cwd(), 'package.json'));

const dllConfig = pkg.dllPlugin;
const outputPath = path.join(process.cwd(), dllConfig.path);

if (!pkg.dllPlugin) process.exit(0);

function getDependencies() {
  const dependencyNames = Object.keys(pkg.dependencies);
  const exclude = pkg.dllPlugin.exclude;
  const include = pkg.dllPlugin.inculde;
  const includeDependencies = _.uniq(dependencyNames.concat(include));

  return {
    generatedDependencies: _.putAll(includeDependencies, exclude);
  };
}

module.exports = require('./base')({
  context: process.cwd(),
});