const salesService = require('../services/sales.service');

const createSale = async (req, res) => {
  const reqBody = req.body;

  const response = await salesService.createSale(reqBody);
  if (response.type) return res.status(response.code).json({ message: response.message });

  res.status(201).json(response.message);
};

module.exports = {
  createSale,
};
