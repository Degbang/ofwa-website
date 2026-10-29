import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { boardMembers, coreTeam, hubLeaders, type Person } from '../../data/people';
import styles from './About.module.css';

const pillars = [
  {
    title: 'Advocate',
    body: 'We campaign for open licensing, fair access to knowledge and policy that supports it, and we represent African contributors in the global Wikimedia and Creative Commons movements.',
  },
  {
    title: 'Train',
    body: 'We teach people to write, photograph and code for Wikipedia and its sister projects, and we build digital skills for women, students, librarians and developers.',
  },
  {
    title: 'Consult',
    body: 'We advise organisations on copyright, licensing and research, and on deploying offline knowledge with Kiwix where connectivity is poor.',
  },
  {
    title: 'Digitise',
    body: 'We work with archives, libraries and museums to put African cultural heritage online, openly licensed and findable.',
  },
];

const milestones = [
  { year: '2016', text: 'OFWA is founded in Accra to grow open knowledge across West Africa.' },
  { year: '2017', text: 'GLAM Ghana digitises records from the national archives, and Ghana hosts WikiIndaba, the conference for African Wikimedians.' },
  { year: '2020', text: 'The Ghana Polls 2020 campaign builds Wikipedia coverage of the national elections.' },
  { year: '2025', text: 'WikiSkills for Librarians begins with the Goethe-Institut Ghana, and the Africa Wiki Challenge launches in Accra.' },
  { year: '2026', text: 'The Africa Wiki Challenge is launched in Nigeria on the theme Water for Life in Africa, and Kumasi hosts a Google Summer of Code training at KNUST.' },
];

const values = [
  { title: 'Collaboration', body: 'We co-create solutions through partnerships rather than working in silos.' },
  { title: 'Afro-heritage', body: 'African narratives should be owned, shaped and told by Africans.' },
  { title: 'Equity and inclusion', body: 'We remove barriers to taking part, so that many kinds of voices are heard.' },
  { title: 'Innovation', body: 'We build platforms and use new technology to capture and share knowledge.' },
  { title: 'Transparency', body: 'We work in the open, and make our decisions, processes and finances visible to our community and partners.' },
];

const groups = [
  { id: 'team', label: 'Core team', people: coreTeam },
  { id: 'board', label: 'Board', people: boardMembers },
  { id: 'leaders', label: 'Hub leaders', people: hubLeaders },
] as const;

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

const Portrait: React.FC<{ person: Person }> = ({ person }) => {
  const [failed, setFailed] = useState(false);
  return (
    <li className={styles.person}>
      <div className={styles.portrait}>
        {failed ? (
          <span className={styles.monogram}>{initials(person.name)}</span>
        ) : (
          <img src={person.image} alt={person.name} loading="lazy" onError={() => setFailed(true)} />
        )}
      </div>
      <h3>{person.name}</h3>
      <p>{person.role}</p>
    </li>
  );
};

const About: React.FC = () => {
  const [group, setGroup] = useState<(typeof groups)[number]['id']>('team');
  useScrollReveal(group);
  const active = groups.find((g) => g.id === group)!;

  return (
    <>
      <PageHero
        kicker="About OFWA"
        title="Open knowledge, built by the people it describes."
        lede="Open Foundation West Africa is a Ghana-based non-profit and a recognised Wikimedia and Creative Commons affiliate. Since 2016 we have helped communities write, keep and share their own knowledge."
        image="/img/team-afrocreatives.webp"
        imageAlt="The OFWA team and volunteers gathered outside the venue at the AfroCreatives 2025 launch"
        imagePosition="center 60%"
      />

      {/* Vision and mission */}
      <section className="section">
        <div className={`container split-even`}>
          <div className="reveal">
            <span className="eyebrow">Our vision</span>
            <p className={`serif-lede ${styles.statement}`}>
              An equitable digital landscape where African knowledge is freely shared by Africans, for everyone.
            </p>
          </div>
          <div className="reveal">
            <span className="eyebrow">Our mission</span>
            <p className={`serif-lede ${styles.statement}`}>
              To co-create the future of African open knowledge by building inclusive platforms and equipping communities
              with the tools to share their own narratives.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section section-sand">
        <div className="container split">
          <span className="eyebrow">How we work</span>
          <ol className="rules">
            {pillars.map((p, i) => (
              <li key={p.title} className={`${styles.pillar} reveal`}>
                <span className="small-caps">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="subtitle">{p.title}</h2>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Milestones */}
      <section className="section">
        <div className="container split">
          <span className="eyebrow">A decade of work</span>
          <div>
            <ol className={`rules ${styles.timeline}`}>
              {milestones.map((m) => (
                <li key={m.year} className="reveal">
                  <time className={styles.year}>{m.year}</time>
                  <p>{m.text}</p>
                </li>
              ))}
            </ol>
            <Link to="/programs" className="link-arrow" style={{ marginTop: 36 }}>
              See every program <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-dark">
        <div className="container split">
          <span className="eyebrow eyebrow-light">What guides us</span>
          <div>
            <h2 className="title" style={{ maxWidth: '14em', marginBottom: 56 }}>
              Five principles behind every program.
            </h2>
            <ol className={`rules ${styles.values}`}>
              {values.map((v, i) => (
                <li key={v.title} className="reveal">
                  <span className="small-caps" style={{ color: 'rgba(247,243,236,0.55)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="subtitle">{v.title}</h3>
                  <p>{v.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* People */}
      <section className="section">
        <div className="container">
          <div className={styles.peopleHead}>
            <div>
              <span className="eyebrow">Our people</span>
              <h2 className="title" style={{ marginTop: 24 }}>The people behind the work.</h2>
            </div>
            <div className="filters" role="group" aria-label="Choose a group">
              {groups.map((g) => (
                <button key={g.id} type="button" className="filter" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <ul className={styles.people}>
            {active.people.map((p) => (
              <Portrait key={`${group}-${p.name}`} person={p} />
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="section section-dark">
        <div className={`container ${styles.closing}`}>
          <h2 className="title">Help us write the next chapter.</h2>
          <div className={styles.closingLinks}>
            <Link to="/volunteer" className="btn btn-light">Volunteer</Link>
            <Link to="/partner" className="btn btn-light">Partner with us</Link>
            <Link to="/contact" className="link-arrow">Contact the team <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
