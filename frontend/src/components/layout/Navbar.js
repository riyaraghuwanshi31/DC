import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getRole, logout } from "../../utils/auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const role = getRole();
  const isAdmin = role === "admin";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const token = localStorage.getItem("token");

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/products?category=TVs', label: 'TVs' },
    { to: '/products?category=Laptops', label: 'Laptops' },
    { to: '/products?category=Earbuds', label: 'Earbuds' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen
        ? 'bg-dark-950/95 backdrop-blur-lg shadow-xl shadow-black/20 border-b border-dark-700'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-orange-400 flex items-center justify-center font-display font-bold text-white text-lg shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all">
              D
            </div>
            <span className="font-display font-bold text-xl text-white hidden sm:block">
              Dubey <span className="text-primary-400">Creations</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.to.split('?')[0] && link.to === location.pathname
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-dark-800 border border-dark-700 text-white placeholder-dark-400 text-sm rounded-xl pl-4 pr-10 py-2 w-52 focus:outline-none focus:border-primary-500 focus:w-64 transition-all duration-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-primary-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Admin link */}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1.5 text-dark-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-dark-800 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0..." />
                </svg>
                Admin
              </Link>
            )}

            {token ? (

              <button
                onClick={() => {
                  logout();
                  window.location.reload();
                }}
                className="hidden sm:flex items-center gap-1.5 text-red-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-dark-800 text-sm"
              >
                Logout
              </button>

            ) : (

              <div className="hidden sm:flex items-center gap-2">

                <Link
                  to="/login"
                  className="text-primary-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-dark-800 text-sm"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Signup
                </Link>

              </div>

            )}

            {/* Cart button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-400 text-dark-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-dark-700 py-4 animate-slide-up bg-dark-950/95 backdrop-blur-lg">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="input-field pr-10"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-xl transition-colors">
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-xl transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              {token ? (

                <button
                  onClick={() => {
                    logout();
                    window.location.reload();
                  }}
                  className="px-4 py-3 text-red-400 text-left hover:bg-dark-800 rounded-xl"
                >
                  Logout
                </button>

              ) : (

                <>
                  <Link
                    to="/login"
                    className="px-4 py-3 text-primary-400 hover:bg-dark-800 rounded-xl"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="px-4 py-3 text-white hover:bg-dark-800 rounded-xl"
                  >
                    Signup
                  </Link>
                </>

              )}
              {/* {token ? (
                <button
                  onClick={() => {
                    logout();
                    window.location.reload();
                  }}
                  className="px-4 py-3 text-red-400 text-left hover:bg-dark-800 rounded-xl"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-3 text-primary-400 hover:bg-dark-800 rounded-xl"
                >
                  Login
                </Link>
              )} */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
