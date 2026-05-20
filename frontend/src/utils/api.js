import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'https://dc-zbw5.onrender.com/api';

const API_URL = 'https://dc-ecoz.onrender.com/api';

console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Products API
export const getProducts = (params = {}) => api.get('/products', { params });
export const getFeaturedProducts = () => api.get('/products/featured');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Categories API
export const getCategories = () => api.get('/categories');

// Orders API
export const createOrder = (data) => api.post('/orders', data);
export const getOrders = () => api.get('/orders');

// WhatsApp order message builder
export const buildWhatsAppMessage = (customerInfo, cartItems, total) => {
  const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '919999999999';

  let message = `🛒 *New Order from Dubey Creation*\n\n`;
  message += `👤 *Customer Details*\n`;
  message += `Name: ${customerInfo.name}\n`;
  message += `Phone: ${customerInfo.phone}\n`;
  message += `Address: ${customerInfo.address}\n\n`;
  message += `📦 *Order Items*\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
  });

  message += `\n💰 *Total Amount: ₹${total.toLocaleString('en-IN')}*\n\n`;
  message += `Please confirm my order. Thank you! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export default api;
