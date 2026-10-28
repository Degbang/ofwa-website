import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import styles from './Lightbox.module.css';

interface ImageItem {
  full: string;
  alt: string;
}

interface LightboxProps {
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const ref = useRef<HTMLDivElement>(null);
  const open = currentIndex !== -1 && images.length > 0;
  useDialog(open, ref, onClose);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onPrev, onNext],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onKey]);

  if (!open) return null;
  const image = images[currentIndex];

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={ref}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={`${styles.btn} ${styles.close}`} onClick={onClose}>
          <X size={22} aria-hidden="true" />
          <span className="sr-only">Close photo viewer</span>
        </button>

        <img src={image.full} alt={image.alt} className={styles.image} />

        <div className={styles.bar}>
          <p aria-live="polite">{image.alt}</p>
          <span>
            {currentIndex + 1} of {images.length}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <button type="button" className={`${styles.btn} ${styles.prev}`} onClick={onPrev}>
              <ChevronLeft size={24} aria-hidden="true" />
              <span className="sr-only">Previous photo</span>
            </button>
            <button type="button" className={`${styles.btn} ${styles.next}`} onClick={onNext}>
              <ChevronRight size={24} aria-hidden="true" />
              <span className="sr-only">Next photo</span>
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};
