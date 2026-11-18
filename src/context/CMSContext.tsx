import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  verifyUsername,
  verifyPassword,
  updateAdminPassword,
  isValidSessionHash,
  hashPassword,
  ADMIN_USERNAME,
} from '../utils/crypto';
import { AdminAccessTrigger, AdminLoginLogEntry } from '../types';

interface CMSContextType {
  content: Record<string, string>;
  getContent: (key: string, defaultValue: string) => string;
  updateContent: (key: string, value: string) => void;
  updateMultipleContent: (updates: Record<string, string>) => void;
  resetContentKey: (key: string) => void;
  resetContent: () => void;
  isAdminLoggedIn: boolean;
  currentAdminUser: string;
  isLiveEditMode: boolean;
  setIsLiveEditMode: (on: boolean) => void;
  loginAdmin: (username: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  changePassword: (newPassword: string) => Promise<void>;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  openAdminModal: (trigger?: AdminAccessTrigger) => void;
  isAdminDrawerOpen: boolean;
  setIsAdminDrawerOpen: (open: boolean) => void;
  loginLogs: AdminLoginLogEntry[];
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY_CONTENT = 'casachitic_cms_content';
const STORAGE_KEY_SESSION = 'casachitic_admin_session';
const STORAGE_KEY_ADMIN_USER = 'casachitic_admin_user';
const STORAGE_KEY_LOGIN_LOGS = 'casachitic_admin_login_logs';
const MAX_LOGIN_LOGS = 150;

function getDeviceSummary(): string {
  if (typeof navigator === 'undefined') return 'Unknown Browser';
  const ua = navigator.userAgent;

  let browser = 'Browser';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/') && !ua.includes('Edg/')) browser = 'Chrome';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Safari';

  let os = 'Device';
  if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Mac OS X')) os = 'macOS';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Linux')) os = 'Linux';

  return `${browser} on ${os}`;
}

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<string>(ADMIN_USERNAME);
  const [isLiveEditMode, setIsLiveEditMode] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState<boolean>(false);
  const [adminTrigger, setAdminTrigger] = useState<AdminAccessTrigger>('portal');
  const [loginLogs, setLoginLogs] = useState<AdminLoginLogEntry[]>([]);

  const appendLoginLog = (
    username: string,
    status: 'success' | 'failed' | 'logout',
    trigger: AdminAccessTrigger
  ) => {
    const entry: AdminLoginLogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      username: username.trim() || '(empty)',
      status,
      trigger,
      device: getDeviceSummary(),
    };

    setLoginLogs((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_LOGIN_LOGS);
      try {
        localStorage.setItem(STORAGE_KEY_LOGIN_LOGS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save admin login logs', e);
      }
      return updated;
    });
  };

  // Initialize content, login logs, and admin session state from localStorage
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }
    } catch (e) {
      console.error('Failed to parse saved CMS content', e);
    }

    try {
      const savedLogs = localStorage.getItem(STORAGE_KEY_LOGIN_LOGS);
      if (savedLogs) {
        const parsed = JSON.parse(savedLogs);
        if (Array.isArray(parsed)) {
          setLoginLogs(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to parse saved admin login logs', e);
    }

    try {
      const sessionHash = localStorage.getItem(STORAGE_KEY_SESSION);
      const savedUser = localStorage.getItem(STORAGE_KEY_ADMIN_USER);
      if (isValidSessionHash(sessionHash)) {
        setIsAdminLoggedIn(true);
        setCurrentAdminUser(savedUser || ADMIN_USERNAME);
        setIsLiveEditMode(true);
      }
    } catch (e) {
      console.error('Failed to verify admin session', e);
    }
  }, []);

  // Check URL path, hash, or query on mount, popstate, and hashchange for /cpanel
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const hash = window.location.hash.toLowerCase().replace(/\/+$/, '');
      const search = new URLSearchParams(window.location.search);

      if (
        path === '/cpanel' ||
        path.endsWith('/cpanel') ||
        hash === '#cpanel' ||
        hash === '#/cpanel' ||
        search.has('cpanel')
      ) {
        const sessionHash = localStorage.getItem(STORAGE_KEY_SESSION);
        if (!isValidSessionHash(sessionHash)) {
          setAdminTrigger('cpanel');
          setIsAdminModalOpen(true);
        } else {
          setIsAdminLoggedIn(true);
          setIsLiveEditMode(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  // Keyboard shortcut: Cmd + Shift + L (Mac) or Ctrl + Shift + L (Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'l' || e.code === 'KeyL')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsLiveEditMode((prev) => !prev);
        } else {
          setAdminTrigger('shortcut');
          setIsAdminModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const openAdminModal = (trigger: AdminAccessTrigger = 'portal') => {
    setAdminTrigger(trigger);
    setIsAdminModalOpen(true);
  };

  const getContent = (key: string, defaultValue: string): string => {
    return content[key] !== undefined ? content[key] : defaultValue;
  };

  const updateContent = (key: string, value: string) => {
    setContent((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save CMS content', e);
      }
      return updated;
    });
  };

  const updateMultipleContent = (updates: Record<string, string>) => {
    setContent((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save CMS content', e);
      }
      return updated;
    });
  };

  const resetContentKey = (key: string) => {
    setContent((prev) => {
      const updated = { ...prev };
      delete updated[key];
      try {
        localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save CMS content', e);
      }
      return updated;
    });
  };

  const resetContent = () => {
    setContent({});
    localStorage.removeItem(STORAGE_KEY_CONTENT);
  };

  const loginAdmin = async (username: string, password: string): Promise<boolean> => {
    const cleanUsername = username.trim();
    const isUserValid = verifyUsername(cleanUsername);
    const isPassValid = await verifyPassword(password);

    if (isUserValid && isPassValid) {
      const hash = await hashPassword(password);
      localStorage.setItem(STORAGE_KEY_SESSION, hash);
      localStorage.setItem(STORAGE_KEY_ADMIN_USER, cleanUsername);
      appendLoginLog(cleanUsername, 'success', adminTrigger);
      setCurrentAdminUser(cleanUsername);
      setIsAdminLoggedIn(true);
      setIsLiveEditMode(true);
      setIsAdminModalOpen(false);
      return true;
    }

    appendLoginLog(cleanUsername, 'failed', adminTrigger);
    return false;
  };

  const logoutAdmin = () => {
    appendLoginLog(currentAdminUser, 'logout', 'portal');
    localStorage.removeItem(STORAGE_KEY_SESSION);
    localStorage.removeItem(STORAGE_KEY_ADMIN_USER);
    setIsAdminLoggedIn(false);
    setIsLiveEditMode(false);
    setIsAdminDrawerOpen(false);
  };

  const changePassword = async (newPassword: string): Promise<void> => {
    await updateAdminPassword(newPassword);
    const newHash = await hashPassword(newPassword);
    localStorage.setItem(STORAGE_KEY_SESSION, newHash);
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        getContent,
        updateContent,
        updateMultipleContent,
        resetContentKey,
        resetContent,
        isAdminLoggedIn,
        currentAdminUser,
        isLiveEditMode,
        setIsLiveEditMode,
        loginAdmin,
        logoutAdmin,
        changePassword,
        isAdminModalOpen,
        setIsAdminModalOpen,
        openAdminModal,
        isAdminDrawerOpen,
        setIsAdminDrawerOpen,
        loginLogs,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
