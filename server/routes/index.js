const express = require('express');

const app = express();
app.use(require('../routes/login'));
app.use(require('../routes/usuario'));
app.use(require('./categoria'));
app.use(require('./producto'));
app.use(require('./upload'));
app.use(require('./imagenes'));


module.exports = app;