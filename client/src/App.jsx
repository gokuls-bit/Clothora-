import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Context Providers
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';

// Components
import Header from './components/Header.jsx';

// Pages
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Checkout from './pages/Checkout.jsx';
import PaymentGateway from './pages/PaymentGateway.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AdminProvider>
            <div className="app-container">
              <Header />

              {/* Message container for notifications */}
              <div id="message-container" className="fixed top-4 right-4 z-50"></div>

              <main className="main-content-area">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<PaymentGateway />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>

              {/* Footer Section */}
              <footer className="main-footer">
                <div className="footer-content-grid">
                  {/* About Us */}
                  <div className="footer-section">
                    <h3 className="footer-title">Clothora</h3>
                    <p className="footer-description">
                      Your destination for premium quality T-shirts designed for comfort, style, and sustainability.
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="footer-section">
                    <h3 className="footer-title">Quick Links</h3>
                    <ul className="footer-links-list">
                      <li><Link to="/" className="footer-link">Home</Link></li>
                      <li><Link to="/products" className="footer-link">Products</Link></li>
                      <li><Link to="/cart" className="footer-link">Cart</Link></li>
                      <li><Link to="/wishlist" className="footer-link">Wishlist</Link></li>
                      <li><Link to="/admin" className="footer-link">Admin</Link></li>
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="footer-section">
                    <h3 className="footer-title">Contact Us</h3>
                    <p className="footer-contact-info">123 Fashion Lane, Style City, TX 75001</p>
                    <p className="footer-contact-info">Email: info@clothora.com</p>
                    <p className="footer-contact-info">Phone: +1 (555) 123-4567</p>
                    <div className="footer-social-links">
                      <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                      <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                      <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div className="footer-copyright">
                  &copy; {new Date().getFullYear()} Clothora. All rights reserved.
                </div>
              </footer>
            </div>
          </AdminProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
