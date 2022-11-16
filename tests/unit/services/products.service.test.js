const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

describe('Testes de unidade do productsService', function () {
  describe('Testa a rota de devolver todos os produtos', function () {
    it('Testa se é retornado tudo corretamente', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves(
      [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]);

      const response = await productsService.getAllProducts();

      expect(response).to.deep.equal({
        type: null,
        message: [
          { id: 1, name: 'Martelo de Thor' },
          { id: 2, name: 'Traje de encolhimento' },
          { id: 3, name: 'Escudo do Capitão América' },
        ],
      });
    });
  });

  describe('Testa a rota de devolver o produto pelo id de busca', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa o retorno quando passado um id não existente', async function () {
      sinon.stub(productsModel, 'getProductById').resolves(undefined);

      const response = await productsService.getProductById(5);

      expect(response).to.deep.equal({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });
    });

    it('Testa o retorno quando passado um id existente', async function () {
      sinon.stub(productsModel, 'getProductById').resolves(
        [
        { id: 1, name: 'Martelo de Thor' },
      ]);
  
      const response = await productsService.getProductById(1);
  
      expect(response).to.deep.equal({
        type: null,
        message: [
          { id: 1, name: 'Martelo de Thor' },
        ],
      });
    });
  });

  describe('Testa a rota cadastrar um novo produto', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa se é retornado corretamnete', async function () {
      sinon.stub(productsModel, 'insertProduct').resolves(5);
      sinon.stub(productsModel, 'getProductById').resolves([
        { id: 5, name: 'produtoX' },
      ]);

      const response = await productsService.createProduct('produtoX');

      expect(response).to.deep.equal({
        type: null,
        message: [{ id: 5, name: 'produtoX' }],
      });
    });

    it('Testa se é retornado erro ao pasar um nome invalido', async function () {
      const response = await productsService.createProduct('pro');

      expect(response).to.deep.equal({
        type: 'INVALID_VALUE',
        message: '"name" length must be at least 5 characters long',
      });
    });
  });

  describe('Testa a rota de editar um produto', function () {
    it('Testa se é retornado erro ao pasar um nome invalido', async function () {
      const response = await productsService.editProduct('pro');

      expect(response).to.deep.equal({
        type: 'INVALID_VALUE',
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('Testa se é retornado corretamnete', async function () {
      sinon.stub(productsModel, 'editProduct').resolves([
        { id: 1, name: 'produtoX' },
      ]);

      const response = await productsService.editProduct({ id: 1, name: 'produtoX'});

      expect(response).to.deep.equal({
        type: null,
        message: [{ id: 1, name: 'produtoX' }],
      });
    });
  });

  describe('Testa a rota de deletar um produto', function () {
    it('Testa se é retornado corretamnete', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves(1);

      const response = await productsService.deleteProduct(1);

      expect(response).to.deep.equal({
        type: null,
        message: 'Product with id: 1 deleted sucefully',
      });
    });
  });
});
