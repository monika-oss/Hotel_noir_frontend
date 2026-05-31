import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import StatCounter from '../components/StatCounter';

const About = () => {
  const chefs = [
    { name: 'Alexandre Dubois', title: 'Executive Chef', spec: 'French Classics', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80' },
    { name: 'Maria Rossi', title: 'Head Pastry Chef', spec: 'Artisan Desserts', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80' },
    { name: 'Kenji Sato', title: 'Sous Chef', spec: 'Asian Fusion', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80' }
  ];

  return (
    <PageTransition>
      <div className="pt-24 pb-16 light-bg-warm text-gray-900">
        {/* Story Section */}
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h1 className="text-5xl font-heading mb-6">Our Story</h1>
              <div className="w-20 h-1 bg-accent-gold mb-8"></div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Founded in 2010, Noir & Gold started as a humble dream by Chef Alexandre Dubois to bring authentic fine dining to the heart of the city. What began as an intimate 10-table bistro has blossomed into an award-winning culinary destination.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our mission is simple: to provide an unforgettable sensory experience. We believe that great food starts with exceptional ingredients. We partner with local farmers and sustainable fisheries to ensure every dish we serve is fresh, ethical, and bursting with flavor.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The "Noir" in our name represents the sleek, modern elegance of our ambiance, while the "Gold" symbolizes the premium quality of our ingredients and the golden standard of our service.
              </p>
            </div>
            <div className="relative" data-aos="fade-left" data-aos-delay="200">
              <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80" alt="Restaurant Story" className="rounded-lg shadow-2xl border border-border-gold" />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg border border-accent-gold shadow-xl hidden md:block">
                <h3 className="text-3xl font-heading text-accent-gold mb-1">15+</h3>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white border-y border-border-gold my-16 shadow-sm" data-aos="fade-up">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter end={15} suffix="+" label="Years Experience" />
            <StatCounter end={50} suffix="+" label="Menu Items" />
            <StatCounter end={10000} suffix="+" label="Happy Guests" />
            <StatCounter end={25} suffix="+" label="Awards Won" />
          </div>
        </section>

        {/* Chefs Section */}
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest mb-2">The Masters</h2>
            <h3 className="text-4xl font-heading">Meet The Chefs</h3>
            <div className="w-24 h-1 bg-accent-gold mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef, i) => (
              <div key={i} className="group" data-aos="fade-up" data-aos-delay={i * 150}>
                <div className="overflow-hidden rounded-lg mb-6 relative">
                  <img src={chef.image} alt={chef.name} className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-0 w-full flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-accent-gold hover:bg-accent-gold hover:text-white transition-colors"><FaFacebookF /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-accent-gold hover:bg-accent-gold hover:text-white transition-colors"><FaTwitter /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-accent-gold hover:bg-accent-gold hover:text-white transition-colors"><FaInstagram /></a>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-heading font-bold mb-1">{chef.name}</h4>
                  <p className="text-accent-gold font-bold mb-2">{chef.title}</p>
                  <p className="text-gray-600 text-sm">{chef.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
