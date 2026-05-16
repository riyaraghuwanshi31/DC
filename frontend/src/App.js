import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import UserLoginPage from './pages/UserLoginPage';
import AdminRoute from "./components/AdminRoute";
import AdminLoginPage from './pages/AdminLoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-dark-950 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* <Route path="/login" element={<LoginPage />} /> */}

              <Route path="/login" element={<UserLoginPage />} />

              <Route path="/admin-login" element={<AdminLoginPage />} />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                  <div className="text-8xl mb-6">404</div>
                  <h2 className="font-display text-3xl font-bold text-white mb-3">Page not found</h2>
                  <p className="text-dark-400 mb-8">The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn-primary px-8 py-3.5">Go Home</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '12px' },
          }}
        />
      </Router>
    </CartProvider>
  );
}

export default App;
