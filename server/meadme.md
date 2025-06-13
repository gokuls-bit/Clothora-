Clothora Backend API
A complete Node.js backend for the Clothora T-shirt e-commerce application.

Features
Product Management: Full CRUD operations for T-shirts
Shopping Cart: Add, update, and manage cart items
Wishlist: Save favorite products
Mock Checkout: Simulate order processing
Admin Panel: Product management and discount application
MongoDB Integration: Mongoose schemas for all entities
CORS Enabled: Ready for frontend integration
Quick Start
1. Installation
bash
npm install
2. Environment Setup
Create a .env file based on .env.example:

bash
cp .env.example .env
Update the MongoDB URI and other configurations:

env
PORT=5000
MONGO_URI=mongodb://localhost:27017/clothora
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
3. Run the Server
bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
The server will start on http://localhost:5000

API Endpoints
Products
GET /api/products - Get all T-shirts (with optional filters)
GET /api/products/:id - Get single T-shirt details
Cart
POST /api/cart - Add item to cart
GET /api/cart/:userId - Get user's cart
Wishlist
POST /api/wishlist - Add item to wishlist
GET /api/wishlist/:userId - Get user's wishlist
Checkout
POST /api/checkout - Process mock checkout
Admin (Protected)
POST /api/admin/add-product - Add new T-shirt
DELETE /api/admin/delete-product/:id - Remove T-shirt
PATCH /api/admin/apply-discount/:id - Apply discount
Project Structure
clothora-backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env.example          # Environment variables template
├── config/
│   └── db.js             # Database connection
├── models/
│   ├── User.js           # User schema
│   ├── Product.js        # Product schema
│   ├── Cart.js           # Cart schema
│   └── Wishlist.js       # Wishlist schema
├── controllers/
│   ├── productController.js
│   ├── cartController.js
│   ├── wishlistController.js
│   ├── checkoutController.js
│   └── adminController.js
├── routes/
│   ├── products.js
│   ├── cart.js
│   ├── wishlist.js
│   ├── checkout.js
│   └── admin.js
└── middlewares/
    └── auth.js           # Authentication middleware
Sample Data Structure
Product
json
{
  "name": "Classic Cotton T-Shirt",
  "description": "Comfortable cotton t-shirt perfect for everyday wear",
  "price": 29.99,
  "image": "https://example.com/tshirt.jpg",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "White", "Gray"],
  "stock": 50,
  "category": "T-shirt"
}
Cart Item
json
{
  "productId": "product_id_here",
  "quantity": 2,
  "size": "M",
  "color": "Black"
}
Authentication (Mock)
For development, the API uses mock authentication:

User ID: Include user-id header in requests
Admin Access: Include is-admin: true header for admin endpoints
Database Requirements
MongoDB (local or cloud)
Default database name: clothora
Dependencies
express: Web framework
mongoose: MongoDB ODM
cors: Cross-origin resource sharing
dotenv: Environment variable management
bcryptjs: Password hashing (for future auth)
jsonwebtoken: JWT token handling (for future auth)
Development Notes
Uses mock authentication for simplicity
No actual payment processing (simulated)
CORS enabled for frontend integration
Modular architecture for easy maintenance
Error handling included for all endpoints
Frontend Integration
This backend is designed to work with a React + TailwindCSS frontend. All endpoints return JSON data in formats suitable for modern frontend frameworks.

Example frontend request:

javascript
// Fetch all products
const products = await fetch('http://localhost:5000/api/products');

// Add to cart
await fetch('http://localhost:5000/api/cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'user-id': 'user123'
  },
  body: JSON.stringify({
    productId: 'product_id',
    quantity: 1,
    size: 'M'
  })
});
