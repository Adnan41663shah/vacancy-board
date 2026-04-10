import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onAdminClick }) => {
  const { admin, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 pt-2 pb-2 sm:pt-3 sm:pb-3">
      <div className="max-w-7xl mx-auto relative">
        {/* Main Navbar Container */}
        <div className="backdrop-blur-sm bg-white/30 rounded-full shadow-lg">
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 px-3 sm:px-4 md:px-6 lg:px-8">
            {/* Brand */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent"
              >
                Job Board
              </Link>
            </div>

            {/* Desktop Admin Button */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <Link
                  to="/admin"
                  className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold hover:from-orange-600 hover:to-purple-700 transition-all text-xs sm:text-sm"
                  style={{ boxShadow: '0 4px 14px 0 rgba(251, 191, 36, 0.4), 0 -2px 8px 0 rgba(251, 191, 36, 0.2), 0 0 0 1px rgba(251, 191, 36, 0.1)' }}
                >
                  <FaUserShield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              ) : (
                <button
                  onClick={onAdminClick}
                  className="flex items-center space-x-1.5 sm:space-x-2 border-2 border-gray-300 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                  style={{ boxShadow: '0 4px 14px 0 rgba(251, 191, 36, 0.3), 0 -2px 8px 0 rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(251, 191, 36, 0.1)' }}
                  aria-label="Admin login"
                >
                  <FaUserShield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Admin Login</span>
                </button>
              )}
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
              {isAuthenticated ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white px-4 py-3 rounded-full font-semibold text-sm transition-all hover:from-orange-600 hover:to-purple-700"
                >
                  <FaUserShield />
                  <span>Admin Dashboard</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    onAdminClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors text-sm"
                >
                  <FaUserShield />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

