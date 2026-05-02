import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-blue-500">
              CRUDApp
            </div>
          </div>

          {/* Center - Copyright */}
          <div className="flex-1 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} CRUDApp. All rights reserved.
            </p>
          </div>

          {/* Right Side - Site Links */}
          <div className="flex-shrink-0 flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;