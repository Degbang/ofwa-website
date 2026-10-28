import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import styles from './VideoModal.module.css';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose, title = 'OFWA video' }) => {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(videoId !== null, ref, onClose);

  if (!videoId) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={ref}
        className={styles.inner}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose}>
          <X size={20} aria-hidden="true" />
          <span className="sr-only">Close video</span>
        </button>
        <div className={styles.frame}>
          {/* youtube-nocookie.com keeps YouTube from setting cookies until the video is played */}
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};
