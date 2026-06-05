const express = require('express');
const app = express();
const db = require('./db');
const urlRoutes = require('./routes/url');
const bodyParser = require('body-parser');


app.use(bodyParser.json());// Middleware to parse JSON request bodies

const port = 3000;

app.use("/url",urlRoutes);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
