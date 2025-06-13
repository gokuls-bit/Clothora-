const express = require('express');
const { addProduct, deleteProduct, applyDiscount } = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.post('/add-product', isAdmin, addProduct);
router.delete('/delete-product/:id', isAdmin, deleteProduct);
router.patch('/apply-discount/:id', isAdmin, applyDiscount);

module.exports = router;