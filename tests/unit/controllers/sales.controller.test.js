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

  describe('Testa a rota de devolver todas as vendas', function () {
    it('Testa se é retornado tudo corretamente', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(salesService, 'getAllSales')
      .resolves({
        message: [
          {
            "saleId": 1,
            "productId": 1,
            "quantity": 5,
            "date": "2022-11-16T20:26:15.000Z"
          },
        ],
      });

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        {
          "saleId": 1,
          "productId": 1,
          "quantity": 5,
          "date": "2022-11-16T20:26:15.000Z"
        },
      ]);
    });
  });

  describe('Testa a rota de devolver a venda pelo id de busca', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa o retorno quando passado um id não existente', async function () {
      const res = {};
      const req = {
        params: {
          id: 10,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(salesService, 'getSaleById')
      .resolves({ type: 'NOT_FOUND', message: 'Sale not found' });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Testa o retorno quando passado um id existente', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(salesService, 'getSaleById')
      .resolves({
        type: null,
        message: [
          {
            "date": "2022-11-16T20:26:15.000Z",
            "productId": 1,
            "quantity": 5,
          },
          {
            "date": "2022-11-16T20:26:15.000Z",
            "productId": 2,
            "quantity": 10,
          },
        ]
      });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        {
          "date": "2022-11-16T20:26:15.000Z",
          "productId": 1,
          "quantity": 5,
        },
        {
          "date": "2022-11-16T20:26:15.000Z",
          "productId": 2,
          "quantity": 10,
        },
      ]);
    });
  });

  describe('Testa a rota de deletar uma venda', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa se é retornado tudo corretamente', async function () {
      const res = {};
      const req = {
        params: 1,
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
      .stub(salesService, 'getSaleById')
      .resolves({});
  
      sinon
      .stub(salesService, 'deleteSale')
      .resolves({ type: null,
        message: 'Sale with id: 1 deleted sucefully',
      });
  
      await salesController.deleteSale(req, res);
  
      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith('Sale with id: 1 deleted sucefully');
    });

    it('Testa se é retornado erro ao passar um id não existente', async function () {
      const res = {};
      const req = {
        params: 10,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(salesService, 'getSaleById')
      .resolves({ type: 'NOT_FOUND', message: 'Sale not found' });

      sinon
      .stub(salesService, 'deleteSale')
      .resolves({});

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(
        { message: 'Sale not found'});
    });
  });
});
