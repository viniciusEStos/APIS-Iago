const express = require('express');
const bodyParser = require('body-parser');
const awsRouter = require('./Router/awsRouter.js');

const app = express();

app.use(bodyParser.json());
app.use('/aws', awsRouter);

module.exports = app;