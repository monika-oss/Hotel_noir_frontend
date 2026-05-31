import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from '../api/axios';
import { validateEmail, validatePhone } from '../utils/validators';

const ReservationForm = ({ light = false }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '18:00', guests: 2, tableType: 'Indoor', specialRequests: ''
  });
  const [loading, setLoading] = useState(false);

  const times = ['12:00', '12:30', '13:00', '13:30', '14:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) return toast.error('Invalid email address');
    if (!validatePhone(formData.phone)) return toast.error('Invalid phone number (must be at least 10 digits)');
    
    setLoading(true);
    try {
      await axios.post('/reservations', formData);
      const refId = 'NG-' + Math.floor(10000 + Math.random() * 90000);
      toast.success(`Booking Confirmed! Your Reference ID is ${refId}`, { duration: 6000, icon: '🎉' });
      setFormData({ name: '', email: '', phone: '', date: '', time: '18:00', guests: 2, tableType: 'Indoor', specialRequests: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe', required: true },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@example.com', required: true },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+1234567890', required: true },
  ];

  return (
    <form onSubmit={handleSubmit} className={`h-full flex flex-col justify-between p-6 md:p-10 rounded-2xl border shadow-lg ${light ? 'bg-white/95 border-accent-gold/25 text-[#121212]' : 'bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-text-primary'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field, idx) => (
          <motion.div key={field.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
            <label className={`block mb-2 font-bold ${light ? 'text-neutral-700' : 'text-text-muted'}`}>{field.label}</label>
            <input 
              type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange}
              placeholder={field.placeholder} required={field.required}
              className={`w-full backdrop-blur-sm border focus:outline-none focus:border-accent-gold transition-colors rounded px-4 py-3 ${light ? 'bg-neutral-50 border-neutral-300 text-[#121212]' : 'bg-secondary/60 border-border-gold/50 text-text-primary'}`}
            />
          </motion.div>
        ))}
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <label className={`block mb-2 font-bold ${light ? 'text-neutral-700' : 'text-text-muted'}`}>Date</label>
          <input 
            type="date" name="date" value={formData.date} onChange={handleChange} min={today} required
            className={`w-full backdrop-blur-sm border focus:outline-none focus:border-accent-gold transition-colors rounded px-4 py-3 ${light ? 'bg-neutral-50 border-neutral-300 text-[#121212]' : 'bg-secondary/60 border-border-gold/50 text-text-primary'}`}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <label className={`block mb-2 font-bold ${light ? 'text-neutral-700' : 'text-text-muted'}`}>Time</label>
          <select name="time" value={formData.time} onChange={handleChange} required className={`w-full backdrop-blur-sm border focus:outline-none focus:border-accent-gold transition-colors rounded px-4 py-3 ${light ? 'bg-neutral-50 border-neutral-300 text-[#121212]' : 'bg-secondary/60 border-border-gold/50 text-text-primary'}`}>
            {times.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <label className={`block mb-2 font-bold ${light ? 'text-neutral-700' : 'text-text-muted'}`}>Number of Guests</label>
          <select name="guests" value={formData.guests} onChange={handleChange} required className={`w-full backdrop-blur-sm border focus:outline-none focus:border-accent-gold transition-colors rounded px-4 py-3 ${light ? 'bg-neutral-50 border-neutral-300 text-[#121212]' : 'bg-secondary/80 border-border-gold/50 text-text-primary'}`}>
            {[...Array(20)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Person{i>0?'s':''}</option>)}
          </select>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
          <label className={`block mb-2 font-bold ${light ? 'text-neutral-700' : 'text-text-muted'}`}>Table Type</label>
          <select name="tableType" value={formData.tableType} onChange={handleChange} required className={`w-full backdrop-blur-sm border focus:outline-none focus:border-accent-gold transition-colors rounded px-4 py-3 ${light ? 'bg-neutral-50 border-neutral-300 text-[#121212]' : 'bg-secondary/80 border-border-gold/50 text-text-primary'}`}>
            <option value="Indoor">Indoor Dining</option>
            <option value="Outdoor">Outdoor Patio</option>
            <option value="Private">Private Room (+20%)</option>
          </select>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="mt-6">
        <label className={`block mb-2 font-bold ${light ? 'text-neutral-700' : 'text-text-muted'}`}>Special Requests</label>
        <textarea 
          name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="4" placeholder="Any dietary requirements or special occasions?"
          className={`w-full backdrop-blur-sm border focus:outline-none focus:border-accent-gold transition-colors rounded px-4 py-3 ${light ? 'bg-neutral-50 border-neutral-300 text-[#121212]' : 'bg-secondary/60 border-border-gold/50 text-text-primary'}`}
        ></textarea>
      </motion.div>

      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} type="submit" disabled={loading} className="w-full btn-gold btn-shine mt-8 text-lg py-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
        {loading ? 'Reserving...' : 'Confirm Reservation'}
      </motion.button>
    </form>
  );
};

export default ReservationForm;
