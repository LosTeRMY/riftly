import type { RefObject } from "react";

const PRESET_AVATARS = [
  "/avatars/default-avatar1.webp",
  "/avatars/default-avatar2.webp",
  "/avatars/default-avatar3.webp",
  "/avatars/default-avatar4.webp",
  "/avatars/default-avatar5.webp",
  "/avatars/default-avatar6.webp",
];

interface AvatarPickerProps {
  onClose: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onReset: () => void;
  onSelectPreset: (url: string) => void;
}

export default function AvatarPicker({ onClose, fileInputRef, onReset, onSelectPreset }: Readonly<AvatarPickerProps>) {
  return (
    <>
      <div className="fixed inset-0 z-105" onClick={onClose} />
      <div className="absolute right-0 mt-3 w-72 bg-surface-container-low border border-[#00FF94]/30 rounded-lg shadow-2xl z-110 transition-all duration-200" style={{ top: "100%" }}>
        <div className="p-4 border-b border-surface-container-high">
          <h3 className="text-white font-headline text-sm font-bold tracking-tight uppercase">Select Avatar</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {PRESET_AVATARS.map((src) => (
              <div key={src} onClick={() => onSelectPreset(src)} className="w-12 h-12 rounded-full overflow-hidden border border-[#00FF94]/20 hover:border-[#00FF94] cursor-pointer transition-all">
                <img src={src} className="w-full h-full object-cover" alt="preset avatar" />
              </div>
            ))}
          </div>
          <div className="space-y-2 font-label text-sm">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 bg-primary-container text-on-primary font-bold rounded hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">upload</span>
              Upload image
            </button>
            <button
              onClick={onReset}
              className="w-full py-2 border border-[#00FF94]/30 text-on-surface-variant hover:text-[#00FF94] hover:bg-surface-container-low transition-all rounded"
            >
              Reset to default
            </button>
          </div>
          <p className="mt-3 text-[10px] text-on-surface-variant opacity-50 text-center uppercase tracking-widest font-label">
            Max file size: 2MB
          </p>
        </div>
      </div>
    </>
  );
}
