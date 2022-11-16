const connection = require('./database/connection');

const createSale = async (reqBody) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUE ()',
  );
  reqBody.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [insertId, productId, quantity],
    );
  });

  return insertId;
};

module.exports = {
  createSale,
};
