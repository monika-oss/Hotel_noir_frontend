import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Ambient luxury glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-accent-gold/20 blur-[100px] pointer-events-none"
      />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Main Brand Name with Staggered Fade Up */}
        <div className="flex items-center space-x-3 mb-6 overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-heading text-white tracking-widest"
          >
            NOIR
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-heading text-accent-gold italic"
          >
            &
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-heading text-white tracking-widest"
          >
            GOLD
          </motion.span>
        </div>
        
        {/* Elegant Expanding Gold Line */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent w-full max-w-[250px] md:max-w-[350px]"
        />
        
        {/* Subtitle fading in */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 uppercase text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-gold/80"
        >
          Curating The Experience
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
