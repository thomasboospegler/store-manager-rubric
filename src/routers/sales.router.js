const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSalesInput = require('../middlewares/validateSalesInput');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', validateSalesInput, salesController.createSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;
