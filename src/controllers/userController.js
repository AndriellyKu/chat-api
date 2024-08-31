const SECRET = "1234"
const jwt = require('jsonwebtoken');
const { registrarUser, deletarUser } = require('../models/userModel');

const entrar = async (req, res) => {
    const {nome} = req.body;
    const a = await registrarUser(req.body);
    const token = jwt.sign({ nome: nome }, SECRET, { expiresIn: '48h' });
    const resposta = {
      status: 200,
      token:token,
    }
    res.json(resposta);
  } 
    
const sair = async (req, res) => {
    try {
    
        const token = req.headers.authorization;
        console.log(token);
        if (!token) {
            return res.status(401).send('No token provided.');
        }


        const decoded = jwt.verify(token, SECRET);
        const { nome } = decoded;
        console.log(nome);
        await deletarUser(nome);

        res.json({
          status: 200,
          msg: "OK"
        });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(401).send('Invalid token.');
    }
};
    
  module.exports = {
    entrar,
    sair
  };