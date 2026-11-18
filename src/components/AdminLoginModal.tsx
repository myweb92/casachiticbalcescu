import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, KeyRound, User, X, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function AdminLoginModal() {
  const { isAdminModalOpen, setIsAdminModalOpen, loginAdmin } = useCMS();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await loginAdmin(username, password);
      if (!success) {
        setError('Invalid username or password. Access denied.');
      } else {
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setPassword(''); // Clear plain password state immediately for security
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    setIsAdminModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#1A1A1A] text-white border border-[#A67C52]/50 rounded-lg shadow-2xl overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A67C52]/20 border border-[#A67C52] flex items-center justify-center text-[#A67C52]">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Hotel Owner Access</h3>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
                  Control Panel Authentication
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-950/80 border border-red-800/80 text-red-200 text-xs rounded flex items-start gap-2">
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username..."
                  autoComplete="username"
                  className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-[#A67C52] focus:outline-none text-white text-sm rounded transition-colors"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-[#A67C52] focus:outline-none text-white text-sm rounded transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-1/3 py-2.5 border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-2.5 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                <ShieldCheck size={16} />
                <span>{loading ? 'Verifying...' : 'Unlock Control Panel'}</span>
              </button>
            </div>
          </form>

          {/* Security Note Footer */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-900 text-center">
            <p className="text-[9px] text-neutral-500 font-sans tracking-wide">
              🔒 Salted SHA-256 authentication • All login attempts are logged.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
