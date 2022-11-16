const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/database/connection');
const productsModel = require('../../../src/models/products.model');

describe('Testes de unidade do productsModel', function () {
  describe('Testa a rota de devolver todos os produtos', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves(
      [
        [
          { id: 1, name: 'Martelo de Thor' },
          { id: 2, name: 'Traje de encolhimento' },
          { id: 3, name: 'Escudo do Capitão América' },
        ]
      ]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa se é retornado com tipo array', async function () {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.a('array');
    });

    it('Testa se é retornado com sucesso', async function () {
      const response = await productsModel.getAllProducts();
      expect(response).to.deep.equal([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]);
    });
  });

  describe('Testa a rota de devolver o produto pelo id de busca', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves(
      [
        [
          { id: 1, name: 'Martelo de Thor' },
        ]
      ]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa se é retornado com sucesso', async function () {
      const response = await productsModel.getProductById();
      expect(response).to.deep.equal({ id: 1, name: 'Martelo de Thor' });
    });
  });

  describe('Testa a rota cadastrar um novo produto', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa se é retornado com sucesso', async function () {
      const response = await productsModel.insertProduct();
      expect(response).to.deep.equal(5);
    });
  });

  describe('Testa a rota de editar um produto', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves({ id: 1, name: 'produtoX'});
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa se é retornado com sucesso', async function () {
      const response = await productsModel.editProduct({ id: 1, name: 'produtoX'});
      expect(response).to.deep.equal({ id: 1, name: 'produtoX'});
    });
  });
});
