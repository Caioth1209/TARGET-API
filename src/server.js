// server -> arquivo de configuracao do servidor

const app = require('./App');

let PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})