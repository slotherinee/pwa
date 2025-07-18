import React from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, EyeOff, FileDown } from 'lucide-react';

const ActionButtons = ({
  showUsers,
  loading,
  fetchUsers,
  hideUsers,
  openExportModal
}) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
  >
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      onClick={fetchUsers}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <RefreshCw className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      {loading ? 'Fetching...' : 'Fetch Data'}
    </motion.button>

    {showUsers && (
      <>
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={hideUsers}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-red-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <EyeOff className="w-5 h-5" />
          Hide Users
        </motion.button>
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={openExportModal}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FileDown className="w-5 h-5" />
          Export
        </motion.button>
      </>
    )}
  </motion.div>
);

export default ActionButtons; 