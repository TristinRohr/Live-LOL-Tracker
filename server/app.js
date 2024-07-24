const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/api', apiRoutes);
app.use(errorHandler);

module.exports = app;