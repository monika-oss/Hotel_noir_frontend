import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const NotFound = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center pt-20 pb-12">
        <div className="text-center">
          <h1 className="text-9xl font-heading text-accent-gold animate-shimmer mb-4">404</h1>
          <h2 className="text-3xl font-heading mb-6">Table Not Found</h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn-gold inline-block">Return to Home</Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
