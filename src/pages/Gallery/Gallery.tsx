import React, { useCallback, useMemo, useState } from 'react';
import { PageHero } from '../../components/ui/PageHero';
import { Lightbox } from '../../components/Lightbox/Lightbox';
import { useGalleryPhotos } from '../../lib/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Gallery.module.css';

const groups = ['All', 'Campaigns', 'Training', 'Hubs', 'Community'] as const;

const Gallery: React.FC = () => {
  const [group, setGroup] = useState<(typeof groups)[number]>('All');
  const [open, setOpen] = useState(-1);
  const galleryPhotos = useGalleryPhotos();
  useScrollReveal(group);

  const photos = useMemo(() => (group === 'All' ? galleryPhotos : galleryPhotos.filter((p) => p.group === group)), [group, galleryPhotos]);
  const images = useMemo(() => photos.map((p) => ({ full: p.src, alt: p.caption })), [photos]);

  const prev = useCallback(() => setOpen((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setOpen((i) => (i + 1) % photos.length), [photos.length]);

  return (
    <>
      <PageHero
        kicker="Gallery"
        title="The work, in photographs."
        lede="Trainings, campaigns, hubs and school visits from across the network."
        media={{ src: '/img/digital-skills-women.webp', alt: 'Participants of the Digital Skills Workshop for Women holding their certificates', caption: 'Digital Skills Workshop for Women' }}
      />

      <section className="section">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter photographs" style={{ marginBottom: 48 }}>
            {groups.map((g) => (
              <button key={g} type="button" className="filter" aria-pressed={group === g} onClick={() => setGroup(g)}>
                {g}
              </button>
            ))}
          </div>

          <ul className={styles.columns}>
            {photos.map((p, i) => (
              <li key={p.src} className="reveal">
                <button type="button" className={styles.tile} onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`}>
                  <img src={p.src} alt={p.caption} loading="lazy" style={{ aspectRatio: p.ratio }} />
                  <span>{p.caption}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {open >= 0 && <Lightbox images={images} currentIndex={open} onClose={() => setOpen(-1)} onPrev={prev} onNext={next} />}
    </>
  );
};

export default Gallery;
