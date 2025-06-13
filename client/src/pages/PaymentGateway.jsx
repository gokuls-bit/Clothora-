import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { showMessage } from '../utils/messages.js';

function PaymentGateway() {
    const { cart, dispatch: cartDispatch } = useContext(CartContext);
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'failed'

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    // Redirect if cart is empty (cannot pay if there's nothing to buy)
    useEffect(() => {
        if (cart.length === 0 && !isProcessing && paymentStatus === null) {
            showMessage("Your cart is empty. Please add items before making a payment.", "info");
            navigate('/cart');
        }
    }, [cart, isProcessing, paymentStatus, navigate]);

    // This function simulates the payment process without any actual API calls
    const handleSimulatedPayment = (e) => {
        e.preventDefault(); // Prevent default form submission behavior if this were a form

        // Check if cart is empty before simulating payment
        if (cart.length === 0) {
            showMessage("Your cart is empty. Cannot process payment.", "error");
            navigate('/cart'); // Redirect to cart if empty
            return;
        }

        setIsProcessing(true);
        setPaymentStatus(null); // Reset status for new attempt

        // Simulate a delay for payment processing
        setTimeout(() => {
            // Simulate a random success/failure
            const success = Math.random() > 0.3; // 70% chance of success

            if (success) {
                setPaymentStatus('success');
                cartDispatch({ type: 'CLEAR_CART' }); // Clear cart on successful simulation
                showMessage('Payment successful! Your order has been placed.', 'success');
                // Redirect to the home page after a short delay
                setTimeout(() => navigate('/'), 2000);
            } else {
                setPaymentStatus('failed');
                showMessage('Payment failed. Please try again.', 'error');
            }
            setIsProcessing(false);
        }, 2000); // Simulate 2-second processing time
    };

    return (
        <div className="container page-content fade-in mt-8 max-w-lg">
            <h1 className="payment-page-title">Complete Your Payment</h1>

            {cart.length > 0 && (
                <div className="payment-total-display">
                    <p className="payment-total-text">Order Total: <span className="payment-total-amount-value">${calculateTotal()}</span></p>
                </div>
            )}

            {/* No actual form fields for card details, just a button for simulation */}
            <div className="payment-form-section" style={{ textAlign: 'center' }}>
                <p className="form-label" style={{ marginBottom: 'var(--spacing-4)' }}>
                    Click the button below to simulate your payment.
                </p>
                <button
                    type="button" // Use type="button" to prevent default form submission
                    onClick={handleSimulatedPayment}
                    className="pay-now-button"
                    disabled={isProcessing || cart.length === 0}
                >
                    {isProcessing ? (
                        <>
                            <div className="spinner"></div>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <span className="material-icons">lock</span>
                            <span>Simulate Payment</span>
                        </>
                    )}
                </button>
            </div>

            {paymentStatus === 'success' && (
                <div className="payment-status-message success">
                    Payment Successful! 🎉 Redirecting...
                </div>
            )}
            {paymentStatus === 'failed' && (
                <div className="payment-status-message failed">
                    Payment Failed. 🙁 Please try again.
                </div>
            )}
            <div className="back-to-checkout-link-wrapper">
                <Link to="/checkout" className="back-to-checkout-link">
                    <span className="material-icons">arrow_back</span> Back to Checkout Summary
                </Link>
            </div>
        </div>
    );
}

export default PaymentGateway;
