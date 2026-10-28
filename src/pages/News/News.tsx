import React, { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { DIFF_SEARCH_URL, diffNewsStories } from '../../data/diffNews';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './News.module.css';

const FALLBACK_IMAGE = '/img/workshop-afrocreatives.webp';
const VISIBLE = 12;

const categories = ['All', 'Campaigns', 'Education', 'Events', 'Partnerships', 'Community'] as const;
type Category = (typeof categories)[number];

const categoryOf = (title: string): Exclude<Category, 'All'> => {
  const t = title.toLowerCase();
  if (/school|student|education|learning|librar|kiwix|digital skill/.test(t)) return 'Education';
  if (/challenge|campaign|contest|competition|shine her light/.test(t)) return 'Campaigns';
  if (/conference|wikimania|indaba|workshop|training|summit|salon/.test(t)) return 'Events';
  if (/partner|collaborat|alliance|network/.test(t)) return 'Partnerships';
  return 'Community';
};

// Diff images carry a small thumbnail size in the URL; the same media library serves larger ones.
const upsize = (url: string, size = '900,900') =>
  url && url.includes('diff.wikimedia.org') ? url.replace(/([?&])fit=[^&]*/, `$1fit=${encodeURIComponent(size)}`) : url;

const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  if (!e.currentTarget.src.endsWith(FALLBACK_IMAGE)) e.currentTarget.src = FALLBACK_IMAGE;
};

const News: React.FC = () => {
  const [filter, setFilter] = useState<Category>('All');
  useScrollReveal(filter);

  const [featured, ...rest] = diffNewsStories;
  const stories = useMemo(
    () => rest.slice(0, VISIBLE).map((s) => ({ ...s, category: categoryOf(s.title) })),
    [rest],
  );
  const shown = filter === 'All' ? stories : stories.filter((s) => s.category === filter);

  return (
    <>
      <PageHero
        kicker="News"
        title="Stories from the network."
        lede="Reports, reflections and announcements from OFWA and its community, published on Wikimedia Diff, the movement's blog."
        media={{ src: '/img/africa-wiki-challenge.webp', alt: 'A speaker addressing the room at the Africa Wiki Challenge 2025 launch', caption: 'Africa Wiki Challenge 2025 launch', position: 'center 70%' }}
      />

      {featured && (
        <section className="section-tight">
          <div className="container">
            <a href={featured.url} target="_blank" rel="noopener noreferrer" className={`${styles.featured} reveal`}>
              <div className={`photo ${styles.featuredImg}`}>
                <img src={upsize(featured.image, '1200,1200')} alt="" onError={onImgError} />
              </div>
              <div className={styles.featuredText}>
                <span className="small-caps">Latest &middot; {featured.date}</span>
                <h2 className="title">{featured.title}</h2>
                <p className="small-caps">By {featured.author}</p>
                <span className="link-arrow">
                  Read on Wikimedia Diff <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className={styles.bar}>
            <h2 className="subtitle">More stories</h2>
            <div className="filters" role="group" aria-label="Filter stories">
              {categories.map((c) => (
                <button key={c} type="button" className="filter" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {shown.length === 0 ? (
            <p className={styles.empty}>No stories in this category yet.</p>
          ) : (
            <ul className={styles.grid}>
              {shown.map((s) => (
                <li key={s.url} className="reveal">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
                    <div className={`photo ${styles.cardImg}`}>
                      <img src={upsize(s.image)} alt="" loading="lazy" onError={onImgError} />
                    </div>
                    <span className={styles.meta}>
                      {s.date} <i>/</i> {s.category}
                    </span>
                    <h3>{s.title}</h3>
                    <span className={styles.by}>By {s.author}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <a href={DIFF_SEARCH_URL} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ marginTop: 56 }}>
            Every OFWA story on Diff <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
};

export default News;
