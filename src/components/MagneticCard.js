import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { User, Mail, Phone, Globe, MapPin, Heart, Share2, Copy, ExternalLink, Eye, Sparkles } from 'lucide-react';

const MagneticCard = ({ 
  user, 
  isFavorite, 
  onToggleFavorite, 
  onShare, 
  onCopy, 
  onViewDetails,
  darkMode,
  index 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Magnetic effect
  const magneticX = useTransform(mouseX, [-300, 300], [-10, 10]);
  const magneticY = useTransform(mouseY, [-300, 300], [-10, 10]);
  
  const springMagneticX = useSpring(magneticX, springConfig);
  const springMagneticY = useSpring(magneticY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleWebsiteClick = () => {
    window.open(`https://${user.website}`, '_blank');
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={`relative ${
        darkMode 
          ? 'bg-gray-800/95 border-gray-600' 
          : 'bg-white/95 border-white/20'
      } backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border cursor-pointer overflow-hidden`}
    >
      {/* Magnetic glow effect */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            x: springMagneticX,
            y: springMagneticY
          }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none"
        />
      )}

      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full relative"
      >
        {/* Sparkle effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-2 right-2 z-10"
            style={{ transform: "translateZ(30px)" }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ transform: "translateZ(20px)" }}
            >
              <User className="w-6 h-6 text-white" />
            </motion.div>
            <div style={{ transform: "translateZ(10px)" }}>
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
          <div className="flex gap-2" style={{ transform: "translateZ(15px)" }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onViewDetails(user)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                darkMode
                  ? 'text-gray-400 hover:text-blue-400'
                  : 'text-gray-400 hover:text-blue-500'
              }`}
              title="View details"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
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
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
              title="Share user"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3" style={{ transform: "translateZ(5px)" }}>
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
              title="Copy email"
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
              title="Visit website"
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

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200" style={{ transform: "translateZ(10px)" }}>
          <div className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Company: {user.company.name}
          </div>
        </div>

        {/* Magnetic cursor follower */}
        {isHovered && (
          <motion.div
            style={{
              x: springMagneticX,
              y: springMagneticY,
              transform: "translateZ(-5px)"
            }}
            className="absolute w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl pointer-events-none"
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default MagneticCard; 