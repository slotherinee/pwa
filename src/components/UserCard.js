import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Globe, MapPin, Heart, Share2, Copy, ExternalLink } from 'lucide-react';

const UserCard = ({ 
  user, 
  isFavorite, 
  onToggleFavorite, 
  onShare, 
  onCopy, 
  darkMode,
  index 
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  const handleWebsiteClick = () => {
    window.open(`https://${user.website}`, '_blank');
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
      }}
      className={`${
        darkMode 
          ? 'bg-gray-800/95 border-gray-600' 
          : 'bg-white/95 border-white/20'
      } backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <User className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {user.name}
            </h3>
            <p className={`${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              @{user.username}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
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
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onShare(user)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? 'text-gray-400 hover:text-blue-400'
                : 'text-gray-400 hover:text-blue-500'
            }`}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className={`text-sm truncate ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {user.email}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onCopy(user.email)}
            className={`p-1 rounded transition-colors duration-300 ${
              darkMode
                ? 'text-gray-400 hover:text-blue-400'
                : 'text-gray-400 hover:text-blue-500'
            }`}
          >
            <Copy className="w-4 h-4" />
          </motion.button>
        </div>
        
        <div className="flex items-center gap-3 text-gray-700">
          <Phone className="w-4 h-4 text-green-500" />
          <span className={`text-sm ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {user.phone}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-700">
            <Globe className="w-4 h-4 text-purple-500" />
            <span className={`text-sm truncate ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {user.website}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWebsiteClick}
            className={`p-1 rounded transition-colors duration-300 ${
              darkMode
                ? 'text-gray-400 hover:text-purple-400'
                : 'text-gray-400 hover:text-purple-500'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
        
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className={`text-sm truncate ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {user.address.city}, {user.address.country}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className={`text-xs ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Company: {user.company.name}
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard; 