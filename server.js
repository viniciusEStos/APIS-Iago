const app = require('./app');

const port = 9090;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});