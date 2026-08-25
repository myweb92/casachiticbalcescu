import React, { useState, useRef } from 'react';
import { Camera, Upload, Link as LinkIcon, Check, X, Image as ImageIcon } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface EditableImageProps {
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  id?: string;
}

export default function EditableImage({
  contentKey,
  defaultSrc,
  alt,
  className = '',
  containerClassName = '',
  referrerPolicy,
  id,
}: EditableImageProps) {
  const { getContent, updateContent, isLiveEditMode } = useCMS();
  const currentSrc = getContent(contentKey, defaultSrc);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState(currentSrc);
  const [previewSrc, setPreviewSrc] = useState(currentSrc);
  const [activeTab, setActiveTab] = useState<'url' | 'file'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    if (isLiveEditMode) {
      e.preventDefault();
      e.stopPropagation();
      setInputUrl(currentSrc);
      setPreviewSrc(currentSrc);
      setIsModalOpen(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, WebP, etc.)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setPreviewSrc(dataUrl);
          setInputUrl(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputUrl(val);
    setPreviewSrc(val);
  };

  const handleSave = () => {
    if (inputUrl) {
      updateContent(contentKey, inputUrl);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={`relative ${isLiveEditMode ? 'group cursor-pointer' : ''} ${containerClassName}`}>
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        referrerPolicy={referrerPolicy}
        id={id}
      />

      {/* Live Edit Mode Overlay Badge */}
      {isLiveEditMode && (
        <div
          onClick={handleOpenModal}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 cursor-pointer border-2 border-dashed border-[#A67C52]"
        >
          <div className="bg-[#A67C52] text-white px-3 py-1.5 rounded-sm shadow-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2">
            <Camera size={14} /> Change Image
          </div>
        </div>
      )}

      {/* Image Editor Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <div
            className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden rounded-md text-[#1A1A1A]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1A1A1A] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-[#A67C52]" />
                <h3 className="font-serif text-lg font-medium">Update Image</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Tab Selector */}
              <div className="flex border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('file')}
                  className={`flex items-center gap-2 py-2 px-4 text-xs font-sans font-bold tracking-wider uppercase border-b-2 transition-colors ${
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
                  className={`flex items-center gap-2 py-2 px-4 text-xs font-sans font-bold tracking-wider uppercase border-b-2 transition-colors ${
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
                    Select an image file (PNG, JPG, WebP) from your computer or device:
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 border-2 border-dashed border-[#A67C52]/50 hover:border-[#A67C52] bg-[#F5F2ED] hover:bg-[#EBE7E0] text-[#1A1A1A] text-xs font-sans font-bold tracking-wider uppercase rounded transition-colors flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Upload size={24} className="text-[#A67C52]" />
                    <span>Choose Image File...</span>
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
                      onError={() => console.log('Image preview error')}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-neutral-50 p-4 border-t border-neutral-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-neutral-300 text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Check size={14} /> Apply Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
