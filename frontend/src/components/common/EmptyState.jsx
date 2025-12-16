import React from 'react';
import { FaSearch, FaInbox } from 'react-icons/fa';

const EmptyState = ({ 
  icon = 'search', 
  title = 'No jobs found', 
  message = 'Try adjusting your search criteria or check back later for new opportunities.' 
}) => {
  const IconComponent = icon === 'inbox' ? FaInbox : FaSearch;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <IconComponent className="text-6xl text-gray-300 mb-4" />
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;

