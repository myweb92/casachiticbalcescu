import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { verifyPassword, updateAdminPassword, DEFAULT_ADMIN_HASH, hashPassword } from '../utils/crypto';

interface CMSContextType {
  content: Record<string, string>;
  getContent: (key: string, defaultValue: string) => string;
  updateContent: (key: string, value: string) => void;
  updateMultipleContent: (updates: Record<string, string>) => void;
  resetContent: () => void;
  isAdminLoggedIn: boolean;
  isLiveEditMode: boolean;
  setIsLiveEditMode: (on: boolean) => void;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  changePassword: (newPassword: string) => Promise<void>;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminDrawerOpen: boolean;
  setIsAdminDrawerOpen: (open: boolean) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY_CONTENT = 'casachitic_cms_content';
const STORAGE_KEY_SESSION = 'casachitic_admin_session';

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isLiveEditMode, setIsLiveEditMode] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState<boolean>(false);

  // Initialize content and admin session state from localStorage
  useEffect(() => {
    // 1. Load CMS content overrides
    try {
      const savedContent = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }
    } catch (e) {
      console.error('Failed to parse saved CMS content', e);
    }

    // 2. Load Admin Session (Verify stored salted SHA-256 token against active password hash)
    try {
      const sessionHash = localStorage.getItem(STORAGE_KEY_SESSION);
      const activeHash = localStorage.getItem('casachitic_admin_hash') || DEFAULT_ADMIN_HASH;
      if (sessionHash && sessionHash === activeHash) {
        setIsAdminLoggedIn(true);
        setIsLiveEditMode(true);
      }
    } catch (e) {
      console.error('Failed to verify admin session', e);
    }
  }, []);

  // Check URL path or hash on mount and popstate for /padmin
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/padmin' || path.endsWith('/padmin') || hash === '#padmin') {
        const sessionHash = localStorage.getItem(STORAGE_KEY_SESSION);
        const activeHash = localStorage.getItem('casachitic_admin_hash') || DEFAULT_ADMIN_HASH;
        if (!sessionHash || sessionHash !== activeHash) {
          setIsAdminModalOpen(true);
        } else {
          setIsAdminLoggedIn(true);
          setIsLiveEditMode(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    return () => window.removeEventListener('popstate', checkAdminRoute);
  }, []);

  // Keyboard shortcut: Ctrl + Shift + L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsLiveEditMode(prev => !prev);
        } else {
          setIsAdminModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const getContent = (key: string, defaultValue: string): string => {
    return content[key] !== undefined ? content[key] : defaultValue;
  };

  const updateContent = (key: string, value: string) => {
    setContent(prev => {
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
    setContent(prev => {
      const updated = { ...prev, ...updates };
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

  const loginAdmin = async (password: string): Promise<boolean> => {
    const isValid = await verifyPassword(password);
    if (isValid) {
      // Store ONLY the salted SHA-256 hash in session storage/localStorage
      const hash = await hashPassword(password);
      localStorage.setItem(STORAGE_KEY_SESSION, hash);
      setIsAdminLoggedIn(true);
      setIsLiveEditMode(true);
      setIsAdminModalOpen(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    localStorage.removeItem(STORAGE_KEY_SESSION);
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
        resetContent,
        isAdminLoggedIn,
        isLiveEditMode,
        setIsLiveEditMode,
        loginAdmin,
        logoutAdmin,
        changePassword,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminDrawerOpen,
        setIsAdminDrawerOpen,
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
