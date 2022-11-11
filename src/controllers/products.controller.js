const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  const response = await productsService.getAllProducts();

  res.status(200).json(response.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);

  if (!response.message) res.status(404).json({ message: 'Product not found' });

  res.status(200).json(response.message);
};

module.exports = {
  getAll,
  getById,
};
