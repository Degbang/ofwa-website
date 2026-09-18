import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LOCK_MS = 900;
// Trackpads report continuous, fine-grained deltaY even from a light or
// accidental touch — a low threshold here made frame jumps trigger far too
// easily compared to a deliberate mouse-wheel notch or keypress, which read
// as "faster"/twitchy. This requires a real, deliberate swipe.
const WHEEL_THRESHOLD = 15;

const getNavH = (): number => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
  const parsed = parseFloat(raw);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getFrames = (): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>('.snap-frame'));

const docTop = (el: HTMLElement): number =>
  el.getBoundingClientRect().top + window.scrollY;

// Finds the nearest ancestor that owns its own vertical scroll (a modal body,
// an internally-scrolling frame like the Events calendar) so wheeling inside
// it doesn't get hijacked into a frame jump until it's exhausted.
const findScrollableAncestor = (target: EventTarget | null): HTMLElement | null => {
  let el = target as HTMLElement | null;
  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    const scrollsY = style.overflowY === 'auto' || style.overflowY === 'scroll';
    if (scrollsY && el.scrollHeight > el.clientHeight + 1 && !el.classList.contains('snap-frame')) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};

/**
 * Steers wheel scrolling so each gesture advances exactly one .snap-frame
 * section. Native CSS scroll-snap is scoped to coarse (touch) pointers only
 * (see global.css) — running both at once on a fine pointer makes the
 * browser's own snap correction fight this JS-animated scroll mid-flight.
 * While inside frame territory this hook owns the wheel axis outright (every
 * event gets preventDefault, not just ones above the trigger threshold) so no
 * stray native scroll can sneak through and get interrupted by the next
 * programmatic jump — that half-scroll-then-correct was what looked like a
 * bounce.
 */
export const useFrameScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return; // touch/coarse pointers: native snap only

    let locked = false;
    let unlockTimer: number | undefined;

    const unlock = () => {
      locked = false;
      window.removeEventListener('scrollend', unlock);
    };

    const onWheel = (e: WheelEvent) => {
      if (document.body.style.overflow === 'hidden') return; // a modal owns scroll right now

      const inner = findScrollableAncestor(e.target);
      if (inner) {
        const goingDown = e.deltaY > 0;
        const atBottom = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 1;
        const atTop = inner.scrollTop <= 0;
        if ((goingDown && !atBottom) || (!goingDown && !atTop)) return;
      }

      const frames = getFrames();
      if (frames.length === 0) return;

      const navH = getNavH();
      const currentY = window.scrollY;
      const goingDown = e.deltaY > 0;

      let idx = 0;
      for (let i = 0; i < frames.length; i++) {
        if (docTop(frames[i]) - navH <= currentY + 2) idx = i;
      }

      // Going up while not already sitting at the current frame's snapped
      // top (e.g. scrolled further down within it, or resting in the footer
      // past the last frame) returns to that frame's top first, rather than
      // jumping past it straight to the previous one.
      const atFrameTop = Math.abs(docTop(frames[idx]) - navH - currentY) <= 2;
      const targetIdx = goingDown ? idx + 1 : atFrameTop ? idx - 1 : idx;

      if (targetIdx < 0 || targetIdx >= frames.length) {
        // Above the first frame or below the last: not frame territory
        // (e.g. scrolling on into the footer) — leave it to native scroll.
        return;
      }

      // Inside frame territory: own the axis completely so nothing leaks
      // through to native scroll, regardless of gesture size or lock state.
      e.preventDefault();

      if (locked || Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      locked = true;
      const targetTop = Math.max(0, docTop(frames[targetIdx]) - navH);
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      window.addEventListener('scrollend', unlock, { once: true });
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(unlock, LOCK_MS);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scrollend', unlock);
      window.clearTimeout(unlockTimer);
    };
  }, [pathname]);
};
