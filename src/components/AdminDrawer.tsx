import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  RotateCcw,
  Key,
  Save,
  Search,
  Check,
  FileText,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  FileCheck,
  BookOpen,
  History,
  Download,
  CheckCircle2,
  XCircle,
  LogOut,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { verifyPassword } from '../utils/crypto';

export default function AdminDrawer() {
  const {
    isAdminDrawerOpen,
    setIsAdminDrawerOpen,
    content,
    updateContent,
    resetContentKey,
    resetContent,
    changePassword,
    loginLogs,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'content' | 'terms' | 'privacy' | 'logs' | 'password'>('content');
  const [logFilter, setLogFilter] = useState<'all' | 'success' | 'failed' | 'logout'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Editing state for key-value CMS entries
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  // Password change state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  // Legal document editing state
  const [termsText, setTermsText] = useState(content['terms.custom_text'] || DEFAULT_TERMS_EDIT);
  const [termsSuccess, setTermsSuccess] = useState(false);
  const [privacyText, setPrivacyText] = useState(content['privacy.custom_text'] || DEFAULT_PRIVACY_EDIT);
  const [privacySuccess, setPrivacySuccess] = useState(false);

  useEffect(() => {
    setTermsText(content['terms.custom_text'] || DEFAULT_TERMS_EDIT);
  }, [content['terms.custom_text']]);

  useEffect(() => {
    setPrivacyText(content['privacy.custom_text'] || DEFAULT_PRIVACY_EDIT);
  }, [content['privacy.custom_text']]);

  if (!isAdminDrawerOpen) return null;

  const contentEntries = Object.entries(content) as [string, string][];
  const filteredEntries = contentEntries.filter(
    ([key, val]) =>
      key.toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(val).toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleStartEdit = (key: string, val: string) => {
    setEditingKey(key);
    setEditingValue(val);
  };

  const handleSaveEdit = (key: string) => {
    updateContent(key, editingValue);
    setEditingKey(null);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess(false);

    if (!oldPass) {
      setPassError('Please enter your current password.');
      return;
    }

    if (!newPass) {
      setPassError('Please enter your new password.');
      return;
    }

    if (newPass.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    if (newPass !== confirmPass) {
      setPassError('New password and confirmation do not match.');
      return;
    }

    setPassLoading(true);

    try {
      const isOldCorrect = await verifyPassword(oldPass);
      if (!isOldCorrect) {
        setPassError('Current password is incorrect.');
        setPassLoading(false);
        return;
      }

      await changePassword(newPass);
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
      setPassSuccess(true);
      setTimeout(() => setPassSuccess(false), 4000);
    } catch (err) {
      setPassError('Failed to update password. Please try again.');
    } finally {
      setPassLoading(false);
    }
  };

  const handleSaveTerms = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('terms.custom_text', termsText);
    setTermsSuccess(true);
    setTimeout(() => setTermsSuccess(false), 3000);
  };

  const handleSavePrivacy = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('privacy.custom_text', privacyText);
    setPrivacySuccess(true);
    setTimeout(() => setPrivacySuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all CMS live edits back to default content?')) {
      resetContent();
      setTermsText(DEFAULT_TERMS_EDIT);
      setPrivacyText(DEFAULT_PRIVACY_EDIT);
    }
  };

  const handleExportLogsCsv = () => {
    const header = ['Timestamp', 'Username', 'Status', 'Access Trigger', 'Device'];
    const rows = loginLogs.map((entry) => [
      entry.timestamp,
      entry.username,
      entry.status,
      entry.trigger,
      entry.device,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `casachitic-admin-login-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredLogs = loginLogs.filter((entry) =>
    logFilter === 'all' ? true : entry.status === logFilter
  );
  const successLogCount = loginLogs.filter((l) => l.status === 'success').length;
  const failedLogCount = loginLogs.filter((l) => l.status === 'failed').length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex justify-end bg-black/60 backdrop-blur-sm font-sans">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col font-sans text-[#1A1A1A]"
        >
          {/* Drawer Header */}
          <div className="bg-[#1A1A1A] text-white p-5 flex items-center justify-between border-b border-[#A67C52]/40 shrink-0">
            <div>
              <h2 className="font-serif text-xl font-bold">Hotel Owner Admin Portal</h2>
              <p className="text-[10px] text-[#A67C52] font-bold uppercase tracking-widest mt-0.5">
                Casa Chitic Management Engine
              </p>
            </div>
            <button
              onClick={() => setIsAdminDrawerOpen(false)}
              className="text-neutral-400 hover:text-white p-1 cursor-pointer transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="bg-[#262626] text-white flex border-b border-neutral-800 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'content'
                  ? 'border-[#A67C52] text-white bg-neutral-800'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <FileText size={15} className="text-[#A67C52]" />
              <span>Site Content ({contentEntries.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'terms'
                  ? 'border-[#A67C52] text-white bg-neutral-800'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <BookOpen size={15} className="text-[#A67C52]" />
              <span>Terms &amp; Conditions</span>
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'privacy'
                  ? 'border-[#A67C52] text-white bg-neutral-800'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <FileCheck size={15} className="text-[#A67C52]" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'logs'
                  ? 'border-[#A67C52] text-white bg-neutral-800'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <History size={15} className="text-[#A67C52]" />
              <span>Login Logs ({loginLogs.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'password'
                  ? 'border-[#A67C52] text-white bg-neutral-800'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Key size={15} className="text-[#A67C52]" />
              <span>Change Password</span>
            </button>
          </div>

          {/* TAB 1: SITE CONTENT */}
          {activeTab === 'content' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F9F8F6]">
              {/* Toolbar */}
              <div className="p-4 border-b border-neutral-200 bg-white flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="relative w-full sm:w-72">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search custom fields..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#A67C52]"
                  />
                </div>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-3 py-1.5 border border-red-300 hover:bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw size={13} /> Reset All Content
                </button>
              </div>

              {/* Entries list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-16 text-neutral-500 space-y-3">
                    <FileText size={36} className="mx-auto text-neutral-300" />
                    <p className="text-xs font-sans max-w-sm mx-auto leading-relaxed">
                      {contentEntries.length === 0
                        ? 'No live edits created yet. Hover over any text or image on the site in Live Edit Mode to edit it directly!'
                        : 'No customized fields match your search query.'}
                    </p>
                  </div>
                ) : (
                  filteredEntries.map(([key, val]) => (
                    <div key={key} className="p-3.5 bg-white border border-[#DED9D2] rounded shadow-sm space-y-2">
                      <div className="flex justify-between items-center gap-2 text-[10px] font-bold text-[#A67C52] uppercase tracking-wider">
                        <span className="truncate max-w-[280px] font-mono">{key}</span>
                        {editingKey !== key && (
                          <div className="flex items-center gap-3 shrink-0">
                            <button
                              onClick={() => handleStartEdit(key, val)}
                              className="text-neutral-600 hover:text-[#A67C52] font-semibold underline cursor-pointer"
                            >
                              Edit Field
                            </button>
                            <button
                              onClick={() => resetContentKey(key)}
                              className="text-red-500 hover:text-red-700 font-semibold underline cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                        )}
                      </div>

                      {editingKey === key ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            className="w-full p-2.5 text-xs font-sans border border-neutral-300 rounded focus:outline-none focus:border-[#A67C52] min-h-[80px]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingKey(null)}
                              className="px-3 py-1 text-[10px] font-bold uppercase border border-neutral-300 rounded hover:bg-neutral-100 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(key)}
                              className="px-3.5 py-1 text-[10px] font-bold uppercase bg-[#A67C52] hover:bg-[#8E6A46] text-white rounded flex items-center gap-1 cursor-pointer shadow-sm"
                            >
                              <Save size={12} /> Save
                            </button>
                          </div>
                        </div>
                      ) : val.startsWith('data:image') || key.includes('.image') || key === 'brand.logo' ? (
                        <div className="flex items-center gap-3 bg-neutral-50 p-2 rounded border border-neutral-100">
                          <img
                            src={val}
                            alt={key}
                            className="w-16 h-12 object-cover rounded border border-neutral-200 shrink-0 bg-neutral-200"
                          />
                          <p className="text-[11px] text-neutral-600 font-mono truncate">
                            {val.startsWith('data:image') ? '[Uploaded Custom Image]' : val}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-700 font-sans break-words bg-neutral-50 p-2.5 rounded border border-neutral-100 max-h-24 overflow-y-auto">
                          {val}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <form onSubmit={handleSaveTerms} className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#F9F8F6] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Edit Terms &amp; Conditions</h3>
                  <p className="text-xs text-neutral-500">
                    Modify the website's legal terms. Changes save immediately to local state.
                  </p>
                </div>
                {termsSuccess && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                    <Check size={14} /> Saved Terms &amp; Conditions!
                  </span>
                )}
              </div>

              <textarea
                value={termsText}
                onChange={(e) => setTermsText(e.target.value)}
                rows={16}
                className="w-full flex-1 p-4 bg-white border border-neutral-300 focus:border-[#A67C52] focus:outline-none text-xs font-mono rounded shadow-inner leading-relaxed"
                placeholder="Enter custom Terms & Conditions text..."
              />

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setTermsText(DEFAULT_TERMS_EDIT)}
                  className="text-xs text-neutral-500 hover:text-neutral-800 underline cursor-pointer"
                >
                  Restore Default Terms Text
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save size={15} /> Save Terms &amp; Conditions
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <form onSubmit={handleSavePrivacy} className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#F9F8F6] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Edit Privacy Policy</h3>
                  <p className="text-xs text-neutral-500">
                    Modify the website's privacy and data protection rules.
                  </p>
                </div>
                {privacySuccess && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                    <Check size={14} /> Saved Privacy Policy!
                  </span>
                )}
              </div>

              <textarea
                value={privacyText}
                onChange={(e) => setPrivacyText(e.target.value)}
                rows={16}
                className="w-full flex-1 p-4 bg-white border border-neutral-300 focus:border-[#A67C52] focus:outline-none text-xs font-mono rounded shadow-inner leading-relaxed"
                placeholder="Enter custom Privacy Policy text..."
              />

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setPrivacyText(DEFAULT_PRIVACY_EDIT)}
                  className="text-xs text-neutral-500 hover:text-neutral-800 underline cursor-pointer"
                >
                  Restore Default Privacy Text
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save size={15} /> Save Privacy Policy
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: LOGIN LOGS */}
          {activeTab === 'logs' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F9F8F6]">
              {/* Stats & Actions Toolbar */}
              <div className="p-4 border-b border-neutral-200 bg-white space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Admin Access Audit Log</h3>
                    <p className="text-[11px] text-neutral-500">
                      Tracks successful logins, failed password/username attempts, and session sign-outs.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExportLogsCsv}
                      disabled={loginLogs.length === 0}
                      className="px-3 py-1.5 border border-[#DED9D2] hover:bg-neutral-100 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                    >
                      <Download size={13} className="text-[#A67C52]" /> Export CSV
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5">
                    {(['all', 'success', 'failed', 'logout'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setLogFilter(status)}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                          logFilter === status
                            ? 'bg-[#A67C52] text-white'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-emerald-700 font-semibold">
                      Success: {successLogCount}
                    </span>
                    <span className="text-red-700 font-semibold">
                      Failed: {failedLogCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Log Entries */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {filteredLogs.length === 0 ? (
                  <div className="text-center py-16 text-neutral-500 space-y-2">
                    <History size={34} className="mx-auto text-neutral-300" />
                    <p className="text-xs">No login events recorded for this filter yet.</p>
                  </div>
                ) : (
                  filteredLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-3.5 bg-white border border-[#DED9D2] rounded shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {entry.status === 'success' && (
                            <CheckCircle2 size={17} className="text-emerald-600" />
                          )}
                          {entry.status === 'failed' && (
                            <XCircle size={17} className="text-red-600" />
                          )}
                          {entry.status === 'logout' && (
                            <LogOut size={16} className="text-neutral-500" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-[#1A1A1A] font-mono">
                              {entry.username}
                            </span>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                entry.status === 'success'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : entry.status === 'failed'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                              }`}
                            >
                              {entry.status}
                            </span>
                            <span className="text-[10px] text-[#A67C52] font-semibold uppercase tracking-wider">
                              via /{entry.trigger}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500">{entry.device}</p>
                        </div>
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono sm:text-right shrink-0">
                        {new Date(entry.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: CHANGE PASSWORD */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="flex-1 p-6 overflow-y-auto bg-[#F9F8F6] space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Change Admin Password</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Update your administrator authentication password. Your new password will be hashed using salted SHA-256 before saving to session memory.
                </p>
              </div>

              {passError && (
                <div className="p-3.5 bg-red-50 border border-red-300 text-red-700 text-xs rounded flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>{passError}</span>
                </div>
              )}

              {passSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Password Updated Successfully!</strong>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Your admin password has been changed and salted SHA-256 credentials have been saved.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4 max-w-md bg-white p-6 border border-[#DED9D2] rounded shadow-sm">
                {/* Current Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type={showOldPass ? 'text' : 'password'}
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="Enter current password..."
                      className="w-full pl-9 pr-10 py-2 bg-neutral-50 border border-neutral-300 focus:border-[#A67C52] focus:bg-white focus:outline-none text-xs rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPass(!showOldPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer"
                    >
                      {showOldPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                    New Password
                  </label>
                  <div className="relative">
                    <Key size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new password (min. 6 chars)..."
                      className="w-full pl-9 pr-10 py-2 bg-neutral-50 border border-neutral-300 focus:border-[#A67C52] focus:bg-white focus:outline-none text-xs rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer"
                    >
                      {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Key size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Confirm new password..."
                      className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-300 focus:border-[#A67C52] focus:bg-white focus:outline-none text-xs rounded"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={passLoading}
                    className="w-full py-2.5 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow disabled:opacity-50"
                  >
                    <ShieldCheck size={16} />
                    <span>{passLoading ? 'Updating Hash...' : 'Update Password'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Drawer Footer */}
          <div className="p-3 bg-[#F5F2ED] border-t border-[#DED9D2] text-center text-[10px] text-neutral-500 shrink-0">
            Casa Chitic Bălcescu • Secure SHA-256 Administration Engine
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const DEFAULT_TERMS_EDIT = `Terms and Conditions - Casa Chitic Bălcescu

Last updated: 24 JULY 2026

These Terms and Conditions (“Terms”) govern the use of https://casachiticbalcescu.ro/ (the “Website”) and the services provided by CCB HOTELS SRL at Casa Chitic Bălcescu, Str. Nicolae Bălcescu 13, Brașov. Accessing the Website, making a reservation or using our services constitutes full and unconditional acceptance of these Terms.

Operator: CCB HOTELS SRL, Address: Comuna Cristian, Sat Cristian, Nicolae Iorga 32, Brașov County, VAT RO39174576, Trade Registry: J2018000815087, e-mail: office@casachiticbalcescu.ro, phone: +40 731 002 138.

1. Definitions
- Operator/We – CCB HOTELS SRL.
- Client/Guest – any natural/legal person using the Website, making reservations or benefiting from services.
- Services – accommodation, F&B (restaurant/bar), events and related services.

2. Scope
These Terms apply to legal relationships regarding Website use, reservations, accommodation, and events.

3. Website use
The Website is provided “as is”. Content, rates and availability may be modified without notice.

4. Reservations & Payments
Reservations are confirmed upon manual or automatic processing. Rates include applicable VAT.

5. Check-in & House Rules
Standard check-in from 14:00. Guests must provide valid government-issued ID upon arrival.

6. Contact Details
CCB HOTELS SRL • Str. Nicolae Bălcescu 13, Brașov, Romania
Email: office@casachiticbalcescu.ro | Tel: +40 731 002 138`;

const DEFAULT_PRIVACY_EDIT = `Privacy Policy & Guest Data Notice - Casa Chitic Bălcescu

1. SMS and Text Messaging Policy
We use a guest messaging platform to communicate with you regarding your stay. By providing your phone number during the booking process, you consent to receive text messages from the property.
- Purpose: Text messaging may be used to send check-in instructions, access information, room readiness updates, and respond to stay requests.
- Opt-Out: Reply STOP to any message at any time to unsubscribe.
- Privacy of Mobile Data: No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.

2. Data Protection & Rights
Processing takes place under applicable EU and Romanian hospitality data protection laws. Data subject rights (access, rectification, erasure, restriction) may be exercised by contacting office@casachiticbalcescu.ro.

3. CCTV Security
Common property areas are monitored for security. Camera footage is retained per statutory regulations.

4. Guest Wi-Fi Policy
Technical metadata (MAC address, IP, session duration) may be processed for security and network stability. Unlawful use is strictly prohibited.`;
