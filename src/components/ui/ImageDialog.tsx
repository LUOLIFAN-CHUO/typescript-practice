import { useEffect } from 'react';
import { X } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

interface ImageDialogProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageDialog({ src, alt, onClose }: ImageDialogProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt}を拡大表示`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        aria-label="画像を閉じる"
      >
        <X aria-hidden="true" />
      </button>
      <img
        src={assetUrl(src)}
        alt={alt}
        className="max-h-[88vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}
