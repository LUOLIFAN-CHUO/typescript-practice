import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

interface ImageDialogProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageDialog({ src, alt, onClose }: ImageDialogProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt}を拡大表示`}
      onClick={onClose}
    >
      <button
        ref={closeButton}
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
    </div>,
    document.body,
  );
}
