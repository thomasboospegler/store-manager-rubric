const connection = require('./database/connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, sa.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS sa
      ON sa.id = sp.sale_id
      ORDER BY saleId, productId`,
  );
  return result;
};

const getSaleById = async (SaleID) => {
  const [result] = await connection.execute(
    `SELECT
      sa.date,
      sp.product_id AS productId,
      sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS sa
      ON sa.id = sp.sale_id
      AND sa.id = ?
      ORDER BY sa.id, sp.product_id`,
    [SaleID],
  );
  return result;
};

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
  getAllSales,
  getSaleById,
};
