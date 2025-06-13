import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { showMessage } from '../utils/messages.js';

const Cart = () => {
    const { cart, dispatch: cartDispatch } = useContext(CartContext);
    const navigate = useNavigate();

    const handleUpdateQuantity = (product, newQuantity) => {
        const quantityToSet = Math.max(1, newQuantity);
        cartDispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id: product.id, size: product.size, quantity: quantityToSet }
        });
    };

    const handleRemoveFromCart = (product) => {
        cartDispatch({
            type: 'REMOVE_FROM_CART',
            payload: { id: product.id, size: product.size }
        });
        showMessage(`${product.name} (${product.size}) removed from cart.`, 'info');
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container page-content fade-in mt-8"> {/* Replaced container mx-auto px-4 py-8 fade-in bg-white rounded-xl shadow-lg mt-8 */}
            <h1 className="cart-page-title">Your Shopping Cart</h1> {/* Replaced text-4xl font-bold text-gray-900 mb-10 text-center */}

            {cart.length === 0 ? (
                <div className="empty-cart-message"> {/* Replaced text-center text-gray-600 text-xl py-12 */}
                    <span className="material-icons">shopping_cart</span> {/* Replaced text-6xl text-gray-400 mb-4 */}
                    <p>Your cart is currently empty.</p> {/* Replaced font-semibold mb-4 */}
                    <Link to="/products" className="empty-cart-link"> {/* Replaced text-blue-600 hover:underline text-lg font-medium flex items-center justify-center */}
                        <span className="material-icons mr-2">arrow_back</span> Start shopping!
                    </Link>
                </div>
            ) : (
                <>
                    <div className="cart-items-list"> {/* Replaced space-y-6 */}
                        {cart.map((item, index) => (
                            <div key={`${item.id}-${item.size}-${index}`} className="cart-item"> {/* Replaced flex flex-col sm:flex-row items-center justify-between p-5 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow */}
                                <div className="cart-item-info-section"> {/* Replaced flex items-center space-x-5 flex-grow mb-4 sm:mb-0 */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-item-image" /* Replaced w-24 h-24 object-cover rounded-md shadow-sm */
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/cccccc/333333?text=Error`; }}
                                    />
                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">Size: <span className="item-size">{item.size}</span></p>
                                        <p className="item-price">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="cart-item-actions"> {/* Replaced flex items-center space-x-4 */}
                                    {/* Quantity controls */}
                                    <div className="cart-quantity-controls"> {/* Replaced flex items-center border border-gray-300 rounded-lg */}
                                        <button
                                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                            className="cart-quantity-button" /* Replaced px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-l-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 */
                                            disabled={item.quantity <= 1}
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value) || 1)}
                                            className="cart-quantity-input" /* Replaced w-16 text-center text-lg font-medium border-x border-gray-300 focus:outline-none focus:ring-0 */
                                            min="1"
                                            aria-label="Item quantity"
                                        />
                                        <button
                                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                            className="cart-quantity-button"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {/* Remove item button */}
                                    <button
                                        onClick={() => handleRemoveFromCart(item)}
                                        className="cart-remove-button" /* Replaced bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors flex items-center space-x-2 text-sm */
                                    >
                                        <span className="material-icons">delete</span>
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart total and checkout button */}
                    <div className="cart-summary"> {/* Replaced mt-10 pt-8 border-t-2 border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 */}
                        <p className="cart-total-text">Total: <span className="cart-total-amount">${calculateTotal()}</span></p> {/* Replaced text-3xl font-bold text-gray-900 */}
                        <Link
                            to="/checkout"
                            className="checkout-button" /* Replaced bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xl flex items-center space-x-3 */
                        >
                            <span className="material-icons">payment</span>
                            <span>Proceed to Checkout</span>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;