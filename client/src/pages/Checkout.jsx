import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { showMessage } from '../utils/messages.js';

const Checkout = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    if (cart.length === 0) {
        return (
            <div className="container page-content empty-cart-checkout mt-8"> {/* Replaced container mx-auto px-4 py-16 text-center bg-white rounded-lg shadow-md mt-8 */}
                <h1 className="empty-cart-checkout-title">Your Cart is Empty</h1> {/* Replaced text-3xl font-bold text-red-500 mb-4 */}
                <p className="empty-cart-checkout-message">Please add items to your cart before proceeding to checkout.</p> {/* Replaced text-gray-600 mb-6 */}
                <Link to="/cart" className="empty-cart-checkout-link"> {/* Replaced text-blue-600 hover:underline text-lg flex items-center justify-center */}
                    <span className="material-icons mr-2">arrow_back</span> Go to Cart
                </Link>
            </div>
        );
    }

    const handleProceedToPayment = () => {
        navigate('/payment');
    };

    return (
        <div className="container page-content fade-in mt-8"> {/* Replaced container mx-auto px-4 py-8 fade-in bg-white rounded-xl shadow-lg mt-8 max-w-lg */}
            <h1 className="checkout-summary-title">Checkout Summary</h1> {/* Replaced text-4xl font-bold text-gray-900 mb-10 text-center */}

            <div className="order-details-section"> {/* Replaced space-y-6 mb-8 */}
                <h2 className="order-details-title">Order Details</h2> {/* Replaced text-2xl font-semibold text-gray-800 border-b pb-4 mb-4 */}
                {cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="order-item"> {/* Replaced flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 */}
                        <div className="order-item-info"> {/* Replaced flex items-center space-x-4 */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="order-item-image" /* Replaced w-16 h-16 object-cover rounded-md */
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/cccccc/333333?text=Error`; }}
                            />
                            <div className="order-item-details">
                                <h3 className="order-item-name">{item.name}</h3>
                                <p>Size: {item.size}</p>
                                <p>Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="order-item-total-price">${(item.price * item.quantity).toFixed(2)}</p> {/* Replaced text-blue-600 text-xl font-bold */}
                    </div>
                ))}
            </div>

            <div className="checkout-summary-bottom"> {/* Replaced mt-8 pt-6 border-t-2 border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 */}
                <p className="checkout-total-text">Total: <span className="checkout-total-amount">${calculateTotal()}</span></p> {/* Replaced text-3xl font-bold text-gray-900 */}
                <button
                    onClick={handleProceedToPayment}
                    className="proceed-to-payment-button" /* Replaced bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xl flex items-center space-x-3 */
                >
                    <span className="material-icons">credit_card</span>
                    <span>Proceed to Payment</span>
                </button>
            </div>
        </div>
    );
};

export default Checkout;