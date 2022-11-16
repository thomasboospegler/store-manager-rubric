const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

describe('Testes de unidade do salesController', function () {
  describe('Testa a rota de criar uma nova venda', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa se retorna erro ao não passar o id do produto', async function () {
      const res = {};
      const req = {
        body: [
          {
            quantity: 2,
          },
        ]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(salesService, 'createSale')
      .resolves({ type: 'INVALID_VALUES',
        code: 400,
        message: '"productId" is required' });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith(
        { message: '"productId" is required'});
    });

    it('Testa se retorna tudo corretamente', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 2,
          },
        ]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(salesService, 'createSale')
      .resolves({ type: null, message: {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ]
      } });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ]
      })
    });
  });
});
