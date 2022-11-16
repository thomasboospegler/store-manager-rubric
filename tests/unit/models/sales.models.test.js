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
});
