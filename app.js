const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/ss', (req, res) => res.send('Hello ss!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));