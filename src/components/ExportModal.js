import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, FileText, FileSpreadsheet, FileJson, 
  Users, Heart, CheckCircle, Copy
} from 'lucide-react';

const ExportModal = ({ isOpen, onClose, users, favorites, darkMode }) => {
  const [exportType, setExportType] = useState('json');
  const [includeFavorites, setIncludeFavorites] = useState(true);
  const [exporting, setExporting] = useState(false);

  const exportOptions = [
    {
      id: 'json',
      name: 'JSON',
      icon: <FileJson className="w-6 h-6" />,
      description: 'Structured data format',
      color: 'text-yellow-500'
    },
    {
      id: 'csv',
      name: 'CSV',
      icon: <FileSpreadsheet className="w-6 h-6" />,
      description: 'Spreadsheet format',
      color: 'text-green-500'
    },
    {
      id: 'text',
      name: 'Text',
      icon: <FileText className="w-6 h-6" />,
      description: 'Plain text format',
      color: 'text-blue-500'
    }
  ];

  const generateJSON = (data) => {
    return JSON.stringify(data, null, 2);
  };

  const generateCSV = (data) => {
    const headers = ['Name', 'Username', 'Email', 'Phone', 'Website', 'City', 'Company', 'Favorite'];
    const rows = data.map(user => [
      user.name,
      user.username,
      user.email,
      user.phone,
      user.website,
      user.address.city,
      user.company.name,
      favorites.includes(user.id) ? 'Yes' : 'No'
    ]);
    
    return [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
  };

  const generateText = (data) => {
    return data.map(user => `
${user.name} (@${user.username})
Email: ${user.email}
Phone: ${user.phone}
Website: ${user.website}
Location: ${user.address.city}, ${user.address.country}
Company: ${user.company.name}
Favorite: ${favorites.includes(user.id) ? 'Yes' : 'No'}
${'-'.repeat(50)}
    `).join('\n');
  };

  const handleExport = async () => {
    setExporting(true);
    
    let data = includeFavorites 
      ? users.filter(user => favorites.includes(user.id))
      : users;
    
    let content, filename, mimeType;
    
    switch (exportType) {
      case 'json':
        content = generateJSON(data);
        filename = 'users.json';
        mimeType = 'application/json';
        break;
      case 'csv':
        content = generateCSV(data);
        filename = 'users.csv';
        mimeType = 'text/csv';
        break;
      case 'text':
        content = generateText(data);
        filename = 'users.txt';
        mimeType = 'text/plain';
        break;
      default:
        content = generateJSON(data);
        filename = 'users.json';
        mimeType = 'application/json';
    }

    // Create and download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setExporting(false);
    onClose();
  };

  const copyToClipboard = async () => {
    let data = includeFavorites 
      ? users.filter(user => favorites.includes(user.id))
      : users;
    
    let content;
    switch (exportType) {
      case 'json':
        content = generateJSON(data);
        break;
      case 'csv':
        content = generateCSV(data);
        break;
      case 'text':
        content = generateText(data);
        break;
      default:
        content = generateJSON(data);
    }

    try {
      await navigator.clipboard.writeText(content);
      // Toast notification would be handled by parent
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-md rounded-2xl shadow-2xl ${
              darkMode 
                ? 'bg-gray-800 border border-gray-600' 
                : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-6 border-b ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Export Users
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors duration-300 ${
                    darkMode
                      ? 'text-gray-400 hover:text-red-400'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Export Type Selection */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Export Format
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {exportOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setExportType(option.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                        exportType === option.id
                          ? darkMode
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-blue-500 bg-blue-50'
                          : darkMode
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={option.color}>{option.icon}</div>
                      <div className="text-left">
                        <div className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {option.name}
                        </div>
                        <div className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {option.description}
                        </div>
                      </div>
                      {exportType === option.id && (
                        <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Options
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeFavorites}
                      onChange={(e) => setIncludeFavorites(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Export only favorites
                    </span>
                  </label>
                </div>
              </div>

              {/* Stats */}
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {includeFavorites ? favorites.length : users.length} users
                    </span>
                  </div>
                  {includeFavorites && (
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className={`${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {favorites.length} favorites
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyToClipboard}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  <Copy className="w-5 h-5" />
                  Copy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExport}
                  disabled={exporting}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    exporting
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  } ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {exporting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  {exporting ? 'Exporting...' : 'Download'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal; 