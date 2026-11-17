import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Camera, Upload, Link as LinkIcon, Check, X, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface EditableImageProps {
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  id?: string;
  compact?: boolean;
  alwaysShowTrigger?: boolean;
  triggerLabel?: string;
  triggerPositionClass?: string;
}

/**
 * Compresses large uploaded images client-side so base64 strings fit comfortably in localStorage.
 */
function compressImageFile(file: File, maxDim = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        reject(new Error('Empty image data.'));
        return;
      }

      // Skip canvas re-encoding for small files (< 220 KB) or SVGs
      if (file.size < 220 * 1024 || file.type === 'image/svg+xml') {
        resolve(dataUrl);
        return;
      }

      const img = new Image();
      img.onerror = () => resolve(dataUrl);
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const compressed = canvas.toDataURL(outputType, quality);
        resolve(compressed.length < dataUrl.length ? compressed : dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export default function EditableImage({
  contentKey,
  defaultSrc,
  alt,
  className = '',
  containerClassName = '',
  referrerPolicy,
  id,
  compact = false,
  alwaysShowTrigger = false,
  triggerLabel = 'Change Image',
  triggerPositionClass = 'top-3 right-3',
}: EditableImageProps) {
  const { getContent, updateContent, resetContentKey, isLiveEditMode } = useCMS();
  const currentSrc = getContent(contentKey, defaultSrc);
  const isModified = currentSrc !== defaultSrc;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState(currentSrc);
  const [previewSrc, setPreviewSrc] = useState(currentSrc);
  const [activeTab, setActiveTab] = useState<'url' | 'file'>('file');
  const [uploadError, setUploadError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    if (isLiveEditMode) {
      e.preventDefault();
      e.stopPropagation();
      setInputUrl(currentSrc);
      setPreviewSrc(currentSrc);
      setUploadError('');
      setIsModalOpen(true);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    setUploadError('');
    setIsProcessing(true);
    try {
      const optimizedDataUrl = await compressImageFile(file);
      setPreviewSrc(optimizedDataUrl);
      setInputUrl(optimizedDataUrl);
    } catch (err) {
      setUploadError('Could not process this image file. Try a smaller image or use an Image URL.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUploadError('');
    setInputUrl(val);
    setPreviewSrc(val);
  };

  const handleSave = () => {
    const trimmed = inputUrl.trim();
    if (trimmed) {
      if (trimmed === defaultSrc) {
        resetContentKey(contentKey);
      } else {
        updateContent(contentKey, trimmed);
      }
    }
    setIsModalOpen(false);
  };

  const handleReset = () => {
    resetContentKey(contentKey);
    setInputUrl(defaultSrc);
    setPreviewSrc(defaultSrc);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`relative ${isLiveEditMode ? 'group cursor-pointer' : ''} ${containerClassName}`}>
        <img
          src={currentSrc}
          alt={alt}
          className={className}
          referrerPolicy={referrerPolicy}
          id={id}
        />

        {/* Live Edit Mode Hover Overlay & Corner Badge */}
        {isLiveEditMode && (
          <div
            onClick={handleOpenModal}
            className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 cursor-pointer border-2 border-dashed border-[#A67C52]"
            title={`Click to edit image: ${contentKey}`}
          >
            {compact ? (
              <div className="bg-[#A67C52] text-white p-1.5 rounded-full shadow-lg">
                <Camera size={12} />
              </div>
            ) : (
              <div className="bg-[#A67C52] text-white px-3 py-1.5 rounded-sm shadow-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2">
                <Camera size={14} /> {triggerLabel}
              </div>
            )}
          </div>
        )}

        {/* Persistent subtle corner indicator when Live Edit Mode is active */}
        {isLiveEditMode && (
          <button
            type="button"
            onClick={handleOpenModal}
            className={`absolute z-20 bg-[#1A1A1A]/85 hover:bg-[#A67C52] text-white border border-[#A67C52] rounded-sm shadow-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              compact
                ? '-top-1.5 -right-1.5 p-1 rounded-full'
                : alwaysShowTrigger
                ? `${triggerPositionClass} px-3 py-1.5 text-[11px] font-sans font-bold uppercase tracking-wider`
                : 'top-2 right-2 px-2 py-1 text-[10px] font-sans font-bold uppercase tracking-wider opacity-90 group-hover:opacity-0'
            }`}
            title={`Edit image (${contentKey})`}
          >
            <Camera size={compact ? 10 : 12} />
            {!compact && <span>{alwaysShowTrigger ? triggerLabel : 'Edit'}</span>}
          </button>
        )}
      </div>

      {/* Image Editor Modal via Portal to escape any overflow-hidden / z-0 stacking context */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <div
              className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden rounded-md text-[#1A1A1A] font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#1A1A1A] p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2 min-w-0">
                  <ImageIcon size={18} className="text-[#A67C52] shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-medium leading-tight">Update Image</h3>
                    <p className="text-[10px] text-neutral-400 font-mono truncate">{contentKey}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {uploadError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                    {uploadError}
                  </div>
                )}

                {/* Tab Selector */}
                <div className="flex border-b border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab('file')}
                    className={`flex items-center gap-2 py-2 px-4 text-xs font-sans font-bold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'file'
                        ? 'border-[#A67C52] text-[#A67C52]'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <Upload size={14} /> Upload Local File
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('url')}
                    className={`flex items-center gap-2 py-2 px-4 text-xs font-sans font-bold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'url'
                        ? 'border-[#A67C52] text-[#A67C52]'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <LinkIcon size={14} /> Image URL
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'file' ? (
                  <div className="space-y-3">
                    <p className="text-xs text-neutral-500 font-sans">
                      Select an image file (PNG, JPG, WebP) from your computer or phone. Large images are automatically optimized.
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      className="w-full py-4 border-2 border-dashed border-[#A67C52]/50 hover:border-[#A67C52] bg-[#F5F2ED] hover:bg-[#EBE7E0] text-[#1A1A1A] text-xs font-sans font-bold tracking-wider uppercase rounded transition-colors flex flex-col items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Upload size={24} className="text-[#A67C52]" />
                      <span>{isProcessing ? 'Optimizing Image...' : 'Choose Image File...'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs font-sans font-bold text-neutral-700 uppercase tracking-wider block">
                      Direct Image URL
                    </label>
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={handleUrlChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full p-2.5 text-xs text-[#1A1A1A] border border-neutral-300 rounded focus:outline-none focus:border-[#A67C52]"
                    />
                  </div>
                )}

                {/* Image Preview */}
                {previewSrc && (
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 font-sans">Preview</p>
                    <div className="relative aspect-video max-h-48 overflow-hidden rounded bg-neutral-100 border border-neutral-200">
                      <img
                        src={previewSrc}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setUploadError('Could not load image preview from this URL.')}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-neutral-50 p-4 border-t border-neutral-200 flex justify-between items-center gap-3">
                <div>
                  {isModified && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3 py-2 text-xs font-sans font-bold uppercase tracking-wider text-neutral-600 hover:text-red-600 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <RotateCcw size={13} /> Reset Default
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-neutral-300 text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isProcessing}
                    className="px-5 py-2 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer rounded disabled:opacity-50"
                  >
                    <Check size={14} /> Apply Image
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
