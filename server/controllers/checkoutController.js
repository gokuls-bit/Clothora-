const Cart = require('../models/Cart');

// Process checkout (mock)
const processCheckout = async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod } = req.body;
    
    const cart = await Cart.findOne({ userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Mock order processing
    const order = {
      orderId: `ORD-${Date.now()}`,
      userId,
      items: cart.items,
      total: cart.total,
      shippingAddress,
      paymentMethod,
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      createdAt: new Date()
    };

    // Clear cart after successful checkout
    await Cart.findOneAndUpdate({ userId }, { items: [], total: 0 });

    res.json({
      message: 'Order placed successfully!',
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { processCheckout };