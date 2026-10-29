import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

// Pages that open with a full-bleed photo, so the bar starts transparent over it.
const darkHeroPaths = ['/', '/about', '/volunteer', '/partner'];

const primary = [
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/hubs', label: 'Hubs' },
  { to: '/events', label: 'Events' },
  { to: '/news', label: 'News' },
];

const involved = [
  { to: '/volunteer', label: 'Volunteer', note: 'Give your time and skills', image: '/img/volunteers-group.webp' },
  { to: '/partner', label: 'Partner with us', note: 'Fund or co-create a program', image: '/img/wikiskills-training.webp' },
  { to: '/contact', label: 'Start a hub or club', note: 'Bring OFWA to your town or campus', image: '/img/kumasi-hub.webp' },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  // Menu state is tied to the path it was opened on, so navigating closes it without an effect.
  const [mobilePath, setMobilePath] = useState<string | null>(null);
  const [megaPath, setMegaPath] = useState<string | null>(null);
  const mobileOpen = mobilePath === pathname;
  const megaOpen = megaPath === pathname;

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const megaBtnRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const menuId = useId();
  const megaId = useId();

  const setMobile = useCallback((open: boolean) => setMobilePath(open ? pathname : null), [pathname]);
  const setMega = useCallback((open: boolean) => setMegaPath(open ? pathname : null), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock page scroll without layout shift, make the rest of the page inert,
  // and give Escape its usual job.
  useEffect(() => {
    if (!mobileOpen) return;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const outside = Array.from(document.body.querySelectorAll<HTMLElement>('main, footer, .skip-link'));
    outside.forEach((el) => el.setAttribute('inert', ''));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobile(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      outside.forEach((el) => el.removeAttribute('inert'));
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen, setMobile]);

  // Mega menu: Escape closes it and returns focus; a click elsewhere closes it too.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMega(false);
        megaBtnRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.querySelector('[data-mega]')?.contains(e.target as Node)) setMega(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [megaOpen, setMega]);

  // Keep Tab inside the mobile menu while it is open.
  const trapTab = (e: React.KeyboardEvent) => {
    if (!mobileOpen || e.key !== 'Tab') return;
    const items = Array.from(headerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
      (el) => el.offsetParent !== null,
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const hover = (open: boolean) => {
    if (!window.matchMedia('(hover: hover) and (min-width: 1041px)').matches) return;
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMega(open), open ? 80 : 220);
  };

  const involvedActive = ['/volunteer', '/partner', '/contact'].includes(pathname);
  const overHero = darkHeroPaths.includes(pathname) && !scrolled && !mobileOpen && !megaOpen;

  return (
    <header
      ref={headerRef}
      className={`${styles.nav} ${scrolled || megaOpen || mobileOpen ? styles.solid : ''} ${overHero ? styles.over : ''}`}
      onKeyDown={trapTab}
    >
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="Open Foundation West Africa, home">
          <img src="/brand/ofwa-mark.png" alt="" width={44} height={44} />
          <span className={styles.brandText} aria-hidden="true">
            <strong>OFWA</strong>
            <small>Open Foundation West Africa</small>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          <ul>
            {primary.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li data-mega onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
              <button
                ref={megaBtnRef}
                type="button"
                className={`${styles.link} ${styles.disclosure} ${involvedActive ? styles.active : ''}`}
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onClick={() => setMega(!megaOpen)}
              >
                Get involved <ChevronDown size={15} aria-hidden="true" className={megaOpen ? styles.flip : ''} />
              </button>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          {/* Donate paused until OFWA confirms payment details.
          <Link to="/donate" className={styles.donate}>Donate</Link> */}
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            onClick={() => setMobile(!mobileOpen)}
          >
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      <div
        id={megaId}
        data-mega
        className={`${styles.mega} ${megaOpen ? styles.megaOpen : ''}`}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        hidden={!megaOpen}
      >
        <div className={`container ${styles.megaGrid}`}>
          <p className={styles.megaIntro}>
            There is a place for you in the network. Pick how you would like to take part.
          </p>
          <ul className={styles.tiles}>
            {involved.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className={styles.tile} onBlur={(e) => {
                  if (!e.currentTarget.closest('[data-mega]')?.contains(e.relatedTarget as Node) && e.relatedTarget !== megaBtnRef.current) setMega(false);
                }}>
                  <span className={styles.tileImg}>{megaOpen && <img src={i.image} alt="" loading="lazy" />}</span>
                  <strong>{i.label}</strong>
                  <span>{i.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      <div id={menuId} className={`${styles.mobile} ${mobileOpen ? styles.mobileOpen : ''}`} hidden={!mobileOpen}>
        <nav aria-label="Main (mobile)" className={`container ${styles.mobileInner}`}>
          <ul className={styles.mobileList}>
            {[...primary, { to: '/gallery', label: 'Gallery' }].map((l, i) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.mobileGroup}>
            <p className="small-caps">Get involved</p>
            <ul>
              {involved.map((i) => (
                <li key={i.to}>
                  <Link to={i.to}>
                    {i.label} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <Link to="/donate" className={`btn btn-brand ${styles.mobileDonate}`}>Donate</Link> */}
        </nav>
      </div>
    </header>
  );
};
