import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowDown, PenLine, Users, Languages, Camera, Code2, MapPin, HelpCircle } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Volunteer.module.css';
import volunteerImage from '../../assets/web/volunteer.webp';

const roles = [
  { icon: PenLine, title: 'Wikipedia Editor', body: 'Write and improve articles on African history, culture and people.' },
  { icon: Users, title: 'Trainer & Facilitator', body: 'Run workshops and edit-a-thons at hubs, campuses and schools.' },
  { icon: Languages, title: 'Language Translator', body: 'Bring open content into Twi, Dagbani, Ewe, Ga and more.' },
  { icon: Camera, title: 'Photographer & Media', body: 'Document festivals, landmarks and events for Wikimedia Commons.' },
  { icon: Code2, title: 'Developer', body: 'Build open-source tools and set up offline Kiwix servers in schools.' },
  { icon: MapPin, title: 'Hub Coordinator', body: 'Organise meetups and grow a Wiki Hub or club near you.' },
  { icon: HelpCircle, title: 'Not sure yet', body: "Tell us your skills and we'll suggest a fit." },
];

const emptyForm = { name: '', email: '', location: '', role: '', message: '' };

const Volunteer: React.FC = () => {
  useScrollReveal();

  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formspreeId = import.meta.env.VITE_FORMSPREE_VOLUNTEER_ID;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setStatus('success');
          setFormData(emptyForm);
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      setTimeout(() => {
        setStatus('success');
        setFormData(emptyForm);
      }, 1200);
    }
  };

  const busy = status === 'submitting';

  return (
    <>
      {/* ░░ HERO: what it is + why it matters ░░ */}
      <section className={`${styles.hero} snap-frame`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={`${styles.kicker} reveal`}>Volunteer</p>
            <h1 className={`${styles.heroTitle} reveal d1`}>
              Volunteer with <span>OFWA</span>
            </h1>
            <p className={`${styles.heroSub} reveal d2`}>
              Fewer than one in five Wikipedia editors are women, and African topics are badly
              under-covered. Our volunteers are closing that gap, one article, photo, workshop and
              line of code at a time.
            </p>
            <ul className={`${styles.heroPoints} reveal d2`}>
              <li><CheckCircle2 size={18} /> Training for every role. No experience needed.</li>
              <li><CheckCircle2 size={18} /> Mentors from Ghana&apos;s open knowledge community.</li>
              <li><CheckCircle2 size={18} /> Real projects like Africa Wiki Challenge and Kiwix4Schools.</li>
            </ul>
            <a href="#join" className={`${styles.btnPrimary} reveal d3`}>
              Choose a role <ArrowDown size={16} />
            </a>
          </div>
          <div className={`${styles.heroImgWrap} reveal d2`}>
            <img src={volunteerImage} alt="OFWA volunteers together after a training session" />
          </div>
        </div>
      </section>

      {/* ░░ JOIN: pick a role, tell us about you ░░ */}
      <section id="join" className={`${styles.join} snap-frame`}>
        <div className={styles.joinShell}>
          {status === 'success' ? (
            <div className={styles.successPanel}>
              <CheckCircle2 size={40} />
              <h2>Thank you for stepping up!</h2>
              <p>We&apos;ve got your details. Someone from the team will reach out to match you with an upcoming program or hub session.</p>
              <button type="button" className={styles.btnGhost} onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form className={styles.joinForm} onSubmit={handleSubmit}>
              <fieldset className={styles.roleColumn} disabled={busy}>
                <legend className={styles.joinTitle}>
                  <span className={styles.step}>1</span> Pick a role
                </legend>
                <div className={styles.roleList}>
                  {roles.map(({ icon: Icon, title, body }) => (
                    <label
                      key={title}
                      className={`${styles.roleOption} ${formData.role === title ? styles.roleOptionOn : ''}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={title}
                        checked={formData.role === title}
                        onChange={handleChange}
                        required
                      />
                      <span className={styles.roleIcon}><Icon size={18} /></span>
                      <span className={styles.roleText}>
                        <strong>{title}</strong>
                        <span>{body}</span>
                      </span>
                      <CheckCircle2 size={18} className={styles.roleCheck} />
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.detailsColumn} disabled={busy}>
                <legend className={styles.joinTitle}>
                  <span className={styles.step}>2</span> Tell us about you
                </legend>

                {status === 'error' && (
                  <p className={styles.errorBanner}>
                    Something went wrong. Please try again, or email us at info@ofwafrica.org.
                  </p>
                )}

                <label className={styles.field}>
                  <span>Full name</span>
                  <input name="name" type="text" placeholder="e.g. Ama Serwaa" value={formData.name} onChange={handleChange} required />
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <input name="email" type="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} required />
                </label>
                <label className={styles.field}>
                  <span>City / region</span>
                  <input name="location" type="text" placeholder="e.g. Accra, Kumasi, Tamale" value={formData.location} onChange={handleChange} required />
                </label>
                <label className={styles.field}>
                  <span>Anything we should know? <em>(optional)</em></span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Your skills, languages you speak, or what you'd love to work on…"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </label>

                <button className={styles.btnSubmit} type="submit">
                  {busy ? <span className={styles.spinner} /> : <>Send <Send size={16} /></>}
                </button>
                <p className={styles.formNote}>
                  {formData.role ? <>Applying as <strong>{formData.role}</strong>.</> : 'Choose a role on the left first.'}
                </p>
              </fieldset>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Volunteer;
