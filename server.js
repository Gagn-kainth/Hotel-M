const express = require('express');
const app = express();
const db = require('./db');
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Hotel M. how may I assist you?');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
