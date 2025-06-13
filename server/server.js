const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you still want DB connection for other features
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (if your other features like cart, wishlist, admin use it)
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in body-parser for JSON data

// Import Routes
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const checkoutRoutes = require('./routes/checkout');
const adminRoutes = require('./routes/admin');
// Removed: const paymentRoutes = require('./routes/payment'); // This is no longer needed for client-side simulation

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);
// Removed: app.use('/api/payment', paymentRoutes); // This route is no longer handled by the backend

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Clothora API is running (without backend payment gateway).' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
