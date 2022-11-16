const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const { validateCreateSaleValues } = require('./validations/validationsSalesValues');

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

module.exports = {
  createSale,
};
