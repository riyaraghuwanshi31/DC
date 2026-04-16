import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, items } = useCart();
  const inCart = items.some((i) => i._id === product._id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card card-hover group flex flex-col">
      {/* Image */}
      <Link to={`/products/${product._id}`} className="relative overflow-hidden aspect-[4/3] bg-dark-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600';
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="badge bg-primary-500 text-white">NEW</span>
          )}
          {discount > 0 && (
            <span className="badge bg-green-500 text-white">{discount}% OFF</span>
          )}
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-dark-900/70 flex items-center justify-center">
            <span className="badge bg-red-500/90 text-white text-sm px-3 py-1">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-primary-400 font-medium mb-1">{product.category}</span>
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-white text-sm leading-snug hover:text-primary-400 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.ratings > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(product.ratings) ? 'text-yellow-400' : 'text-dark-600'}`}
                  fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-dark-400 text-xs">({product.numReviews})</span>
          </div>
        )}

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-dark-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
              product.stock === 0
                ? 'bg-dark-700 text-dark-500 cursor-not-allowed'
                : inCart
                ? 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : inCart ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
