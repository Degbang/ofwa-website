import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { DIFF_SEARCH_URL, diffNewsStories } from '../../data/diffNews';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './News.module.css';

const FALLBACK_IMAGE = '/assets/images/blog-photo-1.png';
const VISIBLE_STORY_COUNT = 10;

const categories = [
  'All',
  'Campaigns',
  'Education',
  'Events',
  'Partnerships',
  'Community',
] as const;

type NewsCategory = (typeof categories)[number];
type StoryCategory = Exclude<NewsCategory, 'All'>;

const getCategory = (title: string): StoryCategory => {
  const normalized = title.toLowerCase();

  if (/school|student|education|learning|librar|kiwix|digital skill/.test(normalized)) {
    return 'Education';
  }

  if (/challenge|campaign|contest|competition|shine her light/.test(normalized)) {
    return 'Campaigns';
  }

  if (/conference|wikimania|indaba|workshop|training|summit|salon/.test(normalized)) {
    return 'Events';
  }

  if (/partner|collaborat|alliance|network/.test(normalized)) {
    return 'Partnerships';
  }

  return 'Community';
};

const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  if (!event.currentTarget.src.endsWith(FALLBACK_IMAGE)) {
    event.currentTarget.src = FALLBACK_IMAGE;
  }
};

const News: React.FC = () => {
  useScrollReveal();

  useEffect(() => {
    document.documentElement.classList.add('news-page');

    return () => {
      document.documentElement.classList.remove('news-page');
    };
  }, []);

  const [activeFilter, setActiveFilter] = useState<NewsCategory>('All');
  const storyTrackRef = useRef<HTMLDivElement>(null);
  const featuredStory = diffNewsStories[0];

  const stories = useMemo(
    () =>
      diffNewsStories.slice(1, VISIBLE_STORY_COUNT).map((story) => ({
        ...story,
        category: getCategory(story.title),
      })),
    [],
  );

  const filteredStories = useMemo(
    () =>
      activeFilter === 'All'
        ? stories
        : stories.filter((story) => story.category === activeFilter),
    [activeFilter, stories],
  );

  useEffect(() => {
    storyTrackRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [activeFilter]);

  const scrollStories = (direction: 'previous' | 'next') => {
    const track = storyTrackRef.current;
    const firstCard = track?.querySelector<HTMLElement>('article');

    if (!track || !firstCard) return;

    const cardGap = 22;
    const distance = firstCard.getBoundingClientRect().width + cardGap;
    track.scrollBy({
      left: direction === 'previous' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <main className={styles.newsViewportContainer}>
      {featuredStory && (
        <section className={[styles.featuredHero, 'snap-frame'].join(' ')}>
          <img
            className={styles.featuredBackdrop}
            src={featuredStory.image || FALLBACK_IMAGE}
            alt=""
            onError={handleImageError}
          />
          <div className={styles.featuredShade} />
          <div className={['container', styles.heroInner].join(' ')}>
            <header className={styles.heroHeading}>
              <p className={styles.pageHeroKicker}>OFWA on Wikimedia Diff</p>
              <h1 className={styles.pageHeroTitle}>News &amp; Stories</h1>
              <p className={styles.pageHeroSub}>
                Campaigns, partnerships, events, and community stories from across
                West Africa.
              </p>
            </header>

            <article className={styles.featuredContent}>
              <div className={styles.featuredMetaLine}>
                <span className={styles.featuredCat}>Latest story</span>
                <time dateTime={featuredStory.dateTime}>{featuredStory.date}</time>
              </div>
              <h2 className={styles.featuredTitle}>
                <a href={featuredStory.url} target="_blank" rel="noreferrer">
                  {featuredStory.title}
                </a>
              </h2>
              <p className={styles.featuredByline}>
                By {featuredStory.author || 'Open Foundation West Africa'}
              </p>
              <a
                href={featuredStory.url}
                target="_blank"
                rel="noreferrer"
                className={styles.featuredLink}
              >
                Read the latest story
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>
      )}

      <section className={[styles.allPostsSection, 'snap-frame'].join(' ')}>
        <div className="container">
          <div className={styles.postsHeader}>
            <div className={styles.postsHeading}>
              <p className={styles.postsEyebrow}>Recent coverage</p>
              <h2 className={styles.postsSectionH}>Latest OFWA Stories</h2>
              <p className={styles.storyCount}>
                The {VISIBLE_STORY_COUNT} most recent stories from Wikimedia Diff.
              </p>
            </div>
            <div className={styles.trackControls}>
              <button
                type="button"
                className={styles.trackButton}
                onClick={() => scrollStories('previous')}
                aria-label="Previous stories"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.trackButton}
                onClick={() => scrollStories('next')}
                aria-label="Next stories"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className={styles.filters} aria-label="Filter stories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={[
                  styles.filterBtn,
                  activeFilter === category ? styles.filterBtnActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.postsGrid} ref={storyTrackRef}>
            {filteredStories.map((story) => (
              <article
                key={story.url}
                className={[styles.newsCard, 'reveal'].join(' ')}
              >
                <a
                  className={styles.newsCardImg}
                  href={story.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={story.title}
                >
                  <img
                    src={story.image || FALLBACK_IMAGE}
                    alt=""
                    loading="lazy"
                    onError={handleImageError}
                  />
                </a>
                <div className={styles.newsCardBody}>
                  <div className={styles.newsCardMeta}>
                    <span className={styles.newsTag}>{story.category}</span>
                    <time className={styles.newsDate} dateTime={story.dateTime}>
                      {story.date}
                    </time>
                  </div>
                  <h3 className={styles.newsCardTitle}>
                    <a href={story.url} target="_blank" rel="noreferrer">
                      {story.title}
                    </a>
                  </h3>
                  <p className={styles.newsCardExcerpt}>
                    By {story.author || 'Open Foundation West Africa'}
                  </p>
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.newsLink}
                    aria-label={'Read ' + story.title + ' on Wikimedia Diff'}
                  >
                    Read on Diff
                    <ArrowRight
                      className={styles.linkArrow}
                      size={15}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <p className={styles.noPosts}>No stories found in this category.</p>
          )}

          <div className={styles.loadMoreWrap}>
            <div>
              <p className={styles.archiveLabel}>Full archive</p>
              <h2 className={styles.archiveTitle}>Continue reading on Wikimedia Diff</h2>
            </div>
            <a
              href={DIFF_SEARCH_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.loadMoreBtn}
            >
              See all OFWA stories
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default News;
