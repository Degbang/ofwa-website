import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  WifiOff,
  Code2,
  Landmark,
  GraduationCap,
  Vote,
  Megaphone,
  BookOpen,
  Users,
  Bus,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Programs.module.css';

const flagshipPrograms = [
  {
    icon: Trophy,
    tag: 'Open Education',
    title: 'Africa Wiki Challenge',
    body: 'An annual campaign inviting Africans and the diaspora to create and improve Africa-related Wikipedia content, addressing the lack of multimedia resources and credibility issues in existing articles.',
    url: 'https://meta.wikimedia.org/wiki/Africa_Wiki_Challenge',
  },
  {
    icon: WifiOff,
    tag: 'Open Education',
    title: 'Kiwix4Schools',
    body: 'Installs Kiwix and curriculum-friendly offline packages in Junior and Senior High Schools across Ghana, giving students and teachers access to educational resources without internet connectivity.',
    url: 'https://meta.wikimedia.org/wiki/Kiwix4Schools_Project',
  },
  {
    icon: Code2,
    tag: 'Digital Skills',
    title: 'Africa Wikimedia Technical Community',
    body: 'Formerly the Africa Wikimedia Developers Project. Creates an enabling ecosystem for African developers to grow their skills through open-source, volunteer technical contributions to Wikimedia.',
    url: 'https://www.mediawiki.org/wiki/Africa_Wikimedia_Technical_Community',
  },
  {
    icon: Landmark,
    tag: 'Culture & Heritage',
    title: 'GLAM Ghana',
    body: "Partners with galleries, libraries, archives, and museums to digitize and openly distribute Ghana's cultural heritage.",
    url: 'https://meta.wikimedia.org/wiki/Grants:PEG/Wikimedia_Ghana_User_Group/GLAM_GHANA',
  },
  {
    icon: GraduationCap,
    tag: 'Digital Skills',
    title: 'WikiSkills for Librarians',
    body: 'A collaboration between OFWA and Goethe-Institut Ghana training librarians in source evaluation, Wikipedia editing, and open knowledge contribution.',
    url: 'https://meta.wikimedia.org/wiki/WikiSkills_for_Librarians',
  },
];

const campaigns = [
  {
    icon: Megaphone,
    title: 'Founders Day Ghana Writing Contest',
    body: 'An annual writing competition held every August 4th celebrating Ghana’s independence founders, run with the Goethe-Institut and Wikimedia Foundation under themes like "Decolonizing the Internet."',
    url: 'https://meta.wikimedia.org/wiki/Founders_Day_Ghana_Writing_Contest_-_Decolonizing_The_Internet',
  },
  {
    icon: Vote,
    title: 'The Ghana Polls 2020',
    body: 'An electoral awareness campaign encouraging peaceful participation in Ghana’s 2020 elections while expanding Wikipedia coverage of political processes and key figures, via #TheGhanaPolls2020.',
    url: 'https://meta.wikimedia.org/wiki/The_Ghana_Polls_2020',
  },
  {
    icon: BookOpen,
    title: 'Wiki Loves Festivals',
    body: 'Documents cultural festivals across Africa through photos and video contributed to Wikimedia Commons and Wikipedia, which are scarcely covered on Wikimedia platforms despite their cultural significance.',
    url: null,
  },
  {
    icon: Megaphone,
    title: 'Africa Day Campaign',
    body: 'An annual contribution drive around Africa Day, expanding and improving articles documenting the continent’s people, history, and culture.',
    url: 'https://meta.wikimedia.org/wiki/Africa_Day_Campaign',
  },
  {
    icon: BookOpen,
    title: 'Book Exchange Booth',
    body: 'A community initiative promoting book circulation and knowledge sharing at OFWA events and hub locations.',
    url: null,
  },
];

const community = [
  {
    icon: Users,
    title: 'WikiIndaba Conference',
    body: 'The regional conference for African Wikimedians and diaspora communities. Ghana hosted the second edition, in Accra; the first was in Johannesburg, 2014.',
    stamp: 'EST. 2014',
    url: 'https://meta.wikimedia.org/wiki/WikiIndaba_conference_2017',
  },
  {
    icon: GraduationCap,
    title: 'Wikipedia Education Project',
    body: 'Brings Wikipedia editing into the classroom at Ashesi University, training students to turn coursework and research into open knowledge contributions.',
    stamp: 'ASHESI U.',
    url: 'https://outreach.wikimedia.org/wiki/Education/Countries/Ghana',
  },
  {
    icon: Bus,
    title: 'Kumusha Bus',
    body: 'A mobile outreach program connecting communities directly to the open knowledge movement, bringing training and access beyond the hub cities.',
    stamp: 'OUTREACH',
    url: 'https://meta.wikimedia.org/wiki/Kumusha_Bus',
  },
];

