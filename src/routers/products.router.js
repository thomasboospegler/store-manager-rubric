const express = require('express');
const productsController = require('../controllers/products.controller');

const validateProductsFields = require('../middlewares/validateProductsFields');

const router = express.Router();

router.get('/search', productsController.search);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', validateProductsFields, productsController.create);

router.put('/:id', validateProductsFields, productsController.edit);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
