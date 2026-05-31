import React from 'react';
import PageTransition from '../components/PageTransition';
import ReservationForm from '../components/ReservationForm';

const Reservation = () => {
  return (
    <PageTransition>
      <div className="pt-24 pb-16 min-h-screen light-bg-cream text-gray-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-heading mb-4">Make a Reservation</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Secure your table for an unforgettable dining experience. 
              For parties larger than 20, please contact us directly.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ReservationForm light={true} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Reservation;
