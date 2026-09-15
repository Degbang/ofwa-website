import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsWhatsNewOpen(false);
  }, [location.pathname]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    setIsOpen(false);
    setIsWhatsNewOpen(false);
  };
  const openWhatsNew = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    setIsWhatsNewOpen(true);
  };
  const queueCloseWhatsNew = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsWhatsNewOpen(false);
    }, 280);
  };
  const isWhatsNewActive = location.pathname === '/events' || location.pathname === '/news' || location.pathname === '/programs';

  return (
    <nav className={`${styles.siteNav} ${scrolled ? styles.scrolled : ''}`} data-open={isOpen}>
      <div className={`container ${styles.navInner}`}>
        <NavLink to="/" className={styles.navLogo} onClick={closeMenu}>
          <img src="/assets/images/ofwa-logo-new.png" alt="OFWA Logo" />
        </NavLink>

        <ul className={`${styles.navMenu} ${isOpen ? styles.menuOpen : ''}`} role="list">
          <li className={styles.navItem}>
            <NavLink
              to="/"
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/about"
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              About Us
            </NavLink>
          </li>
          <li
            className={`${styles.navItem} ${styles.hasDropdown} ${isWhatsNewOpen ? styles.submenuOpen : ''}`}
            onMouseEnter={openWhatsNew}
            onMouseLeave={queueCloseWhatsNew}
          >
            <button
              type="button"
              className={`${styles.menuButton} ${isWhatsNewActive ? styles.active : ''}`}
              onClick={() => setIsWhatsNewOpen((prev) => !prev)}
              aria-expanded={isWhatsNewOpen}
              aria-haspopup="true"
            >
              <span>What's New</span>
              <ChevronDown size={16} className={styles.chevron} />
            </button>
            <div className={styles.dropdownMenu}>
              <NavLink
                to="/programs"
                className={({ isActive }) => `${styles.dropdownLink} ${isActive ? styles.dropdownActive : ''}`}
                onClick={closeMenu}
              >
                Programs
              </NavLink>
              <NavLink
                to="/events"
                className={({ isActive }) => `${styles.dropdownLink} ${isActive ? styles.dropdownActive : ''}`}
                onClick={closeMenu}
              >
                Events
              </NavLink>
              <NavLink
                to="/news"
                className={({ isActive }) => `${styles.dropdownLink} ${isActive ? styles.dropdownActive : ''}`}
                onClick={closeMenu}
              >
                News
              </NavLink>
            </div>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/volunteer"
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Volunteer
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/contact"
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className={styles.navActions}>
          <NavLink to="/donate" className={styles.navDonate} onClick={closeMenu}>
            <Heart size={15} fill="currentColor" />
            <span>Donate Now</span>
          </NavLink>
          <button
            className={styles.navToggle}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
