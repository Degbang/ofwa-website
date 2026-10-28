import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { HubMap } from '../../components/ui/HubMap';
import { useRegions } from '../../lib/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Hubs.module.css';

type Filter = 'All' | 'Hub' | 'Club';

const Hubs: React.FC = () => {
  useScrollReveal();
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [regionId, setRegionId] = useState<string | null>(null);
  const ghanaRegionsData = useRegions();

  const all = useMemo(
    () =>
      ghanaRegionsData.flatMap((r) =>
        r.hubs.map((h) => ({ ...h, regionId: r.id, region: r.name.replace(' Region', '') })),
      ),
    [ghanaRegionsData],
  );

  const shown = all.filter((h) => {
    const q = query.trim().toLowerCase();
    return (filter === 'All' || h.type === filter) && (!q || `${h.name} ${h.location} ${h.region}`.toLowerCase().includes(q));
  });

  const hubCount = all.filter((h) => h.type === 'Hub').length;
  const clubCount = all.length - hubCount;
  const regionsWithout = ghanaRegionsData.filter((r) => r.hubs.length === 0).map((r) => r.name.replace(' Region', ''));

  return (
    <>
      <PageHero
        kicker="Our network"
        title={`${hubCount} hubs and ${clubCount} clubs across Ghana.`}
        lede="A hub is a community space open to everyone in town. A club brings the same work inside a university, college or school. Each runs trainings, edit-a-thons and campaigns with OFWA."
        media={{ src: '/img/accra-hub.webp', alt: 'Volunteers pose together at the Accra Wiki Hub', caption: 'Accra Wiki Hub', position: 'center 40%' }}
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <aside className={styles.mapPanel}>
            <HubMap activeId={regionId} onActive={setRegionId} />
          </aside>

          <div>
            <div className={styles.controls}>
              <div className="filters" role="group" aria-label="Filter by type">
                {(['All', 'Hub', 'Club'] as Filter[]).map((f) => (
                  <button key={f} type="button" className="filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                    {f === 'All' ? 'All' : f === 'Hub' ? 'Hubs' : 'Clubs'}
                  </button>
                ))}
              </div>
              <label className={styles.search}>
                <Search size={16} aria-hidden="true" />
                <span className="sr-only">Search hubs and clubs</span>
                <input type="search" placeholder="Search by name, town or region" value={query} onChange={(e) => setQuery(e.target.value)} />
              </label>
            </div>

            {shown.length === 0 ? (
              <p className={styles.empty}>No hub or club matches that search yet.</p>
            ) : (
              <ul className="rules">
                {shown.map((h) => (
                  <li
                    key={h.name}
                    className={`${styles.row} ${regionId === h.regionId ? styles.rowOn : ''}`}
                    onMouseEnter={() => setRegionId(h.regionId)}
                    onMouseLeave={() => setRegionId(null)}
                  >
                    <div className={styles.rowHead}>
                      <h2 className="subtitle">{h.name}</h2>
                      <span className={styles.type}>{h.type}</span>
                    </div>
                    <p className={styles.meta}>
                      {h.location} <i aria-hidden="true">/</i> {h.region}
                    </p>
                    <p className={styles.detail}>{h.detail}</p>
                    {h.description && <p className={styles.desc}>{h.description}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className={`container ${styles.start}`}>
          <div>
            <h2 className="title" style={{ maxWidth: '12em' }}>Not in your region yet?</h2>
            <p className="lede" style={{ marginTop: 24 }}>
              {regionsWithout.length} regions have no hub or club: {regionsWithout.join(', ')}. If you want to start one,
              we will train your first team and support you.
            </p>
          </div>
          <Link to="/contact" className="btn btn-light">
            Start a hub or club <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hubs;
