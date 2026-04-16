import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-6">🛒</div>
        <h2 className="font-display text-3xl font-bold text-white mb-3">Your cart is empty</h2>
        <p className="text-dark-400 mb-8 max-w-sm">Looks like you haven't added any products yet. Browse our collection and find something you love!</p>
        <Link to="/products" className="btn-primary px-8 py-3.5 text-base">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-title">Shopping <span className="gradient-text">Cart</span></h1>
            <p className="text-dark-400 text-sm mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
          </div>
          <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item._id} className="card p-5 flex gap-4 animate-fade-in">
                {/* Image */}
                <Link to={`/products/${item._id}`} className="shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-dark-700">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200'; }}
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-primary-400 font-medium">{item.category}</span>
                  <Link to={`/products/${item._id}`}>
                    <h3 className="font-semibold text-white hover:text-primary-400 transition-colors line-clamp-2 text-sm mt-0.5">{item.name}</h3>
                  </Link>
                  <p className="text-primary-400 font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-dark-700 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-dark-600 hover:bg-dark-500 text-white flex items-center justify-center transition-colors font-bold"
                      >
                        −
                      </button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-dark-600 hover:bg-dark-500 text-white flex items-center justify-center transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-white text-lg">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-dark-500 hover:text-red-400 transition-colors"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-white mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-dark-400 truncate mr-3">{item.name} <span className="text-dark-500">×{item.quantity}</span></span>
                    <span className="text-white font-medium shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dark-700 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-dark-400">Subtotal</span>
                  <span className="text-white font-semibold">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-dark-400">Shipping</span>
                  <span className="text-green-400 font-semibold">Free</span>
                </div>
                <div className="border-t border-dark-700 pt-3 mt-3 flex justify-between items-center">
                  <span className="font-semibold text-white">Total</span>
                  <span className="font-display text-2xl font-bold text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-primary py-4 text-center block text-base font-bold"
              >
                Proceed to Checkout →
              </Link>

              <Link to="/products" className="w-full btn-secondary py-3 text-center block text-sm mt-3">
                ← Continue Shopping
              </Link>

              {/* WhatsApp note */}
              <div className="mt-5 p-3 bg-green-900/20 border border-green-800/30 rounded-xl">
                <p className="text-green-400 text-xs text-center flex items-center justify-center gap-1.5">
                  <span>💬</span>
                  Order will be sent via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
