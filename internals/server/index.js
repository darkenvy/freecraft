const express = require('express');
const path = require('path');
const middleware = require('./middleware');

const host = process.env.HOST || null;
const port = parseInt(process.env.PORT || '3000', 10);
const app = express();
const options = {
  outputPath: path.resolve(process.cwd(), 'build'),
  publicPath: '/',
};

middleware(app, options);

console.log(`Hosting on ${host || 'http://localhost'}:${port}`);
app.listen(port, host, err => {
  if (err) console.error(err.message);
});
