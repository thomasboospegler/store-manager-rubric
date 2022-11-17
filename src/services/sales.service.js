const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const { validateCreateSaleValues } = require('./validations/validationsSalesValues');

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return { type: null, message: result };
};

const getSaleById = async (productID) => {
  const result = await salesModel.getSaleById(productID);
  if (result.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result };
};

const createSale = async (reqBody) => {
  const allProducts = await productsModel.getAllProducts();

  let error = {};
  await reqBody.map(async (item) => {
    const validateError = validateCreateSaleValues(item);
    if (validateError.type) error = validateError;

    const productIDExists = allProducts.find((product) => product.id === item.productId);
    if (!productIDExists) {
      error = { type: 'NOT_FOUND', code: 404, message: 'Product not found' };
    }
  });

  if (error.type) return error;

  const result = await salesModel.createSale(reqBody);

  const newSale = {
    id: result,
    itemsSold: reqBody,
  };

  return { type: null, message: newSale };
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
  return { type: null, message: `Sale with id: ${id} deleted sucefully` };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
};
