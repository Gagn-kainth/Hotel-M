const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/harrypotter', (req, res) => {
    var harrypotter = {
        name: 'Harry Potter',
        house: 'Gryffindor',
        wand: 'Holly, 11, Phoenix feather',
        patronus: 'Stag'
    };
    res.send(harrypotter);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
