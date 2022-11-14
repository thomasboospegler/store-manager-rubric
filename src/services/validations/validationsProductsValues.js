const { productNameSchema } = require('./schemas');

const validateCreateProductValues = (name) => {
  const { error } = productNameSchema.validate(name);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateCreateProductValues,
};
