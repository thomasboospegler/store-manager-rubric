const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/database/connection');
const salesModel = require('../../../src/models/sales.model');

describe('Testes de unidade do salesModel', function () {
  describe('Testa a rota de criar uma nova venda', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa se é retornado com sucesso', async function () {
      const response = await salesModel.createSale([
        {
          productId: 1,
          quantity: 2,
        },
      ]);
      expect(response).to.deep.equal(1);
    });
  });

  describe('Testa a rota de devolver todas as vendas', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves(
      [
        [
          {
            "saleId": 1,
            "productId": 1,
            "quantity": 5,
            "date": "2022-11-16T20:26:15.000Z"
          },
          {
            "saleId": 1,
            "productId": 2,
            "quantity": 10,
            "date": "2022-11-16T20:26:15.000Z"
          },
        ]
      ]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa se é retornado com tipo array', async function () {
      const response = await salesModel.getAllSales();
      expect(response).to.be.a('array');
    });

    it('Testa se é retornado com sucesso', async function () {
      const response = await salesModel.getAllSales();
      expect(response).to.deep.equal([
        {
          "saleId": 1,
          "productId": 1,
          "quantity": 5,
          "date": "2022-11-16T20:26:15.000Z"
        },
        {
          "saleId": 1,
          "productId": 2,
          "quantity": 10,
          "date": "2022-11-16T20:26:15.000Z"
        },
      ]);
    });
  });

  describe('Testa a rota de devolver a venda pelo id de busca', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves(
      [
        [
          {
            "date": "2022-11-16T20:26:15.000Z",
            "productId": 3,
            "quantity": 15,
          },
        ],
      ]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa se é retornado com sucesso', async function () {
      const response = await salesModel.getSaleById();
      expect(response).to.deep.equal([
        {
          "date": "2022-11-16T20:26:15.000Z",
          "productId": 3,
          "quantity": 15,
        },
      ]);
    });
  });
});
