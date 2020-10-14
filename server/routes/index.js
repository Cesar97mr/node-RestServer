const express = require('express');

const app = express();
app.use(require('../routes/login'));
app.use(require('../routes/usuario'));
app.use(require('./categoria'));
app.use(require('./producto'))

module.exports = app;