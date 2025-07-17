import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MapPin, Building } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count}</span>;
};

const Stats = ({ users, favorites, darkMode }) => {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Total Users',
      value: users.length,
      color: 'text-blue-500'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: 'Favorites',
      value: favorites.length,
      color: 'text-red-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Cities',
      value: new Set(users.map(user => user.address.city)).size,
      color: 'text-green-500'
    },
    {
      icon: <Building className="w-6 h-6" />,
      label: 'Companies',
      value: new Set(users.map(user => user.company.name)).size,
      color: 'text-purple-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className={`${
            darkMode 
              ? 'bg-gray-800/50 border-gray-600' 
              : 'bg-white/20 border-white/30'
          } backdrop-blur-sm rounded-xl p-4 border text-center`}
        >
          <div className={`${stat.color} mb-2 flex justify-center`}>
            {stat.icon}
          </div>
          <div className={`text-2xl font-bold mb-1 ${
            darkMode ? 'text-white' : 'text-white'
          }`}>
            <AnimatedCounter value={stat.value} />
          </div>
          <div className={`text-sm ${
            darkMode ? 'text-gray-300' : 'text-white/80'
          }`}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Stats; 