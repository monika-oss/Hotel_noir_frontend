import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUtensils } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import MenuCard from '../components/MenuCard';
import SkeletonCard from '../components/SkeletonCard';
import axios from '../api/axios';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(items.map(item => item.category))];

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/menu');
        setItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = items.filter(item => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <PageTransition>
      <div className="pt-24 pb-16 min-h-screen light-bg-warm text-gray-900">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-5xl font-heading mb-4">Our Menu</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our culinary creations, crafted with passion and the finest ingredients.</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
            {/* Category Tabs */}
            <div className="flex overflow-x-auto w-full lg:w-auto lg:flex-1 min-w-0 pb-2 space-x-2 md:space-x-4 no-scrollbar" data-aos="fade-right">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-bold transition-all duration-300 ${activeCategory === cat ? 'bg-accent-gold text-white' : 'bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-64 flex-shrink-0" data-aos="fade-left">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-full pl-10 pr-4 py-2 text-gray-900 focus:outline-none focus:border-accent-gold shadow-sm"
              />
              <FaSearch className="absolute left-4 top-3 text-gray-400" />
            </div>
          </div>

          {/* Menu Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {loading ? (
              [...Array(6)].map((_, i) => <SkeletonCard key={i} light={true} />)
            ) : filteredItems.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                      layout: { type: 'spring', stiffness: 250, damping: 25 }
                    }}
                  >
                    <MenuCard item={item} light={true} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full text-center py-20">
                <FaUtensils className="text-6xl text-text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-heading text-text-muted">No items found</h3>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Menu;
