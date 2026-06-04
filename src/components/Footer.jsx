import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="relative bg-gradient-to-b from-secondary to-[#050505] pt-20 pb-8 border-t border-border-gold/15 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-accent-gold/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-heading text-accent-gold font-bold tracking-wider">NOIR & GOLD</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Experience the gold standard of modern dining. Where culinary artistry converges with a sleek, luxurious atmosphere.
            </p>
            <div className="flex space-x-3 pt-2">
              {[
                { icon: <FaFacebookF />, url: '#' },
                { icon: <FaInstagram />, url: '#' },
                { icon: <FaTwitter />, url: '#' }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  href={item.url} 
                  whileHover={{ scale: 1.1, backgroundColor: '#D4AF37', color: '#0a0a0a' }}
                  className="w-10 h-10 rounded-full bg-card/60 backdrop-blur border border-white/5 flex items-center justify-center text-accent-gold transition-colors duration-300"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading text-white font-bold mb-5 tracking-wide">Quick Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Menu', path: '/menu' },
                { name: 'Reservations', path: '/reservation' },
                { name: 'About Us', path: '/about' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-text-muted text-sm hover:text-accent-gold hover:pl-1 transition-all duration-300 flex items-center"
                  >
                    <span className="opacity-0 hover:opacity-100 mr-1.5 text-accent-gold text-xs transition-opacity">•</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading text-white font-bold mb-5 tracking-wide">Contact Details</h4>
            <ul className="space-y-3 text-text-muted text-sm">
              <li>123 White Town Street</li>
              <li>Pondicherry, PY 605001</li>
              <li className="hover:text-accent-gold transition-colors">+91 98765 43210</li>
              <li className="hover:text-accent-gold transition-colors">info@noirandgold.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading text-white font-bold mb-5 tracking-wide">Opening Hours</h4>
            <ul className="space-y-3 text-text-muted text-sm">
              <li className="flex justify-between"><span>Mon - Thu</span> <span className="text-white font-bold">5:00 PM - 10:00 PM</span></li>
              <li className="flex justify-between"><span>Fri - Sat</span> <span className="text-white font-bold">5:00 PM - 11:30 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="text-white font-bold">4:00 PM - 9:00 PM</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-text-muted text-xs gap-4">
          <p>&copy; {new Date().getFullYear()} Noir & Gold. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-accent-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
