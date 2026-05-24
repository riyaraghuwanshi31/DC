import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct } from '../utils/api';
import toast from 'react-hot-toast';

// const CATEGORIES = ['TVs', 'Earbuds', 'Batteries', 'Laptops', 'Smartwatches', 'Accessories'];
const CATEGORIES = ['TVs', 'Accessories'];

const emptyForm = {
  name: '', description: '', price: '', originalPrice: '', category: 'TVs',
  brand: 'Dubey Creations', image: '', stock: '', isFeatured: false, isNew: false,
};

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('All');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = filter !== 'All' ? { category: filter } : {};
      const { data } = await getProducts({ ...params, limit: 100 });
      setProducts(data.products);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [filter]); // eslint-disable-line

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image || !form.stock) {
      toast.error('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        stock: Number(form.stock),
      });
      toast.success('Product added successfully!', {
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' },
      });
      setForm(emptyForm);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Product deleted');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-title mb-1">Admin <span className="gradient-text">Panel</span></h1>
            <p className="text-dark-400 text-sm">{products.length} products</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
            {showForm ? '✕ Cancel' : '+ Add Product'}
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="card p-6 mb-8 animate-slide-up border-primary-500/30">
            <h2 className="font-display text-xl font-bold text-white mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="sm:col-span-2">
                <label className="block text-sm text-dark-300 mb-1.5">Product Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. DubeyBuds Pro Elite ANC" className="input-field" required />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm text-dark-300 mb-1.5">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product description..." rows={3} className="input-field resize-none" required />
              </div>

              <div>
                <label className="block text-sm text-dark-300 mb-1.5">Price (₹) *</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 2499" className="input-field" required />
              </div>

              <div>
                <label className="block text-sm text-dark-300 mb-1.5">Original Price (₹) (optional)</label>
                <input type="number" name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="e.g. 3499" className="input-field" />
              </div>

              <div>
                <label className="block text-sm text-dark-300 mb-1.5">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field cursor-pointer">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-dark-300 mb-1.5">Brand</label>
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand name" className="input-field" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm text-dark-300 mb-1.5">Image URL *</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." className="input-field" required />
              </div>

              <div>
                <label className="block text-sm text-dark-300 mb-1.5">Stock *</label>
                <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="e.g. 50" className="input-field" required />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="w-4 h-4 accent-primary-500" />
                  <span className="text-dark-300 text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} className="w-4 h-4 accent-primary-500" />
                  <span className="text-dark-300 text-sm">Mark as New</span>
                </label>
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); }} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary min-w-[140px] flex items-center justify-center gap-2">
                  {submitting ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving...</>
                  ) : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', ...CATEGORIES].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === cat ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-300 hover:text-white border border-dark-700'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Products table */}
        {loading ? (
          <div className="text-center py-12 text-dark-400">Loading...</div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-dark-300 text-sm font-medium">Product</th>
                    <th className="text-left px-5 py-3.5 text-dark-300 text-sm font-medium">Category</th>
                    <th className="text-left px-5 py-3.5 text-dark-300 text-sm font-medium">Price</th>
                    <th className="text-left px-5 py-3.5 text-dark-300 text-sm font-medium">Stock</th>
                    <th className="text-left px-5 py-3.5 text-dark-300 text-sm font-medium">Flags</th>
                    <th className="text-right px-5 py-3.5 text-dark-300 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-dark-700/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-600 shrink-0">
                            <img src={product.image} alt="" className="w-full h-full object-cover"
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=100'; }} />
                          </div>
                          <span className="text-white text-sm font-medium line-clamp-1 max-w-[200px]">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge bg-primary-500/10 text-primary-400 border border-primary-500/20">{product.category}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-dark-500 text-xs line-through ml-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {product.stock > 0 ? product.stock : 'Out'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1.5">
                          {product.isFeatured && <span className="badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Featured</span>}
                          {product.isNew && <span className="badge bg-green-500/10 text-green-400 border border-green-500/20">New</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => handleDelete(product._id, product.name)}
                          className="text-dark-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="text-center py-12 text-dark-400">
                  <p>No products found.</p>
                  <p className="text-sm mt-1">Run <code className="text-primary-400">npm run seed</code> in the backend to populate sample data.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
