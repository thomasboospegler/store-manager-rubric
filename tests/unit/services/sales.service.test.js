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
});