const Programs: React.FC = () => {
  useScrollReveal();
  const [activeProgram, setActiveProgram] = useState(0);
  const active = flagshipPrograms[activeProgram];
  const ActiveIcon = active.icon;

  return (
    <>
      {/* ░░ HERO ░░ */}
      <div className={`${styles.heroContainer} snap-frame`}>
        <section className={styles.pageHero}>
          <div className="container">
            <p className={`${styles.pageHeroKicker} reveal`}>Field Index — Programs &amp; Projects</p>
            <h1 className={`${styles.pageHeroTitle} reveal d1`}>
              Where Open Knowledge
              <br />
              <em>Gets Made</em>
            </h1>
            <div className={`${styles.heroRule} reveal d2`} />
            <p className={`${styles.pageHeroSub} reveal d2`}>
              <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
              Our programs bring people, institutions and communities together to create open
              knowledge, expand access to education, strengthen digital skills and make African
              experiences more visible online.
            </p>
            <div className={`${styles.heroCtas} reveal d3`}>
              <a className={styles.btnHeroPrimary} href="#program-index">
                <span>Browse the Index</span>
                <ArrowRight size={16} />
              </a>
              <Link className={styles.btnHeroSecondary} to="/contact">
                <span>Start a Program With Us</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ░░ FLAGSHIP PROGRAMS — INTERACTIVE INDEX ░░ */}
      <section id="program-index" className={`${styles.indexSection} snap-frame`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionTag}>01 — Flagship Programs</span>
            <h2 className={`${styles.sectionTitle} reveal d1`}>Five programs, one mission</h2>
          </div>

          <div className={`${styles.indexLayout} reveal d2`}>
            <ol className={styles.indexList}>
              {flagshipPrograms.map((p, i) => (
                <li key={p.title}>
                  <button
                    type="button"
                    className={`${styles.indexItem} ${i === activeProgram ? styles.indexItemActive : ''}`}
                    onClick={() => setActiveProgram(i)}
                    aria-pressed={i === activeProgram}
                  >
                    <span className={styles.indexItemNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.indexItemName}>{p.title}</span>
                    <ArrowUpRight size={16} className={styles.indexItemArrow} />
                  </button>
                </li>
              ))}
            </ol>

            <div key={activeProgram} className={styles.indexDetail}>
              <span className={styles.indexDetailGhost} aria-hidden="true">
                {String(activeProgram + 1).padStart(2, '0')}
              </span>
              <div className={styles.indexDetailIcon}>
                <ActiveIcon size={24} />
              </div>
              <span className={styles.indexDetailTag}>{active.tag}</span>
              <h3 className={styles.indexDetailTitle}>{active.title}</h3>
              <p className={styles.indexDetailBody}>{active.body}</p>
              {active.url && (
                <a
                  className={styles.indexDetailLink}
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View on Wikimedia</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ░░ CAMPAIGNS & CONTESTS — LEDGER ░░ */}
      <section className={`${styles.ledgerSection} snap-frame`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionTagLight}>02 — Campaigns &amp; Contests</span>
            <h2 className={`${styles.sectionTitleLight} reveal d1`}>The contribution drives</h2>
          </div>

          <div className={`${styles.ledger} reveal d2`}>
            {campaigns.map((c, i) => {
              const IconComp = c.icon;
              return (
                <div key={c.title} className={styles.ledgerRow}>
                  <span className={styles.ledgerNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.ledgerIconWrap}>
                    <IconComp size={16} />
                  </div>
                  <h3 className={styles.ledgerTitle}>
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer">
                        {c.title}
                        <ExternalLink size={13} />
                      </a>
                    ) : (
                      c.title
                    )}
                  </h3>
                  <span className={styles.ledgerLeader} aria-hidden="true" />
                  <p className={styles.ledgerBody}>{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ░░ COMMUNITY & MOVEMENT — STAMPED CARDS ░░ */}
      <section className={`${styles.communitySection} snap-frame`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionTag}>03 — Community &amp; Movement</span>
            <h2 className={`${styles.sectionTitle} reveal d1`}>Growing the wider movement</h2>
          </div>

          <div className={styles.stampGrid}>
            {community.map((c, i) => {
              const IconComp = c.icon;
              return (
                <div key={c.title} className={`${styles.stampCard} reveal d${i + 1}`}>
                  <span className={styles.stampBadge}>{c.stamp}</span>
                  <div className={styles.stampIconWrap}>
                    <IconComp size={20} />
                  </div>
                  <h3 className={styles.stampTitle}>
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer">
                        {c.title}
                        <ExternalLink size={13} />
                      </a>
                    ) : (
                      c.title
                    )}
                  </h3>
                  <p className={styles.stampBody}>{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className={`${styles.programsCta} snap-frame`}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={`${styles.ctaSeal} reveal`} aria-hidden="true">
            <span>OFWA</span>
          </div>
          <p className={`${styles.ctaTag} reveal d1`}>Have an Idea?</p>
          <h2 className={`${styles.ctaH} reveal d1`}>Bring a program to your community</h2>
          <p className={`${styles.ctaSub} reveal d2`}>
            Whether you want to host an edit-a-thon, start a Wiki Club, or partner with us on a
            new campaign, our team is ready to help you get it off the ground.
          </p>
          <div className={`${styles.ctaBtnsGroup} reveal d3`}>
            <Link className={styles.btnCtaPrimary} to="/contact">
              <Mail size={16} />
              <span>Contact Us</span>
            </Link>
            <Link className={styles.btnCtaSecondary} to="/volunteer">
              <span>Volunteer Instead</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
