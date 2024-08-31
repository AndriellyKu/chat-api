const { connect } = require('./db');

async function registrarUser(nick) {
    const db = await connect(); 
    const collection = db.collection('usuarios'); 
    return await collection.insertOne({ 'nick': nick }); 
}

async function deletarUser(nome) {
    const db = await connect();
    const collection = db.collection('usuarios');
    return await collection.deleteOne({ 'nick.nome': nome });
}

module.exports = {
    registrarUser,
    deletarUser
};
