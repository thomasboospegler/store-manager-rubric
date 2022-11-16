const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSalesInput = require('../middlewares/validateSalesInput');

const router = express.Router();

router.post('/', validateSalesInput, salesController.createSale);

module.exports = router;
