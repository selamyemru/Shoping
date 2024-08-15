// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="mb-4">
              We specialize in traditional Ethiopian clothing, offering a wide range of authentic and beautifully crafted garments that celebrate our rich cultural heritage.
            </p>
            <Link to="/contact" className="text-gray-400 hover:text-gray-300">Contact Us</Link>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Links</h2>
            <ul>
              <li><Link to="/" className="text-gray-400 hover:text-gray-300">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-gray-300">Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-gray-300">About Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-gray-300">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-gray-300">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12h-2v10h-4V12h-2V9h2V7c0-2.21 1.79-4 4-4 1.04 0 2.08.14 3 .39v3.62h-2c-1.1 0-2 .9-2 2v2h4l-1 3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.212 0 3.575.012 4.847.07 1.267.06 2.398.52 3.295 1.417.897.897 1.357 2.028 1.417 3.295.058 1.272.07 1.635.07 4.847s-.012 3.575-.07 4.847c-.06 1.267-.52 2.398-1.417 3.295-.897.897-2.028 1.357-3.295 1.417-1.272.058-1.635.07-4.847.07s-3.575-.012-4.847-.07c-1.267-.06-2.398-.52-3.295-1.417-.897-.897-1.357-2.028-1.417-3.295-.058-1.272-.07-1.635-.07-4.847s.012-3.575.07-4.847c.06-1.267.52-2.398 1.417-3.295.897-.897 2.028-1.357 3.295-1.417 1.272-.058 1.635-.07 4.847-.07zm0-2.163C8.74 0 8.358.006 7.992.021 6.593.068 5.256.504 4.099 1.661 2.946 2.814 2.516 4.37 2.462 5.769.446 9.54.446 14.459 2.462 18.231c.054 1.399.484 2.954 1.437 4.007 1.201 1.195 2.63 1.848 4.124 1.877 1.271.028 1.654.032 4.419.032 2.765 0 3.148-.004 4.419-.032 1.494-.029 2.923-.682 4.124-1.877 1.002-1.054 1.342-2.608 1.437-4.007 2.016-3.772 2.016-8.691 0-12.463-.095-1.399-.435-2.812-1.437-4.007-1.143-1.157-2.48-1.593-4.124-1.661-1.688-.047-2.97-.064-4.847-.064zm-2.063 9.866c0 1.665 1.354 3.018 3.018 3.018 1.665 0 3.018-1.354 3.018-3.018 0-1.665-1.354-3.018-3.018-3.018-1.665 0-3.018 1.354-3.018 3.018zm6.036 0c0 .94-.764 1.704-1.704 1.704-.94 0-1.704-.764-1.704-1.704.94-.94 1.704-.764 1.704-.764.94 0 1.704.764 1.704 1.704zm-2.472-4.645c0 .866-.743 1.568-1.668 1.568-.867 0-1.568-.743-1.568-1.568 0-.867.743-1.568 1.568-1.568.925 0 1.668.743 1.668 1.568z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.8 10.8 0 01-3.128 1.306A5.538 5.538 0 0022.4 1.8a10.917 10.917 0 01-3.47 1.323 5.507 5.507 0 00-9.451 5.024A15.606 15.606 0 011.665 2.767a5.507 5.507 0 001.705 7.359A5.492 5.492 0 01.964 8.36v.068a5.507 5.507 0 004.418 5.401 5.535 5.535 0 01-2.49.095 5.52 5.52 0 005.146 3.82 11.045 11.045 0 01-6.852 2.356A11.12 11.12 0 010 19.054a15.539 15.539 0 008.388 2.463c10.057 0 15.545-8.327 15.545-15.545v-.705a11.044 11.044 0 002.675-2.806z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 border-t border-gray-700 mt-6">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
