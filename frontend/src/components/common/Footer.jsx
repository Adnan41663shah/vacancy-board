import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  ArrowRight,
  Briefcase,
  Users,
  Heart,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-orange-500/10 animate-gradient-x"></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.webp" 
                alt="CloudBlitz Logo" 
                className="h-8 w-auto sm:h-10"
              />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                CloudBlitz
              </span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Connecting talented professionals with inclusive workplaces. Find your dream job where diversity thrives.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-purple-500/50"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-purple-500/50"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-purple-500/50"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-purple-500/50"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group text-sm sm:text-base"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group text-sm sm:text-base"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Job Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group text-sm sm:text-base"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group text-sm sm:text-base"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group text-sm sm:text-base"
                >
                  <Briefcase className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Career Tips
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group text-sm sm:text-base"
                >
                  <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  For Employers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group text-sm sm:text-base"
                >
                  <Globe className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group text-sm sm:text-base"
                >
                  <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <a 
                  href="mailto:info@cloudblitz.in" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                >
                  info@cloudblitz.in
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">
                  123 Innovation Street<br />
                  Tech City, TC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm sm:text-base text-center md:text-left">
              © {currentYear} CloudBlitz. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline text-red-500 animate-pulse" />{' '}
              for diversity and inclusion.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;

