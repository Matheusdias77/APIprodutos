const request = require('supertest');
const express = require('express');
const api = require('./api'); 

describe('Testes da API de Produtos', () => {
  let produtoId;

  test('Deve criar um novo produto', async () => {
    const response = await request(api)
      .post('/produtos')
      .send({ nome: 'Produto Teste', preco: 50 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe('Produto Teste');
    expect(response.body.preco).toBe(50);

    produtoId = response.body.id;
  });

  test('Deve listar todos os produtos', async () => {
    const response = await request(api).get('/produtos');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Deve obter um produto específico por ID', async () => {
    const response = await request(api).get(`/produtos/${produtoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Produto Teste');
    expect(response.body).toHaveProperty('preco', 50);
  });

  test('Deve atualizar um produto existente por ID', async () => {
    const response = await request(api)
      .put(`/produtos/${produtoId}`)
      .send({ nome: 'Produto Teste Atualizado', preco: 75 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', produtoId);
    expect(response.body.nome).toBe('Produto Teste Atualizado');
    expect(response.body.preco).toBe(75);
  });

  test('Deve deletar um produto por ID', async () => {
    const response = await request(api).delete(`/produtos/${produtoId}`);

    expect(response.status).toBe(204);

    const checkResponse = await request(api).get(`/produtos/${produtoId}`);
    expect(checkResponse.status).toBe(404);
  });
});