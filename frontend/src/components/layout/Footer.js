import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/DC Logo WithoutBG.png";


const Footer = () => {
  // const categories = ['TVs', 'Earbuds', 'Batteries', 'Laptops', 'Smartwatches', 'Accessories'];
  const categories = ['TVs', 'Accessories'];


  return (
    <footer className="bg-dark-950 border-t border-dark-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
                      <Link to="/" className="flex items-center">
                        <img
                          src={logo}
                          alt="Dubey Creations Logo"
                          className="h-12 w-auto object-contain"
                        />
                      </Link>
            {/* <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-orange-400 flex items-center justify-center font-display font-bold text-light-900 text-lg">
                D
              </div>
              <span className="font-display font-bold text-xl text-light-900">
                Dubey <span className="text-primary-400">Creation</span>
              </span>
            </Link> */}
            <p className="text-dark-400 text-sm leading-relaxed">
              <br/>
              Your trusted destination for premium electronic gadgets. Quality products at unbeatable prices.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://wa.me/918770726077" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-green-600 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.354-1.498A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.193-1.369l-.371-.22-3.794.895.938-3.687-.242-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-light-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link to={`/products?category=${cat}`}
                    className="text-dark-400 hover:text-primary-400 text-sm transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-light-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/cart', label: 'Cart' },
                { to: '/admin', label: 'Admin Panel' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-dark-400 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-light-900 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-dark-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 8770726077
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                dubeycreations002@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                  G-332, Silicon city, Indore, Madhya Pradesh, India <li/>
                  D2 - 102, Sita Vallabh Market, Khargone, Madhya Pradesh, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-dark-500 text-sm">© 2026 Dubey Creations. All rights reserved. Crafted with ❤️ by Team <a href="https://the-dev-era-ka37.vercel.app" target="_blank" rel="noopener noreferrer">TheDevEra</a>.</p>
          <p className="text-dark-500 text-sm">Orders easily via <span className="text-green-400 font-medium">WhatsApp.</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
