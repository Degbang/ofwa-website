import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { VideoModal } from '../../components/VideoModal/VideoModal';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Programs.module.css';
import heroImg from '../../assets/web/programs-hero.webp';
import awcImg from '../../assets/web/programs-awc.webp';
import kiwixImg from '../../assets/web/programs-kiwix.webp';
import techImg from '../../assets/web/programs-tech.webp';
import glamImg from '../../assets/web/programs-glam.webp';
import wikiskillsImg from '../../assets/web/programs-wikiskills.webp';

interface Program {
  title: string;
  tag: string;
  body: string;
  img: string;
  url: string;
  /** OFWA YouTube video for this program, if there is one. */
  videoId?: string;
}

const programs: Program[] = [
  {
    title: 'Africa Wiki Challenge',
    tag: 'Open Education',
    body: 'An annual campaign inviting Africans and the diaspora to create and improve Africa-related Wikipedia articles, adding the photos, audio and sources they lack.',
    img: awcImg,
    url: 'https://meta.wikimedia.org/wiki/Africa_Wiki_Challenge',
    videoId: 'cXnO3a2_bLU',
  },
  {
    title: 'Kiwix4Schools',
    tag: 'Open Education',
    body: 'Offline Wikipedia and curriculum-friendly learning packages installed in Junior and Senior High Schools across six-plus regions of Ghana.',
    img: kiwixImg,
    url: 'https://meta.wikimedia.org/wiki/Kiwix4Schools_Project',
    videoId: 'qmLD3DQB52c',
  },
  {
    title: 'Africa Wikimedia Technical Community',
    tag: 'Digital Skills',
    body: 'Helping African developers grow through open-source, volunteer technical contributions to Wikimedia. Formerly the Africa Wikimedia Developers Project.',
    img: techImg,
    url: 'https://www.mediawiki.org/wiki/Africa_Wikimedia_Technical_Community',
  },
  {
    title: 'GLAM Ghana',
    tag: 'Culture & Heritage',
    body: "Working with galleries, libraries, archives and museums to digitise Ghana's cultural heritage and share it openly.",
    img: glamImg,
    url: 'https://meta.wikimedia.org/wiki/Grants:PEG/Wikimedia_Ghana_User_Group/GLAM_GHANA',
  },
  {
    title: 'WikiSkills for Librarians',
    tag: 'Digital Skills',
    body: 'With Goethe-Institut Ghana, training librarians in source evaluation, Wikipedia editing and open knowledge contribution.',
    img: wikiskillsImg,
    url: 'https://meta.wikimedia.org/wiki/WikiSkills_for_Librarians',
    videoId: 'lphmiobFkbA',
  },
];

interface ListItem {
  title: string;
  meta: string;
  body: string;
  url?: string;
}

const campaigns: ListItem[] = [
  {
    title: 'Founders Day Ghana Writing Contest',
    meta: 'Every 4 Aug',
    body: "Writing about Ghana's founders, with the Goethe-Institut.",
    url: 'https://meta.wikimedia.org/wiki/Founders_Day_Ghana_Writing_Contest_-_Decolonizing_The_Internet',
  },
  {
    title: 'Africa Day Campaign',
    meta: 'Every 25 May',
    body: "Improving articles on Africa's people, history and culture.",
    url: 'https://meta.wikimedia.org/wiki/Africa_Day_Campaign',
  },
  {
    title: 'Wiki Loves Festivals',
    meta: 'Festival seasons',
    body: 'Photographing African festivals for Wikimedia Commons.',
  },
  {
    title: 'The Ghana Polls 2020',
    meta: '2020',
    body: "Covering Ghana's 2020 elections on Wikipedia.",
    url: 'https://meta.wikimedia.org/wiki/The_Ghana_Polls_2020',
  },
  {
    title: 'Book Exchange Booth',
    meta: 'At our events',
    body: 'Bring a book, take a book.',
  },
];

