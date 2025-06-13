import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { showMessage } from '../utils/messages.js';

const Wishlist = () => {
    const { wishlist, dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { dispatch: cartDispatch } = useContext(CartContext);

    const handleRemoveFromWishlist = (product) => {
        wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
        showMessage(`${product.name} removed from wishlist.`, 'info');
    };

    const handleMoveToCart = (product) => {
        cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, size: product.sizes[0] || 'One Size', quantityToAdd: 1 } });
        wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
        showMessage(`${product.name} moved to cart!`, 'success');
    };

    return (
        <div className="container page-content fade-in mt-8"> {/* Replaced container mx-auto px-4 py-8 fade-in bg-white rounded-xl shadow-lg mt-8 */}
            <h1 className="wishlist-page-title">Your Wishlist</h1> {/* Replaced text-4xl font-bold text-gray-900 mb-10 text-center */}

            {wishlist.length === 0 ? (
                <div className="empty-wishlist-message"> {/* Replaced text-center text-gray-600 text-xl py-12 */}
                    <span className="material-icons">favorite_border</span> {/* Replaced text-6xl text-gray-400 mb-4 */}
                    <p>Your wishlist is empty.</p> {/* Replaced font-semibold mb-4 */}
                    <Link to="/products" className="empty-wishlist-link"> {/* Replaced text-blue-600 hover:underline text-lg font-medium flex items-center justify-center */}
                        <span className="material-icons mr-2">arrow_back</span> Browse products to add items!
                    </Link>
                </div>
            ) : (
                <div className="wishlist-grid"> {/* Replaced grid grid-cols-1 md:grid-cols-2 gap-6 */}
                    {wishlist.map((item) => (
                        <div key={item.id} className="wishlist-item"> {/* Replaced flex flex-col sm:flex-row items-center p-5 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow space-y-4 sm:space-y-0 sm:space-x-4 */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="wishlist-item-image" /* Replaced w-28 h-28 object-cover rounded-md shadow-sm flex-shrink-0 */
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/112x112/cccccc/333333?text=Error`; }}
                            />
                            <div className="wishlist-item-details"> {/* Replaced flex-grow text-center sm:text-left */}
                                <h3 className="wishlist-item-name">{item.name}</h3> {/* Replaced text-xl font-semibold text-gray-800 mb-1 */}
                                <p className="wishlist-item-description">{item.description}</p> {/* Replaced text-gray-600 text-sm mb-2 line-clamp-2 */}
                                <p className="wishlist-item-price">${item.price.toFixed(2)}</p> {/* Replaced text-blue-600 text-lg font-bold */}
                            </div>
                            <div className="wishlist-item-actions"> {/* Replaced flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row */}
                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="wishlist-move-to-cart-button" /* Replaced bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-colors flex items-center space-x-2 text-sm */
                                >
                                    <span className="material-icons">add_shopping_cart</span>
                                    <span>Move to Cart</span>
                                </button>
                                <button
                                    onClick={() => handleRemoveFromWishlist(item)}
                                    className="wishlist-remove-button" /* Replaced bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-colors flex items-center space-x-2 text-sm */
                                >
                                    <span className="material-icons">delete</span>
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;