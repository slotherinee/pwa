import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Download, Eye, EyeOff, RefreshCw, User, Mail, Phone, Globe, MapPin, 
  Search, Filter, Moon, Sun, SortAsc, SortDesc, Heart, HeartOff, Share2, Copy,
  FileDown, Settings, Grid, List
} from 'lucide-react';
import Toast from './components/Toast';
import UserCard from './components/UserCard';
import MagneticCard from './components/MagneticCard';
import Stats from './components/Stats';
import UserModal from './components/UserModal';
import Confetti from './components/Confetti';
import ExportModal from './components/ExportModal';
import Pagination from './components/Pagination';
import LoadingParticles from './components/LoadingParticles';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info', isVisible: false });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState('magnetic'); // 'magnetic' or 'normal'

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Filter and sort users
  useEffect(() => {
    let filtered = [...users];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(user => favorites.includes(user.id));
    }
    
    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'address') {
        aValue = a.address.city;
        bValue = b.address.city;
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [users, searchTerm, sortBy, sortOrder, favorites, showFavoritesOnly]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

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
      showToast('Users loaded successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const hideUsers = () => {
    setShowUsers(false);
  };

  const toggleFavorite = (userId) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(userId);
      if (isFavorite) {
        showToast('Removed from favorites', 'info');
        return prev.filter(id => id !== userId);
      } else {
        showToast('Added to favorites', 'success');
        setShowConfetti(true);
        return [...prev, userId];
      }
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy', 'error');
    }
  };

  const shareUser = async (user) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: user.name,
          text: `Check out ${user.name} - ${user.email}`,
          url: window.location.href
        });
        showToast('Shared successfully!', 'success');
      } catch (err) {
        console.error('Error sharing:', err);
        showToast('Failed to share', 'error');
      }
    } else {
      copyToClipboard(`${user.name} - ${user.email}`);
    }
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of users section
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const renderUserCard = (user, index) => {
    const cardProps = {
      user,
      isFavorite: favorites.includes(user.id),
      onToggleFavorite: toggleFavorite,
      onShare: shareUser,
      onCopy: copyToClipboard,
      onViewDetails: viewUserDetails,
      darkMode,
      index
    };

    return viewMode === 'magnetic' ? (
      <MagneticCard key={user.id} {...cardProps} />
    ) : (
      <UserCard key={user.id} {...cardProps} />
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full ${
                darkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              } transition-all duration-300`}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
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
                onClick={() => setShowExportModal(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FileDown className="w-5 h-5" />
                Export
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Search and Filter Controls */}
        <AnimatePresence>
          {showUsers && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto mb-8"
            >
              {/* Stats */}
              <Stats users={users} favorites={favorites} darkMode={darkMode} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                        : 'bg-white/90 border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400'
                    }`}
                  />
                </div>

                {/* Sort */}
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white/90 border-white/20 text-gray-800'
                    }`}
                  >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="username">Username</option>
                    <option value="address">City</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' 
                        : 'bg-white/90 border-white/20 text-gray-800 hover:bg-white'
                    }`}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                  </button>
                </div>

                {/* Favorites Toggle */}
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    showFavoritesOnly
                      ? 'bg-red-500 border-red-500 text-white'
                      : darkMode
                        ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
                        : 'bg-white/90 border-white/20 text-gray-800 hover:bg-white'
                  }`}
                >
                  {showFavoritesOnly ? <HeartOff className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                  {showFavoritesOnly ? 'All Users' : 'Favorites'}
                </button>

                {/* View Mode Toggle */}
                <button
                  onClick={() => setViewMode(viewMode === 'magnetic' ? 'normal' : 'magnetic')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    viewMode === 'magnetic'
                      ? 'bg-purple-500 border-purple-500 text-white'
                      : darkMode
                        ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
                        : 'bg-white/90 border-white/20 text-gray-800 hover:bg-white'
                  }`}
                >
                  {viewMode === 'magnetic' ? <Grid className="w-5 h-5" /> : <List className="w-5 h-5" />}
                  {viewMode === 'magnetic' ? 'Magnetic' : 'Normal'}
                </button>

                {/* Stats */}
                <div className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white/90 border-white/20 text-gray-800'
                }`}>
                  <span className="text-sm">
                    {filteredUsers.length} of {users.length} users
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
              {loading ? (
                <LoadingParticles darkMode={darkMode} />
              ) : filteredUsers.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-12 ${
                    darkMode ? 'text-white/70' : 'text-white/70'
                  }`}
                >
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl">No users found</p>
                  <p className="text-sm mt-2">Try adjusting your search or filters</p>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {currentUsers.map((user, index) => renderUserCard(user, index))}
                  </motion.div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    darkMode={darkMode}
                    itemsPerPage={itemsPerPage}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`text-center mt-16 ${
            darkMode ? 'text-white/70' : 'text-white/70'
          }`}
        >
          <p>Built with React, Framer Motion & Tailwind CSS</p>
          <p className="text-sm mt-2">Data from JSONPlaceholder API</p>
        </motion.footer>
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        isFavorite={selectedUser ? favorites.includes(selectedUser.id) : false}
        onToggleFavorite={toggleFavorite}
        darkMode={darkMode}
      />

      {/* Confetti */}
      <Confetti
        isVisible={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        users={users}
        favorites={favorites}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App; 