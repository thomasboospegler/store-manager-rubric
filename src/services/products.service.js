const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return { message: result };
};

const getProductById = async (productID) => {
  const result = await productsModel.getProductById(productID);
  return { message: result };
};

const createProduct = async (name) => {
  const result = await productsModel.insertProduct(name);
  return { message: {
    id: result,
    name,
  } };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
