const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.post('/', isAuthenticated, addToCart);
router.get('/:userId', getCart);

module.exports = router;