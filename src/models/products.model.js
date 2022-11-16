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

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );
  return insertId;
};

const editProduct = async (product) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [product.name, product.id],
  );
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  editProduct,
};
