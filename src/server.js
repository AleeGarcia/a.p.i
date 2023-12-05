const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// mensagem no terminal para indicar o funcionamento
server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})

// salvar/inserir dados no JSON === Create do CRUD
server.post('/usuarios', (req, res) => {
    const novoUsuario = req.body

    if(!novoUsuario.id || !novoUsuario.nome || !novoUsuario.idade || !novoUsuario.curso) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.users.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo usuario cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/usuarios', (req, res) => {
    return res.json(dados.users)
})

// função para atualizar um usuario
server.put('/usuarios/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const usuarioId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarUsuario = req.body

    //encontrar o id no json que já existe
    const idUsuario = dados.users.findIndex(u => u.id === usuarioId)

    if (idUsuario === -1) {
        return res.status(404).json({mensagem: "Usuário não encontrado :/"})
    } else {
        //atualiza o nome:
        dados.users[idUsuario].nome = atualizarUsuario.nome || dados.users[idUsuario].nome

        //atualiza a idade:
        dados.users[idUsuario].idade = atualizarUsuario.idade || dados.users[idUsuario].idade

        //atualiza o curso
        dados.users[idUsuario].curso = atualizarUsuario.curso || dados.users[idUsuario].curso

        salvarDados(dados)

        return res.json({mensagem: "Usuario atualizado com sucesso!"})
    }
})

//função para deletar usuario
server.delete("/usuarios/:id", (req, res) => {
    const usuarioId = parseInt(req.params.id)

    dados.users = dados.users.filter(u => u.id !== usuarioId)

    salvarDados(dados)

    return res.status(200).json({mensagem: "Usuário excluido com sucesso"})
})

// Salvar/inserir dados no JSON === Create do CRUD para Medicamentos
server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body;

    if (!novoMedicamento.id || !novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: 'Dados incompletos, tente novamente' });
    } else {
        dados.medicamentos.push(novoMedicamento);
        salvarDados(dados);
        return res.status(201).json({ mensagem: 'Novo medicamento cadastrado com sucesso!' });
    }
});

// Consumir dados da API === Read do CRUD para Medicamentos
server.get('/medicamentos', (req, res) => {
    return res.json(dados.medicamentos);
});

// Função para atualizar um medicamento
server.put('/medicamentos/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id);
    const atualizarMedicamento = req.body;
    const idMedicamento = dados.medicamentos.findIndex(m => m.id === medicamentoId);

    if (idMedicamento === -1) {
        return res.status(404).json({ mensagem: 'Medicamento não encontrado :/' });
    } else {
        dados.medicamentos[idMedicamento].nome = atualizarMedicamento.nome || dados.medicamentos[idMedicamento].nome;
        dados.medicamentos[idMedicamento].fabricante = atualizarMedicamento.fabricante || dados.medicamentos[idMedicamento].fabricante;
        dados.medicamentos[idMedicamento].preco = atualizarMedicamento.preco || dados.medicamentos[idMedicamento].preco;
        dados.medicamentos[idMedicamento].quantidade = atualizarMedicamento.quantidade || dados.medicamentos[idMedicamento].quantidade;

        salvarDados(dados);

        return res.json({ mensagem: 'Medicamento atualizado com sucesso!' });
    }
});

// Função para deletar medicamento
server.delete('/medicamentos/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id);
    dados.medicamentos = dados.medicamentos.filter(m => m.id !== medicamentoId);
    salvarDados(dados);
    return res.status(200).json({ mensagem: 'Medicamento excluído com sucesso' });
});

// Salvar/inserir dados no JSON (Create do CRUD para Fornecedores)
server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body;

    if (!novoFornecedor.id_fornecedor || !novoFornecedor.nome_fornecedor || !novoFornecedor.endereco_fornecedor || !novoFornecedor.telefone_fornecedor) {
        return res.status(400).json({ mensagem: 'Dados incompletos, tente novamente' });
    } else {
        dados.fornecedores.push(novoFornecedor);
        salvarDados();
        return res.status(201).json({ mensagem: 'Novo fornecedor cadastrado com sucesso!' });
    }
});

// Consumir dados da API (Read do CRUD para Fornecedores)
server.get('/fornecedores', (req, res) => {
    return res.json(dados.fornecedores);
});

// Função para atualizar um fornecedor
server.put('/fornecedores/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id);
    const atualizarFornecedor = req.body;
    const idFornecedor = dados.fornecedores.findIndex(f => f.id_fornecedor === fornecedorId);

    if (idFornecedor === -1) {
        return res.status(404).json({ mensagem: 'Fornecedor não encontrado :/' });
    } else {
        dados.fornecedores[idFornecedor].nome_fornecedor = atualizarFornecedor.nome_fornecedor || dados.fornecedores[idFornecedor].nome_fornecedor;
        dados.fornecedores[idFornecedor].endereco_fornecedor = atualizarFornecedor.endereco_fornecedor || dados.fornecedores[idFornecedor].endereco_fornecedor;
        dados.fornecedores[idFornecedor].telefone_fornecedor = atualizarFornecedor.telefone_fornecedor || dados.fornecedores[idFornecedor].telefone_fornecedor;

        salvarDados();

        return res.json({ mensagem: 'Fornecedor atualizado com sucesso!' });
    }
});

// Função para deletar fornecedor
server.delete('/fornecedores/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id);
    dados.fornecedores = dados.fornecedores.filter(f => f.id_fornecedor !== fornecedorId);
    salvarDados();
    return res.status(200).json({ mensagem: 'Fornecedor excluído com sucesso' });
});

// Salvar/inserir dados no JSON (Create do CRUD para Vendas)
server.post('/vendas', (req, res) => {
    const novaVenda = req.body;

    if (!novaVenda.id_venda || !novaVenda.data_venda || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({ mensagem: 'Dados incompletos, tente novamente' });
    } else {
        dados.vendas.push(novaVenda);
        salvarDados();
        return res.status(201).json({ mensagem: 'Nova venda cadastrada com sucesso!' });
    }
});

// Consumir dados da API (Read do CRUD para Vendas)
server.get('/vendas', (req, res) => {
    return res.json(dados.vendas);
});

// Função para atualizar uma venda
server.put('/vendas/:id', (req, res) => {
    const vendaId = parseInt(req.params.id);
    const atualizarVenda = req.body;
    const idVenda = dados.vendas.findIndex(v => v.id_venda === vendaId);

    if (idVenda === -1) {
        return res.status(404).json({ mensagem: 'Venda não encontrada :/' });
    } else {
        dados.vendas[idVenda].data_venda = atualizarVenda.data_venda || dados.vendas[idVenda].data_venda;
        dados.vendas[idVenda].id_medicamento = atualizarVenda.id_medicamento || dados.vendas[idVenda].id_medicamento;
        dados.vendas[idVenda].id_cliente = atualizarVenda.id_cliente || dados.vendas[idVenda].id_cliente;

        salvarDados();

        return res.json({ mensagem: 'Venda atualizada com sucesso!' });
    }
});

// Função para deletar venda
server.delete('/vendas/:id', (req, res) => {
    const vendaId = parseInt(req.params.id);
    dados.vendas = dados.vendas.filter(v => v.id_venda !== vendaId);
    salvarDados();
    return res.status(200).json({ mensagem: 'Venda excluída com sucesso' });
});

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}