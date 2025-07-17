# Users PWA

A beautiful Progressive Web App built with React, Framer Motion, and Tailwind CSS that fetches and displays users from the JSONPlaceholder API.

## ✨ Features

- **Progressive Web App (PWA)** - Installable and works offline
- **Beautiful UI** - Modern design with gradient backgrounds and glass morphism effects
- **Smooth Animations** - Powered by Framer Motion for delightful user interactions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Real-time Data Fetching** - Fetches 10 users from JSONPlaceholder API
- **Interactive Elements** - Fetch and hide users with animated buttons
- **Error Handling** - Graceful error handling with user-friendly messages
- **Loading States** - Smooth loading animations and feedback

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

- **React 18** - Modern React with hooks
- **Framer Motion** - Animation library for smooth interactions
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Service Worker** - PWA functionality and offline support

## 📱 PWA Features

- **Installable** - Can be installed on mobile and desktop devices
- **Offline Support** - Works without internet connection after first load
- **App-like Experience** - Full-screen mode and native app feel
- **Fast Loading** - Cached resources for instant loading

## 🎯 How to Use

1. **Fetch Data**: Click the "Fetch Data" button to load 10 users from the API
2. **View Users**: Users are displayed in beautiful cards with their information
3. **Hide Users**: Click "Hide Users" to hide the user list
4. **Install**: Use your browser's install prompt to add the app to your device

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

---

Made with ❤️ using React and modern web technologies 