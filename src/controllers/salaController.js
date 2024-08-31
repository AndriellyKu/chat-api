const { criarSalas, listarSalas, criarMensagem } = require("../models/salaModel");
const SECRET = "1234";
const jwt = require('jsonwebtoken');
const db = require("../models/db");
const { ObjectId } = require('mongodb');

const listar = async (req, res) => {
  try {
    let salas = await listarSalas();
    const resposta = {
      status: 200,
      salas: salas,
    }
    res.json(resposta);
  } catch (err) {
    res.status(500).send("Erro ao listar salas");
  }
}

const criar = async (req, res) => {
  try {
    const novaSala = await criarSalas(req.body);
    const {nome} = req.body;
    console.log(novaSala)
    const resposta = {
      status:200,
      resposta:"Sala "+nome+" criada com sucesso!"
    }
    res.status(201).json(resposta);
  } catch (error) {
    console.error("Erro no controller:", error);
    res.status(500).json({ message: 'Erro ao criar sala', error: error.message });
  }
}  
const sair = async (req, res) => { res.json({ status: 200, msg: "Saindo da sala...!" });}
const listarmen = async (req, res) => {
  try {
    const { idSala } = req.query;

    if (!idSala) {
      return res.status(400).send('idSala é obrigatório.');
    }

    const database = await db.connect();
    const salas = database.collection('salas');

    const sala = await salas.findOne(
      { _id: new ObjectId(idSala) },
      { projection: { mensagens: 1, _id: 0 } }
    );

    if (!sala) {
      return res.status(404).send('Sala não encontrada.');
    }
    const resposta = {
      status: 200,
      msgs: sala.mensagens
    }
    res.status(200).json(resposta);
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).send('Erro interno do servidor.');
  }
}
const entrar = async (req, res) => { res.json({
  "status": 200,
  "msg": "Entrando na sala.."
});}
const enviarmen = async (req, res) => {
  try {
    const { idSala } = req.query;
    const { conteudo } = req.body;
    console.log(conteudo, idSala);
    if (!idSala || !conteudo) {
      return res.status(400).send('idSala e conteúdo da mensagem são obrigatórios.');
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Token não fornecido.');
    }
    const token = authHeader;
    if (!token) {
      return res.status(401).send('Token mal formatado.');
    }
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET);
    } catch (err) {
      return res.status(401).send('Token inválido.' + err);
    }
    const { nome } = decoded;
    const mensagemData = { nome, nomegrupo: idSala, conteudo };
    const resultado = await criarMensagem(mensagemData);
    const resposta = {
      status: 200,
      msgs: mensagemData
    }
    res.status(201).json(resposta);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

module.exports = {
  listar,
  entrar,
  sair,
  listarmen,
  enviarmen,
  criar
};