import React from 'react';
import { PageHero } from '../../components/ui/PageHero';

const Accessibility: React.FC = () => (
  <>
    <PageHero
      kicker="Accessibility"
      title="A website everyone can use."
      lede="OFWA works to make this website usable by people with a wide range of abilities, devices and connections."
    />
    <section className="section">
      <div className="container split">
        <span className="eyebrow">Statement</span>
        <div className="prose" style={{ maxWidth: '40em' }}>
          <h2 className="subtitle" style={{ marginBottom: 16 }}>Our aim</h2>
          <p>
            We are working towards conformance with the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. This
            statement describes what has been built in and where we still fall short.
          </p>

          <h2 className="subtitle" style={{ margin: '40px 0 16px' }}>What is in place</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 22, display: 'grid', gap: 10, lineHeight: 1.7 }}>
            <li>Every page can be used with a keyboard alone, with a visible focus indicator, and a skip link to the main content.</li>
            <li>Menus and dialogs close with the Escape key and return focus to where you were.</li>
            <li>When you move to a new page, focus moves to the page content and screen readers are told which page loaded.</li>
            <li>Text and controls meet WCAG AA colour contrast, and text scales with your browser settings.</li>
            <li>Animation and the homepage film respect your reduced-motion setting, and the film has a pause button.</li>
            <li>Images that carry meaning have text descriptions; decorative images are hidden from assistive technology.</li>
            <li>Links that open a new tab say so. Forms have visible labels, and their results are announced.</li>
            <li>Fonts are served from this site, so no visitor data is sent to a font provider.</li>
          </ul>

          <h2 className="subtitle" style={{ margin: '40px 0 16px' }}>Known limits</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 22, display: 'grid', gap: 10, lineHeight: 1.7 }}>
            <li>Some news stories and videos are hosted by other organisations, such as Wikimedia Diff and YouTube, and follow their own accessibility practices.</li>
            <li>Some photographs have short captions rather than full descriptions of every detail.</li>
            <li>This site is currently available in English only.</li>
          </ul>

          <h2 className="subtitle" style={{ margin: '40px 0 16px' }}>Tell us about a problem</h2>
          <p>
            If something on this site is hard to use, write to <a href="mailto:info@ofwafrica.org" className="link-arrow">info@ofwafrica.org</a>{' '}
            with the page address and what happened. We will reply and work on a fix.
          </p>
          <p className="small-caps" style={{ marginTop: 32 }}>
            Draft for OFWA review. Last updated 28 October 2026.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default Accessibility;
