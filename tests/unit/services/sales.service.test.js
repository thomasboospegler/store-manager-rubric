const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
const salesService = require('../../../src/services/sales.service');

describe('Testes de unidade do salesService', function () {
  describe('Testa a rota de criar uma venda', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa se é retornado corretamnete', async function () {
      sinon.stub(salesModel, 'createSale').resolves(1);
      sinon.stub(productsModel, 'getAllProducts').resolves([
        { id: 1, name: 'produtoX' },
        { id: 2, name: 'produtoY' },
      ]);

      const response = await salesService.createSale([
        {
          productId: 1,
          quantity: 2,
        },
      ]);

      expect(response).to.deep.equal({
        type: null,
        message: { id: 1, itemsSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ] },
      });
    });

    it('Testa se é retornado erro ao não emcontrar o produto', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves([
        { id: 1, name: 'produtoX' },
        { id: 2, name: 'produtoY' },
      ]);

      const response = await salesService.createSale([
        {
          productId: 5,
          quantity: 2,
        },
      ]);

      expect(response).to.deep.equal({
        type: 'NOT_FOUND',
        code: 404,
        message: 'Product not found',
      });
    });

    it('Testa se é retornado erro ao passar um parametro no formato errado', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves([
        { id: 1, name: 'produtoX' },
        { id: 2, name: 'produtoY' },
      ]);

      const response = await salesService.createSale([
        {
          productId: 1,
          quantity: 'a',
        },
      ]);

      expect(response).to.deep.equal({
        type: 'INVALID_VALUE',
        code: 422,
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });

  describe('Testa a rota de devolver todas as vendas', function () {
    it('Testa se é retornado tudo corretamente', async function () {
      sinon.stub(salesModel, 'getAllSales').resolves(
      [
        {
          "saleId": 1,
          "productId": 1,
          "quantity": 5,
          "date": "2022-11-16T20:26:15.000Z"
        },
      ]);

      const response = await salesService.getAllSales();

      expect(response).to.deep.equal({
        type: null,
        message: [
          {
            "saleId": 1,
            "productId": 1,
            "quantity": 5,
            "date": "2022-11-16T20:26:15.000Z"
          },
        ],
      });
    });
  });

  describe('Testa a rota de devolver a venda pelo id de busca', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa o retorno quando passado um id não existente', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves([]);

      const response = await salesService.getSaleById(5);

      expect(response).to.deep.equal({
        type: 'NOT_FOUND',
        message: 'Sale not found',
      });
    });

    it('Testa o retorno quando passado um id existente', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves(
        [
          {
            "date": "2022-11-16T20:26:15.000Z",
            "productId": 3,
            "quantity": 15,
          },
        ]);
  
      const response = await salesService.getSaleById(2);
  
      expect(response).to.deep.equal({
        type: null,
        message: [
          {
            "date": "2022-11-16T20:26:15.000Z",
            "productId": 3,
            "quantity": 15,
          },
        ],
      });
    });
  });
});
