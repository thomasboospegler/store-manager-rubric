const salesService = require('../services/sales.service');

const getAll = async (_req, res) => {
  const response = await salesService.getAllSales();

  res.status(200).json(response.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSaleById(id);
  if (response.type) return res.status(404).json({ message: response.message });

  res.status(200).json(response.message);
};

const createSale = async (req, res) => {
  const reqBody = req.body;

  const response = await salesService.createSale(reqBody);
  if (response.type) return res.status(response.code).json({ message: response.message });

  res.status(201).json(response.message);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const reqBody = req.body;

  const doesSaleExist = await salesService.getSaleById(id);
  if (doesSaleExist.type) return res.status(404).json({ message: doesSaleExist.message });

  const response = await salesService.editSale(reqBody, id);
  if (response.type) return res.status(response.code).json({ message: response.message });

  res.status(200).json(response.message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const doesSaleExist = await salesService.getSaleById(id);
  if (doesSaleExist.type) return res.status(404).json({ message: doesSaleExist.message });

  const response = await salesService.deleteSale(id);

  res.status(204).json(response.message);
};

module.exports = {
  createSale,
  getAll,
  getById,
  edit,
  deleteSale,
};
