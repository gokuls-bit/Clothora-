const express = require('express');
const { addToWishlist, getWishlist } = require('../controllers/wishlistController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.post('/', isAuthenticated, addToWishlist);
router.get('/:userId', getWishlist);

module.exports = router;