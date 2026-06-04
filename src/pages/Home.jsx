import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { 
  FaUtensils, 
  FaStar, 
  FaWineGlassAlt, 
  FaConciergeBell, 
  FaQuoteLeft, 
  FaCalendarAlt, 
  FaAward, 
  FaUsers 
} from 'react-icons/fa';
import CountUpPkg from 'react-countup';
const CountUp = CountUpPkg.default || CountUpPkg;
import PageTransition from '../components/PageTransition';
import MenuCard from '../components/MenuCard';
import TestimonialCard from '../components/TestimonialCard';
import ReservationForm from '../components/ReservationForm';
import CanvasParticles from '../components/CanvasParticles';
import axios from '../api/axios';

const Home = () => {
  const [featuredMenu, setFeaturedMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  


  useEffect(() => {
    // Initialize Animate On Scroll
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: false,
      mirror: false
    });

    // Fetch featured menu
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('/menu?featured=true');
        setFeaturedMenu(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured menu:', error);
      }
    };
    fetchFeatured();
  }, []);

  const features = [
    { icon: <FaUtensils className="text-3xl" />, title: 'Premium Ingredients', desc: 'Locally sourced, organic, and sustainable produce of the highest grade.' },
    { icon: <FaStar className="text-3xl" />, title: 'Michelin Culinary Chefs', desc: 'Masters of gastronomy crafting unforgettable sensory menus.' },
    { icon: <FaWineGlassAlt className="text-3xl" />, title: 'Luxurious Ambiance', desc: 'Intimate gold lighting, deep velvet accents, and premium acoustics.' },
    { icon: <FaConciergeBell className="text-3xl" />, title: 'Anticipatory Service', desc: 'Attentive personal hosts executing your booking parameters flawlessly.' }
  ];

  const testimonials = [
    { name: 'Sarah Jenkins', role: 'Michelin Guide Inspector', text: 'Noir & Gold transcends standard dining; it is a masterful performance of flavor, texture, and aesthetic grace.' },
    { name: 'Michael Chen', role: 'Regular Patron', text: 'The Wagyu Carpaccio is simply out of this world. Every dinner here feels like an exclusive private event.' },
    { name: 'Emma Watson', role: 'Culinary Designer', text: 'Impeccable service, stunning interior glasswork, and dishes that leave you speechless.' },
    { name: 'David Miller', role: 'Executive Chef Partner', text: 'An incredible kitchen operation. The respect for ingredients and sensory design is unmatched.' }
  ];

  return (
    <PageTransition>
      <div className="relative overflow-hidden bg-primary min-h-screen">
        
        {/* ================= BACKGROUND GLOWS & FLOATING BLOBS ================= */}
        <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-[120px] animate-pulse-slow pointer-events-none z-0" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-[140px] animate-float-slow pointer-events-none z-0" />
        <div className="absolute bottom-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-accent-gold/5 blur-[100px] animate-pulse-slow pointer-events-none z-0" />

        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[8%] text-accent-gold/20 text-4xl hidden lg:block z-10"
        >
          <FaWineGlassAlt />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[45%] right-[6%] text-accent-gold/15 text-5xl hidden lg:block z-10"
        >
          <FaUtensils />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[25%] left-[5%] text-accent-gold/10 text-4xl hidden lg:block z-10"
        >
          <FaConciergeBell />
        </motion.div>

        {/* Floating Water Droplets / Glowing Micro Elements */}
        <div className="absolute top-[30%] left-[25%] w-2.5 h-2.5 rounded-full bg-accent-gold/30 blur-[1px] animate-float-fast pointer-events-none" />
        <div className="absolute top-[75%] right-[30%] w-3 h-3 rounded-full bg-hover-gold/20 blur-[1px] animate-float-medium pointer-events-none" />
        <div className="absolute top-[12%] right-[20%] w-2 h-2 rounded-full bg-white/40 blur-[0.5px] animate-float-slow pointer-events-none" />

        {/* ================= 1. HERO SECTION ================= */}
        <section className="relative h-screen max-h-[850px] lg:max-h-none flex items-center justify-center pt-20 pb-8 px-4 md:px-8 lg:px-16 overflow-hidden z-10">
          {/* Smooth Canvas Gold Particles background */}
          <CanvasParticles />

          <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="md:col-span-7 text-left space-y-4 lg:space-y-5 max-w-2xl">
              <div 
                data-aos="fade-right"
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></span>
                <span>The Gold Standard of Fine Dining</span>
              </div>
              
              <h1 
                data-aos="fade-right" 
                data-aos-delay="100"
                className="text-4xl md:text-5xl lg:text-7xl font-heading leading-tight tracking-tight text-white"
              >
                Culinary Artistry <br />
                <span className="gold-gradient">Redefined.</span>
              </h1>
              
              <p 
                data-aos="fade-right" 
                data-aos-delay="200"
                className="text-base md:text-lg lg:text-xl text-text-muted font-body leading-relaxed"
              >
                Indulge in a premium gastronomic ecosystem. Noir & Gold merges Michelin-level ingredient precision with an atmosphere of absolute luxury.
              </p>
              
              <div 
                data-aos="fade-right" 
                data-aos-delay="300"
                className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 pt-2"
              >
                <Link 
                  to="/reservation" 
                  className="btn-gold btn-shine w-full sm:w-auto text-center px-8 py-3.5 rounded font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-transform duration-300 hover:scale-105"
                >
                  Reserve A Table
                </Link>
                <Link 
                  to="/menu" 
                  className="btn-outline w-full sm:w-auto text-center px-8 py-3.5 rounded font-bold hover:scale-105 transition-transform duration-300"
                >
                  Explore Menu
                </Link>
              </div>

              {/* Review badge */}
              <div 
                data-aos="fade-up" 
                data-aos-delay="400"
                className="flex items-center space-x-4 pt-4 border-t border-white/5"
              >
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-primary" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Reviewer" />
                  <img className="w-8 h-8 rounded-full border-2 border-primary" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Reviewer" />
                  <img className="w-8 h-8 rounded-full border-2 border-primary" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Reviewer" />
                </div>
                <div className="text-xs text-text-muted">
                  <div className="flex text-accent-gold space-x-0.5">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p className="mt-0.5">Loved by <span className="text-white font-bold">10,000+</span> regular guests</p>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Hero Product Showcase */}
            <div 
              data-aos="fade-left"
              data-aos-delay="200"
              className="md:col-span-5 flex justify-center relative hidden md:flex"
            >
              <div className="relative w-full max-w-[380px] max-h-[calc(100vh-180px)] aspect-[4/5] rounded-2xl overflow-hidden glass-gold-panel p-3 group">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent z-10 pointer-events-none" />
                
                {/* Float animated image wrapper */}
                <motion.div 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full rounded-xl overflow-hidden relative"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                    alt="Signature Dining Experience" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                </motion.div>

                {/* Floating overlay card */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 z-20 glass-gold-panel p-4 rounded-xl backdrop-blur-xl border border-white/10"
                >
                  <h4 className="font-heading text-lg text-white font-bold mb-1">A Taste of Gold</h4>
                  <p className="text-xs text-text-muted">Curated plating paired with boutique reserve wines.</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-accent-gold font-bold text-sm">$48.00</span>
                    <Link to="/menu" className="text-xs text-white font-bold hover:text-accent-gold transition-colors">Order Now →</Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Elegant Dark-to-Light Transition Section */}
        <div className="relative z-10">
          <div className="h-6 bg-gradient-to-b from-primary to-[#1a1815]" />
          <div className="h-6 bg-gradient-to-b from-[#1a1815] to-[#f5f2ec]" />
        </div>

        {/* ================= 2. FEATURES / SERVICES SECTION ================= */}
        <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 light-bg-warm light-texture-dots relative z-10 overflow-hidden">
          {/* Warm glowing orbs */}
          <div className="absolute top-[-10%] left-[5%] w-[450px] h-[450px] rounded-full bg-accent-gold/8 blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent-gold/6 blur-[100px] pointer-events-none z-0" />
          
          {/* Floating gold icons in light section */}
          <motion.div 
            animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[8%] text-accent-gold/15 text-3xl hidden lg:block z-[2]"
          >
            <FaStar />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[20%] left-[6%] text-accent-gold/12 text-4xl hidden lg:block z-[2]"
          >
            <FaAward />
          </motion.div>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] border-t-2 border-r-2 border-accent-gold/10 rounded-tr-3xl pointer-events-none z-[2]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] border-b-2 border-l-2 border-accent-gold/10 rounded-bl-3xl pointer-events-none z-[2]" />

          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest" data-aos="fade-up">Hospitality System</h2>
              <h3 className="text-4xl md:text-5xl font-heading text-[#121212]" data-aos="fade-up" data-aos-delay="100">Engineering Fine Dining</h3>
              <div className="w-20 h-1 bg-accent-gold mx-auto" data-aos="fade-up" data-aos-delay="200" />
              <p className="text-neutral-600 text-base leading-relaxed pt-2" data-aos="fade-up" data-aos-delay="300">
                Our features represent the synthesis of precision culinary craftsmanship and modern digital convenience, giving you an elite dining journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                  className="glass-gold-panel-light p-8 rounded-2xl flex flex-col group hover:-translate-y-2"
                >
                  <div className="text-accent-gold mb-6 bg-accent-gold/10 w-14 h-14 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-primary transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-heading font-bold text-[#121212] mb-3 tracking-wide">{feature.title}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed flex-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gold ornamental divider */}
        <div className="ornament-divider bg-[#f5f2ec] relative z-10 px-4">
          <span className="ornament-icon">◆</span>
        </div>

        {/* ================= 3. PRODUCT SECTION (SIGNATURE DISHES) ================= */}
        <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 relative z-10 light-bg-cream light-texture-dots overflow-hidden">
          {/* Warm glowing orbs */}
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-gold/6 blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
          <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-accent-gold/8 blur-[100px] pointer-events-none z-0" />
          
          {/* Floating decorative icon */}
          <motion.div 
            animate={{ y: [0, -18, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[10%] left-[5%] text-accent-gold/12 text-4xl hidden lg:block z-[2]"
          >
            <FaWineGlassAlt />
          </motion.div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-[150px] h-[150px] border-t-2 border-l-2 border-accent-gold/10 rounded-tl-3xl pointer-events-none z-[2]" />
          <div className="absolute bottom-0 right-0 w-[150px] h-[150px] border-b-2 border-r-2 border-accent-gold/10 rounded-br-3xl pointer-events-none z-[2]" />

          <div className="container mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="text-left space-y-3">
                <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest" data-aos="fade-right">Signature Dishes</h2>
                <h3 className="text-4xl md:text-5xl font-heading text-[#121212]" data-aos="fade-right" data-aos-delay="100">Our Culinary Masterpieces</h3>
                <div className="w-20 h-1 bg-accent-gold" data-aos="fade-right" data-aos-delay="200" />
              </div>
              <div data-aos="fade-left" className="flex flex-wrap gap-2">
                {['All', 'Mains', 'Desserts', 'Beverages'].map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                      activeCategory === cat 
                        ? 'bg-accent-gold text-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                        : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredMenu
                .filter(item => activeCategory === 'All' || item.category === activeCategory)
                .slice(0, 4)
                .map((item, idx) => (
                  <div key={item._id} data-aos="fade-up" data-aos-delay={idx * 100}>
                    <MenuCard item={item} light={true} />
                  </div>
                ))}
            </div>

            <div className="text-center mt-14" data-aos="zoom-in">
              <Link to="/menu" className="btn-outline inline-block px-10 py-4 font-bold rounded">
                View Our Complete Menu
              </Link>
            </div>
          </div>
        </section>

        {/* Gold ornamental divider */}
        <div className="ornament-divider light-bg-warm relative z-10 px-4">
          <span className="ornament-icon">◆</span>
        </div>

        {/* ================= 4. STATISTICS SECTION ================= */}
        <section className="py-12 lg:py-20 light-bg-warm relative z-10 overflow-hidden">
          {/* Floating backdrop decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-accent-gold/8 blur-[80px] pointer-events-none animate-pulse-slow" />

          {/* Floating icon */}
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[8%] text-accent-gold/12 text-3xl hidden lg:block z-[2]"
          >
            <FaCalendarAlt />
          </motion.div>

          <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div 
                data-aos="zoom-in"
                data-aos-delay="0"
                className="text-center glass-gold-panel-light p-8 rounded-2xl flex flex-col items-center group hover:border-accent-gold/45"
              >
                <div className="text-accent-gold text-3xl mb-4 bg-accent-gold/10 w-12 h-12 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <FaAward />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#121212] mb-2">
                  <CountUp end={15} duration={1.2} enableScrollSpy />+
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-neutral-500">Years of Legacy</div>
              </div>

              <div 
                data-aos="zoom-in"
                data-aos-delay="150"
                className="text-center glass-gold-panel-light p-8 rounded-2xl flex flex-col items-center group hover:border-accent-gold/45"
              >
                <div className="text-accent-gold text-3xl mb-4 bg-accent-gold/10 w-12 h-12 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <FaUtensils />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#121212] mb-2">
                  <CountUp end={55} duration={1.2} enableScrollSpy />+
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-neutral-500">Artisan Dishes</div>
              </div>

              <div 
                data-aos="zoom-in"
                data-aos-delay="300"
                className="text-center glass-gold-panel-light p-8 rounded-2xl flex flex-col items-center group hover:border-accent-gold/45"
              >
                <div className="text-accent-gold text-3xl mb-4 bg-accent-gold/10 w-12 h-12 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <FaUsers />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#121212] mb-2">
                  <CountUp end={12000} duration={1.5} enableScrollSpy separator="," />+
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-neutral-500">Happy Diners</div>
              </div>

              <div 
                data-aos="zoom-in"
                data-aos-delay="450"
                className="text-center glass-gold-panel-light p-8 rounded-2xl flex flex-col items-center group hover:border-accent-gold/45"
              >
                <div className="text-accent-gold text-3xl mb-4 bg-accent-gold/10 w-12 h-12 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <FaStar />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#121212] mb-2">
                  <CountUp end={28} duration={1.2} enableScrollSpy />+
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-neutral-500">Global Honors</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gold ornamental divider */}
        <div className="ornament-divider light-bg-cream relative z-10 px-4">
          <span className="ornament-icon">◆</span>
        </div>

        {/* ================= 5. TESTIMONIALS SECTION (SLIDER) ================= */}
        <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 relative z-10 overflow-hidden light-bg-cream light-texture-dots light-section">
          {/* Warm glowing orbs */}
          <div className="absolute top-[-10%] left-[20%] w-[450px] h-[450px] rounded-full bg-accent-gold/6 blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
          <div className="absolute bottom-[-15%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent-gold/5 blur-[100px] pointer-events-none z-0" />

          {/* Floating icons */}
          <motion.div 
            animate={{ y: [0, -14, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[25%] right-[6%] text-accent-gold/10 text-4xl hidden lg:block z-[2]"
          >
            <FaQuoteLeft />
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-[180px] h-[180px] border-t-2 border-r-2 border-accent-gold/10 rounded-tr-3xl pointer-events-none z-[2]" />
          <div className="absolute bottom-0 left-0 w-[180px] h-[180px] border-b-2 border-l-2 border-accent-gold/10 rounded-bl-3xl pointer-events-none z-[2]" />

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest" data-aos="fade-up">Reviews</h2>
              <h3 className="text-4xl font-heading text-[#121212]" data-aos="fade-up" data-aos-delay="100">Feedback From Gastronomes</h3>
              <div className="w-20 h-1 bg-accent-gold mx-auto" data-aos="fade-up" data-aos-delay="200" />
            </div>

            <div data-aos="zoom-in" className="glass-gold-panel-light p-8 md:p-16 rounded-3xl relative overflow-hidden shadow-xl">
              <FaQuoteLeft className="absolute top-8 left-8 text-accent-gold/15 text-8xl pointer-events-none" />
              
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="testimonial-swiper pb-10"
              >
                {testimonials.map((test, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="text-center space-y-6">
                      <p className="text-lg md:text-2xl text-neutral-800 font-body italic leading-relaxed max-w-3xl mx-auto">
                        "{test.text}"
                      </p>
                      <div>
                        <h4 className="text-lg font-heading font-bold text-accent-gold">{test.name}</h4>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">{test.role}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Gold ornamental divider */}
        <div className="ornament-divider light-bg-warm relative z-10 px-4">
          <span className="ornament-icon">◆</span>
        </div>

        {/* ================= 6. CONTACT & RESERVATION SECTION ================= */}
        <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 light-bg-warm light-texture-dots relative z-10 overflow-hidden">
          {/* Warm glowing orbs */}
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-gold/8 blur-[130px] pointer-events-none z-0 animate-pulse-slow" />
          <div className="absolute bottom-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-accent-gold/6 blur-[110px] pointer-events-none z-0" />

          {/* Floating icons */}
          <motion.div 
            animate={{ y: [0, 12, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[15%] right-[5%] text-accent-gold/10 text-3xl hidden lg:block z-[2]"
          >
            <FaConciergeBell />
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-[200px] h-[200px] border-t-2 border-l-2 border-accent-gold/10 rounded-tl-3xl pointer-events-none z-[2]" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] border-b-2 border-r-2 border-accent-gold/10 rounded-br-3xl pointer-events-none z-[2]" />

          <div className="container mx-auto relative z-10">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" data-aos="fade-up">
              <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest">Reserve Seating</h2>
              <h3 className="text-4xl md:text-5xl font-heading text-[#121212]">Secure Dinner Placement</h3>
              <div className="w-20 h-1 bg-accent-gold mx-auto" />
              <p className="text-neutral-600 text-sm leading-relaxed pt-2">
                Confirm your table configuration in real-time. Private VIP rooms, culinary dietary custom settings, and courtyard tables can be specified below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: Glassmorphic Reservation Form */}
              <div className="lg:col-span-7 flex flex-col h-full" data-aos="fade-right">
                <ReservationForm light={true} />
              </div>

              {/* Right Column: Contact Cards & Clean map */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8 h-full" data-aos="fade-left">
                <div className="glass-gold-panel-light p-8 rounded-2xl space-y-6 flex-1 flex flex-col justify-center">
                  <h4 className="text-2xl font-heading font-bold text-[#121212] mb-4">Operations Center</h4>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-accent-gold text-xl bg-accent-gold/10 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      <FaWineGlassAlt />
                    </div>
                    <div>
                      <h5 className="font-bold text-[#121212] text-sm">Physical Address</h5>
                      <p className="text-neutral-600 text-xs mt-1">123 White Town Street, Pondicherry, PY 605001</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-accent-gold text-xl bg-accent-gold/10 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      <FaConciergeBell />
                    </div>
                    <div>
                      <h5 className="font-bold text-[#121212] text-sm">Operations Hotline</h5>
                      <p className="text-neutral-600 text-xs mt-1">+91 98765 43210 | bookings@noirandgold.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-accent-gold text-xl bg-accent-gold/10 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <h5 className="font-bold text-[#121212] text-sm">Opening Schedule</h5>
                      <p className="text-neutral-600 text-xs mt-1">Monday - Sunday: 5:00 PM - 11:30 PM (Kitchen shuts 11:00 PM)</p>
                    </div>
                  </div>
                </div>

                {/* Styled Map panel */}
                <div className="glass-gold-panel-light p-3 rounded-2xl flex-1 relative group overflow-hidden min-h-[300px]">
                  <iframe 
                    src="https://maps.google.com/maps?q=White%20Town,%20Pondicherry&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Operations Location Map"
                    className="rounded-xl"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;

