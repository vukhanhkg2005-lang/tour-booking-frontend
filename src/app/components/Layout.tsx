import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Search, Heart, Phone, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (userMenuOpen) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white">VT</span>
              </div>
              <span className="text-xl text-blue-900">Vietnam Tours</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Home
              </Link>
              <Link 
                to="/tours" 
                className={`transition-colors ${isActive('/tours') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Tours
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/favorites" 
                className={`p-2 transition-colors ${isActive('/favorites') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                <Heart className="w-5 h-5" />
              </Link>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                    }}
                    className="px-5 py-2.5 text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Thông tin cá nhân
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-5 py-2.5 text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-lg transition-colors ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Home
              </Link>
              <Link 
                to="/tours" 
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-lg transition-colors ${isActive('/tours') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Tours
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-lg transition-colors ${isActive('/about') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-lg transition-colors ${isActive('/contact') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Contact
              </Link>
              <div className="pt-3 border-t border-gray-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="py-2.5 px-4 text-sm text-gray-600">
                      Xin chào, {user?.name}
                    </div>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2.5 px-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Thông tin cá nhân
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2.5 px-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2.5 px-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2.5 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white">VT</span>
                </div>
                <span className="text-xl">Vietnam Tours</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Discover the beauty of Vietnam with our carefully curated tours and experiences.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-400">+84 123 456 789</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</Link></li>
                <li><Link to="/tours" className="text-gray-400 hover:text-orange-500 transition-colors">Tours</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="mb-4">Popular Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/tours" className="text-gray-400 hover:text-orange-500 transition-colors">Ha Long Bay</Link></li>
                <li><Link to="/tours" className="text-gray-400 hover:text-orange-500 transition-colors">Hoi An</Link></li>
                <li><Link to="/tours" className="text-gray-400 hover:text-orange-500 transition-colors">Phu Quoc</Link></li>
                <li><Link to="/tours" className="text-gray-400 hover:text-orange-500 transition-colors">Da Nang</Link></li>
                <li><Link to="/tours" className="text-gray-400 hover:text-orange-500 transition-colors">Sapa</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Help Center</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Vietnam Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}