const movement: ListItem[] = [
  {
    title: 'WikiIndaba Conference',
    meta: 'Since 2014',
    body: 'The regional conference for African Wikimedians. Ghana hosted the 2nd edition.',
    url: 'https://meta.wikimedia.org/wiki/WikiIndaba_conference_2017',
  },
  {
    title: 'Wikipedia Education Project',
    meta: 'Ashesi University',
    body: 'Turning student coursework and research into Wikipedia articles.',
    url: 'https://outreach.wikimedia.org/wiki/Education/Countries/Ghana',
  },
  {
    title: 'Kumusha Bus',
    meta: 'Outreach',
    body: 'Taking training and access beyond the hub cities.',
    url: 'https://meta.wikimedia.org/wiki/Kumusha_Bus',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

const ItemList: React.FC<{ label: string; items: ListItem[] }> = ({ label, items }) => (
  <div className={styles.listCol}>
    <h3 className={styles.listLabel}>{label}</h3>
    <ul className={styles.list}>
      {items.map((item) => {
        const inner = (
          <>
            <span className={styles.itemText}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </span>
            <span className={styles.itemMeta}>{item.meta}</span>
            {item.url && <ArrowUpRight size={16} className={styles.itemArrow} />}
          </>
        );
        return (
          <li key={item.title}>
            {item.url ? (
              <a className={styles.item} href={item.url} target="_blank" rel="noopener noreferrer">{inner}</a>
            ) : (
              <div className={styles.item}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

const Programs: React.FC = () => {
  useScrollReveal();
  const [active, setActive] = useState(0);
  const [videoId, setVideoId] = useState<string | null>(null);
  const closeVideo = useCallback(() => setVideoId(null), []);

  return (
    <>
      <VideoModal videoId={videoId} onClose={closeVideo} />

      {/* ░░ HERO ░░ */}
      <section className={`${styles.hero} snap-frame`}>
        <div className={styles.shell}>
          <p className={`${styles.kicker} reveal`}>Programs</p>
          <h1 className={`${styles.heroTitle} reveal d1`}>
            Where open knowledge <span>gets made.</span>
          </h1>
          <p className={`${styles.heroSub} reveal d2`}>
            We bring people, schools and institutions together to write Africa into Wikipedia and open up learning.
          </p>
          <div className={`${styles.heroImage} reveal d3`}>
            <img src={heroImg} alt="Students learning at computers during an OFWA program" />
            <span className={styles.heroCount}>
              {programs.length} programs · {campaigns.length} campaigns · {movement.length} movement projects
            </span>
          </div>
        </div>
      </section>

      {/* ░░ FLAGSHIP INDEX ░░ */}
      <section className={`${styles.index} snap-frame`}>
        <div className={styles.shell}>
          <header className={styles.sectionHead}>
            <p className={styles.kicker}>Flagship programs</p>
            <h2 className={`${styles.sectionTitle} reveal`}>Five programs, one mission.</h2>
          </header>

          <div className={styles.indexGrid}>
            <ol className={styles.rows}>
              {programs.map((p, i) => {
                const isActive = i === active;
                return (
                  <li key={p.title} className={`${styles.row} ${isActive ? styles.rowActive : ''}`} onMouseEnter={() => setActive(i)}>
                    <button
                      type="button"
                      className={styles.rowHead}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-expanded={isActive}
                    >
                      <span className={styles.rowNum}>{pad(i + 1)}</span>
                      <span className={styles.rowTitle}>{p.title}</span>
                      <span className={styles.rowTag}>{p.tag}</span>
                    </button>
                    <div className={styles.rowBody}>
                      <div className={styles.rowBodyInner}>
                        <img className={styles.rowImgMobile} src={p.img} alt="" loading="lazy" />
                        <p>{p.body}</p>
                        <div className={styles.rowLinks}>
                          <a href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={isActive ? 0 : -1}>
                            Learn more <ArrowUpRight size={15} />
                          </a>
                          {p.videoId && (
                            <button type="button" onClick={() => setVideoId(p.videoId!)} tabIndex={isActive ? 0 : -1}>
                              <Play size={13} fill="currentColor" /> Watch
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className={styles.preview} aria-hidden="true">
              {programs.map((p, i) => (
                <img key={p.title} src={p.img} alt="" className={i === active ? styles.previewOn : ''} />
              ))}
              <span className={styles.previewNum}>{pad(active + 1)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ MORE WAYS + CTA ░░ */}
      <section className={`${styles.more} snap-frame`}>
        <div className={styles.shell}>
          <header className={styles.sectionHead}>
            <p className={styles.kicker}>Campaigns &amp; movement</p>
            <h2 className={`${styles.sectionTitle} reveal`}>More ways we work.</h2>
          </header>

          <div className={`${styles.lists} reveal d1`}>
            <ItemList label="Campaigns & contests" items={campaigns} />
            <ItemList label="Community & movement" items={movement} />
          </div>

          <div className={`${styles.cta} reveal d2`}>
            <p>Want to bring a program to your community?</p>
            <div className={styles.ctaBtns}>
              <Link className={styles.btnPrimary} to="/contact">
                Talk to us <ArrowRight size={16} />
              </Link>
              <Link className={styles.btnGhost} to="/volunteer">
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
