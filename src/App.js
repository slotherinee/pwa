import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Download, Eye, EyeOff, RefreshCw, User, Mail, Phone, Globe, MapPin } from 'lucide-react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.slice(0, 10)); // Get first 10 users
      setShowUsers(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hideUsers = () => {
    setShowUsers(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Users className="w-16 h-16 text-white mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Users PWA
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            A beautiful Progressive Web App to fetch and display users from JSONPlaceholder API
          </p>
        </motion.div>

        {/* Action Buttons */}
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
          )}
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto"
            >
              <strong>Error:</strong> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users Grid */}
        <AnimatePresence>
          {showUsers && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                    }}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                        <p className="text-gray-600">@{user.username}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm truncate">{user.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <Globe className="w-4 h-4 text-purple-500" />
                        <span className="text-sm truncate">{user.website}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm truncate">{user.address.city}, {user.address.country}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Company: {user.company.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-white/70"
        >
          <p>Built with React, Framer Motion & Tailwind CSS</p>
          <p className="text-sm mt-2">Data from JSONPlaceholder API</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App; 