import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { FormFeedback } from '../../components/ui/FormFeedback';
import { useFormSubmit } from '../../lib/useFormSubmit';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Contact.module.css';

const social = [
  { label: 'Facebook', handle: '@ofwafrica', href: 'https://www.facebook.com/ofwafrica/' },
  { label: 'X (Twitter)', handle: '@OFWAFRICA', href: 'https://x.com/OFWAFRICA' },
  { label: 'Instagram', handle: '@ofwafrica', href: 'https://www.instagram.com/ofwafrica/' },
  { label: 'TikTok', handle: '@ofwafrica', href: 'https://www.tiktok.com/@ofwafrica' },
  { label: 'LinkedIn', handle: 'OFWA company page', href: 'https://gh.linkedin.com/company/ofwafrica' },
  { label: 'YouTube', handle: '@ofwafrica', href: 'https://www.youtube.com/@ofwafrica/videos' },
];

const topics = ['General question', 'Start a hub or club', 'Media and press', 'Something else'];

const empty = { name: '', email: '', topic: topics[0], message: '' };

const Contact: React.FC = () => {
  useScrollReveal();
  const [form, setForm] = useState(empty);
  const { status, submit } = useFormSubmit('Contact message');
  const busy = status === 'sending';

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submit(form)) setForm(empty);
  };

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Write to us, call us, or come by."
        lede="We read every message. Tell us what you have in mind and the right person will reply."
        media={{ src: '/img/kumasi-hub.webp', alt: 'Members of the Kumasi Wiki Hub gathered on steps outdoors', caption: 'Kumasi Wiki Hub' }}
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.details}>
            <div className="reveal">
              <span className="small-caps">Email</span>
              <a className={styles.big} href="mailto:info@ofwafrica.org">info@ofwafrica.org</a>
            </div>
            <div className="reveal">
              <span className="small-caps">Phone</span>
              <a className={styles.big} href="tel:+233559959694">+233 55 995 9694</a>
            </div>
            <div className="reveal">
              <span className="small-caps">Office</span>
              <p className={styles.big}>52 Swaniker St, Accra, Ghana</p>
              <a
                className="link-arrow"
                href="https://www.google.com/maps/search/?api=1&query=52+Swaniker+St+Accra+Ghana"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="reveal">
              <span className="small-caps">Looking for something specific?</span>
              <ul className={styles.routes}>
                <li><Link to="/volunteer">Volunteer <ArrowRight size={15} /></Link></li>
                <li><Link to="/partner">Partner with us <ArrowRight size={15} /></Link></li>
                {/* <li><Link to="/donate">Donate <ArrowRight size={15} /></Link></li> */}
              </ul>
            </div>
          </div>

          <form className="form-grid" onSubmit={onSubmit}>
            <h2 className="title">Send a message.</h2>
            <div className={styles.pair}>
              <label className="field">
                <span>Your name</span>
                <input name="name" type="text" autoComplete="name" value={form.name} onChange={change} required disabled={busy} />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" value={form.email} onChange={change} required disabled={busy} />
              </label>
            </div>
            <label className="field">
              <span>Topic</span>
              <select name="topic" value={form.topic} onChange={change} disabled={busy}>
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Message</span>
              <textarea name="message" rows={5} value={form.message} onChange={change} required disabled={busy} />
            </label>

            <FormFeedback status={status} sentTitle="Message sent." sentBody="Thank you. We will reply by email." />

            <div>
              <button className="btn" type="submit" disabled={busy}>
                {busy ? 'Sending...' : <>Send message <ArrowRight size={16} /></>}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container split">
          <span className="eyebrow">Follow</span>
          <ul className={`rules ${styles.social}`}>
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <span className="subtitle">{s.label}</span>
                  <span>{s.handle}</span>
                  <ArrowUpRight size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Contact;
