const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('HelloWorld'));

app.listen(port, () => console.log('example app listing on port ${port}'));
