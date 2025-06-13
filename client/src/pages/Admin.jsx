import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { sampleProducts } from '../data/sampleProducts.js';
import { showMessage } from '../utils/messages.js';

function Admin() {
    const { products: adminProducts, dispatch: adminDispatch } = useContext(AdminContext);
    const allProducts = [...sampleProducts, ...adminProducts];

    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState({
        id: null,
        name: '',
        price: '',
        image: '',
        description: '',
        sizes: [],
        category: '',
        rating: '',
        reviews: ''
    });

    useEffect(() => {
        if (editingProduct) {
            setForm({
                id: editingProduct.id,
                name: editingProduct.name,
                price: editingProduct.price,
                image: editingProduct.image,
                description: editingProduct.description,
                sizes: editingProduct.sizes || [],
                category: editingProduct.category || '',
                rating: editingProduct.rating || '',
                reviews: editingProduct.reviews || ''
            });
        } else {
            setForm({
                id: null, name: '', price: '', image: '', description: '', sizes: [], category: '', rating: '', reviews: ''
            });
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'sizes') {
            setForm(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()).filter(s => s) }));
        } else if (name === 'price' || name === 'rating' || name === 'reviews') {
            setForm(prev => ({ ...prev, [name]: parseFloat(value) || value }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.price || !form.image || !form.description) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        const productData = {
            name: form.name,
            price: parseFloat(form.price),
            image: form.image,
            description: form.description,
            sizes: form.sizes,
            category: form.category.toLowerCase(),
            rating: parseFloat(form.rating) || 0,
            reviews: parseInt(form.reviews) || 0
        };

        if (editingProduct) {
            adminDispatch({ type: 'UPDATE_PRODUCT', payload: { ...productData, id: form.id } });
            showMessage(`Product "${form.name}" updated successfully!`, 'success');
        } else {
            adminDispatch({ type: 'ADD_PRODUCT', payload: productData });
            showMessage(`Product "${form.name}" added successfully!`, 'success');
        }
        setEditingProduct(null);
        setForm({ id: null, name: '', price: '', image: '', description: '', sizes: [], category: '', rating: '', reviews: '' });
    };

    const handleDelete = (productId, productName) => {
        if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
            adminDispatch({ type: 'DELETE_PRODUCT', payload: { id: productId } });
            showMessage(`Product "${productName}" deleted.`, 'info');
        }
    };

    return (
        <div className="container page-content fade-in"> {/* Replaced container mx-auto px-4 py-8 fade-in */}
            <h1 className="admin-page-title">Admin Panel</h1> {/* Replaced text-4xl font-bold text-gray-900 mb-10 text-center */}

            {/* Product Management Form Section */}
            <div className="admin-form-section"> {/* Replaced bg-white p-8 rounded-xl shadow-lg mb-10 */}
                <h2 className="admin-form-title"> {/* Replaced text-2xl font-semibold mb-6 text-gray-800 */}
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleSubmit} className="admin-form-grid"> {/* Replaced grid grid-cols-1 md:grid-cols-2 gap-6 */}
                    <div className="admin-form-input-group">
                        <label className="form-label" htmlFor="name">Product Name</label> {/* Replaced block text-gray-700 text-sm font-bold mb-2 */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-input" /* Replaced shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 */
                            placeholder="e.g., Summer Breeze Tee"
                            required
                        />
                    </div>
                    <div className="admin-form-input-group">
                        <label className="form-label" htmlFor="price">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g., 29.99"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="admin-form-input-group md-col-span-2"> {/* Replaced md:col-span-2 */}
                        <label className="form-label" htmlFor="image">Image URL</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g., https://images.unsplash.com/photo-..."
                            required
                        />
                    </div>
                    <div className="admin-form-input-group md-col-span-2"> {/* Replaced md:col-span-2 */}
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                            className="form-input admin-form-textarea" /* Replaced shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 */
                            placeholder="A brief description of the product."
                            required
                        ></textarea>
                    </div>
                    <div className="admin-form-input-group">
                        <label className="form-label" htmlFor="sizes">Sizes (comma-separated)</label>
                        <input
                            type="text"
                            id="sizes"
                            name="sizes"
                            value={form.sizes.join(', ')}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g., S, M, L, XL"
                        />
                    </div>
                    <div className="admin-form-input-group">
                        <label className="form-label" htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g., casual, vintage"
                        />
                    </div>
                    <div className="admin-form-input-group">
                        <label className="form-label" htmlFor="rating">Rating (0-5)</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={form.rating}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g., 4.5"
                            step="0.1"
                            min="0"
                            max="5"
                        />
                    </div>
                    <div className="admin-form-input-group">
                        <label className="form-label" htmlFor="reviews">Number of Reviews</label>
                        <input
                            type="number"
                            id="reviews"
                            name="reviews"
                            value={form.reviews}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g., 120"
                            min="0"
                        />
                    </div>
                    <div className="admin-form-actions md-col-span-2"> {/* Replaced md:col-span-2 flex justify-end space-x-4 mt-6 */}
                        <button
                            type="button"
                            onClick={() => { setEditingProduct(null); setForm({ id: null, name: '', price: '', image: '', description: '', sizes: [], category: '', rating: '', reviews: '' }); }}
                            className="admin-button clear" /* Replaced bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors shadow-md flex items-center space-x-2 */
                        >
                            <span className="material-icons">cancel</span>
                            <span>Clear Form</span>
                        </button>
                        <button
                            type="submit"
                            className="admin-button submit" /* Replaced bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center space-x-2 */
                        >
                            <span className="material-icons">{editingProduct ? 'save' : 'add'}</span>
                            <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Product List Section */}
            <div className="admin-product-list-section"> {/* Replaced bg-white p-8 rounded-xl shadow-lg */}
                <h2 className="admin-product-list-title">Existing Products</h2> {/* Replaced text-2xl font-semibold mb-6 text-gray-800 */}
                <div className="overflow-x-auto">
                    <table className="admin-table"> {/* Replaced min-w-full bg-white border border-gray-200 rounded-lg */}
                        <thead>
                            <tr> {/* Replaced bg-gray-100 text-gray-600 uppercase text-sm leading-normal */}
                                <th>Product</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th className="text-center">Actions</th> {/* Replaced text-center */}
                            </tr>
                        </thead>
                        <tbody> {/* Replaced text-gray-700 text-sm font-light */}
                            {allProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6">No products available.</td> {/* Replaced py-6 text-center text-gray-500 */}
                                </tr>
                            ) : (
                                allProducts.map(product => (
                                    <tr key={product.id}> {/* Replaced border-b border-gray-200 hover:bg-gray-50 transition-colors */}
                                        <td className="admin-product-cell whitespace-nowrap"> {/* Replaced py-3 px-6 text-left whitespace-nowrap */}
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="admin-product-image" /* Replaced w-12 h-12 rounded-md mr-3 object-cover */
                                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/cccccc/333333?text=N/A`; }}
                                            />
                                            <span className="admin-product-name">{product.name}</span>
                                        </td>
                                        <td>${product.price.toFixed(2)}</td> {/* Replaced py-3 px-6 text-left */}
                                        <td>{product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : 'N/A'}</td> {/* Replaced py-3 px-6 text-left */}
                                        <td className="admin-product-actions"> {/* Replaced py-3 px-6 text-center flex item-center justify-center space-x-2 */}
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="admin-action-button edit" /* Replaced w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition-colors */
                                                title="Edit Product"
                                            >
                                                <span className="material-icons">edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="admin-action-button delete" /* Replaced w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors */
                                                title="Delete Product"
                                            >
                                                <span className="material-icons">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;