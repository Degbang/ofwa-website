import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Scale, Lightbulb, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './About.module.css';
import clsx from 'clsx';

const values = [
  {
    icon: <Users size={26} />,
    title: 'Collaboration',
    body: 'We believe in the power of the collective, co-creating solutions through meaningful partnerships rather than working in silos.',
    number: '01',
    tag: 'Togetherness'
  },
  {
    icon: <UtensilsCrossed size={26} />,
    title: 'Afro-heritage',
    body: 'We root our work in the pride of our identity, ensuring African narratives are owned, shaped, and told by Africans.',
    number: '02',
    tag: 'Diaspora'
  },

  {
    icon: <Scale size={26} />,
    title: 'Equity & Inclusion',
    body: 'We dismantle barriers to participation, creating a welcoming space where diverse voices are amplified, respected, and heard.',
    number: '03',
    tag: 'Inclusivity'
  },
  {
    icon: <Lightbulb size={26} />,
    title: 'Innovation',
    body: 'We create platforms and embrace forward-thinking solutions, leveraging new technologies to find effective ways to capture and share knowledge.',
    number: '04',
    tag: 'Pioneering'
  },
  {
    icon: <ShieldCheck size={26} />,
    title: 'Transparency',
    body: 'We work in the open with integrity, building trust by making our decisions, processes, and finances visible to our community and partners.',
    number: '05',
    tag: 'Integrity'
  },
];


const boardMembers = [
  { name: 'Ama Serwah Nerquaye-Tetteh', role: 'Secretary' },
  { name: 'Dr. George Tesilimi', role: 'Lecturer and Librarian- University of Health and Allied Sciences' },
  { name: 'Felix', role: 'Advisor to the Board' },
  { name: 'Jesse Akrofi-Asiedu', role: 'Digital Humanist and Open Advocate' },
  { name: 'Jonathan Oberko', role: 'Principal Accounts - Accra Technical University' },
  { name: 'Philip Boakye Dua Oyinka', role: 'Creative Writing Trainer, Poet, Writer' },
  { name: 'Raphael Berchie', role: 'Board Chairman/ Co-Founder' },
];

const staffMembers = [
  { name: 'Ama Owusu', role: 'Community Manager' },
  { name: 'Kojo Frimpong', role: 'Communications Lead' },
  { name: 'Efua Darko', role: 'Training Coordinator' },
];

const About: React.FC = () => {
  useScrollReveal();

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className={`${styles.pageHeroKicker} reveal`}>Our Story</p>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>About Open Foundation<br />West Africa</h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>A nonprofit building open knowledge ecosystems across Africa, one community at a time.</p>
        </div>
      </section>

      {/* MISSION SPLIT */}
      <section className={styles.aboutSplit}>
        <div className={styles.aboutSplitImg}>
          <div className={`${styles.aboutSplitContentGoals} ${styles.aboutSplitContentLight}`}>
            <span className="section-tag mission-title reveal">Our Vision</span>
            <h2 className={`${styles.sectionHDark} reveal `}>What We're Working Towards</h2>
            <p>​An equitable digital landscape where African knowledge is freely shared by Africans, for everyone.</p>
          </div>
        </div>
        <div className={styles.aboutSplitContent}>
          <span className="section-tag mission-title reveal">Our Mission</span>
          <h2 className={`${styles.sectionHDark} reveal d1`}>Contribution to the Open Movement</h2>
          <p className={`${styles.bodyText} reveal d2`}>​Co-creating the future of African open knowledge by building inclusive platforms and equipping communities with the tools to share their narratives.</p>
          {/* <p className={`${styles.bodyText} reveal d3`}></p> */}
          <button className={styles.getInvolvedBtn}>
            <Link className="btn-orange reveal d4" to="/contact">Get Involved <ArrowRight size={16} /></Link>
          </button>
        </div>
      </section>



      {/* VALUES */}
      <section className={styles.valuesSection}>
        <div className={styles.ambientGlow} />
        <div className="container">
          <div className={styles.valuesSectionHead}>
            <span className="section-tag reveal">What Guides Us</span>
            <h2 className={`${styles.sectionHLight} reveal d1`}>
              Our Core <span>Values</span>
            </h2>
            <p className={`${styles.valuesSub} reveal d2`}>
              The foundational principles steering our mission to democratize open knowledge across Africa.
            </p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={`${styles.valueCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.valueCardGlow} />
                <div className={styles.valueCardHeader}>
                  <div className={styles.valueCardIconWrap}>
                    {v.icon}
                  </div>
                  <span className={styles.valueNumber}>{v.number}</span>
                </div>
                <div className={styles.valueCardContent}>
                  <span className={styles.valueTag}>{v.tag}</span>
                  <h3 className={styles.valueCardTitle}>{v.title}</h3>
                  <p className={styles.valueCardBody}>{v.body}</p>
                </div>
                <div className={styles.valueCardLine} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* BOARD */}
      <section className={styles.boardSection}>
        <div className="container">
          <div className={styles.boardSectionHead}>
            <span className="section-tag reveal">Leadership</span>
            <h2 className={`${clsx(styles.sectionHDark, styles.boardH2)} reveal`}>Board Members</h2>
          </div>
          <div className={styles.boardGrid}>
            {boardMembers.map((m, i) => (
              <div key={i} className={`${styles.boardCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.boardCardImg}>
                  <img src="/assets/images/office-lady.jpg" alt={m.name} />
                </div>
                <div className={styles.boardCardBody}>
                  <p className={styles.boardCardName}>{m.name}</p>
                  <p className={styles.boardCardRole}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAFF */}
      <section className={styles.staffSection}>
        <div className={styles.staffSectionOverlay}>
          <div className="container">
            <div className={styles.staffSectionHead}>
              <span className="section-tag reveal">The Team</span>
              <h2 className={`${styles.sectionHDark} reveal d1`}>Staff Members</h2>
            </div>
            <div className={styles.staffGrid}>
              {staffMembers.map((m, i) => (
                <div key={i} className={`${styles.staffCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                  <div className={styles.staffCardImg}>
                    <img src="/assets/images/team-member.png" alt={m.name} />
                  </div>
                  <div className={styles.staffCardBody}>
                    <p className={styles.staffCardName}>{m.name}</p>
                    <p className={styles.staffCardRole}>{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
