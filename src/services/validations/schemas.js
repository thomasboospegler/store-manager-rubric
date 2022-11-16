const Joi = require('joi');

const productNameSchema = Joi.string().min(5).required();

const createSaleQuantitySchema = Joi.number().integer().min(1).required();

module.exports = {
  productNameSchema,
  createSaleQuantitySchema,
};
