import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { ProductCardSkeleton } from '../components/common/Skeleton';
import { getProducts } from '../utils/api';

const CATEGORIES = ['All', 'TVs', 'Earbuds', 'Batteries', 'Laptops', 'Smartwatches', 'Accessories'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  const activeCategory = searchParams.get('category') || 'All';
  const activeSearch = searchParams.get('search') || '';
  const activeSort = searchParams.get('sort') || 'newest';
  const activePage = parseInt(searchParams.get('page') || '1');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { sort: activeSort, page: activePage, limit: 12 };
      if (activeCategory !== 'All') params.category = activeCategory;
      if (activeSearch) params.search = activeSearch;

      const { data } = await getProducts(params);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, activeSearch, activeSort, activePage]);

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchProducts]);

  const updateParam = (key, value) => {
    const params = Object.fromEntries(searchParams);
    if (value) params[key] = value;
    else delete params[key];
    if (key !== 'page') params.page = '1';
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title mb-2">
            {activeSearch ? `Results for "${activeSearch}"` : activeCategory === 'All' ? 'All Products' : activeCategory}
          </h1>
          {pagination.total !== undefined && (
            <p className="text-dark-400 text-sm">{pagination.total} products found</p>
          )}
        </div>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => updateParam('category', cat === 'All' ? '' : cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-dark-800 text-dark-300 hover:text-white border border-dark-700 hover:border-dark-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={activeSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="input-field sm:w-52 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Search indicator */}
        {activeSearch && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-dark-400 text-sm">Searching:</span>
            <span className="badge bg-primary-500/20 text-primary-400 border border-primary-500/30 px-3 py-1 text-sm">
              {activeSearch}
              <button onClick={() => updateParam('search', '')} className="ml-2 hover:text-white">✕</button>
            </span>
          </div>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-dark-400 mb-6">Try adjusting your filters or search query.</p>
            <button onClick={() => setSearchParams({})} className="btn-primary">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => updateParam('page', String(activePage - 1))}
              disabled={activePage === 1}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => updateParam('page', String(i + 1))}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                  activePage === i + 1 ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-300 hover:text-white border border-dark-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => updateParam('page', String(activePage + 1))}
              disabled={activePage === pagination.pages}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
