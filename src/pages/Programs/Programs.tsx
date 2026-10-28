import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { VideoModal } from '../../components/VideoModal/VideoModal';
import { PageHero } from '../../components/ui/PageHero';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Programs.module.css';
import awcImg from '../../assets/web/programs-awc.webp';
import kiwixImg from '../../assets/web/programs-kiwix.webp';
import techImg from '../../assets/web/programs-tech.webp';
import glamImg from '../../assets/web/programs-glam-nkrumah.webp';
import wikiskillsImg from '../../assets/web/programs-wikiskills.webp';

interface Program {
  id: string;
  name: string;
  /** The program's sentence in the lead, split around its linked name. */
  lead: [before: string, after: string];
  body: string;
  facts: [label: string, value: React.ReactNode][];
  img: string;
  imgAlt: string;
  /** Where the crop centres in the photo. */
  imgFocus?: string;
  /** An archival print shown mounted on paper instead of full-bleed. */
  print?: { credit: string; href: string };
  links: { label: string; href: string }[];
  video?: { id: string; label: string };
}

const programs: Program[] = [
  {
    id: 'africa-wiki-challenge',
    name: 'Africa Wiki Challenge',
    lead: ['The ', ' gets Africans writing about Africa on Wikipedia.'],
    body: 'Every year, Africans at home and in the diaspora write and improve Wikipedia articles about the continent, and add the photos, audio and video those articles are missing.',
    facts: [
      ['Type', 'Writing contest, every year'],
      ['2026 edition', '28 May – 30 June, launched in Nigeria'],
      ['2026 theme', 'Water for Life in Africa'],
    ],
    img: awcImg,
    imgAlt: 'A speaker at the Africa Wiki Challenge 2025 launch',
    imgFocus: '45% 78%',
    links: [
      { label: 'Contest page on Meta-Wiki', href: 'https://meta.wikimedia.org/wiki/Africa_Wiki_Challenge' },
      { label: 'The 2026 launch on Diff', href: 'https://diff.wikimedia.org/2026/07/17/africa-wiki-challenge-2026-in-nigeria/' },
    ],
    video: { id: 'cXnO3a2_bLU', label: 'Watch the 2022 film (1:17)' },
  },
  {
    id: 'kiwix4schools',
    name: 'Kiwix4Schools',
    lead: ['', ' puts Wikipedia on school computers that have no internet.'],
    body: 'Kiwix is an offline reader for Wikipedia and other open resources. We install it on school computers with content packs that follow the curriculum, so students and teachers can use it without a connection.',
    facts: [
      ['For', 'Junior and Senior High Schools'],
      ['Regions', 'Volta, Eastern, Ashanti, Savannah, Northern, North East and Upper West'],
      ['Works', 'Without internet'],
    ],
    img: kiwixImg,
    imgAlt: 'Students using offline Wikipedia in a school computer lab',
    imgFocus: '50% 45%',
    links: [{ label: 'Project page on Meta-Wiki', href: 'https://meta.wikimedia.org/wiki/Kiwix4Schools_Project' }],
    video: { id: 'qmLD3DQB52c', label: 'Watch the Kiwix4Schools video (3:03)' },
  },
  {
    id: 'technical-community',
    name: 'Africa Wikimedia Technical Community',
    lead: ['The ', ' gets developers coding for Wikimedia.'],
    body: 'A community for African developers who want to contribute code to Wikimedia projects as volunteers. It began as the Africa Wikimedia Developers Project.',
    facts: [
      ['For', 'Developers and student tech clubs'],
      ['Clubs', 'Wikitech Student Developers Club, Kumasi'],
      ['Latest', 'Google Summer of Code training at KNUST, March 2026'],
    ],
    img: techImg,
    imgAlt: 'Members of the Kumasi Wiki Hub',
    imgFocus: '50% 60%',
    links: [
      { label: 'Community page on MediaWiki.org', href: 'https://www.mediawiki.org/wiki/Africa_Wikimedia_Technical_Community' },
      { label: 'The KNUST training on Diff', href: 'https://diff.wikimedia.org/2026/03/24/wikitech-student-developers-kumasi-holds-a-two-day-gsoc-training-at-knust/' },
    ],
  },
  {
    id: 'glam-ghana',
    name: 'GLAM Ghana',
    lead: ['', " put photographs from Ghana's national archives on Wikimedia Commons."],
    body: "A Wikimedia Foundation–funded project that digitised records from Ghana's public archives and published them on Wikimedia Commons, Wikipedia and Wikisource. The photograph here is one of them.",
    facts: [
      ['When', '15 March – 15 October 2017'],
      ['Led by', 'Felix Nartey and Raphael Berchie'],
      ['Archive', 'Public Records and Archives Administration Department (PRAAD)'],
    ],
    img: glamImg,
    imgAlt: 'President Kwame Nkrumah dancing with the Duchess of Kent',
    print: {
      credit: 'President Nkrumah dancing with the Duchess of Kent. PRAAD, CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:President_Nkrumah_dancing.png',
    },
    links: [
      { label: 'Project page on Meta-Wiki', href: 'https://meta.wikimedia.org/wiki/Grants:PEG/Wikimedia_Ghana_User_Group/GLAM_GHANA' },
      { label: 'The uploads on Wikimedia Commons', href: 'https://commons.wikimedia.org/wiki/Category:GLAM_Ghana' },
    ],
  },
  {
    id: 'wikiskills',
    name: 'WikiSkills for Librarians',
    lead: ['', ' teaches librarians to edit Wikipedia.'],
    body: 'Librarians learn how to judge sources, edit Wikipedia and share their collections openly, in sessions held at the Goethe-Institut Ghana.',
    facts: [
      ['With', 'Goethe-Institut Ghana'],
      ['For', 'Librarians'],
      ['Sessions', '2025, and 24–26 September 2026'],
    ],
    img: wikiskillsImg,
    imgAlt: 'A WikiSkills for Librarians session at the Goethe-Institut Ghana',
    imgFocus: '42% 40%',
    links: [{ label: 'Course page on Meta-Wiki', href: 'https://meta.wikimedia.org/wiki/WikiSkills_for_Librarians' }],
    video: { id: 'lphmiobFkbA', label: 'Watch the 2025 recap (1:31)' },
  },
];

