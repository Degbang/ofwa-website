import React, { useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { FormFeedback } from '../../components/ui/FormFeedback';
import { useFormSubmit } from '../../lib/useFormSubmit';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Volunteer.module.css';

const roles = [
  { title: 'Wikipedia editor', body: 'Write and improve articles on African history, culture and people.' },
  { title: 'Trainer and facilitator', body: 'Run workshops and edit-a-thons at hubs, campuses and schools.' },
  { title: 'Language translator', body: 'Bring open content into Twi, Dagbani, Ewe, Ga and more.' },
  { title: 'Photographer and media', body: 'Document festivals, landmarks and events for Wikimedia Commons.' },
  { title: 'Developer', body: 'Build open-source tools and set up offline Kiwix servers in schools.' },
  { title: 'Hub coordinator', body: 'Organise meetups and grow a Wiki Hub or club near you.' },
  { title: 'Not sure yet', body: 'Tell us your skills and we will suggest a fit.' },
];

const steps = [
  { title: 'Tell us about you', body: 'Choose the role that fits and share a few lines about your skills and where you are.' },
  { title: 'We match you', body: 'Someone from the team replies and pairs you with an upcoming program, hub or campaign.' },
  { title: 'We train you', body: 'Every role comes with training and a mentor from the open knowledge community. No experience needed.' },
];

const empty = { name: '', email: '', location: '', role: '', message: '' };

const Volunteer: React.FC = () => {
  useScrollReveal();
  const [form, setForm] = useState(empty);
  const { status, submit } = useFormSubmit('Volunteer application');
  const busy = status === 'sending';

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submit(form)) setForm(empty);
  };

  return (
    <>
      <PageHero
        kicker="Volunteer"
        title="Give your time. Leave something that lasts."
        lede="Only a small share of Wikipedia editors are women, and African topics are badly under-covered. Our volunteers are closing that gap, one article, photograph, workshop and line of code at a time."
        image="/img/volunteers-group.webp"
        imageAlt="OFWA volunteers posing together after a training session"
        imagePosition="center 62%"
      >
        <a href="#join" className="btn btn-light">
          Choose a role <ArrowDown size={16} />
        </a>
      </PageHero>

      <section className="section">
        <div className="container split">
          <span className="eyebrow">Roles</span>
          <ul className="rules">
            {roles.map((r, i) => (
              <li key={r.title} className={`${styles.role} reveal`}>
                <span className="small-caps">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="subtitle">{r.title}</h2>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-sand">
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

      <section id="join" className="section">
        <div className="container split">
          <span className="eyebrow">Join</span>
          <form className={`form-grid ${styles.form}`} onSubmit={onSubmit}>
            <h2 className="title">Tell us how you would like to help.</h2>

            <fieldset className={styles.roleChoice} disabled={busy}>
              <legend className="small-caps">Pick a role</legend>
              <div className="filters">
                {roles.map((r) => (
                  <label key={r.title} className={`${styles.chip} ${form.role === r.title ? styles.chipOn : ''}`}>
                    <input type="radio" name="role" value={r.title} checked={form.role === r.title} onChange={change} required />
                    {r.title}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.pair}>
              <label className="field">
                <span>Full name</span>
                <input name="name" type="text" autoComplete="name" value={form.name} onChange={change} required disabled={busy} />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" value={form.email} onChange={change} required disabled={busy} />
              </label>
            </div>
            <label className="field">
              <span>City and country</span>
              <input name="location" type="text" placeholder="For example Accra, Ghana" value={form.location} onChange={change} required disabled={busy} />
            </label>
            <label className="field">
              <span>Anything we should know? (optional)</span>
              <textarea name="message" rows={4} placeholder="Your skills, languages, or what you would love to work on" value={form.message} onChange={change} disabled={busy} />
            </label>

            <FormFeedback
              status={status}
              sentTitle="Thank you for stepping up."
              sentBody="We have your details. Someone from the team will reach out to match you with a program or hub."
            />

            <div>
              <button className="btn" type="submit" disabled={busy}>
                {busy ? 'Sending...' : <>Send application <ArrowRight size={16} /></>}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Volunteer;
