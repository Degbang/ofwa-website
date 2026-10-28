import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { useEvents } from '../../lib/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Events.module.css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** True when an event's period ("March", "May - June", ...) covers the given month. */
const coversMonth = (period: string, month: string) => {
  const targetIdx = MONTHS.indexOf(month);
  if (targetIdx === -1) return false;
  const idxs = period
    .toLowerCase()
    .replace(/[-–—/]/g, ' ')
    .split(/\s+/)
    .map((part) => MONTHS.findIndex((m) => m.toLowerCase() === part || m.toLowerCase().slice(0, 3) === part.slice(0, 3)))
    .filter((i) => i !== -1);
  if (idxs.length === 0) return false;
  return targetIdx >= Math.min(...idxs) && targetIdx <= Math.max(...idxs);
};

const categoryOf = (title: string): string => {
  const t = title.toLowerCase();
  if (/hackathon|code|dev/.test(t)) return 'Hackathon';
  if (/training|tot|skills|workshop|learn/.test(t)) return 'Training';
  if (/retreat|meeting|agm/.test(t)) return 'Community';
  if (/challenge|celebration|shine|anniversary|creative|wiki @/.test(t)) return 'Campaign';
  return 'Event';
};

const Events: React.FC = () => {
  const [attempt, setAttempt] = useState(0);
  const load = useEvents(attempt);
  const [picked, setPicked] = useState<string | null>(null);
  const [month, setMonth] = useState<string>('All');

  const rows = useMemo(() => (load.state === 'ready' ? load.data : []), [load]);
  const years = useMemo(() => Array.from(new Set(rows.map((r) => r.year))).sort(), [rows]);
  // The visitor's pick, else the current year if it has events, else the latest year that does.
  const current = String(new Date().getFullYear());
  const year = picked && years.includes(picked) ? picked : years.includes(current) ? current : (years[years.length - 1] ?? current);
  useScrollReveal(`${year}-${month}-${rows.length}`);

  const groups = MONTHS.filter((m) => month === 'All' || m === month)
    .map((m) => ({ month: m, items: rows.filter((r) => r.year === year && coversMonth(r.period, m)) }))
    .filter((g) => g.items.length > 0);

  const yearIdx = years.indexOf(year);

  return (
    <>
      <PageHero
        kicker="Events"
        title="What is happening across the network."
        lede="Open workshops, hackathons, campaigns and community meetings, from our annual plan. Pick a year and a month to see what is on."
        media={{ src: '/img/workshop-afrocreatives.webp', alt: 'Participants working at laptops during the AfroCreatives 2025 workshop', caption: 'AfroCreatives 2025 workshop' }}
      />

      <section className="section">
        <div className="container">
          <div className={styles.controls}>
            <div className={styles.yearNav}>
              <button type="button" aria-label="Previous year" disabled={yearIdx <= 0} onClick={() => setPicked(years[yearIdx - 1])}>
                <ChevronLeft size={20} />
              </button>
              <span className={styles.year}>{year}</span>
              <button type="button" aria-label="Next year" disabled={yearIdx === -1 || yearIdx >= years.length - 1} onClick={() => setPicked(years[yearIdx + 1])}>
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="filters" role="group" aria-label="Filter by month">
              {['All', ...MONTHS].map((m) => (
                <button key={m} type="button" className="filter" aria-pressed={month === m} onClick={() => setMonth(m)}>
                  {m === 'All' ? 'Whole year' : m.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {load.state === 'loading' && <p className={styles.state}>Loading the events calendar...</p>}

          {load.state === 'error' && (
            <div className={styles.state}>
              <p>We could not load the calendar just now.</p>
              <button type="button" className="btn" onClick={() => { setAttempt((n) => n + 1); }}>
                Try again
              </button>
              <p className="form-note">Or write to <a href="mailto:info@ofwafrica.org">info@ofwafrica.org</a> for the current schedule.</p>
            </div>
          )}

          {load.state === 'ready' && groups.length === 0 && (
            <p className={styles.state}>Nothing is listed for {month === 'All' ? year : `${month} ${year}`} yet.</p>
          )}

          {groups.map((g) => (
            <div key={g.month} className={`${styles.month} split`}>
              <h2 className="subtitle">{g.month}</h2>
              <ul className="rules">
                {g.items.map((ev, i) => (
                  <li key={i} className={`${styles.event} reveal`}>
                    <div className={styles.eventHead}>
                      <h3>{ev.title}</h3>
                      <span className={styles.tag}>{categoryOf(ev.title)}</span>
                    </div>
                    <p className={styles.when}>
                      {ev.period}
                      {ev.startWeek && ev.endWeek && ev.startWeek !== ev.endWeek
                        ? `, weeks ${ev.startWeek} to ${ev.endWeek}`
                        : ev.startWeek
                          ? `, week ${ev.startWeek}`
                          : ''}
                    </p>
                    {ev.description && <p className={styles.what}>{ev.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Events;
