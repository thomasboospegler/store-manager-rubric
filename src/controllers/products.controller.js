const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  const response = await productsService.getAllProducts();

  res.status(200).json(response.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);
  if (response.type) return res.status(404).json({ message: response.message });

  res.status(200).json(response.message);
};

const search = async (req, res) => {
  const { q: name } = req.query;
  const response = await productsService.getProductByName(name);
  res.status(200).json(response.message);
};

const create = async (req, res) => {
  const { name } = req.body;

  const response = await productsService.createProduct(name);
  if (response.type) return res.status(422).json({ message: response.message });

  res.status(201).json(response.message);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = { id, name };

  const doesProductExist = await productsService.getProductById(id);
  if (doesProductExist.type) return res.status(404).json({ message: doesProductExist.message });

  const response = await productsService.editProduct(product);
  if (response.type) return res.status(422).json({ message: response.message });

  res.status(200).json(response.message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const doesProductExist = await productsService.getProductById(id);
  if (doesProductExist.type) return res.status(404).json({ message: doesProductExist.message });

  const response = await productsService.deleteProduct(id);

  res.status(204).json(response.message);
};

module.exports = {
  getAll,
  getById,
  search,
  create,
  edit,
  deleteProduct,
};
