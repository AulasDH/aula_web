const express = require('express');

const app = express();
app.use(express.json());

const usuarios = [];

// Criando recurso usuarios com método get para obter os usuários
app.get('/usuarios', (request, response) => {

    // retornando como resposta os usuarios criados
    response.json({ usuarios: usuarios })
})

// Criando recurso usuarios com método post para cadastra um usuário
app.post('/usuarios', (request, response) => {

    // recebendo o nome e sobrenome do corpo da requisicao e criando um objeto usuario
    const usuario = {
        nome: request.body.nome,
        sobrenome: request.body.sobrenome
    };

    // inserindo o usuario dentro do array de usuarios
    usuarios.push(usuario);

    // retornando o usuario criado
    response.json({ usuario });
})

// Criando recurso usuarios/:id com método put para atualizar um usuário
// o :id nesse cenário representa a posicao no array
app.put('/usuarios/:id', (request, response) => {
    // recebendo o id da requisicao
    const { id } = request.params;
    // recebendo os dados do corpo da requisicao
    const { nome, sobrenome } = request.body;

    // criando objeto usuario com os dados
    const usuario = {
        nome,
        sobrenome
    }

    // substituindo o usuario da posicao do array recebido com os novos dados
    usuarios[id] = usuario;

    // retornando novo usuario
    return response.json(usuario);
})

// Criando recurso usuarios/:id com método delete para excluir um usuário
// o :id nesse cenário representa a posicao no array
app.delete('/usuarios/:id', (request, response) => {
    // recebendo o id da requisicao
    const { id } = req.params;

    // utilizando o metodo splice para remover um item da posicao do array que foi recebido no parametro
    usuarios.splice(id, 1);

    // retornando sucesso: 204 representa que deu tudo certo, porém nao tem nada para retornar
    return res.status(204).send();
})

// iniciando servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor iniciado')
})

