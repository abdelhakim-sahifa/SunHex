const express = require('express');
const app = express();
const path = require('path');



app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

module.exports = app;
