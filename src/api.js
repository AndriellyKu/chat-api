require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const userController = require('./controllers/userController');
const salaController = require('./controllers/salaController');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/entrar', (req, res) => {
    userController.entrar(req, res);
}); 


app.delete('/sair', (req, res) => {
    userController.sair(req, res);
}); 


app.get('/salas', (req, res) => {
    salaController.listar(req, res);
});


app.put('/sala/sair', (req, res) => {
    
    salaController.sair(req, res);
});


app.put('/sala/entrar', (req, res) => {
    
    salaController.entrar(req, res);
});


app.post('/sala/criar', (req, res) => {
    
    salaController.criar(req, res);
});

app.get('/sala/mensagens', (req, res) => {
    salaController.listarmen(req, res);
});

app.post('/sala/mensagem', (req, res) => {
    salaController.enviarmen(req, res);
});

app.get('/', (req, res) => {
    res.send('Chat api - andrielly kotcheski');
}); 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
