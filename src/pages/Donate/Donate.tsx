import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Donate.module.css';

const supportPoints = [
  'Support community hubs and contributor training.',
  'Help women and young people publish African knowledge.',
  'Keep open learning tools active and accessible.',
];

const Donate: React.FC = () => {
  useScrollReveal();

  const [selectedPreset, setSelectedPreset] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handlePresetSelect = (value: number) => {
    setSelectedPreset(value);
    setCustomAmount('');
  };

  const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(event.target.value);
    setSelectedPreset(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('submitting');

    const formspreeId = import.meta.env.VITE_FORMSPREE_DONATE_ID;
    const finalAmount = selectedPreset ? `$${selectedPreset}` : `$${customAmount}`;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: finalAmount,
            ...formData,
          }),
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '' });
          setCustomAmount('');
          setSelectedPreset(25);
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '' });
        setCustomAmount('');
        setSelectedPreset(25);
        setTimeout(() => setStatus('idle'), 4000);
      }, 1500);
    }
  };

  return (
    <div className={styles.donateViewportContainer}>
      <section className={`${styles.donateHero} snap-frame`} id="donate-form">
        <div className={styles.confettiLayer} aria-hidden="true">
          <span className={`${styles.confettiPiece} ${styles.confettiOne}`} />
          <span className={`${styles.confettiPiece} ${styles.confettiTwo}`} />
          <span className={`${styles.confettiPiece} ${styles.confettiThree}`} />
          <span className={`${styles.confettiPiece} ${styles.confettiFour}`} />
        </div>

        <div className="container">
          <div className={styles.donateIntro}>
            <p className={`${styles.donateHeroKicker} reveal`}>Donate</p>
            <h1 className={`${styles.donateHeroH} reveal d1`}>Back the mission in one step.</h1>
            <p className={`${styles.donateHeroSub} reveal d2`}>
              A donation helps OFWA train contributors, sustain hubs, and expand access to open knowledge.
            </p>
          </div>

          <div className={styles.donateFrame}>
            <aside className={`${styles.donateSummaryCard} reveal`}>
              <span className={styles.summaryEyebrow}>Why it matters</span>
              <h2 className={styles.donateSummaryTitle}>Simple support. Real community impact.</h2>
              <ul className={styles.summaryList}>
                {supportPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>

            <div className={`${styles.donateFormCard} reveal d1`}>
              <h2 className={styles.donateFormTitle}>Make a Donation</h2>
              <p className={styles.donateFormSub}>Choose an amount and send your support.</p>

              <form onSubmit={handleSubmit}>
                {status === 'success' && (
                  <div className={styles.successBanner}>
                    <h3>Thank you for your support.</h3>
                    <p>Your mock donation was processed successfully. A live payment workflow can be connected here.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className={styles.errorBanner}>
                    <p>Something went wrong. Please check your credentials and try again.</p>
                  </div>
                )}

                <div className={styles.donateAmountGrid}>
                  {[10, 25, 50, 100].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={`${styles.donateAmount} ${selectedPreset === preset ? styles.donateAmountActive : ''}`}
                      onClick={() => handlePresetSelect(preset)}
                      disabled={status === 'submitting'}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                <div className={styles.donateCustomWrap}>
                  <label className={styles.donateCustomLabel} htmlFor="customAmount">Custom amount</label>
                  <input
                    className={styles.donateCustom}
                    id="customAmount"
                    type="number"
                    min="1"
                    placeholder="$ Enter amount"
                    value={customAmount}
                    onChange={handleCustomChange}
                    disabled={status === 'submitting'}
                  />
                </div>

                <div className={styles.donateFieldRow}>
                  <div className={styles.donateFieldGroup}>
                    <label className={styles.donateFieldLabel} htmlFor="name">Full Name</label>
                    <input
                      className={styles.donateFieldInput}
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                  <div className={styles.donateFieldGroup}>
                    <label className={styles.donateFieldLabel} htmlFor="email">Email</label>
                    <input
                      className={styles.donateFieldInput}
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                </div>

                <button className={styles.donateSubmit} type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <Heart size={16} fill="currentColor" />
                      <span>Complete Donation</span>
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

export default Donate;
