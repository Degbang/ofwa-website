import React, { useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { FormFeedback } from '../../components/ui/FormFeedback';
import { useFormSubmit } from '../../lib/useFormSubmit';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { partners } from '../../data/site';
import styles from './Partner.module.css';

const reasons = [
  {
    title: 'Rooted in West Africa',
    body: 'We work through schools, universities, libraries, archives and community hubs, with a team and volunteers on the ground in eight Ghanaian regions.',
  },
  {
    title: 'Part of a global movement',
    body: 'A recognised Wikimedia and Creative Commons affiliate, so the work we do together reaches the world through Wikipedia and Wikimedia Commons.',
  },
  {
    title: 'Open by default',
    body: 'Everything we produce is openly licensed. We report on what was made, who was trained and what it cost, in the open.',
  },
  {
    title: 'Aligned with the Sustainable Development Goals',
    body: 'Our work supports SDG 4 (quality education), SDG 5 (gender equality) and SDG 10 (reduced inequalities).',
  },
];

const models = [
  {
    id: 'Corporate sponsorship',
    title: 'Corporate sponsorship',
    for: 'Companies and CSR teams',
    body: 'Sponsor an edit-a-thon, a hub or a campaign, and see exactly what it made possible.',
    points: ['Named support of a campaign or hub', 'Impact reporting for your CSR commitments', 'Co-branded workshops and hackathons'],
  },
  {
    id: 'Institutional MOU',
    title: 'Institutional partnership',
    for: 'Universities and colleges',
    body: 'Set up an open-knowledge club, bring Wikipedia into the curriculum and train students and staff.',
    points: ['A campus Wiki club', 'Faculty and student training', 'Open access for academic work'],
  },
  {
    id: 'NGO and civil society',
    title: 'NGO and civil society',
    for: 'Non-profits and networks',
    body: 'Co-deliver open-data campaigns, share learning resources and advocate together for open access.',
    points: ['Joint grant applications and delivery', 'Shared open educational resources', 'Co-hosted regional events'],
  },
  {
    id: 'Government and GLAM',
    title: 'Government and GLAM',
    for: 'Archives, libraries, museums, agencies',
    body: 'Digitise national heritage and train staff to publish it openly.',
    points: ['Cultural heritage digitisation', 'Public archive preservation', 'Open web training for staff'],
  },
];

const steps = [
  { title: 'Write to us', body: 'Tell us who you are and what you would like to achieve.' },
  { title: 'Talk it through', body: 'A short call to see where our work and your goals meet.' },
  { title: 'Agree a plan', body: 'We draft a proposal or MOU with a clear scope, timeline and reporting.' },
];

const empty = { name: '', email: '', organisation: '', type: models[0].id, message: '' };

const Partner: React.FC = () => {
  useScrollReveal();
  const [form, setForm] = useState(empty);
  const { status, submit } = useFormSubmit('Partnership enquiry');
  const busy = status === 'sending';

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const choose = (id: string) => {
    setForm((f) => ({ ...f, type: id }));
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submit(form)) setForm(empty);
  };

  return (
    <>
      <PageHero
        kicker="Partner with us"
        title="Build open knowledge with us."
        lede="We work with companies, universities, civil society and public institutions to close the knowledge gap faster than any of us could alone."
        image="/img/wikiskills-training.webp"
        imageAlt="A WikiSkills for Librarians session in progress at the Goethe-Institut Ghana"
        imagePosition="center 40%"
      >
        <a href="#enquire" className="btn btn-light">
          Start a conversation <ArrowDown size={16} />
        </a>
      </PageHero>

      <section className="section">
        <div className="container split">
          <span className="eyebrow">Why OFWA</span>
          <ul className="rules">
            {reasons.map((r, i) => (
              <li key={r.title} className={`${styles.reason} reveal`}>
                <span className="small-caps">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="subtitle">{r.title}</h2>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <span className="eyebrow">Ways to partner</span>
          <h2 className="title" style={{ margin: '24px 0 56px', maxWidth: '14em' }}>Four ways to work together.</h2>
          <ul className={styles.models}>
            {models.map((m) => (
              <li key={m.id} className="reveal">
                <span className="small-caps">{m.for}</span>
                <h3 className="subtitle">{m.title}</h3>
                <p>{m.body}</p>
                <ul>
                  {m.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <button type="button" className="link-arrow" onClick={() => choose(m.id)}>
                  Enquire about this <ArrowRight size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <span className="eyebrow">How it works</span>
          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.title} className="reveal">
                <span className={styles.stepNo}>{i + 1}</span>
                <h3 className="subtitle">{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`section-tight ${styles.logos}`} aria-label="Current partners">
        <div className="container">
          <span className="eyebrow">Already working with</span>
          <ul>
            {partners.map((p) => (
              <li key={p.name}>
                <img src={p.logo} alt={p.name} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="enquire" className="section section-dark">
        <div className="container split">
          <span className="eyebrow eyebrow-light">Enquire</span>
          <form className={`form-grid ${styles.form}`} onSubmit={onSubmit}>
            <h2 className="title">Tell us about your organisation.</h2>
            <div className={styles.pair}>
              <label className="field">
                <span>Your name</span>
                <input name="name" type="text" autoComplete="name" value={form.name} onChange={change} required disabled={busy} />
              </label>
              <label className="field">
                <span>Work email</span>
                <input name="email" type="email" autoComplete="email" value={form.email} onChange={change} required disabled={busy} />
              </label>
            </div>
            <div className={styles.pair}>
              <label className="field">
                <span>Organisation</span>
                <input name="organisation" type="text" autoComplete="organization" value={form.organisation} onChange={change} required disabled={busy} />
              </label>
              <label className="field">
                <span>Type of partnership</span>
                <select name="type" value={form.type} onChange={change} disabled={busy}>
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="field">
              <span>What would you like to achieve?</span>
              <textarea name="message" rows={4} value={form.message} onChange={change} required disabled={busy} />
            </label>

            <FormFeedback
              status={status}
              sentTitle="Thank you for reaching out."
              sentBody="Our partnerships team will reply to arrange a short conversation."
            />

            <div>
              <button className="btn btn-light" type="submit" disabled={busy}>
                {busy ? 'Sending...' : <>Send enquiry <ArrowRight size={16} /></>}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Partner;
