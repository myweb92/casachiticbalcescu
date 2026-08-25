import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface EditableTextProps {
  contentKey: string;
  defaultText: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'a';
  className?: string;
  multiline?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  id?: string;
  style?: React.CSSProperties;
}

export default function EditableText({
  contentKey,
  defaultText,
  as: Component = 'span',
  className = '',
  multiline = false,
  href,
  target,
  rel,
  onClick,
  id,
  style,
}: EditableTextProps) {
  const { getContent, updateContent, isLiveEditMode } = useCMS();
  const currentText = getContent(contentKey, defaultText);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(currentText);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditText(currentText);
  }, [currentText]);

  // Handle saving
  const handleSave = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    updateContent(contentKey, editText);
    setIsEditing(false);
  };

  // Handle cancel
  const handleCancel = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEditText(currentText);
    setIsEditing(false);
  };

  // Click on wrapper when in edit mode
  const handleContainerClick = (e: React.MouseEvent) => {
    if (isLiveEditMode) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
    } else if (onClick) {
      onClick(e);
    }
  };

  // If not live edit mode and not editing, render standard tag
  if (!isLiveEditMode && !isEditing) {
    if (Component === 'a') {
      return (
        <a href={href} target={target} rel={rel} className={className} onClick={onClick} id={id} style={style}>
          {currentText}
        </a>
      );
    }
    return React.createElement(
      Component,
      { className, onClick, id, style },
      currentText
    );
  }

  // Active Inline Editing Controls
  if (isEditing) {
    return (
      <div className="relative inline-block w-full z-30" onClick={(e) => e.stopPropagation()}>
        <div className="p-2 bg-white border-2 border-[#A67C52] shadow-xl rounded-md space-y-2 text-left">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#A67C52] tracking-wider font-sans">
            <span>Editing: {contentKey}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={handleSave}
                className="bg-[#A67C52] hover:bg-[#8E6A46] text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                title="Save changes"
              >
                <Check size={12} /> Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                title="Cancel"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {multiline ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 text-sm text-[#1A1A1A] font-sans border border-neutral-300 focus:outline-none focus:border-[#A67C52] rounded bg-neutral-50 min-h-[90px]"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 text-sm text-[#1A1A1A] font-sans border border-neutral-300 focus:outline-none focus:border-[#A67C52] rounded bg-neutral-50"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave(e);
                if (e.key === 'Escape') handleCancel();
              }}
            />
          )}
        </div>
      </div>
    );
  }

  // Live Edit Mode Hover State (Gold dashed border & Edit badge)
  const renderedContent = React.createElement(
    Component,
    { className },
    currentText
  );

  return (
    <span
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative group inline-block cursor-pointer outline-none transition-all duration-200 ${
        isLiveEditMode
          ? 'ring-2 ring-dashed ring-[#A67C52]/70 hover:ring-2 hover:ring-solid hover:ring-[#A67C52] hover:bg-[#A67C52]/10 rounded px-1 -mx-1'
          : ''
      }`}
      title="Click to edit text"
      id={id ? `editable-${id}` : undefined}
    >
      {renderedContent}
      
      {/* Edit Overlay Badge */}
      <span className="absolute -top-3 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#A67C52] text-white text-[9px] font-sans font-bold tracking-widest px-1.5 py-0.5 rounded shadow flex items-center gap-1 uppercase pointer-events-none z-20">
        <Pencil size={9} /> Edit
      </span>
    </span>
  );
}