interface Entry {
  name: string;
  when?: string;
  body: string;
  href?: string;
}

const campaigns: Entry[] = [
  {
    name: 'Founders Day Ghana Writing Contest',
    when: 'Around 4 August',
    body: 'Articles about the founders of Ghana, with the Goethe-Institut and the Wikimedia Foundation.',
    href: 'https://meta.wikimedia.org/wiki/Founders_Day_Ghana_Writing_Contest_-_Decolonizing_The_Internet',
  },
  {
    name: 'Africa Day Campaign',
    when: 'Around 25 May',
    body: 'An editing drive on articles about African people, history and culture.',
    href: 'https://meta.wikimedia.org/wiki/Africa_Day_Campaign',
  },
  {
    name: 'Wiki Loves Festivals',
    body: 'Photos and video of African festivals for Wikimedia Commons, which has very few of them.',
  },
  {
    name: 'The Ghana Polls 2020',
    when: '2020',
    body: 'Wikipedia coverage of Ghana’s 2020 elections, alongside a call for peaceful voting.',
    href: 'https://meta.wikimedia.org/wiki/The_Ghana_Polls_2020',
  },
  {
    name: 'Book Exchange Booth',
    when: 'At our events',
    body: 'Leave a book, take a book.',
  },
];

const movement: Entry[] = [
  {
    name: 'WikiIndaba',
    body: 'The conference for African Wikimedians. The first was in Johannesburg in 2014; Ghana hosted the second, in Accra.',
    href: 'https://meta.wikimedia.org/wiki/WikiIndaba_conference_2017',
  },
  {
    name: 'Wikipedia Education Project',
    body: 'Students at Ashesi University edit Wikipedia as part of their coursework.',
    href: 'https://outreach.wikimedia.org/wiki/Education/Countries/Ghana',
  },
  {
    name: 'Kumusha Bus',
    body: 'Outreach trips that take training and access beyond the cities where our hubs are.',
    href: 'https://meta.wikimedia.org/wiki/Kumusha_Bus',
  },
];

