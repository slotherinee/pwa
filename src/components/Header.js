import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sun, Moon, Maximize2, Minimize2 } from 'lucide-react';
import { usePwaApis } from './PwaApisProvider';

const Header = ({ darkMode, onToggleDarkMode }) => {
  const { isFullscreen, enterFullscreen, exitFullscreen, vibrate } = usePwaApis();

  const handleFullscreen = () => {
    vibrate(30);
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <div className="flex justify-center items-center gap-4 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block"
        >
          <Users className={`w-16 h-16 ${darkMode ? 'text-white' : 'text-white'}`} />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleDarkMode}
          className={`p-3 rounded-full ${
            darkMode 
              ? 'bg-white/10 text-white hover:bg-white/20' 
              : 'bg-white/20 text-white hover:bg-white/30'
          } transition-all duration-300`}
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFullscreen}
          className={`p-3 rounded-full ${
            darkMode 
              ? 'bg-white/10 text-white hover:bg-white/20' 
              : 'bg-white/20 text-white hover:bg-white/30'
          } transition-all duration-300`}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
        </motion.button>
      </div>
      <h1 className={`text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg ${
        darkMode ? 'text-white' : 'text-white'
      }`}>
        Users PWA
      </h1>
      <p className={`text-xl max-w-2xl mx-auto ${
        darkMode ? 'text-white/90' : 'text-white/90'
      }`}>
        A beautiful Progressive Web App to fetch and display users from JSONPlaceholder API
      </p>
      {isFullscreen && (
        <div className="mt-2 text-xs text-blue-200 animate-pulse">Fullscreen mode enabled</div>
      )}
    </motion.div>
  );
};

export default Header; 