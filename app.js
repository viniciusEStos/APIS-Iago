const express = require('express');
const bodyParser = require('body-parser');
const awsRouter = require('./Router/awsRouter.js');
const userRouter = require('./Router/usuarioRoutes.js')
const imageRouter = require('./Router/imagemRoutes.js')

const app = express();

app.use(bodyParser.json());
app.use('/aws', awsRouter);
app.use('/usuario', userRouter);
app.use('/imagem', imageRouter);

module.exports = app;