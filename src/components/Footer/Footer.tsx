import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { ExternalLink } from '../ui/ExternalLink';
import styles from './Footer.module.css';

const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/ofwafrica/' },
  { label: 'X (Twitter)', href: 'https://x.com/OFWAFRICA' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofwafrica/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@ofwafrica' },
  { label: 'LinkedIn', href: 'https://gh.linkedin.com/company/ofwafrica' },
  { label: 'YouTube', href: 'https://www.youtube.com/@ofwafrica/videos' },
];

export const Footer: React.FC = () => (
  <footer className={`${styles.footer} dark-surface`}>
    <div className={styles.weave} aria-hidden="true" />

    <div className={`container ${styles.top}`}>
      <figure className={styles.photo}>
        <img src="/img/volunteers-group.webp" alt="" loading="lazy" width={900} height={600} />
        <figcaption>OFWA volunteers</figcaption>
      </figure>

      <div className={styles.ctaWrap}>
        <h2 className={styles.ctaHeading}>Take part</h2>
        <ul className={styles.big}>
          <li><Link to="/volunteer">Volunteer <ArrowRight aria-hidden="true" /></Link></li>
          <li><Link to="/partner">Partner with us <ArrowRight aria-hidden="true" /></Link></li>
          {/* <li><Link to="/donate">Donate <ArrowRight aria-hidden="true" /></Link></li> */}
        </ul>
      </div>
    </div>

    <div className={`container ${styles.grid}`}>
      <div className={styles.brandCol}>
        <Link to="/" className={styles.brand} aria-label="Open Foundation West Africa, home">
          <img src="/brand/ofwa-mark.png" alt="" width={52} height={52} />
          <span aria-hidden="true">
            <strong>OFWA</strong>
            <small>Open Foundation West Africa</small>
          </span>
        </Link>
        <p className={styles.blurb}>
          A Ghana-based non-profit and Wikimedia affiliate building open knowledge, digital skills and cultural
          preservation with communities across West Africa since 2016.
        </p>
        <address className={styles.contact}>
          <p><MapPin size={16} aria-hidden="true" /> <span>52 Swaniker St, Accra, Ghana</span></p>
          <p><Mail size={16} aria-hidden="true" /> <a href="mailto:info@ofwafrica.org">info@ofwafrica.org</a></p>
          <p><Phone size={16} aria-hidden="true" /> <a href="tel:+233559959694">+233 55 995 9694</a></p>
        </address>
      </div>

      <nav className={styles.col} aria-labelledby="footer-explore">
        <h2 id="footer-explore">Explore</h2>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/programs">Programs</Link></li>
          <li><Link to="/hubs">Hubs and clubs</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>
      </nav>

      <nav className={styles.col} aria-labelledby="footer-involved">
        <h2 id="footer-involved">Get involved</h2>
        <ul>
          <li><Link to="/volunteer">Volunteer</Link></li>
          <li><Link to="/partner">Partner with us</Link></li>
          {/* <li><Link to="/donate">Donate</Link></li> */}
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <nav className={styles.col} aria-labelledby="footer-follow">
        <h2 id="footer-follow">Follow</h2>
        <ul>
          {social.map((s) => (
            <li key={s.label}>
              <ExternalLink href={s.href} bare>{s.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className={`container ${styles.bottom}`}>
      <p>
        Content is licensed{' '}
        <ExternalLink href="https://creativecommons.org/licenses/by-sa/4.0/" bare>CC BY-SA 4.0</ExternalLink> unless
        noted. &copy; {new Date().getFullYear()} Open Foundation West Africa.
      </p>
      <ul className={styles.legal}>
        <li><Link to="/privacy">Privacy</Link></li>
        <li><Link to="/accessibility">Accessibility</Link></li>
      </ul>
      <button type="button" className={styles.top2} onClick={() => window.scrollTo({ top: 0 })}>
        Back to top <ArrowUp size={16} aria-hidden="true" />
      </button>
    </div>
  </footer>
);
