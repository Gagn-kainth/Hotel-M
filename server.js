require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require('./routes/person');
const menuroutes = require('./routes/menu');
const bodyParser = require('body-parser');


app.use(bodyParser.json());// Middleware to parse JSON request bodies

const port = 3000;

app.use("/person",personRoutes);
app.use('/menu',menuroutes)



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
