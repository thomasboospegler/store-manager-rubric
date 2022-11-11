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

  describe('Testa a rota cadastrar um novo produto', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa se é retornado tudo corretamente', async function () {
      const res = {};
      const req = {
        body: {
          name: 'produtoX',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(productsService, 'createProduct')
      .resolves({
        message: {
          id: 4,
          name: 'produtoX',
        },
      });

      await productsController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 4,
        name: 'produtoX',
      });
    });

    it('Testa se é retornado erro ao não passar um nome', async function () {
      const res = {};
      const req = {
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(productsService, 'createProduct')
      .resolves({
        message: '\"name\" is required',
      });

      await productsController.create(req, res);

      // expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith('\"name\" is required');
    });

    it('Testa se é retornado erro ao passar um nome invalido', async function () {
      const res = {};
      const req = {
        body: {
          name: 'prod'
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(productsService, 'createProduct')
      .resolves({
        message: '\"name\" length must be at least 5 characters long',
      });

      await productsController.create(req, res);

      // expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith('\"name\" length must be at least 5 characters long');
    });
  });
});
