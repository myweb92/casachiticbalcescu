import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Pencil, Check, X, RotateCcw } from 'lucide-react';
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
  const { getContent, updateContent, resetContentKey, isLiveEditMode } = useCMS();
  const currentText = getContent(contentKey, defaultText);
  const isModified = currentText !== defaultText;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(currentText);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number }>({
    top: 100,
    left: 20,
    width: 340,
  });
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setEditText(currentText);
  }, [currentText]);

  const handleSave = (e?: React.MouseEvent | React.FormEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (editText === defaultText) {
      resetContentKey(contentKey);
    } else {
      updateContent(contentKey, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEditText(currentText);
    setIsEditing(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resetContentKey(contentKey);
    setEditText(defaultText);
    setIsEditing(false);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (isLiveEditMode) {
      e.preventDefault();
      e.stopPropagation();
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const popoverWidth = Math.min(Math.max(rect.width, 320), Math.min(440, window.innerWidth - 24));
        const estimatedHeight = multiline ? 220 : 145;
        const left = Math.max(12, Math.min(rect.left, window.innerWidth - popoverWidth - 12));
        let top = rect.bottom + 8;
        if (top + estimatedHeight > window.innerHeight - 12) {
          top = Math.max(12, rect.top - estimatedHeight - 8);
        }
        setPopoverPos({ top, left, width: popoverWidth });
      }
      setEditText(currentText);
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

  const renderedContent = React.createElement(
    Component,
    { className },
    currentText
  );

  return (
    <>
      <span
        ref={containerRef}
        onClick={handleContainerClick}
        className={`relative group inline-block cursor-pointer outline-none transition-all duration-200 ${
          isLiveEditMode
            ? 'ring-2 ring-dashed ring-[#A67C52]/70 hover:ring-2 hover:ring-solid hover:ring-[#A67C52] hover:bg-[#A67C52]/10 rounded px-1 -mx-1'
            : ''
        }`}
        title={`Click to edit: ${contentKey}`}
        id={id ? `editable-${id}` : undefined}
      >
        {renderedContent}

        {/* Edit Overlay Badge */}
        <span className="absolute -top-3 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#A67C52] text-white text-[9px] font-sans font-bold tracking-widest px-1.5 py-0.5 rounded shadow flex items-center gap-1 uppercase pointer-events-none z-20 whitespace-nowrap">
          <Pencil size={9} /> Edit
        </span>
      </span>

      {/* Portal Popover Editor — prevents clipping inside overflow-hidden or invalid nesting inside <a>/<button> */}
      {isEditing &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000]"
            onClick={handleCancel}
          >
            <div
              style={{
                top: `${popoverPos.top}px`,
                left: `${popoverPos.left}px`,
                width: `${popoverPos.width}px`,
              }}
              className="fixed p-3 bg-white border-2 border-[#A67C52] shadow-2xl rounded-md space-y-2.5 text-left font-sans normal-case tracking-normal text-[#1A1A1A]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center gap-2 text-[10px] uppercase font-bold text-[#A67C52] tracking-wider">
                <span className="truncate font-mono">{contentKey}</span>
                <div className="flex items-center gap-1 shrink-0">
                  {isModified && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Reset to default text"
                    >
                      <RotateCcw size={11} /> Reset
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-[#A67C52] hover:bg-[#8E6A46] text-white px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Save changes"
                  >
                    <Check size={12} /> Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
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
                  className="w-full p-2.5 text-sm text-[#1A1A1A] font-sans border border-neutral-300 focus:outline-none focus:border-[#A67C52] rounded bg-neutral-50 min-h-[110px] leading-relaxed"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') handleCancel(e);
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave(e);
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2.5 text-sm text-[#1A1A1A] font-sans border border-neutral-300 focus:outline-none focus:border-[#A67C52] rounded bg-neutral-50"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave(e);
                    if (e.key === 'Escape') handleCancel(e);
                  }}
                />
              )}

              <p className="text-[10px] text-neutral-400">
                {multiline ? 'Press Ctrl+Enter to save or Esc to cancel' : 'Press Enter to save or Esc to cancel'}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
