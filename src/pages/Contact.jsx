import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import axios from '../api/axios';
import { validateEmail } from '../utils/validators';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) return toast.error('Invalid email address');
    
    setLoading(true);
    try {
      await axios.post('/contact', formData);
      toast.success('Message Sent! We will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const infoCards = [
    { icon: <FaMapMarkerAlt />, title: 'Address', detail: '123 Culinary Blvd, New York, NY 10001' },
    { icon: <FaPhoneAlt />, title: 'Phone', detail: '+1 (555) 123-4567' },
    { icon: <FaEnvelope />, title: 'Email', detail: 'info@noirandgold.com' },
    { icon: <FaClock />, title: 'Hours', detail: 'Mon-Sun: 5:00 PM - 11:30 PM' },
  ];

  return (
    <PageTransition>
      <div className="pt-24 pb-16 min-h-screen overflow-hidden light-bg-cream text-gray-900">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-5xl font-heading mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Get in touch for private events, special requests, or general inquiries.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-xl" data-aos="fade-right">
              <h3 className="text-2xl font-heading mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-bold">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-accent-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-bold">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-accent-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-bold">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-accent-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-bold">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:border-accent-gold"></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-gold py-4">{loading ? 'Sending...' : 'Send Message'}</button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="space-y-6" data-aos="fade-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {infoCards.map((info, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-shadow">
                    <div className="text-accent-gold text-3xl mb-4 flex justify-center">{info.icon}</div>
                    <h4 className="font-heading font-bold mb-2 text-xl text-gray-900">{info.title}</h4>
                    <p className="text-gray-600">{info.detail}</p>
                  </div>
                ))}
              </div>
              
              {/* Map */}
              <div className="h-64 md:h-80 w-full rounded-lg overflow-hidden border border-border-gold mt-6">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1683100000000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
