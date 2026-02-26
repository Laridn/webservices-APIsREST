Este projeto consiste em uma API REST simples, desenvolvida em Node.js com Express, com o objetivo de aprender os conceitos básicos de Serviços na Web, APIs REST, métodos HTTP e troca de dados no formato JSON.
A API permite realizar operações básicas de CRUD (Create, Read, Update e Delete) sobre um recurso chamado Produtos.

**Como rodar o projeto**

Pré-requisitos:

- Ter o Node.js instalado
  Verifique com:
  node -v
  npm -v

**Instalar dependências**
Dentro da pasta do projeto, execute:
npm install

**Rodar a API**
Execute:
npm start

**Testar no navegador**
Acesse:
http://localhost:3000

**Endpoints da API**

- Listar todos os produtos:
  GET /produtos

- Buscar produto por ID:
  GET /produtos/:id

- Criar um novo produto:
  POST /produtos
  Body (JSON):
  {
  "nome": "Teclado",
  "preco": 99.9,
  "descricao": "Teclado mecânico"
  }

- Atualizar um produto:
  PUT /produtos/:id
  Body (JSON):
  {
  "preco": 39.99
  }

- Remover um produto:
  DELETE /produtos/:id
