# Users PWA

A beautiful Progressive Web App built with React, Framer Motion, and Tailwind CSS that fetches and displays users from the JSONPlaceholder API with advanced features, stunning animations, and pagination.

## ✨ Features

### 🎨 **Core Features**
- **Progressive Web App (PWA)** - Installable and works offline
- **Beautiful UI** - Modern design with gradient backgrounds and glass morphism effects
- **Smooth Animations** - Powered by Framer Motion for delightful user interactions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Real-time Data Fetching** - Fetches 10 users from JSONPlaceholder API
- **Interactive Elements** - Fetch and hide users with animated buttons

### 🌙 **Theme & Customization**
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Dynamic Color Schemes** - Adaptive colors based on theme selection
- **Glass Morphism Effects** - Beautiful backdrop blur and transparency
- **Gradient Backgrounds** - Stunning visual effects

### 🔍 **Search & Filtering**
- **Smart Search** - Search by name, email, or username
- **Advanced Sorting** - Sort by name, email, username, or city
- **Bidirectional Sorting** - Ascending and descending order
- **Favorites Filter** - Show only favorite users
- **Real-time Filtering** - Instant results as you type

### ❤️ **Favorites System**
- **Add/Remove Favorites** - Heart icon with smooth animations
- **Favorites Counter** - Track number of favorite users
- **Favorites-only View** - Filter to show only favorites
- **Confetti Animation** - Celebration effect when adding favorites
- **Persistent Storage** - Favorites saved in local storage

### 📊 **Statistics & Analytics**
- **Animated Counters** - Smooth counting animations
- **User Statistics** - Total users, favorites, cities, companies
- **Real-time Updates** - Stats update as you interact
- **Visual Indicators** - Color-coded statistics

### 🔔 **Notifications & Feedback**
- **Toast Notifications** - Beautiful success, error, and info messages
- **Auto-dismiss** - Notifications disappear automatically
- **Action Feedback** - Confirmations for all user actions
- **Error Handling** - Graceful error messages

### 📱 **User Interaction**
- **Detailed User Modal** - Full user information in modal
- **Social Statistics** - Mock social media stats
- **Interactive Maps** - Open user location in Google Maps
- **Website Links** - Direct links to user websites
- **Copy to Clipboard** - One-click email copying
- **Native Sharing** - Share users via device sharing

### 📤 **Export Functionality**
- **Multiple Formats** - Export as JSON, CSV, or plain text
- **Favorites Export** - Export only favorite users
- **Copy to Clipboard** - Copy exported data
- **File Download** - Direct file downloads
- **Progress Indicators** - Loading states during export

### 📄 **Pagination System**
- **Smart Pagination** - 5 users per page with smooth transitions
- **Page Navigation** - Previous/Next buttons with animations
- **Page Numbers** - Clickable page numbers with dots for large ranges
- **Page Info** - Current page and total pages display
- **Auto-reset** - Returns to page 1 when filters change

### 🎭 **Advanced Animations**
- **Magnetic Cards** - 3D tilt effect with magnetic cursor attraction
- **Parallax Effects** - Depth-based animations on hover
- **Staggered Animations** - Cards appear in sequence
- **Spring Physics** - Natural motion animations
- **Confetti Effects** - Celebration animations
- **Loading Particles** - Animated loading indicator with orbiting particles
- **Hover Effects** - Interactive hover states
- **Loading Animations** - Smooth loading indicators

### 🎯 **User Experience**
- **Keyboard Navigation** - Full keyboard support
- **Accessibility** - ARIA labels and focus management
- **Tooltips** - Helpful hover tooltips
- **Loading States** - Clear feedback during operations
- **Error Recovery** - Graceful error handling
- **View Modes** - Toggle between normal and magnetic card views

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder that's ready for deployment.

## 🎨 Technologies Used

- **React 18** - Modern React with hooks and concurrent features
- **Framer Motion** - Production-ready motion library for React
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Service Worker** - PWA functionality and offline support

## 📱 PWA Features

- **Installable** - Can be installed on mobile and desktop devices
- **Offline Support** - Works without internet connection after first load
- **App-like Experience** - Full-screen mode and native app feel
- **Fast Loading** - Cached resources for instant loading
- **Background Sync** - Sync data when connection is restored

## 🎯 How to Use

### Basic Operations
1. **Fetch Data**: Click the "Fetch Data" button to load 10 users from the API
2. **View Users**: Users are displayed in beautiful cards with their information
3. **Hide Users**: Click "Hide Users" to hide the user list
4. **Install**: Use your browser's install prompt to add the app to your device

### Advanced Features
1. **Search**: Use the search bar to find specific users
2. **Sort**: Choose sorting criteria and direction
3. **Favorites**: Click heart icons to add/remove favorites
4. **View Details**: Click the eye icon to see detailed user information
5. **Export**: Use the export button to download user data
6. **Share**: Share users via native sharing or copy to clipboard
7. **Theme**: Toggle between dark and light modes
8. **View Mode**: Switch between normal and magnetic card views
9. **Pagination**: Navigate through pages of users

## 🚀 Deployment

### Vercel Deployment

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy automatically with the following settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Other Platforms

The app can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📁 Project Structure

```
pwa/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Toast.js
│   │   ├── UserCard.js
│   │   ├── MagneticCard.js
│   │   ├── Stats.js
│   │   ├── UserModal.js
│   │   ├── Confetti.js
│   │   ├── ExportModal.js
│   │   ├── Pagination.js
│   │   └── LoadingParticles.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── serviceWorkerRegistration.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Customization

### Colors and Theme

The app uses a beautiful gradient theme. You can customize colors in:
- `tailwind.config.js` - Tailwind theme configuration
- `src/index.css` - Global styles and gradients
- `src/App.css` - Custom animations and effects

### Animations

Animations are powered by Framer Motion. You can modify:
- `src/App.js` - Component animations and transitions
- `src/App.css` - CSS animations and keyframes
- `src/components/` - Individual component animations

### Adding New Features

The modular component structure makes it easy to add new features:
1. Create new components in `src/components/`
2. Import and use them in `App.js`
3. Add corresponding state management
4. Update the UI as needed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the free API
- [Framer Motion](https://www.framer.com/motion/) for amazing animations
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## 🎉 Recent Updates

### Version 3.0 - Final Release
- 📄 Added pagination system with 5 users per page
- 🎭 Magnetic card effects with cursor attraction
- ✨ Animated loading particles
- 🔄 View mode toggle (Normal/Magnetic)
- 📱 Enhanced mobile responsiveness
- 🎨 Improved visual effects and animations
- ⚡ Performance optimizations

### Version 2.0 - Enhanced Features
- ✨ Added detailed user modal with social statistics
- 🎊 Confetti animations for favorite actions
- 📤 Export functionality (JSON, CSV, Text)
- 🎭 Parallax card effects with 3D tilt
- 🌙 Improved dark mode with better contrast
- 📊 Enhanced statistics with animated counters
- 🔔 Better toast notifications system
- 🎯 Improved accessibility and keyboard navigation

---

Made with ❤️ using React and modern web technologies 