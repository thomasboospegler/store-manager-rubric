const express = require('express');
const productsController = require('../controllers/products.controller');

const validateProductsFields = require('../middlewares/validateProductsFields');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', validateProductsFields, productsController.create);

module.exports = router;
