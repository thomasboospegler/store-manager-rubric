const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { responseGetAllProducts, expectResponseGetAllProducts, responseGetById,
  expectResponseGetById } = require('./mocks/products.controller.mocks');

describe('Testes de unidade do productsController', function () {
  describe('Testa a rota de devolver todos os produtos', function () {
    it('Testa se é retornado tudo corretamente', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(productsService, 'getAllProducts')
      .resolves(responseGetAllProducts);

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectResponseGetAllProducts);
    });
  });

  describe('Testa a rota de devolver o produto pelo id de busca', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa o retorno quando passado um id não existente', async function () {
      const res = {};
      const req = {
        params: {
          id: 5,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(productsService, 'getProductById')
      .resolves({ message: undefined });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found"
      });
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
      .stub(productsService, 'getProductById')
      .resolves(responseGetById);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectResponseGetById);
    });
  });
});
