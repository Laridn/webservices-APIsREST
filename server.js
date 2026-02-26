const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [
  { id: 1, nome: 'Camiseta', preco: 29.99, descricao: 'Camiseta de algodão' },
  { id: 2, nome: 'Caneca', preco: 19.99, descricao: 'Caneca personalizada' },
];

// Testar que a API está online
app.get('/', (req, res) => {
  return res.status(200).json({
    mensagem: 'API de Produtos rodando',
    rotas: {
      listar: 'GET /produtos',
      buscar: 'GET /produtos/:id',
      criar: 'POST /produtos',
      atualizar: 'PUT /produtos/:id',
      deletar: 'DELETE /produtos/:id',
    },
  });
});

/**
 * GET /produtos
 * Lista todos os produtos
 */
app.get('/produtos', (req, res) => {
  return res.status(200).json({ produtos });
});

/**
 * GET /produtos/:id
 * Busca um produto por id
 */
app.get('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);

  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  return res.status(200).json({ produto });
});

/**
 * POST /produtos
 * Cria um produto
 * Body esperado (JSON):
 * { "nome": "Produto", "preco": 9.99, "descricao": "..." }
 */
app.post('/produtos', (req, res) => {
  const { nome, preco, descricao } = req.body;

  if (!nome || typeof nome !== 'string') {
    return res
      .status(400)
      .json({ erro: "Campo 'nome' é obrigatório e deve ser texto." });
  }
  if (preco === undefined || typeof preco !== 'number') {
    return res
      .status(400)
      .json({ erro: "Campo 'preco' é obrigatório e deve ser número." });
  }

  // Gera próximo id
  const novoId = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

  const novoProduto = {
    id: novoId,
    nome,
    preco,
    descricao: descricao || '',
  };

  produtos.push(novoProduto);

  return res.status(201).json({
    mensagem: 'Produto criado com sucesso.',
    produto: novoProduto,
  });
});

/**
 * PUT /produtos/:id
 * Atualiza um produto (substitui campos enviados)
 * Body esperado (JSON):
 * { "nome": "...", "preco": 0, "descricao": "..." }
 */
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, preco, descricao } = req.body;

  const indice = produtos.findIndex(p => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  // Atualiza só o que veio no body
  if (nome !== undefined) {
    if (typeof nome !== 'string' || !nome.trim()) {
      return res
        .status(400)
        .json({ erro: "Se enviar 'nome', deve ser texto não vazio." });
    }
    produtos[indice].nome = nome;
  }

  if (preco !== undefined) {
    if (typeof preco !== 'number') {
      return res
        .status(400)
        .json({ erro: "Se enviar 'preco', deve ser número." });
    }
    produtos[indice].preco = preco;
  }

  if (descricao !== undefined) {
    if (typeof descricao !== 'string') {
      return res
        .status(400)
        .json({ erro: "Se enviar 'descricao', deve ser texto." });
    }
    produtos[indice].descricao = descricao;
  }

  return res.status(200).json({
    mensagem: 'Produto atualizado com sucesso.',
    produto: produtos[indice],
  });
});

/**
 * DELETE /produtos/:id
 * Remove um produto
 */
app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);

  const existe = produtos.some(p => p.id === id);

  if (!existe) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  produtos = produtos.filter(p => p.id !== id);

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
