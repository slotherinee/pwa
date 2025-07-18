import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const PwaApisContext = createContext();

export const usePwaApis = () => useContext(PwaApisContext);

export const PwaApisProvider = ({ children }) => {
  // Network Info
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [connectionType, setConnectionType] = useState(navigator.connection?.effectiveType || 'unknown');
  const [isSlow, setIsSlow] = useState(false);

  // Wake Lock
  const wakeLockRef = useRef(null);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  // Fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Notification permission
  const [notificationPermission, setNotificationPermission] = useState(Notification?.permission || 'default');

  // --- Vibration API ---
  const vibrate = (pattern) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  // --- Notification API ---
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      return perm;
    }
    return 'denied';
  };

  const showNotification = (title, options) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  };

  // --- Clipboard API (native banner) ---
  const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      showNotification('Copied to clipboard!', { body: text });
      vibrate(50);
    }
  };

  // --- Network Information API ---
  useEffect(() => {
    const updateNetwork = () => {
      setIsOffline(!navigator.onLine);
      if (navigator.connection) {
        setConnectionType(navigator.connection.effectiveType);
        setIsSlow(navigator.connection.downlink < 1.5 || navigator.connection.effectiveType === '2g');
      }
    };
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    navigator.connection?.addEventListener('change', updateNetwork);
    updateNetwork();
    return () => {
      window.removeEventListener('online', updateNetwork);
      window.removeEventListener('offline', updateNetwork);
      navigator.connection?.removeEventListener('change', updateNetwork);
    };
  }, []);

  // --- Wake Lock API ---
  const requestWakeLock = async () => {
    if ('wakeLock' in navigator && !wakeLockRef.current) {
      try {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        setWakeLockActive(true);
        wakeLockRef.current.addEventListener('release', () => setWakeLockActive(false));
      } catch (e) {
        // ignore
      }
    }
  };
  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
      setWakeLockActive(false);
    }
  };

  // --- Fullscreen API ---
  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen();
      setIsFullscreen(true);
    }
  };
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // --- Vibrate on mount (app open) ---
  useEffect(() => {
    vibrate([30, 30, 30]);
  }, []);

  return (
    <PwaApisContext.Provider
      value={{
        vibrate,
        showNotification,
        requestNotificationPermission,
        notificationPermission,
        copyToClipboard,
        isOffline,
        isSlow,
        connectionType,
        requestWakeLock,
        releaseWakeLock,
        wakeLockActive,
        enterFullscreen,
        exitFullscreen,
        isFullscreen
      }}
    >
      {isOffline && (
        <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white text-center py-2 font-semibold shadow-lg animate-pulse">
          Offline mode: some features may be unavailable
        </div>
      )}
      {isSlow && !isOffline && (
        <div className="fixed top-0 left-0 w-full z-50 bg-yellow-500 text-white text-center py-2 font-semibold shadow-lg animate-pulse">
          Slow network detected ({connectionType})
        </div>
      )}
      {children}
    </PwaApisContext.Provider>
  );
}; 