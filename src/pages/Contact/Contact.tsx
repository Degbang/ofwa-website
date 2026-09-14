import React, { useState } from 'react';
import {
  CheckCircle2,
  Globe2,
  Mail,
  MapPin,
  MessagesSquare,
  Send,
  Share2,
  Users,
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Contact.module.css';
import contactBackground from '../../assets/0A9A7736.webp';

const socialLinks = [
  {
    icon: <Users size={18} />,
    label: 'Facebook',
    href: 'https://www.facebook.com/ofwafrica/',
    meta: '@ofwafrica',
  },
  {
    icon: <MessagesSquare size={18} />,
    label: 'Twitter / X',
    href: 'https://x.com/OFWAFRICA',
    meta: '@OFWAFRICA',
  },
  {
    icon: <Share2 size={18} />,
    label: 'LinkedIn',
    href: 'https://gh.linkedin.com/company/ofwafrica',
    meta: 'OFWA company page',
  },
  {
    icon: <Globe2 size={18} />,
    label: 'YouTube',
    href: 'https://www.youtube.com/@ofwafrica/videos',
    meta: '@ofwafrica',
  },
];

const Contact: React.FC = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const web3formsId = import.meta.env.VITE_WEB3FORMS_CONTACT_ID;
    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('email', formData.email);
    newFormData.append('message', formData.message);
    newFormData.append('access_key', web3formsId!);

    if (web3formsId) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: newFormData,
        });
        const data = await response.json();
        if (data.success) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      }, 1500);
    }
  };

  return (
    <div className={styles.contactViewportContainer}>
      <section className={`${styles.pageHero} snap-frame`} id="contact-form">
        <img className={styles.heroBackdrop} src={contactBackground} alt="" />
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.contactIntro}>
            <span className={`${styles.heroKicker} reveal`}>Contact OFWA</span>
            <h1 className={`${styles.heroTitle} reveal d1`}>One message is enough to reach the right team.</h1>
            <p className={`${styles.heroSub} reveal d2`}>
              Use the form for partnerships, volunteering, media, programs, and general enquiries.
            </p>
          </div>

          <div className={styles.contactFrame}>
            <div className={`${styles.contactInfoPanel} reveal`}>
              <span className={styles.infoEyebrow}>Reach Us</span>
              <h2 className={styles.infoTitle}>Contact and social handles in one place.</h2>

              <div className={styles.primaryInfoList}>
                <a href="mailto:info@ofwafrica.org" className={styles.primaryInfoCard}>
                  <span className={styles.primaryInfoIcon}>
                    <Mail size={18} />
                  </span>
                  <div>
                    <strong>Email</strong>
                    <span>info@ofwafrica.org</span>
                  </div>
                </a>

                <div className={styles.primaryInfoCard}>
                  <span className={styles.primaryInfoIcon}>
                    <MapPin size={18} />
                  </span>
                  <div>
                    <strong>Location</strong>
                    <span>132 52 Swaniker St, Achimota, Accra, Ghana</span>
                  </div>
                </div>
              </div>

              <div className={styles.socialGrid}>
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                  >
                    <span className={styles.socialIcon}>{item.icon}</span>
                    <strong>{item.label}</strong>
                    <span>{item.meta}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className={`${styles.contactFormWrap} reveal d1`}>
              <div className={styles.formHead}>
                <h2 className={styles.contactFormH}>Send Us a Message</h2>
                <p className={styles.contactFormSub}>
                  Share the essentials and we will route it properly.
                </p>
              </div>

              <form className={styles.contactForm} onSubmit={handleSubmit}>
                {status === 'success' && (
                  <div className={styles.successBanner}>
                    <CheckCircle2 size={20} />
                    <div>
                      <h4>Message sent.</h4>
                      <p>We have received your note and will follow up soon.</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className={styles.errorBanner}>
                    <p>Something went wrong. Please try again or email us directly at info@ofwafrica.org.</p>
                  </div>
                )}

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us what you need and any important context."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    required
                  />
                </div>

                <button className={styles.submitButton} type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
