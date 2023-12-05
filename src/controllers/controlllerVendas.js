const express = require('express');
const server = express();
const dadosVendas = require('./data/dadosVendas.json'); // Substitua pelo caminho real do seu arquivo de dados de vendas
const fs = require('fs');

server.use(express.json());

// Salvar/inserir dados no JSON (Create do CRUD)
server.post('/vendas', (req, res) => {
    const novaVenda = req.body;

    if (!novaVenda.data_venda || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        novaVenda.id_venda = dadosVendas.vendas.length + 1;
        dadosVendas.vendas.push(novaVenda);
        salvarDadosVendas(dadosVendas);
        return res.status(201).json({ mensagem: "Nova venda cadastrada com sucesso!" });
    }
});

// Consumir dados da API (Read do CRUD)
server.get('/vendas', (req, res) => {
    return res.json(dadosVendas.vendas);
});

// Atualizar uma venda (Update do CRUD)
server.put('/vendas/:id', (req, res) => {
    const vendaId = parseInt(req.params.id);
    const atualizaVenda = req.body;
    const idVenda = dadosVendas.vendas.findIndex(v => v.id_venda === vendaId);

    if (idVenda === -1) {
        return res.status(404).json({ mensagem: "Venda não encontrada :/" });
    } else {
        // Atualiza a data da venda
        dadosVendas.vendas[idVenda].data_venda = atualizaVenda.data_venda || dadosVendas.vendas[idVenda].data_venda;

        // Atualiza o ID do medicamento
        dadosVendas.vendas[idVenda].id_medicamento = atualizaVenda.id_medicamento || dadosVendas.vendas[idVenda].id_medicamento;

        // Atualiza o ID do cliente
        dadosVendas.vendas[idVenda].id_cliente = atualizaVenda.id_cliente || dadosVendas.vendas[idVenda].id_cliente;

        salvarDadosVendas(dadosVendas);

        return res.json({ mensagem: "Venda atualizada com sucesso!" });
    }
});

// Deletar venda (Delete do CRUD)
server.delete('/vendas/:id', (req, res) => {
    const vendaId = parseInt(req.params.id);
    dadosVendas.vendas = dadosVendas.vendas.filter(v => v.id_venda !== vendaId);
    salvarDadosVendas(dadosVendas);
    return res.status(200).json({ mensagem: "Venda excluída com sucesso" });
});

function salvarDadosVendas(dados) {
    fs.writeFileSync(__dirname + '/data/dadosVendas.json', JSON.stringify(dados, null, 2));
}

module.exports = { server, salvarDadosVendas };
