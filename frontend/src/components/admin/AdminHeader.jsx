import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = () => {
  const { admin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 pt-2 pb-2 sm:pt-3 sm:pb-3">
      <div className="max-w-7xl mx-auto relative">
        {/* Main Navbar Container */}
        <div className="backdrop-blur-sm bg-white/30 rounded-full shadow-lg">
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 px-3 sm:px-4 md:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="https://cloudblitz.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <img 
                  src="/logo.webp" 
                  alt="CloudBlitz Logo" 
                  className="h-6 w-auto sm:h-7 md:h-8 lg:h-9 transition-all duration-300 ease-in-out"
                  style={{
                    filter: 'drop-shadow(0 0 0 transparent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 16px rgba(255, 168, 97, 0.5)) drop-shadow(0 0 10px rgba(255, 165, 92, 0.4)) drop-shadow(0 0 14px rgba(194, 134, 255, 0.4)) drop-shadow(0 0 18px rgba(192, 129, 255, 0.3))';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </a>
              <span className="hidden lg:inline-block ml-2 sm:ml-3 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap">
                Admin Dashboard
              </span>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
              <span className="hidden lg:block text-gray-700 text-xs sm:text-sm">
                Welcome, <strong className="hidden xl:inline">{admin?.name || 'Admin'}</strong>
              </span>
              <Link
                to="/"
                className="flex items-center justify-center space-x-1.5 sm:space-x-2 border-2 border-gray-300 text-gray-700 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-semibold hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                style={{ boxShadow: '0 4px 14px 0 rgba(251, 191, 36, 0.3), 0 -2px 8px 0 rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(251, 191, 36, 0.1)' }}
                title="Back to Home"
              >
                <FaHome className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Back to Home</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center justify-center space-x-1.5 sm:space-x-2 border-2 border-gray-300 text-gray-700 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-semibold hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                style={{ boxShadow: '0 4px 14px 0 rgba(251, 191, 36, 0.3), 0 -2px 8px 0 rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(251, 191, 36, 0.1)' }}
                title="Logout"
              >
                <FaSignOutAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaBars className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Positioned absolutely below navbar */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 backdrop-blur-lg bg-white/70 rounded-2xl shadow-lg overflow-hidden">
            <div className="px-4 py-3 space-y-2">
              <div className="text-center text-sm text-gray-700 mb-2">
                Welcome, <strong>{admin?.name || 'Admin'}</strong>
              </div>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                <FaHome />
                <span>Back to Home</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 w-full border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;