const EntryList: React.FC<{ heading: string; entries: Entry[] }> = ({ heading, entries }) => (
  <div>
    <h2 className="subtitle">{heading}</h2>
    <ul className={`rules ${styles.entries}`}>
      {entries.map((e) => (
        <li key={e.name} className="reveal">
          <p className={styles.entryName}>
            {e.href ? (
              <a href={e.href} target="_blank" rel="noopener noreferrer">
                {e.name} <ArrowUpRight size={15} />
              </a>
            ) : (
              e.name
            )}
            {e.when && <span>{e.when}</span>}
          </p>
          <p className={styles.entryBody}>{e.body}</p>
        </li>
      ))}
    </ul>
  </div>
);

const Programs: React.FC = () => {
  useScrollReveal();
  const [videoId, setVideoId] = useState<string | null>(null);
  const closeVideo = useCallback(() => setVideoId(null), []);

  return (
    <>
      <VideoModal videoId={videoId} onClose={closeVideo} />

      <PageHero
        kicker="Programs"
        title="Five programs, one aim: more of Africa on the open web."
        lede="Each program trains people, partners with institutions and puts something lasting on Wikipedia, Wikimedia Commons or a school computer."
        media={{ src: '/img/kiwix-schools.webp', alt: 'Students at computers during a Kiwix4Schools session', caption: 'Kiwix 4 Schools Initiative' }}
      />

      {/* Index */}
      <section className="section-tight">
        <div className="container split">
          <span className="eyebrow">In brief</span>
          <ol className="rules">
            {programs.map((p, i) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className={styles.indexRow}>
                  <span className="small-caps">{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.indexLead}>
                    {p.lead[0]}
                    <b>{p.name}</b>
                    {p.lead[1]}
                  </span>
                  <ArrowRight size={18} />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* One chapter per program */}
      {programs.map((p, i) => (
        <section key={p.id} id={p.id} className={`section ${styles.chapter} ${i % 2 ? styles.flip : ''}`}>
          <div className={`container ${styles.chapterGrid}`}>
            <div className={`${styles.media} reveal`}>
              {p.print ? (
                <figure className={styles.print}>
                  <img src={p.img} alt={p.imgAlt} loading="lazy" />
                  <figcaption>
                    <a href={p.print.href} target="_blank" rel="noopener noreferrer">{p.print.credit}</a>
                  </figcaption>
                </figure>
              ) : (
                <div className={`photo ${styles.photo}`}>
                  <img src={p.img} alt={p.imgAlt} loading="lazy" style={{ objectPosition: p.imgFocus }} />
                </div>
              )}
            </div>

            <div className={`${styles.text} reveal`}>
              <span className="small-caps">{String(i + 1).padStart(2, '0')} / {String(programs.length).padStart(2, '0')}</span>
              <h2 className="title">{p.name}</h2>
              <p className={`lede ${styles.body}`}>{p.body}</p>

              <dl className={`rules ${styles.facts}`}>
                {p.facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="small-caps">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <ul className={styles.links}>
                {p.video && (
                  <li>
                    <button type="button" className="link-arrow" onClick={() => setVideoId(p.video!.id)}>
                      <Play size={14} /> {p.video.label}
                    </button>
                  </li>
                )}
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      {l.label} <ArrowUpRight size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Campaigns and the wider movement */}
      <section className="section section-sand">
        <div className={`container split-even`}>
          <EntryList heading="Campaigns and contests" entries={campaigns} />
          <EntryList heading="In the wider movement" entries={movement} />
        </div>
      </section>

      {/* Closing */}
      <section className="section section-dark">
        <div className={`container ${styles.closing}`}>
          <h2 className="title">Want one of these at your school, library or club?</h2>
          <div className={styles.closingLinks}>
            <Link to="/contact" className="btn btn-light">Get in touch</Link>
            <Link to="/volunteer" className="link-arrow">Or help run them <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
