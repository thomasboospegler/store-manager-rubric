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
        message: undefined,
      });
    });

    it('Testa o retorno quando passado um id existente', async function () {
      sinon.stub(productsModel, 'getProductById').resolves(
        [
        { id: 1, name: 'Martelo de Thor' },
      ]);
  
      const response = await productsService.getProductById(1);
  
      expect(response).to.deep.equal({
        message: [
          { id: 1, name: 'Martelo de Thor' },
        ],
      });
    });
  });
});
