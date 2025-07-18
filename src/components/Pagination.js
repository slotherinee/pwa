import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  darkMode,
  itemsPerPage = 5 
}) => {
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-2 mt-8"
    >
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : ''
        } ${
          darkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-white disabled:bg-gray-800'
            : 'bg-white/90 hover:bg-white text-gray-800 disabled:bg-gray-100'
        } shadow-lg hover:shadow-xl`}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <div className={`px-3 py-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <MoreHorizontal className="w-4 h-4" />
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center font-medium ${
                  currentPage === page
                    ? darkMode
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-500 text-white shadow-lg'
                    : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-white/90 hover:bg-white text-gray-800'
                } shadow-md hover:shadow-lg`}
              >
                {page}
              </motion.button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : ''
        } ${
          darkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-white disabled:bg-gray-800'
            : 'bg-white/90 hover:bg-white text-gray-800 disabled:bg-gray-100'
        } shadow-lg hover:shadow-xl`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </motion.button>

      {/* Page Info */}
      <div className={`ml-4 px-3 py-2 rounded-lg ${
        darkMode 
          ? 'bg-gray-700 text-white' 
          : 'bg-white/90 text-gray-800'
      } shadow-md`}>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </motion.div>
  );
};

export default Pagination; 