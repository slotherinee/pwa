import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import Pagination from './Pagination';
import LoadingParticles from './LoadingParticles';

const UsersGrid = ({
  showUsers,
  loading,
  filteredUsers,
  currentUsers,
  currentPage,
  totalPages,
  handlePageChange,
  darkMode,
  itemsPerPage,
  renderUserCard
}) => (
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
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {currentUsers.map((user, index) => renderUserCard(user, index))}
            </motion.div>
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
);

export default UsersGrid; 