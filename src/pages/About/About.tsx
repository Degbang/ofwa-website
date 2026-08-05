import React, { useState } from 'react';
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


const members = {
  boardMembers: [
    { name: 'Raphael Berchie', role: 'Board Chairman/ Co-Founder', image: "/assets/images/board members/raphael-berchie.jpg" },
    { name: 'Ama Serwah Nerquaye-Tetteh', role: 'Vice Chairperson', image: "/assets/images/board members/ama-serwah.jpg" },
    { name: 'Dr. George Tesilimi', role: 'Lecturer and Librarian- University of Health and Allied Sciences', image: "/assets/images/board members/george-tesilimi.jpg" },
    { name: 'Felix Nartey', role: 'Advisor to the Board', image: "/assets/images/board members/felix-nartey.jpg" },
    { name: 'Jesse Akrofi-Asiedu', role: 'Digital Humanist and Open Advocate', image: "/assets/images/board members/jesse-akrofi-asiedu.jpg" },
    { name: 'Jonathan Oberko', role: 'Principal Accounts - Accra Technical University', image: "/assets/images/board members/kweku-berko.jpg" },
    { name: 'Philip Boakye Dua Oyinka', role: 'Creative Writing Trainer, Poet, Writer, Advisor', image: "/assets/images/board members/nana-asaase.jpg" },
  ],
  hubLeaders: [
    { name: 'Abdul-Rahim Ziblim', role: 'Tamale Wiki Hub Lead (President)', image: "/assets/images/hub leaders/abdul-rahim-ziblim.jpg" },
    { name: 'Asamoah Daniel Kwame Oware', role: 'Kumasi Hub Lead (Vice President)', image: "/assets/images/hub leaders/asamoah-daniel-kwame-oware.jpg" },
    { name: 'Emmanuel Kofi Frimpong', role: 'Kumasi Hub Lead', image: "/assets/images/hub leaders/emmanuel-kofi-frimpong.jpg" },
    { name: 'Enoch Gyeedu-Essandoh', role: 'Accra Hub Lead (President)', image: "/assets/images/hub leaders/enoch-gyeedu-essandoh.jpeg" },
    { name: 'Frida Cheboi', role: 'Ashesi Wiki Hub Lead', image: "/assets/images/hub leaders/frida-cheboi.jpg" },
    { name: 'Gideon Babosima Daboo', role: 'Walewale Hub Lead', image: "/assets/images/hub leaders/gideon-babosima-daboo.jpg" },
    { name: 'Jennifer Adenam Kanchei', role: 'Walewale Hub Lead (Vice President)', image: "/assets/images/hub leaders/jennifer-adenam-kanchei.jpg" },
    { name: 'Joshua Tetteh Ayayi', role: 'Ho Hub Vice President', image: "/assets/images/hub leaders/joshua-tetteh-ayayi.jpg" },
    { name: 'Lookman Sunday Ibrahim', role: 'Tamale Wiki Hub Lead (Vice President)', image: "/assets/images/hub leaders/lookman-sunday-ibrahim.png" },
    { name: 'Paul Asare', role: 'Accra Hub Lead (Vice President', image: "/assets/images/hub leaders/paul-asare.jpg" },
    { name: 'Princess Lovia Tetteh', role: 'Ho Hub Lead (Vice President)', image: "/assets/images/hub leaders/princess-lovia-tetteh.jpg" },
  ],
  coreTeam: [
    { name: 'Jael Serwaa Boateng', role: 'Executive Director', image: "/assets/images/core team/jael-serwaa-boateng.jpg" },
  ]
};

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'boardMembers' | 'coreTeam' | 'hubLeaders'>('boardMembers');
  useScrollReveal(activeTab);

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


      {/* MEMBERS SECTION */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.teamSectionHead}>
            <span className="section-tag reveal">Our People</span>
            <h2 className={`${styles.sectionHLight} reveal d1`}>Meet Our <span>Community</span></h2>
            <p className={`${styles.teamSub} reveal d2`}>
              The dedicated individuals steering the movement and driving open knowledge across West Africa.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className={`${styles.tabContainer} reveal d3`}>
            <button
              className={clsx(styles.tabBtn, activeTab === 'boardMembers' && styles.tabBtnActive)}
              onClick={() => setActiveTab('boardMembers')}
            >
              Board Members
            </button>
            <button
              className={clsx(styles.tabBtn, activeTab === 'coreTeam' && styles.tabBtnActive)}
              onClick={() => setActiveTab('coreTeam')}
            >
              Core Team
            </button>
            <button
              className={clsx(styles.tabBtn, activeTab === 'hubLeaders' && styles.tabBtnActive)}
              onClick={() => setActiveTab('hubLeaders')}
            >
              Hub Leaders
            </button>
          </div>

          {/* Grid of Active Members */}
          <div className={styles.memberGrid}>
            {members[activeTab].map((m, i) => (
              <div key={`${activeTab}-${i}`} className={`${styles.memberCard} reveal ${i > 0 ? `d${i % 4}` : ''}`}>
                <div className={styles.memberCardImg}>
                  <img
                    src={m.image}
                    alt={m.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/team-member.png";
                    }}
                  />
                </div>
                <div className={styles.memberCardBody}>
                  <h3 className={styles.memberCardName}>{m.name}</h3>
                  <p className={styles.memberCardRole}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
