import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { sampleProducts } from '../data/sampleProducts.js';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const bannerImages = [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&q=80&auto=format",
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop&q=80&auto=format",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop&q=80&auto=format"
    ];
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    const featuredProducts = sampleProducts.slice(0, 4);

    return (
        <div className="fade-in">
            {/* Hero Banner Section */}
            <div className="hero-banner md-h-550px"> {/* Replaced relative h-96 md:h-[550px] overflow-hidden rounded-xl shadow-lg mt-4 */}
                {bannerImages.map((image, index) => (
                    <div
                        key={index}
                        className={`hero-banner-slide ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img src={image} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="hero-banner-overlay"> {/* Replaced absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 */}
                            <div className="hero-content"> {/* Replaced text-center text-white */}
                                <h1 className="hero-title">Welcome to Clothora</h1> {/* Replaced text-4xl md:text-6xl font-extrabold mb-4 bounce-in */}
                                <p className="hero-subtitle"> {/* Replaced text-lg md:text-xl mb-8 max-w-2xl mx-auto */}
                                    Discover our exclusive collection of premium quality T-shirts. Style, comfort, and sustainability combined.
                                </p>
                                <Link
                                    to="/products"
                                    className="hero-shop-button" /* Replaced bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3 text-lg font-semibold */
                                >
                                    <span>Shop Now</span>
                                    <span className="material-icons">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slide Indicators (dots) */}
                <div className="slide-indicators"> {/* Replaced absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 */}
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`slide-indicator-dot ${
                                index === currentSlide ? 'active' : ''
                            }`} /* Replaced w-3 h-3 rounded-full transition-all */
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Featured Products Section */}
            <section className="container featured-products-section"> {/* Replaced container mx-auto px-4 py-16 */}
                <h2 className="section-title">Our Best Sellers</h2> {/* Replaced text-4xl font-bold text-center mb-12 text-gray-800 */}
                <div className="product-grid"> {/* Replaced grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 */}
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="text-center mt-14">
                    <Link
                        to="/products"
                        className="view-all-button" /* Replaced bg-gray-800 text-white px-10 py-4 rounded-full hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 text-lg font-semibold */
                    >
                        Explore All Products
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section"> {/* Replaced bg-gray-100 py-16 rounded-xl shadow-inner mx-4 mb-8 */}
                <div className="container px-4"> {/* Replaced container mx-auto px-4 */}
                    <div className="features-grid"> {/* Replaced grid grid-cols-1 md:grid-cols-3 gap-12 */}
                        <div className="feature-item"> {/* Replaced text-center p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl */}
                            <div className="feature-icon-wrapper blue"> {/* Replaced w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 */}
                                <span className="material-icons">local_shipping</span> {/* Replaced text-blue-600 text-4xl */}
                            </div>
                            <h3 className="feature-item-title">Fast & Free Shipping</h3> {/* Replaced text-2xl font-semibold mb-3 text-gray-800 */}
                            <p className="feature-item-description">Enjoy complimentary fast shipping on all orders above $50, delivered right to your doorstep.</p> {/* Replaced text-gray-600 leading-relaxed */}
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper green">
                                <span className="material-icons">verified</span>
                            </div>
                            <h3 className="feature-item-title">Unmatched Quality</h3>
                            <p className="feature-item-description">Each T-shirt is crafted with premium, durable fabrics for lasting comfort and style.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper purple">
                                <span className="material-icons">support_agent</span>
                            </div>
                            <h3 className="feature-item-title">24/7 Customer Support</h3>
                            <p className="feature-item-description">Our dedicated support team is always ready to assist you with any queries or concerns.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;