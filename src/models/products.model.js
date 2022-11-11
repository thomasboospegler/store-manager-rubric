const camelize = require('camelize');
const connection = require('./database/connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const getProductById = async (productID) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productID],
  );
  return camelize(result);
};

module.exports = {
  getAllProducts,
  getProductById,
};
