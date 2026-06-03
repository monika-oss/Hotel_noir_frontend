import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import useCartStore from '../store/useCartStore';

const MenuCard = ({ item, light = false }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart, toggleCart } = useCartStore();

  const handleAdd = () => {
    addToCart(item);
    if (!useCartStore.getState().isOpen) {
      toggleCart();
    }
  };

  return (
    <motion.div 
      whileHover="hover"
      className={`${light ? 'bg-white border-accent-gold/25' : 'bg-card border-border-gold/40'} rounded-lg overflow-hidden border shadow-lg flex flex-col h-full relative`}
      animate={{
        borderColor: light ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0.25)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)'
      }}
      whileHover={{
        y: -8,
        borderColor: '#D4AF37',
        boxShadow: light 
          ? '0 20px 25px -5px rgba(212, 175, 55, 0.1), 0 8px 10px -6px rgba(212, 175, 55, 0.1)'
          : '0 20px 25px -5px rgba(212, 175, 55, 0.15), 0 8px 10px -6px rgba(212, 175, 55, 0.15)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="h-48 overflow-hidden relative">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-0">
             <div className="w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <motion.img 
          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
          alt={item.title} 
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover relative z-10 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          variants={{
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-20" />
        
        {/* Subtle sliding gold shine overlay */}
        <motion.div 
          className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
          variants={{
            hover: { left: '150%' }
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        
        <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-md text-accent-gold text-xs font-bold px-3 py-1.5 rounded-full border border-border-gold/30">
          {item.category}
        </div>
      </div>
      <div className={`p-5 flex flex-col flex-1 ${light ? 'bg-white' : 'bg-gradient-to-b from-card to-secondary/30'}`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-xl font-heading font-bold tracking-wide ${light ? 'text-[#121212]' : 'text-white'}`}>{item.title}</h3>
          <span className="text-accent-gold font-heading font-bold text-lg ml-2">₹{(item.price).toFixed(2)}</span>
        </div>
        <p className={`text-sm line-clamp-2 mb-5 flex-1 leading-relaxed ${light ? 'text-neutral-600' : 'text-text-muted'}`}>{item.description}</p>
        
        <motion.button 
          onClick={handleAdd}
          className="w-full mt-auto py-2.5 border border-accent-gold text-accent-gold font-bold rounded flex items-center justify-center cursor-pointer overflow-hidden relative"
          variants={{
            hover: { 
              backgroundColor: '#D4AF37', 
              color: '#0a0a0a',
              scale: 1.02
            }
          }}
          transition={{ duration: 0.2 }}
        >
          <FiPlus className="mr-2 text-lg" /> Add to Order
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MenuCard;
