import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ name, role, text, rating = 5 }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=D4AF37&color=000&rounded=true&bold=true`;

  return (
    <div className="bg-card p-8 rounded-lg border border-border-gold shadow-[0_4px_20px_rgba(0,0,0,0.5)] mx-2 h-full flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
      <FaQuoteLeft className="absolute top-6 right-6 text-6xl text-white/5 group-hover:text-accent-gold/10 transition-colors duration-300" />
      
      <div className="relative z-10">
        <div className="flex text-accent-gold mb-6">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <p className="text-text-primary/90 italic mb-8 text-lg leading-relaxed">"{text}"</p>
      </div>
      
      <div className="flex items-center space-x-4 relative z-10 border-t border-border-gold/30 pt-6">
        <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full shadow-lg border-2 border-accent-gold/50" />
        <div>
          <h4 className="text-text-primary font-bold font-heading">{name}</h4>
          <p className="text-accent-gold text-sm tracking-wide">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
