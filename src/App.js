import React, { useState, useEffect, useRef } from 'react';
import Toast from './components/Toast';
import Header from './components/Header';
import ActionButtons from './components/ActionButtons';
import SearchAndFilters from './components/SearchAndFilters';
import UsersGrid from './components/UsersGrid';
import UserCard from './components/UserCard';
import MagneticCard from './components/MagneticCard';
import Stats from './components/Stats';
import UserModal from './components/UserModal';
import Confetti from './components/Confetti';
import ExportModal from './components/ExportModal';
import { usePwaApis } from './components/PwaApisProvider';
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
  const [viewMode, setViewMode] = useState('magnetic');
  const searchInputRef = useRef(null);

  // PWA APIs
  const {
    vibrate,
    showNotification,
    requestNotificationPermission,
    copyToClipboard: pwaCopyToClipboard,
    requestWakeLock,
    releaseWakeLock,
    wakeLockActive
  } = usePwaApis();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    let filtered = [...users];
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (showFavoritesOnly) {
      filtered = filtered.filter(user => favorites.includes(user.id));
    }
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
    setCurrentPage(1);
  }, [users, searchTerm, sortBy, sortOrder, favorites, showFavoritesOnly]);

  // App Shortcuts API обработка
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shortcut = params.get('shortcut');
    if (shortcut === 'favorites') {
      setShowFavoritesOnly(true);
      showToast('Shortcut: Favorites', 'info');
    }
    if (shortcut === 'search') {
      setShowUsers(true);
      setTimeout(() => {
        if (searchInputRef.current) searchInputRef.current.focus();
      }, 300);
      showToast('Shortcut: Search', 'info');
    }
    if (shortcut === 'export') {
      setShowUsers(true);
      setShowExportModal(true);
      showToast('Shortcut: Export', 'info');
    }
  }, []);

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
      setUsers(data.slice(0, 10));
      setShowUsers(true);
      showToast('Users loaded successfully!', 'success');
      vibrate([50, 30, 50]);
      requestNotificationPermission().then(perm => {
        if (perm === 'granted') {
          showNotification('Users loaded!', { body: '10 users fetched from API.' });
        }
      });
    } catch (err) {
      setError(err.message);
      showToast('Failed to load users', 'error');
      vibrate([100, 50, 100]);
    } finally {
      setLoading(false);
    }
  };

  const hideUsers = () => {
    setShowUsers(false);
    vibrate(30);
  };

  const toggleFavorite = (userId) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(userId);
      if (isFavorite) {
        showToast('Removed from favorites', 'info');
        vibrate([20, 20, 20]);
        return prev.filter(id => id !== userId);
      } else {
        showToast('Added to favorites', 'success');
        setShowConfetti(true);
        vibrate([50, 30, 80]);
        return [...prev, userId];
      }
    });
  };

  // Используем Clipboard API с вибрацией и нативным уведомлением
  const handleCopyToClipboard = async (text) => {
    await pwaCopyToClipboard(text);
    showToast('Copied to clipboard!', 'success');
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
        vibrate(40);
      } catch (err) {
        console.error('Error sharing:', err);
        showToast('Failed to share', 'error');
        vibrate([100, 50, 100]);
      }
    } else {
      handleCopyToClipboard(`${user.name} - ${user.email}`);
    }
  };

  // Wake Lock при открытии модального окна пользователя
  useEffect(() => {
    if (showUserModal) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    // eslint-disable-next-line
  }, [showUserModal]);

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    vibrate([30, 30, 30]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    vibrate(20);
  };

  const renderUserCard = (user, index) => {
    const cardProps = {
      user,
      isFavorite: favorites.includes(user.id),
      onToggleFavorite: toggleFavorite,
      onShare: shareUser,
      onCopy: handleCopyToClipboard,
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
    <div className={`transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
        <ActionButtons
          showUsers={showUsers}
          loading={loading}
          fetchUsers={fetchUsers}
          hideUsers={hideUsers}
          openExportModal={() => setShowExportModal(true)}
        />
        <SearchAndFilters
          showUsers={showUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredUsers={filteredUsers}
          users={users}
          darkMode={darkMode}
          searchInputRef={searchInputRef}
        />
        <Stats users={users} favorites={favorites} darkMode={darkMode} />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
            <strong>Error:</strong> {error}
          </div>
        )}
        <UsersGrid
          showUsers={showUsers}
          loading={loading}
          filteredUsers={filteredUsers}
          currentUsers={currentUsers}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          darkMode={darkMode}
          itemsPerPage={itemsPerPage}
          renderUserCard={renderUserCard}
        />
        <footer className={`text-center mt-16 ${darkMode ? 'text-white/70' : 'text-white/70'}`}>
          <p>Built with React, Framer Motion & Tailwind CSS</p>
          <p className="text-sm mt-2">Data from JSONPlaceholder API</p>
        </footer>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
      <UserModal
        user={selectedUser}
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        isFavorite={selectedUser ? favorites.includes(selectedUser.id) : false}
        onToggleFavorite={toggleFavorite}
        darkMode={darkMode}
      />
      <Confetti
        isVisible={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
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