const { createSaleQuantitySchema } = require('./schemas');

const validateCreateSaleValues = ({ quantity }) => {
  const { error } = createSaleQuantitySchema.validate(quantity);
  if (error) {
    return { type: 'INVALID_VALUE',
    code: 422,
    message: '"quantity" must be greater than or equal to 1' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateCreateSaleValues,
};
