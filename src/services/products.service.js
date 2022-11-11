const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return { message: result };
};

const getProductById = async (productID) => {
  const result = await productsModel.getProductById(productID);
  return { message: result };
};

module.exports = {
  getAllProducts,
  getProductById,
};
