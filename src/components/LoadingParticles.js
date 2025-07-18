import React from 'react';
import { motion } from 'framer-motion';

const LoadingParticles = ({ darkMode }) => {
  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        {/* Central loading spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`w-16 h-16 border-4 rounded-full ${
            darkMode 
              ? 'border-gray-600 border-t-blue-400' 
              : 'border-gray-300 border-t-blue-500'
          }`}
        />
        
        {/* Orbiting particles */}
        {particles.map((particle, index) => (
          <motion.div
            key={particle}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: darkMode ? '#3b82f6' : '#3b82f6',
              transform: `translate(-50%, -50%) rotate(${index * 30}deg) translateY(-40px)`
            }}
          />
        ))}
        
        {/* Pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute inset-0 rounded-full ${
            darkMode ? 'bg-blue-400/20' : 'bg-blue-500/20'
          }`}
        />
      </div>
      
      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`ml-6 text-lg font-medium ${
          darkMode ? 'text-white' : 'text-white'
        }`}
      >
        Loading users...
      </motion.div>
    </div>
  );
};

export default LoadingParticles; 