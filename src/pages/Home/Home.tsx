import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { diffNewsStories } from '../../data/diffNews';
import { useRegions } from '../../lib/content';
import { partners, programs } from '../../data/site';
import { HubMap } from '../../components/ui/HubMap';
import styles from './Home.module.css';

const Home: React.FC = () => {
  useScrollReveal();
  const [active, setActive] = useState<number | null>(null);
  const [region, setRegion] = useState<string | null>(null);

  const regions = useRegions().filter((r) => r.hubs.length > 0);
  const hubCount = regions.reduce((n, r) => n + r.hubs.length, 0);
  const news = diffNewsStories.slice(0, 4);
  const shown = active ?? 0;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/video/hero-1080.mp4" type="video/mp4" media="(min-width: 1000px)" />
          <source src="/video/hero-720.mp4" type="video/mp4" />
        </video>
        <div className={styles.scrim} />

        <div className={`container ${styles.heroInner}`}>
          <p className={styles.kicker}>Open Foundation West Africa &nbsp;/&nbsp; Accra, Ghana &nbsp;/&nbsp; Since 2016</p>
          <h1>
            Wikipedia, written from Accra, Kumasi, Tamale and&nbsp;Ho.
          </h1>
          <Link to="/programs" className={styles.cta}>
            <span>Explore our work</span>
            <i aria-hidden="true">
              <ArrowRight size={18} />
            </i>
          </Link>
        </div>
        <div className={styles.scrollCue} aria-hidden="true" />
      </section>

      {/* Intro */}
      <section className={styles.intro}>
        <div className={`container ${styles.introGrid}`}>
          <span className={styles.label}>Who we are</span>
          <div>
            <p className={`${styles.lede} reveal`}>
              OFWA is a Ghana-based non-profit and Wikimedia affiliate. Since 2016 we have trained volunteers to write,
              photograph and code for Wikipedia, and carried offline libraries to schools that have no internet.
            </p>
            <Link to="/about" className={`${styles.textLink} reveal`}>
              About OFWA <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className={styles.programs}>
        <div className={`container ${styles.programsGrid}`}>
          <div>
            <span className={styles.label}>What we do</span>
            <ol className={styles.index} data-hover={active !== null}>
              {programs.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/programs"
                    className={`${styles.row} ${active === i ? styles.rowOn : ''}`}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  >
                    <span className={styles.rowNo}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.rowTitle}>{p.title}</span>
                    <span className={styles.rowText}>{p.what}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.stage} aria-hidden="true">
            {programs.map((p, i) => (
              <img key={p.slug} src={p.image} alt="" className={shown === i ? styles.stageOn : ''} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed photo */}
      <figure className={styles.band}>
        <img src="/img/volunteers-group.webp" alt="OFWA volunteers and team posing together outdoors" loading="lazy" />
        <figcaption className="container">OFWA volunteers</figcaption>
      </figure>

      {/* Hubs */}
      <section className={styles.hubs}>
        <div className={`container ${styles.hubsGrid}`}>
          <div>
            <span className={`${styles.label} ${styles.labelLight}`}>Our network</span>
            <h2 className={styles.h2Light}>{hubCount} places to learn, edit and build.</h2>
            <p className={styles.hubsLead}>
              Hubs are open to everyone in town. Clubs sit inside a university or school. Each one runs trainings,
              edit-a-thons and campaigns with OFWA.
            </p>
            <ul className={styles.hubList}>
              {regions.map((r) => (
                <li key={r.id} className={region === r.id ? styles.hubOn : ''}
                  onMouseEnter={() => setRegion(r.id)} onMouseLeave={() => setRegion(null)}>
                  <h3>{r.name.replace(' Region', '')}</h3>
                  <p>{r.hubs.map((h) => h.name).join(', ')}</p>
                </li>
              ))}
            </ul>
            <Link to="/hubs" className={`${styles.textLink} ${styles.textLinkLight}`}>
              All hubs and clubs <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.mapWrap}>
            <HubMap activeId={region} onActive={setRegion} />
          </div>
        </div>
      </section>

      {/* News */}
      <section className={styles.news}>
        <div className={`container ${styles.newsGrid}`}>
          <span className={styles.label}>In the news</span>
          <div>
            <ul>
              {news.map((n) => (
                <li key={n.url}>
                  <a href={n.url} target="_blank" rel="noopener noreferrer">
                    <time dateTime={n.dateTime}>{n.date}</time>
                    <span>{n.title}</span>
                    <ArrowUpRight size={20} />
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/news" className={styles.textLink}>
              All stories <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className={styles.partners} aria-label="Partners">
        <div className="container">
          <span className={styles.label}>Working with</span>
          <ul>
            {partners.map((p) => (
              <li key={p.name}>
                <img src={p.logo} alt={p.name} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
