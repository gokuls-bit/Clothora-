const Product = require('../models/Product');

// Add new product
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.save();
    
    res.status(201).json({
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply discount
const applyDiscount = async (req, res) => {
  try {
    const { discount } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.discount = discount;
    product.originalPrice = product.originalPrice || product.price;
    product.price = product.originalPrice * (1 - discount / 100);
    
    await product.save();
    
    res.json({
      message: 'Discount applied successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, deleteProduct, applyDiscount };