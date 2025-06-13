import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { AdminContext } from '../context/AdminContext.jsx';
import { sampleProducts } from '../data/sampleProducts.js';
import { showMessage } from '../utils/messages.js';

const ProductDetail = () => {
    const { id } = useParams();
    const { products: adminProducts } = useContext(AdminContext);
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { wishlist, dispatch: wishlistDispatch } = useContext(WishlistContext);
    const navigate = useNavigate();

    const allProducts = [...sampleProducts, ...adminProducts];
    const product = allProducts.find(p => p.id === parseInt(id));

    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            if (product.sizes && product.sizes.length > 0) {
                setSelectedSize(product.sizes[0]);
            } else {
                setSelectedSize('One Size');
            }
        }
    }, [product]);

    if (!product) {
        return (
            <div className="container page-content text-center mt-8"> {/* Replaced container mx-auto px-4 py-16 text-center bg-white rounded-lg shadow-md mt-8 */}
                <h1 className="text-3xl font-bold text-red-500 mb-4">Product Not Found</h1>
                <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
                <Link to="/products" className="text-blue-600 hover:underline text-lg flex items-center justify-center">
                    <span className="material-icons mr-2">arrow_back</span> Back to Products
                </Link>
            </div>
        );
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);

    const handleAddToCart = () => {
        if (!selectedSize) {
            showMessage('Please select a size to add to cart.', 'error');
            return;
        }
        cartDispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, size: selectedSize, quantityToAdd: quantity }
        });
        showMessage(`${quantity}x ${product.name} (${selectedSize}) added to cart!`, 'success');
    };

    const handleToggleWishlist = () => {
        if (isInWishlist) {
            wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
            showMessage(`${product.name} removed from wishlist.`, 'info');
        } else {
            wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
            showMessage(`${product.name} added to wishlist!`, 'success');
        }
    };

    return (
        <div className="container page-content fade-in mt-8"> {/* Replaced container mx-auto px-4 py-8 fade-in bg-white rounded-xl shadow-lg mt-8 max-w-lg */}
            <button
                onClick={() => navigate(-1)}
                className="back-button" /* Replaced mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium text-lg */
            >
                <span className="material-icons mr-2">arrow_back</span>
                Back to Products
            </button>

            <div className="product-detail-grid"> {/* Replaced grid grid-cols-1 lg:grid-cols-2 gap-12 */}
                {/* Product Image Section */}
                <div className="product-detail-image-wrapper"> {/* Replaced space-y-4 */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-detail-image lg-h-500px" /* Replaced w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg */
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x600/cccccc/333333?text=Image+Error`; }}
                    />
                </div>

                {/* Product Information Section */}
                <div className="product-detail-info"> {/* Replaced space-y-6 flex flex-col justify-between */}
                    <div>
                        <h1 className="product-detail-name">{product.name}</h1> {/* Replaced text-4xl font-bold mb-3 text-gray-900 */}
                        <p className="product-detail-description">{product.description}</p> {/* Replaced text-gray-700 text-lg leading-relaxed mb-6 */}
                    </div>

                    {/* Rating Display */}
                    <div className="product-detail-rating"> {/* Replaced flex items-center space-x-4 mb-4 */}
                        <div className="product-detail-stars"> {/* Replaced flex text-yellow-400 */}
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="material-icons">
                                    {i < Math.floor(product.rating) ? 'star' : 'star_border'}
                                </span>
                            ))}
                        </div>
                        <span className="product-detail-reviews-count">({product.reviews} reviews)</span> {/* Replaced text-gray-500 text-base */}
                    </div>

                    {/* Price Display */}
                    <div className="product-detail-price"> {/* Replaced text-5xl font-extrabold text-gray-800 mb-6 */}
                        ${product.price.toFixed(2)}
                    </div>

                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="product-detail-size-section"> {/* Replaced mb-6 */}
                            <label className="product-detail-size-label">Select Size:</label> {/* Replaced block text-xl font-semibold mb-3 text-gray-800 */}
                            <div className="product-detail-size-options"> {/* Replaced flex flex-wrap gap-3 */}
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {(!product.sizes || product.sizes.length === 0) && (
                        <div className="product-detail-size-section">
                            <label className="product-detail-size-label">Size:</label>
                            <span className="one-size-display">One Size</span>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="product-detail-quantity-section"> {/* Replaced mb-8 */}
                        <label className="product-detail-quantity-label">Quantity:</label> {/* Replaced block text-xl font-semibold mb-3 text-gray-800 */}
                        <div className="quantity-controls"> {/* Replaced flex items-center space-x-3 */}
                            <button
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="quantity-button" /* Replaced bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-2xl font-bold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 */
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="quantity-input" /* Replaced w-20 text-center border border-gray-300 rounded-lg text-xl py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 */
                                min="1"
                                aria-label="Product quantity"
                            />
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="quantity-button"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons (Add to Cart, Add to Wishlist) */}
                    <div className="product-detail-actions"> {/* Replaced flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 */}
                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-button" /* Replaced flex-1 bg-blue-600 text-white py-4 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 text-xl font-semibold */
                        >
                            <span className="material-icons">add_shopping_cart</span>
                            <span>Add to Cart</span>
                        </button>
                        <button
                            onClick={handleToggleWishlist}
                            className={`wishlist-toggle-button ${isInWishlist ? 'remove' : 'add'}`} /* Replaced w-full sm:w-auto px-6 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 text-xl font-semibold */
                        >
                            <span className="material-icons">{isInWishlist ? 'favorite' : 'favorite_border'}</span>
                            <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;