const express = require('express');

const router = express.Router();

const productsControler = require('../controllers/products');

router.get('/', productsControler.getProducts);

module.exports = router;