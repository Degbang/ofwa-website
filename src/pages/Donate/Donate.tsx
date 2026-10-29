import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { FormFeedback } from '../../components/ui/FormFeedback';
import { useFormSubmit } from '../../lib/useFormSubmit';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Donate.module.css';

const uses = [
  { title: 'Hubs and clubs', body: 'Keeping community spaces open, and training the volunteers who run them.' },
  { title: 'Training', body: 'Helping women, students and young people learn to publish African knowledge.' },
  { title: 'Open learning tools', body: 'Offline libraries and open resources for schools without reliable internet.' },
];

const currencies = [
  { code: 'USD', symbol: '$', presets: [10, 25, 50, 100] },
  { code: 'GHS', symbol: 'GH₵', presets: [100, 250, 500, 1000] },
  { code: 'EUR', symbol: '€', presets: [10, 25, 50, 100] },
  { code: 'GBP', symbol: '£', presets: [10, 25, 50, 100] },
] as const;

const Donate: React.FC = () => {
  useScrollReveal();
  const [currency, setCurrency] = useState<(typeof currencies)[number]>(currencies[0]);
  const [amount, setAmount] = useState<string>('25');
  const [custom, setCustom] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { status, submit } = useFormSubmit('Donation pledge');
  const busy = status === 'sending';

  const final = custom || amount;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submit({ ...form, amount: `${currency.symbol}${final} ${currency.code}` });
    if (ok) setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <PageHero
        kicker="Donate"
        title="Help more of Africa write its own story."
        lede="OFWA is a non-profit. Your gift keeps hubs open, trains new contributors and brings open knowledge to schools."
        media={{ src: '/img/schools-computer-lab.webp', alt: 'Students working in a school computer lab', caption: 'A school computer lab session' }}
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div>
            <span className="eyebrow">Where it goes</span>
            <ul className={`rules ${styles.uses}`}>
              {uses.map((u) => (
                <li key={u.title} className="reveal">
                  <h2 className="subtitle">{u.title}</h2>
                  <p>{u.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <form className={`form-grid ${styles.form}`} onSubmit={onSubmit}>
            <h2 className="title">Make a pledge.</h2>

            <div className={styles.currencies} role="group" aria-label="Currency">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className="filter"
                  aria-pressed={currency.code === c.code}
                  onClick={() => {
                    setCurrency(c);
                    setAmount(String(c.presets[1]));
                    setCustom('');
                  }}
                >
                  {c.code}
                </button>
              ))}
            </div>

            <div className={styles.amounts} role="group" aria-label="Amount">
              {currency.presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.amount} ${!custom && amount === String(p) ? styles.amountOn : ''}`}
                  onClick={() => {
                    setAmount(String(p));
                    setCustom('');
                  }}
                >
                  {currency.symbol}
                  {p}
                </button>
              ))}
            </div>

            <label className="field">
              <span>Or another amount ({currency.code})</span>
              <input type="number" min="1" inputMode="decimal" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Enter an amount" />
            </label>

            <div className={styles.pair}>
              <label className="field">
                <span>Your name</span>
                <input type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required disabled={busy} />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required disabled={busy} />
              </label>
            </div>
            <label className="field">
              <span>A note (optional)</span>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={busy} />
            </label>

            <p className="form-note">
              {/* TODO(OFWA): replace with a payment link or bank and mobile money details once confirmed. */}
              Online card payment is not switched on yet. This form tells our team what you would like to give, and we reply
              by email with the ways to do it.
            </p>

            <FormFeedback status={status} sentTitle="Thank you for your pledge." sentBody="We will email you with ways to give." />

            <div>
              <button className="btn btn-brand" type="submit" disabled={busy || !final}>
                {busy ? 'Sending...' : <>Pledge {currency.symbol}{final || '0'} <ArrowRight size={16} /></>}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Donate;
