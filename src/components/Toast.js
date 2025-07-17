import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', isVisible, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${colors[type]}`}>
            {icons[type]}
            <span className="text-sm font-medium">{message}</span>
            <button
              onClick={onClose}
              className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 