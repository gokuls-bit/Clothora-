import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';

const Header = () => {
    const { cart } = useContext(CartContext);
    const { wishlist } = useContext(WishlistContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="header-nav"> {/* Replaced bg-white shadow-lg sticky top-0 z-50 rounded-b-xl */}
            <div className="container header-container"> {/* Replaced container mx-auto px-4 py-4 */}
                <div className="header-main-row"> {/* Replaced flex items-center justify-between */}
                    <Link to="/" className="header-logo"> {/* Replaced text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors */}
                        Clothora
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="header-desktop-nav"> {/* Replaced hidden md:flex space-x-8 */}
                        <Link to="/" className="header-desktop-nav-link">Home</Link>
                        <Link to="/products" className="header-desktop-nav-link">Products</Link>
                        <Link to="/admin" className="header-desktop-nav-link">Admin</Link>
                    </nav>

                    {/* Icons */}
                    <div className="header-icons"> {/* Replaced flex items-center space-x-4 */}
                        <Link to="/wishlist" className="header-icon-link wishlist"> {/* Replaced relative p-2 text-gray-600 hover:text-red-500 transition-colors */}
                            <span className="material-icons">favorite</span> {/* Replaced text-2xl */}
                            {wishlist.length > 0 && (
                                <span className="header-badge wishlist"> {/* Replaced absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center */}
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/cart" className="header-icon-link cart"> {/* Replaced relative p-2 text-gray-600 hover:text-blue-600 transition-colors */}
                            <span className="material-icons">shopping_cart</span> {/* Replaced text-2xl */}
                            {cartItemsCount > 0 && (
                                <span className="header-badge cart"> {/* Replaced absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center */}
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="header-mobile-menu-button" /* Replaced md:hidden p-2 text-gray-700 */
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            <span className="material-icons">menu</span> {/* Replaced text-2xl */}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="header-mobile-nav"> {/* Replaced md:hidden mt-4 pb-4 border-t pt-4 slide-in */}
                        <Link to="/" className="header-mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" className="header-mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Products</Link>
                        <Link to="/admin" className="header-mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;