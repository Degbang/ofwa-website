import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

// A 40s muted loop cut from the WikiSkills Training For Librarians 2025 recap
// (black transitions and logo outro removed), self-hosted rather than a
// YouTube embed: YouTube's background player streams at whatever quality it
// likes (often 360p) and can't be forced higher. hero-720 is served to small
// screens to save data.
const SRC_DESKTOP = '/video/hero-1080.mp4';
const SRC_MOBILE = '/video/hero-720.mp4';
const POSTER = '/video/hero-poster.webp';

interface HeroVideoProps {
  /** Pause the loop, e.g. while the full film plays in a modal. */
  paused?: boolean;
}

/**
 * Background film for the hero. Reduced-motion and data-saver visitors get
 * the still poster only.
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({ paused = false }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(true);

  const stillOnly =
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true);

  // No point decoding video nobody can see.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React sets `muted` as a property only; some browsers check it before
    // allowing autoplay, so make sure it's set before play().
    video.muted = true;
    if (paused || !inView) video.pause();
    else video.play().catch(() => {});
  }, [paused, inView]);

  return (
    <div ref={wrapRef} className={styles.heroMedia} aria-hidden="true">
      {stillOnly ? (
        <img src={POSTER} alt="" />
      ) : (
        <video ref={videoRef} poster={POSTER} autoPlay muted loop playsInline preload="auto">
          <source src={SRC_MOBILE} type="video/mp4" media="(max-width: 900px)" />
          <source src={SRC_DESKTOP} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
