import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getProducts } from '../utils/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';
import { ProductDetailSkeleton} from '../components/common/Skeleton';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState(null);
  const { addToCart, items } = useCart();
  const inCart = items.some((i) => i._id === product?._id);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await getProduct(id);
        setProduct(data.product);
        setSelectedImage(0);

        // Fetch related
        const related = await getProducts({ category: data.product.category, limit: 4 });
        setRelated(related.data.products.filter((p) => p._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetch();
    window.scrollTo({ top: 0 });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductDetailSkeleton />
    </div>
  );

  if (error) return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
      <p className="text-dark-400 mb-6">{error}</p>
      <Link to="/products" className="btn-primary">Back to Products</Link>
    </div>
  );

  const images = product.images?.length > 0 ? product.images : [product.image];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-400 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-white transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 animate-fade-in">

          {/* Images */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-dark-800 border border-dark-700 aspect-square mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600'; }}
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-primary-500' : 'border-dark-700 hover:border-dark-500'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="badge bg-primary-500/20 text-primary-400 border border-primary-500/30">{product.category}</span>
              {product.isNew && <span className="badge bg-primary-500 text-white">NEW</span>}
              {discount > 0 && <span className="badge bg-green-500 text-white">{discount}% OFF</span>}
              {product.stock === 0 && <span className="badge bg-red-500 text-white">Out of Stock</span>}
            </div>

            <h1 className="font-display text-3xl font-bold text-white mb-2 leading-tight">{product.name}</h1>
            <p className="text-dark-400 text-sm mb-4">Brand: <span className="text-white">{product.brand}</span></p>

            {/* Rating */}
            {product.ratings > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-5 h-5 ${star <= Math.round(product.ratings) ? 'text-yellow-400' : 'text-dark-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-medium">{product.ratings}</span>
                <span className="text-dark-400 text-sm">({product.numReviews} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-dark-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-green-400 font-semibold">Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}</span>
                </>
              )}
            </div>

            <p className="text-dark-300 leading-relaxed mb-8">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2.5 h-2.5 rounded-full ${product.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`flex-1 py-4 rounded-xl font-semibold text-base transition-all active:scale-95 ${
                  product.stock === 0
                    ? 'bg-dark-700 text-dark-500 cursor-not-allowed'
                    : inCart
                    ? 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30'
                    : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                }`}
              >
                {product.stock === 0 ? 'Out of Stock' : inCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
              <Link to="/cart" className="btn-secondary py-4 text-center text-base">
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Specs */}
        {product.specs?.length > 0 && (
          <div className="card p-8 mb-16">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-dark-700 sm:divide-y-0">
              {product.specs.map((spec, i) => (
                <div key={i} className={`flex gap-4 py-3 ${i % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8 sm:border-l border-dark-700'}`}>
                  <span className="text-dark-400 text-sm min-w-[140px] shrink-0">{spec.key}</span>
                  <span className="text-white text-sm font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="section-title mb-8">Related <span className="gradient-text">Products</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.slice(0, 4).map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
