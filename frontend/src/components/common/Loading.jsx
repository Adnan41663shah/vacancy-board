import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FaSpinner className="animate-spin text-4xl text-orange-500 mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default Loading;

