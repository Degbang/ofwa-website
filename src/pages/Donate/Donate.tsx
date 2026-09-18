import React, { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Donate.module.css';

const supportPoints = [
  'Support community hubs and contributor training.',
  'Help women and young people publish African knowledge.',
  'Keep open learning tools active and accessible.',
];

const confettiPieces = [
  { top: '16%', left: '10%', size: 12, color: '#ffb44d', delay: 0, duration: 9, depth: 18 },
  { top: '12%', left: '30%', size: 9, color: '#ffffff', delay: -2, duration: 11, depth: 30 },
  { top: '18%', left: '78%', size: 14, color: '#ff7f50', delay: -4, duration: 8, depth: 14 },
  { top: '34%', left: '86%', size: 9, color: '#ffffff', delay: -1, duration: 10, depth: 34 },
  { top: '55%', left: '6%', size: 11, color: '#ffb44d', delay: -3, duration: 12, depth: 20 },
  { top: '68%', left: '22%', size: 8, color: '#ff9f43', delay: -5, duration: 9, depth: 26 },
  { top: '8%', left: '55%', size: 10, color: '#ff7f50', delay: -6, duration: 10, depth: 16 },
  { top: '46%', left: '46%', size: 13, color: '#ffffff', delay: -2.5, duration: 11, depth: 24 },
  { top: '72%', left: '64%', size: 9, color: '#ffb44d', delay: -4.5, duration: 8, depth: 30 },
  { top: '28%', left: '92%', size: 11, color: '#ff9f43', delay: -1.5, duration: 13, depth: 18 },
  { top: '60%', left: '90%', size: 8, color: '#ffffff', delay: -3.5, duration: 9, depth: 28 },
  { top: '4%', left: '14%', size: 10, color: '#ff7f50', delay: -5.5, duration: 12, depth: 20 },
  { top: '82%', left: '38%', size: 12, color: '#ffb44d', delay: -0.5, duration: 10, depth: 24 },
  { top: '40%', left: '4%', size: 9, color: '#ffffff', delay: -6.5, duration: 11, depth: 16 },
];

const Donate: React.FC = () => {
  useScrollReveal();

  const confettiLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = confettiLayerRef.current;
    if (!layer) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = layer.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      layer.style.setProperty('--mx', mx.toFixed(3));
      layer.style.setProperty('--my', my.toFixed(3));
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

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
        <div className={styles.confettiLayer} ref={confettiLayerRef} aria-hidden="true">
          {confettiPieces.map((p, i) => (
            <span
              key={i}
              className={styles.confettiPiece}
              style={{ top: p.top, left: p.left, '--depth': `${p.depth}px` } as React.CSSProperties}
            >
              <span
                className={styles.confettiPieceInner}
                style={{
                  '--size': `${p.size}px`,
                  '--piece-color': p.color,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties}
              />
            </span>
          ))}
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
