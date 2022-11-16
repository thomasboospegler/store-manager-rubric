const validateFields = (item) => {
  if (!item.productId) return { message: '"productId" is required' };
  if (!item.quantity && item.quantity !== 0) return { message: '"quantity" is required' };
  return null;
};

module.exports = (req, res, next) => {
  let error = null;

  req.body.map((item) => {
    error = validateFields(item);
    return error;
  });

  if (error) return res.status(400).json(error);

  return next();
};
