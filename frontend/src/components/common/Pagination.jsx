import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { currentPage, totalPages, hasPrev, hasNext } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
      {hasPrev && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-semibold transition-colors min-w-[36px] sm:min-w-[40px] ${
            page === currentPage
              ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      {hasNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          aria-label="Next page"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;

