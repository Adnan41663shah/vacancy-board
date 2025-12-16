import React from 'react';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const DeleteModal = ({ isOpen, onClose, jobTitle, onConfirm, isCategory = false }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Confirm Delete</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <FaTimes className="text-base sm:text-lg" />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
            <div className="bg-red-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
              <FaExclamationTriangle className="text-red-600 text-2xl sm:text-3xl" />
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              {isCategory 
                ? 'Are you sure you want to delete this category?'
                : 'Are you sure you want to delete this job posting?'
              }
            </p>
            <p className="font-semibold text-sm sm:text-base text-gray-900 mb-2 break-words px-2">{jobTitle}</p>
            {isCategory && (
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Note: Existing jobs with this category will keep their category name.
              </p>
            )}
            <p className="text-xs sm:text-sm text-red-600">This action cannot be undone.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm sm:text-base"
            >
              {isCategory ? 'Delete Category' : 'Delete Job'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

