import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { ProductCardSkeleton } from '../components/common/Skeleton';
import { getFeaturedProducts } from '../utils/api';

const CATEGORIES = [
  { name: 'TVs', icon: '📺', desc: 'Smart & 4K TVs', color: 'from-blue-600 to-blue-800' },
  { name: 'Earbuds', icon: '🎧', desc: 'Wireless Audio', color: 'from-purple-600 to-purple-800' },
  { name: 'Batteries', icon: '🔋', desc: 'Power Banks & Li-Ion', color: 'from-green-600 to-green-800' },
  { name: 'Laptops', icon: '💻', desc: 'Work & Gaming', color: 'from-indigo-600 to-indigo-800' },
  { name: 'Smartwatches', icon: '⌚', desc: 'Fitness & Style', color: 'from-orange-600 to-orange-800' },
  { name: 'Accessories', icon: '🔌', desc: 'Cables & Chargers', color: 'from-pink-600 to-pink-800' },
];

const STATS = [
  { label: 'Products', value: '100+' },
  { label: 'Happy Customers', value: '5000+' },
  { label: 'Categories', value: '6+' },
  { label: 'Orders via WhatsApp', value: '2000+' },
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await getFeaturedProducts();
        setFeaturedProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch featured products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dark-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(to right, #f97316 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span className="text-primary-400 text-sm font-medium">Orders via WhatsApp · Fast & Easy</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up">
            Premium Gadgets<br />
            <span className="gradient-text">Delivered to You</span>
          </h1>

          <p className="text-dark-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Explore the latest TVs, laptops, earbuds, smartwatches, and more.
            Place your order directly via <span className="text-green-400 font-semibold">WhatsApp</span> — no payment gateway, no hassle.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-xl mx-auto mb-10 animate-fade-in">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search TVs, earbuds, laptops..."
              className="input-field flex-1 text-base"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Search
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
            <Link to="/products" className="btn-primary text-base px-8 py-3.5">
              Browse All Products
            </Link>
            <Link to="/products?featured=true" className="btn-secondary text-base px-8 py-3.5">
              Featured Items
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 pt-10 border-t border-dark-800">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-dark-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Shop by <span className="gradient-text">Category</span></h2>
          <p className="text-dark-400">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="card card-hover p-5 text-center group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{cat.name}</h3>
              <p className="text-dark-500 text-xs">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title mb-1">Featured <span className="gradient-text">Products</span></h2>
            <p className="text-dark-400">Handpicked top sellers</p>
          </div>
          <Link to="/products?featured=true" className="btn-secondary text-sm hidden sm:flex items-center gap-2">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-dark-400">
            <p className="text-lg">No featured products yet.</p>
            <p className="text-sm mt-2">Run <code className="text-primary-400">npm run seed</code> in the backend to add sample data.</p>
          </div>
        )}

        <div className="text-center mt-10 sm:hidden">
          <Link to="/products" className="btn-secondary">View All Products</Link>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-900/40 to-dark-800 border border-green-800/30 p-10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.05),transparent)]" />
          <div className="relative">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Order via <span className="text-green-400">WhatsApp</span>
            </h2>
            <p className="text-dark-300 max-w-xl mx-auto mb-7">
              Add items to your cart, fill in your details, and your complete order gets sent directly to us on WhatsApp. Simple, fast, and personal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/products" className="btn-primary px-8 py-3.5">Start Shopping</Link>
              <a
                href="https://wa.me/919301394684"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.354-1.498A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.193-1.369l-.371-.22-3.794.895.938-3.687-.242-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
