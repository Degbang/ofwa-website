import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { notFoundRoute, routes, SITE_NAME } from '../../routes';

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://ofwafrica.org';

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const [announcement, setAnnouncement] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    const route = routes.find((r) => r.path === pathname) ?? notFoundRoute;
    const title = pathname === '/' ? route.title : `${route.title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', route.description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', route.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);

    window.scrollTo(0, 0);

    // On client-side navigation, move focus to the page content and announce the new page,
    // so keyboard and screen reader users are not left on the link they just activated.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
    setAnnouncement(`${route.title}, page loaded`);
  }, [pathname]);

  // The staff admin has its own chrome: no public navigation or footer.
  if (pathname === '/admin') return <main id="main" ref={mainRef} tabIndex={-1}>{children}</main>;

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1} style={{ paddingTop: 'var(--nav-h)', minHeight: '70vh' }}>
        {children}
      </main>
      <Footer />
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </>
  );
};
