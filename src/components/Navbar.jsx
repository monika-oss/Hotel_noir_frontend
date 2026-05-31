import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import useCartStore from '../store/useCartStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cart, toggleCart } = useCartStore();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (location.pathname.startsWith('/admin')) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isLightPage = location.pathname !== '/';
  const textColor = 'text-white';
  
  const navBackground = scrolled 
    ? 'bg-black/95 backdrop-blur-md shadow-lg py-4'
    : (isLightPage ? 'bg-primary shadow-md py-4' : 'bg-transparent py-6');

  return (
    <nav className={`navbar fixed w-full z-40 transition-all duration-300 ${navBackground}`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading font-bold text-accent-gold">NOIR & GOLD</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`font-bold transition-colors ${
                location.pathname === link.path 
                  ? 'text-accent-gold' 
                  : `${textColor} hover:text-accent-gold`
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <button onClick={toggleCart} className={`relative text-2xl transition-colors ${textColor} hover:text-accent-gold`}>
            <FiShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-gold text-primary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          <Link to="/reservation" className="btn-gold btn-shine ml-4 shadow-md">Reserve</Link>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleCart} className={`relative text-2xl transition-colors ${textColor}`}>
            <FiShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-gold text-primary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
          <button className={`text-2xl ${textColor}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl py-6 shadow-2xl flex flex-col items-center space-y-6 border-t border-border-gold/50 overflow-hidden`}
          >
            {links.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-bold text-lg transition-colors ${location.pathname === link.path ? 'text-accent-gold' : `${textColor} hover:text-accent-gold`}`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: links.length * 0.05 }}
            >
              <Link to="/reservation" onClick={() => setIsOpen(false)} className="btn-gold btn-shine shadow-md">Reserve</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
