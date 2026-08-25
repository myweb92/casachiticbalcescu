import React from 'react';
import { Shield, ToggleLeft, ToggleRight, Settings, LogOut, CheckCircle, Edit3 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function LiveAdminToolbar() {
  const {
    isAdminLoggedIn,
    isLiveEditMode,
    setIsLiveEditMode,
    setIsAdminDrawerOpen,
    logoutAdmin,
  } = useCMS();

  if (!isAdminLoggedIn) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9990] bg-[#1A1A1A] text-white border-b-2 border-[#A67C52] shadow-2xl px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-sans select-none"
      id="live-admin-toolbar"
    >
      {/* Left: Admin Mode Badge */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-[#A67C52] font-bold tracking-wider uppercase">
          <Shield size={16} />
          <span>Casa Chitic CMS</span>
        </div>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="hidden sm:inline-block text-[11px] text-neutral-400">
          Admin Session Active
        </span>
      </div>

      {/* Center / Right: Live Edit Switch & Controls */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 bg-neutral-900/80 px-3 py-1 rounded-full border border-neutral-700">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-300">
            Live Edit:
          </span>
          <button
            onClick={() => setIsLiveEditMode(!isLiveEditMode)}
            className={`flex items-center gap-1.5 font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
              isLiveEditMode
                ? 'bg-[#A67C52] text-white'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Live On-Page Edit Mode"
            id="live-edit-toggle-btn"
          >
            {isLiveEditMode ? (
              <>
                <ToggleRight size={18} /> <span className="text-[10px] uppercase tracking-wider">ON</span>
              </>
            ) : (
              <>
                <ToggleLeft size={18} /> <span className="text-[10px] uppercase tracking-wider">OFF</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Action: Open Admin Drawer */}
        <button
          onClick={() => setIsAdminDrawerOpen(true)}
          className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded border border-neutral-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          id="open-admin-drawer-btn"
        >
          <Settings size={14} className="text-[#A67C52]" />
          <span className="hidden md:inline">Content</span> Panel
        </button>

        {/* Exit Session / Logout */}
        <button
          onClick={logoutAdmin}
          className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-white px-3 py-1.5 rounded border border-red-800/50 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          id="admin-logout-btn"
        >
          <LogOut size={13} />
          <span>Exit Session</span>
        </button>
      </div>
    </div>
  );
}
