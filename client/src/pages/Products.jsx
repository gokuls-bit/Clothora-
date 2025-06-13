import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { sampleProducts } from '../data/sampleProducts.js';
import { AdminContext } from '../context/AdminContext.jsx';

const Products = () => {
    const { products: adminProducts } = useContext(AdminContext);
    const allProducts = [...sampleProducts, ...adminProducts];
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let filtered = [...allProducts];

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                default:
                    return a.name.localeCompare(b.name);
            }
        });
        setFilteredProducts(filtered);
    }, [categoryFilter, sortBy, searchTerm, allProducts]);

    const categories = ['all', ...new Set(allProducts.map(p => p.category))].filter(Boolean);

    return (
        <div className="container page-content fade-in"> {/* Replaced container mx-auto px-4 py-8 fade-in */}
            <h1 className="products-page-title">Our Collection</h1> {/* Replaced text-4xl font-bold mb-8 text-center text-gray-800 */}

            {/* Filters and Search Section */}
            <div className="filters-section"> {/* Replaced flex flex-col md:flex-row gap-4 mb-8 bg-white p-6 rounded-lg shadow-md */}
                {/* Search input */}
                <div className="search-input-wrapper"> {/* Replaced flex-1 */}
                    <label htmlFor="search" className="sr-only">Search products</label>
                    <div className="relative">
                        <div className="search-input-icon"> {/* Replaced absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none */}
                            <span className="material-icons">search</span> {/* Replaced text-gray-400 */}
                        </div>
                        <input
                            type="text"
                            id="search"
                            className="search-input" /* Replaced w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 */
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="md-w-1_4"> {/* Replaced md:w-1/4 */}
                    <label htmlFor="category" className="sr-only">Filter by Category</label>
                    <select
                        id="category"
                        className="filter-select" /* Replaced w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white */
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort By */}
                <div className="md-w-1_4"> {/* Replaced md:w-1/4 */}
                    <label htmlFor="sortBy" className="sr-only">Sort By</label>
                    <select
                        id="sortBy"
                        className="filter-select" /* Replaced w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white */
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Name (A-Z)</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="product-grid"> {/* Replaced grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 */}
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="no-products-message"> {/* Replaced text-center py-16 bg-white rounded-lg shadow-md mt-8 */}
                    <span className="material-icons">sentiment_dissatisfied</span> {/* Replaced text-6xl text-gray-400 mb-4 */}
                    <p>No products found matching your criteria.</p> {/* Replaced text-2xl font-semibold text-gray-600 */}
                    <p className="text-gray-500">Try adjusting your filters or search term.</p> {/* Replaced text-gray-500 mt-2 */}
                </div>
            )}
        </div>
    );
};

export default Products;