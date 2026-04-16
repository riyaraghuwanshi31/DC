import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder, buildWhatsAppMessage } from '../utils/api';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-6">🛒</div>
        <h2 className="font-display text-3xl font-bold text-white mb-3">Nothing to checkout</h2>
        <p className="text-dark-400 mb-8">Add items to your cart first.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!form.address.trim()) errs.address = 'Address is required';
    else if (form.address.trim().length < 15) errs.address = 'Please enter a more complete address';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      // Save to backend
      await createOrder({
        customerName: form.name,
        phone: form.phone,
        address: form.address,
        items: items.map((i) => ({
          productId: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        totalAmount: totalPrice,
      });

      // Build & open WhatsApp
      const waUrl = buildWhatsAppMessage(
        { name: form.name, phone: form.phone, address: form.address },
        items,
        totalPrice
      );

      toast.success('Order placed! Redirecting to WhatsApp...', {
        duration: 3000,
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' },
        iconTheme: { primary: '#22c55e', secondary: '#fff' },
      });

      clearCart();
      setTimeout(() => {
        window.open(waUrl, '_blank');
        navigate('/');
      }, 1000);
    } catch (err) {
      toast.error('Something went wrong. Please try again.', {
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title mb-2">Checkout</h1>
          <p className="text-dark-400">Fill in your details to place the order via WhatsApp</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handlePlaceOrder}>
              <div className="card p-6 mb-6">
                <h2 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center text-sm">1</span>
                  Your Details
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Dubey"
                      className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1.5">WhatsApp / Mobile Number *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 text-sm">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        maxLength={10}
                        className={`input-field pl-12 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1.5">Delivery Address *</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House/Flat No., Street, Area, City, State, PIN Code"
                      rows={4}
                      className={`input-field resize-none ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* WhatsApp info card */}
              <div className="card p-5 mb-6 border-green-800/30 bg-green-900/10">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💬</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">How it works</h3>
                    <p className="text-dark-300 text-sm leading-relaxed">
                      After clicking <strong className="text-white">"Place Order via WhatsApp"</strong>, WhatsApp will open with your complete order details pre-filled. Simply send that message to complete your order!
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 disabled:bg-green-900 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base transition-all active:scale-95 shadow-lg shadow-green-900/30"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.354-1.498A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.193-1.369l-.371-.22-3.794.895.938-3.687-.242-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Place Order via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="card p-6 sticky top-24">
              <h2 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center text-sm">2</span>
                Order Summary
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-5">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-dark-700 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200'; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium line-clamp-2">{item.name}</p>
                      <p className="text-dark-400 text-xs mt-0.5">Qty: {item.quantity}</p>
                      <p className="text-primary-400 text-sm font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dark-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-400">Subtotal</span>
                  <span className="text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-400">Delivery</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-dark-700">
                  <span className="text-white">Total</span>
                  <span className="text-white text-xl">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link to="/cart" className="w-full btn-secondary py-3 text-center block text-sm mt-5">
                ← Edit Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
