const express = require('express');
const app = express();
const db = require('./db');
const urlRoutes = require('./routes/person');
const menuroutes = require('./routes/menu');
const bodyParser = require('body-parser');


app.use(bodyParser.json());// Middleware to parse JSON request bodies

const port = 3000;

app.use("/",urlRoutes);
app.use('/',menuroutes)



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
