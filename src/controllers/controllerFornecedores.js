const express = require('express');
const server = express();
const dadosFornecedores = require('./data/dadosFornecedores.json');
const fs = require('fs');

server.use(express.json());

// Salvar/inserir dados no JSON (Create do CRUD)
server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body;

    if (!novoFornecedor.nome_fornecedor || !novoFornecedor.endereco_fornecedor || !novoFornecedor.telefone_fornecedor) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        novoFornecedor.id_fornecedor = dadosFornecedores.fornecedores.length + 1;
        dadosFornecedores.fornecedores.push(novoFornecedor);
        salvarDados(dadosFornecedores);
        return res.status(201).json({ mensagem: "Novo fornecedor cadastrado com sucesso!" });
    }
});

// Consumir dados da API (Read do CRUD)
server.get('/fornecedores', (req, res) => {
    return res.json(dadosFornecedores.fornecedores);
});

// Atualizar um fornecedor (Update do CRUD)
server.put('/fornecedores/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id);
    const atualizaFornecedor = req.body;
    const idFornecedor = dadosFornecedores.fornecedores.findIndex(f => f.id_fornecedor === fornecedorId);

    if (idFornecedor === -1) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado :/" });
    } else {
        // Atualiza o nome do fornecedor
        dadosFornecedores.fornecedores[idFornecedor].nome_fornecedor = atualizaFornecedor.nome_fornecedor || dadosFornecedores.fornecedores[idFornecedor].nome_fornecedor;

        // Atualiza o endereço do fornecedor
        dadosFornecedores.fornecedores[idFornecedor].endereco_fornecedor = atualizaFornecedor.endereco_fornecedor || dadosFornecedores.fornecedores[idFornecedor].endereco_fornecedor;

        // Atualiza o telefone do fornecedor
        dadosFornecedores.fornecedores[idFornecedor].telefone_fornecedor = atualizaFornecedor.telefone_fornecedor || dadosFornecedores.fornecedores[idFornecedor].telefone_fornecedor;

        salvarDados(dadosFornecedores);

        return res.json({ mensagem: "Fornecedor atualizado com sucesso!" });
    }
});

// Deletar fornecedor (Delete do CRUD)
server.delete('/fornecedores/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id);
    dadosFornecedores.fornecedores = dadosFornecedores.fornecedores.filter(f => f.id_fornecedor !== fornecedorId);
    salvarDados(dadosFornecedores);
    return res.status(200).json({ mensagem: "Fornecedor excluído com sucesso" });
});

function salvarDados(dados) {
    fs.writeFileSync(__dirname + '/data/dadosFornecedores.json', JSON.stringify(dados, null, 2));
}

module.exports = { server, salvarDados };
