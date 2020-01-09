const express = require('express');
const path = require('path');

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
