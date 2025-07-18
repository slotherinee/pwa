import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Phone, Globe, MapPin, Building, Calendar, 
  ExternalLink, Copy, Share2, Heart, HeartOff, Star, Map
} from 'lucide-react';

const UserModal = ({ user, isOpen, onClose, isFavorite, onToggleFavorite, darkMode }) => {
  if (!user) return null;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Toast notification would be handled by parent
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareUser = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: user.name,
          text: `Check out ${user.name} - ${user.email}`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard(`${user.name} - ${user.email}`);
    }
  };

  const openMap = () => {
    const address = `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapUrl, '_blank');
  };

  const openWebsite = () => {
    window.open(`https://${user.website}`, '_blank');
  };

  const stats = [
    { label: 'Posts', value: Math.floor(Math.random() * 50) + 10, icon: '📝' },
    { label: 'Followers', value: Math.floor(Math.random() * 1000) + 100, icon: '👥' },
    { label: 'Following', value: Math.floor(Math.random() * 500) + 50, icon: '👤' },
    { label: 'Rating', value: (Math.random() * 2 + 3).toFixed(1), icon: '⭐' }
  ];

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
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
              darkMode 
                ? 'bg-gray-800 border border-gray-600' 
                : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`sticky top-0 z-10 p-6 border-b ${
              darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {user.name}
                    </h2>
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      @{user.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleFavorite(user.id)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      isFavorite
                        ? 'text-red-500 bg-red-100'
                        : darkMode
                          ? 'text-gray-400 hover:text-red-400'
                          : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    {isFavorite ? <Heart className="w-5 h-5 fill-current" /> : <Heart className="w-5 h-5" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={shareUser}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      darkMode
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-gray-400 hover:text-blue-500'
                    }`}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
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
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-center p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className={`text-lg font-bold ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact Information */}
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <span className={`${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {user.email}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(user.email)}
                      className={`p-2 rounded-full transition-colors duration-300 ${
                        darkMode
                          ? 'text-gray-400 hover:text-blue-400'
                          : 'text-gray-400 hover:text-blue-500'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {user.phone}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-purple-500" />
                      <span className={`${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {user.website}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={openWebsite}
                      className={`p-2 rounded-full transition-colors duration-300 ${
                        darkMode
                          ? 'text-gray-400 hover:text-purple-400'
                          : 'text-gray-400 hover:text-purple-500'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Address
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={openMap}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                      darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    View on Map
                  </motion.button>
                </div>
                <div className="space-y-2">
                  <div className={`flex items-center gap-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span>{user.address.street}</span>
                  </div>
                  <div className={`ml-8 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {user.address.suite}
                  </div>
                  <div className={`ml-8 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {user.address.city}, {user.address.zipcode}
                  </div>
                  <div className={`ml-8 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {user.address.country}
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Company
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-indigo-500" />
                    <span className={`font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {user.company.name}
                    </span>
                  </div>
                  <div className={`ml-8 italic ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    "{user.company.catchPhrase}"
                  </div>
                  <div className={`ml-8 text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {user.company.bs}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserModal; 