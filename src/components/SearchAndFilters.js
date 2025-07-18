import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SortAsc, SortDesc, Heart, HeartOff, Grid, List } from 'lucide-react';

const SearchAndFilters = ({
  showUsers,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  showFavoritesOnly,
  setShowFavoritesOnly,
  viewMode,
  setViewMode,
  filteredUsers,
  users,
  darkMode,
  searchInputRef
}) => (
  <AnimatePresence>
    {showUsers && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchInputRef}
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
);

export default SearchAndFilters; 