import React from 'react';
import useCounter from '../hooks/useCounter';
import { motion } from 'framer-motion';

const StatCounter = ({ end, label, suffix = '' }) => {
  const [count, countRef] = useCounter(end, 1000);

  return (
    <motion.div 
      ref={countRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6 border border-border-gold rounded-lg bg-card/50 backdrop-blur-sm"
    >
      <div className="text-4xl md:text-5xl font-heading text-accent-gold mb-2 font-bold">
        {count}{suffix}
      </div>
      <div className="text-text-muted font-bold tracking-wider uppercase text-sm">
        {label}
      </div>
    </motion.div>
  );
};

export default StatCounter;
