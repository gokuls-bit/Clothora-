import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { showMessage } from '../utils/messages.js';

const ProductCard = ({ product, showQuickActions = true }) => {
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { wishlist, dispatch: wishlistDispatch } = useContext(WishlistContext);
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
    const isInWishlist = wishlist.some(item => item.id === product.id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            showMessage('Please select a size.', 'error');
            return;
        }
        cartDispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, size: selectedSize, quantityToAdd: 1 }
        });
        showMessage(`${product.name} ${selectedSize ? `(${selectedSize})` : ''} added to cart!`, 'success');
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        if (isInWishlist) {
            wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
            showMessage(`${product.name} removed from wishlist.`, 'info');
        } else {
            wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
            showMessage(`${product.name} added to wishlist!`, 'success');
        }
    };

    return (
        <div className="product-card">
            <div className="product-card-image-wrapper group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-image"
                    onClick={() => navigate(`/product/${product.id}`)}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/cccccc/333333?text=Image+Error`; }}
                />
                {showQuickActions && (
                    <div className="product-card-actions group-hover-opacity-100">
                        <button
                            onClick={handleToggleWishlist}
                            className={`action-button ${isInWishlist ? 'wishlist-remove' : 'wishlist-add'}`}
                            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                            aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <span className="material-icons">{isInWishlist ? 'favorite' : 'favorite_border'}</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="product-card-info">
                <h3
                    className="product-card-name"
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    {product.name}
                </h3>
                <p className="product-card-description">{product.description}</p>

                <div className="product-card-rating">
                    <div className="product-card-stars">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-icons">
                                {i < Math.floor(product.rating) ? 'star' : 'star_border'}
                            </span>
                        ))}
                    </div>
                    <span className="product-card-reviews">({product.reviews})</span>
                </div>

                <div className="product-card-price-section">
                    <span className="product-card-price">${product.price.toFixed(2)}</span>
                    {showQuickActions && product.sizes && product.sizes.length > 0 && (
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="product-card-size-select"
                            onClick={e => e.stopPropagation()}
                            aria-label="Select size"
                        >
                            {product.sizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    )}
                    {showQuickActions && (!product.sizes || product.sizes.length === 0) && (
                        <span className="text-gray-500 text-sm">N/A</span>
                    )}
                </div>
                {showQuickActions && (
                    <button
                        onClick={handleAddToCart}
                        className="product-card-add-to-cart"
                    >
                        <span className="material-icons">add_shopping_cart</span>
                        <span>Add to Cart</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

// Example Product Data (can be moved to a separate data file)
export const products = [
    // Existing Product
    {
        id: '1',
        name: 'Stylish Running Shoes',
        description: 'Lightweight and comfortable running shoes for your daily jog.',
        image: 'https://via.placeholder.com/400x400/FF5733/FFFFFF?text=Running+Shoes',
        price: 89.99,
        rating: 4.5,
        reviews: 120,
        sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
    },
    // Anime Products
    {
        id: '2',
        name: 'One Piece - Monkey D. Luffy Figure',
        description: 'Highly detailed collectible figure of Monkey D. Luffy from One Piece.',
        image: 'https://via.placeholder.com/400x400/1E90FF/FFFFFF?text=Luffy+Figure',
        price: 49.99,
        rating: 4.8,
        reviews: 250,
        sizes: [] // Figures usually don't have sizes
    },
    {
        id: '3',
        name: 'Attack on Titan - Scout Regiment Hoodie',
        description: 'High-quality hoodie featuring the iconic Scout Regiment logo. Perfect for fans!',
        image: 'https://via.placeholder.com/400x400/8B0000/FFFFFF?text=AOT+Hoodie',
        price: 59.95,
        rating: 4.6,
        reviews: 180,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: '4',
        name: 'My Hero Academia - Izuku Midoriya Plush',
        description: 'Soft and cuddly plush toy of Deku in his hero costume.',
        image: 'https://via.placeholder.com/400x400/32CD32/FFFFFF?text=Deku+Plush',
        price: 24.50,
        rating: 4.7,
        reviews: 90,
        sizes: []
    },
    {
        id: '5',
        name: 'Naruto Shippuden - Akatsuki Cloud T-Shirt',
        description: 'Show your allegiance with this comfortable Akatsuki cloud symbol t-shirt.',
        image: 'https://via.placeholder.com/400x400/B22222/FFFFFF?text=Akatsuki+T-Shirt',
        price: 29.00,
        rating: 4.4,
        reviews: 150,
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '6',
        name: 'Demon Slayer - Nichirin Blade Replica (Mini)',
        description: 'Miniature replica of a Demon Slayer Nichirin Blade, great for display.',
        image: 'https://via.placeholder.com/400x400/6A5ACD/FFFFFF?text=Nichirin+Blade',
        price: 35.00,
        rating: 4.9,
        reviews: 100,
        sizes: []
    },

    // Manga Products
    {
        id: '7',
        name: 'Berserk Deluxe Edition Vol. 1',
        description: 'The definitive way to experience Kentaro Miura\'s masterpiece, in oversized hardcover format.',
        image: 'https://via.placeholder.com/400x400/4B0082/FFFFFF?text=Berserk+Manga',
        price: 49.99,
        rating: 4.9,
        reviews: 300,
        sizes: [] // Books usually don't have sizes
    },
    {
        id: '8',
        name: 'Jujutsu Kaisen Manga - Vol. 0',
        description: 'The prequel to the hit series Jujutsu Kaisen, essential for fans.',
        image: 'https://via.placeholder.com/400x400/FFD700/000000?text=JJK+Manga+0',
        price: 9.99,
        rating: 4.7,
        reviews: 120,
        sizes: []
    },
    {
        id: '9',
        name: 'Chainsaw Man Manga - Vol. 1',
        description: 'Start your journey into the wild world of Denji and Pochita.',
        image: 'https://via.placeholder.com/400x400/FF4500/FFFFFF?text=Chainsaw+Manga+1',
        price: 9.99,
        rating: 4.8,
        reviews: 180,
        sizes: []
    },
    {
        id: '10',
        name: 'Tokyo Ghoul Complete Box Set',
        description: 'All 14 volumes of the critically acclaimed Tokyo Ghoul series, plus an exclusive poster.',
        image: 'https://via.placeholder.com/400x400/808080/FFFFFF?text=Tokyo+Ghoul+Box',
        price: 139.99,
        rating: 4.9,
        reviews: 200,
        sizes: []
    },

    // Star Wars Products
    {
        id: '11',
        name: 'Star Wars - Darth Vader Lightsaber Replica',
        description: 'A realistic hilt replica of Darth Vader\'s iconic lightsaber.',
        image: 'https://via.placeholder.com/400x400/000000/FF0000?text=Vader+Lightsaber',
        price: 199.99,
        rating: 4.9,
        reviews: 400,
        sizes: []
    },
    {
        id: '12',
        name: 'Star Wars - Millennium Falcon LEGO Set',
        description: 'Build your own highly detailed Millennium Falcon with this advanced LEGO set.',
        image: 'https://via.placeholder.com/400x400/B0C4DE/000000?text=Falcon+LEGO',
        price: 159.99,
        rating: 4.8,
        reviews: 350,
        sizes: []
    },
    {
        id: '13',
        name: 'The Mandalorian - Grogu (Baby Yoda) Plush',
        description: 'Everyone\'s favorite foundling, Grogu, in an adorable plush form.',
        image: 'https://via.placeholder.com/400x400/228B22/FFFFFF?text=Grogu+Plush',
        price: 29.99,
        rating: 4.9,
        reviews: 500,
        sizes: []
    },
    {
        id: '14',
        name: 'Star Wars: The Clone Wars - Ahsoka Tano Figure',
        description: 'Highly articulated action figure of the fan-favorite Jedi, Ahsoka Tano.',
        image: 'https://via.placeholder.com/400x400/ADD8E6/000000?text=Ahsoka+Figure',
        price: 34.99,
        rating: 4.7,
        reviews: 190,
        sizes: []
    },
    {
        id: '15',
        name: 'Star Wars "May the Force Be With You" Mug',
        description: 'Ceramic mug featuring a classic Star Wars quote, perfect for your morning brew.',
        image: 'https://via.placeholder.com/400x400/F0E68C/000000?text=SW+Mug',
        price: 14.99,
        rating: 4.6,
        reviews: 70,
        sizes: []
    }
];