const express = require('express');
const path = require('path');

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// only serve bundle(s) in production mode. otherwise webpack dev server serves files
if (process.env.NODE_ENV === 'production') app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
