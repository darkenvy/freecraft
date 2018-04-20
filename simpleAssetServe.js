const express = require('express');
const path = require('path');
const app = express();

app.get('/:file', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.sendFile(path.join(__dirname, 'app/static/textures', req.params.file));
});

console.log('listening on 3001');
app.listen(3001);
