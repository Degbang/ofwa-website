import React from 'react';
import { PageHero } from '../../components/ui/PageHero';

const Privacy: React.FC = () => (
  <>
    <PageHero
      kicker="Privacy"
      title="What this website collects, and why."
      lede="A short, plain explanation of how your information is handled when you use ofwafrica.org."
    />
    <section className="section">
      <div className="container split">
        <span className="eyebrow">Policy</span>
        <div className="prose" style={{ maxWidth: '40em' }}>
          <h2 className="subtitle" style={{ marginBottom: 16 }}>Browsing</h2>
          <p>
            This website does not use advertising trackers, and it does not set analytics or marketing cookies. Fonts are
            served from this site rather than from a third party. Pages may load images and news summaries from other
            sites, such as Wikimedia Diff, the events calendar is loaded from Google Sheets, and videos load from YouTube only when you choose to play them. Those services may see your
            address and browser details under their own policies.
          </p>

          <h2 className="subtitle" style={{ margin: '40px 0 16px' }}>Forms</h2>
          <p>
            When you send the contact, volunteer, partnership or donation form, we receive what you type: your name, email
            address, the message, and any choices you make such as a role or an amount. The form is delivered to the OFWA
            team by email through the service Web3Forms. We use your details only to reply to you and to run the program or
            partnership you asked about.
          </p>

          <h2 className="subtitle" style={{ margin: '40px 0 16px' }}>Your choices</h2>
          <p>
            You can ask us what we hold about you, ask us to correct it, or ask us to delete it, by writing to{' '}
            <a href="mailto:info@ofwafrica.org" className="link-arrow">info@ofwafrica.org</a>.
          </p>

          <p className="small-caps" style={{ marginTop: 32 }}>
            {/* TODO(OFWA): have the board review this draft and add the data controller's legal details and retention periods. */}
            Draft for OFWA review. Last updated 28 October 2026.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default Privacy;
