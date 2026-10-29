import React from 'react';
import styles from './PageHero.module.css';

interface PageHeroProps {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Full-bleed photo variant. The nav turns transparent over it (see Navbar's darkHeroPaths). */
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  /** A photograph beside the heading on light headers. */
  media?: { src: string; alt: string; caption?: string; position?: string };
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ kicker, title, lede, image, imageAlt = '', imagePosition, media, children }) => {
  if (image) {
    return (
      <section className={styles.photoHero}>
        <img src={image} alt={imageAlt} style={{ objectPosition: imagePosition }} />
        <div className={styles.scrim} />
        <div className={`container ${styles.photoInner}`}>
          <p className={`eyebrow eyebrow-light ${styles.rise}`}>{kicker}</p>
          <h1 className={`display ${styles.photoTitle} ${styles.rise2}`}>{title}</h1>
          {lede && <p className={`lede ${styles.photoLede} ${styles.rise3}`}>{lede}</p>}
          {children && <div className={`${styles.actions} ${styles.rise3}`}>{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <div className={`container ${media ? styles.withMedia : ''}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.rise}`}>{kicker}</p>
          <h1 className={`display ${styles.title} ${styles.rise2}`}>{title}</h1>
          {(lede || children) && (
            <div className={media ? styles.underStack : styles.under}>
              {lede && <p className={`lede ${styles.rise3}`}>{lede}</p>}
              {children && <div className={`${styles.actions} ${styles.rise3}`}>{children}</div>}
            </div>
          )}
        </div>
        {media && (
          <figure className={`${styles.media} ${styles.rise3}`}>
            <div className="photo">
              <img src={media.src} alt={media.alt} style={{ objectPosition: media.position }} />
            </div>
            {media.caption && <figcaption className="caption">{media.caption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
};
