const productsModel = require('../models/products.model');
const { validateCreateProductValues } = require('./validations/validationsProductsValues');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return { type: null, message: result };
};

const getProductById = async (productID) => {
  const result = await productsModel.getProductById(productID);
  if (!result) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: result };
};

const createProduct = async (name) => {
  const error = validateCreateProductValues(name);
  if (error.type) return error;

  const result = await productsModel.insertProduct(name);
  const newProduct = await productsModel.getProductById(result);
  return { type: null, message: newProduct };
};

const editProduct = async (product) => {
  const error = validateCreateProductValues(product.name);
  if (error.type) return error;

  const result = await productsModel.editProduct(product);
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
};
