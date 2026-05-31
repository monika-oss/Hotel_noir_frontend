import React from 'react';

const SkeletonCard = ({ light = false }) => {
  return (
    <div className={`${light ? 'bg-white border-gray-200' : 'bg-card border-border-gold'} rounded-lg overflow-hidden border shadow-lg animate-pulse`}>
      <div className={`h-48 ${light ? 'bg-gray-200' : 'bg-secondary'}`}></div>
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className={`h-6 ${light ? 'bg-gray-200' : 'bg-secondary'} rounded w-1/2`}></div>
          <div className={`h-6 ${light ? 'bg-gray-200' : 'bg-secondary'} rounded w-1/4`}></div>
        </div>
        <div className="space-y-2">
          <div className={`h-4 ${light ? 'bg-gray-200' : 'bg-secondary'} rounded w-full`}></div>
          <div className={`h-4 ${light ? 'bg-gray-200' : 'bg-secondary'} rounded w-5/6`}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
