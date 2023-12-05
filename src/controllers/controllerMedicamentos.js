const express = require('express');
const server = express();
const dadosMedicamentos = require('./data/dadosMedicamentos.json');
const fs = require('fs');

// função para utilizar o servidor
server.use(express.json());

// salvar/inserir dados no JSON === Create do CRUD
server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body;

    if (!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        novoMedicamento.id = dadosMedicamentos.medicamentos.length + 1;
        dadosMedicamentos.medicamentos.push(novoMedicamento);
        salvarDados(dadosMedicamentos);
        return res.status(201).json({ mensagem: "Novo medicamento cadastrado com sucesso!" });
    }
});

// consumir dados da API === Read do CRUD
server.get('/medicamentos', (req, res) => {
    return res.json(dadosMedicamentos.medicamentos);
});

// função para atualizar um medicamento
server.put('/medicamentos/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id);
    const atualizaMedicamento = req.body;
    const idMedicamento = dadosMedicamentos.medicamentos.findIndex(m => m.id === medicamentoId);

    if (idMedicamento === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado :/" });
    } else {
        //atualiza o nome:
        dadosMedicamentos.medicamentos[idMedicamento].nome = atualizaMedicamento.nome || dadosMedicamentos.medicamentos[idMedicamento].nome;

        //atualiza o fabricante:
        dadosMedicamentos.medicamentos[idMedicamento].fabricante = atualizaMedicamento.fabricante || dadosMedicamentos.medicamentos[idMedicamento].fabricante;

        //atualiza o preço
        dadosMedicamentos.medicamentos[idMedicamento].preco = atualizaMedicamento.preco || dadosMedicamentos.medicamentos[idMedicamento].preco;

        //atualiza a quantidade
        dadosMedicamentos.medicamentos[idMedicamento].quantidade = atualizaMedicamento.quantidade || dadosMedicamentos.medicamentos[idMedicamento].quantidade;

        salvarDados(dadosMedicamentos);

        return res.json({ mensagem: "Medicamento atualizado com sucesso!" });
    }
});

// função para deletar medicamento
server.delete('/medicamentos/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id);
    dadosMedicamentos.medicamentos = dadosMedicamentos.medicamentos.filter(m => m.id !== medicamentoId);
    salvarDados(dadosMedicamentos);
    return res.status(200).json({ mensagem: "Medicamento excluído com sucesso" });
});

function salvarDados(dados) {
    fs.writeFileSync(__dirname + '/data/dadosMedicamentos.json', JSON.stringify(dados, null, 2));
}

module.exports = { server, salvarDados };
