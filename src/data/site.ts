// Site-wide content. Moves into the admin database once that exists.

// TODO(OFWA): these figures were carried over from the previous build and have no stated source.
// Confirm each one with OFWA before launch; the live site publishes no numbers at all.
export const impactStats = [
  { end: 40000, suffix: '+', label: 'Wikipedia articles created or improved' },
  { end: 18, suffix: '', label: 'Communities reached' },
  { end: 24, suffix: '', label: 'Campaigns run' },
  { end: 500, suffix: '+', label: 'Women trained in digital skills' },
];

export const programs = [
  {
    slug: 'glam',
    title: 'GLAM and content creation',
    what: 'We help galleries, libraries, archives and museums put their collections online, and we run the Wiki Loves campaigns that fill Wikipedia and Wikimedia Commons with African photos, history and culture.',
    image: '/img/glam-archive.webp',
    tag: 'Wiki Loves series, GLAM Ghana, Africa Wiki Challenge',
  },
  {
    slug: 'advocacy',
    title: 'Advocacy',
    what: 'Online campaigns for fact-checking, fair access to knowledge and open resources, plus work with policymakers and as a recognised Wikimedia and Creative Commons affiliate.',
    image: '/img/workshop-afrocreatives.webp',
    tag: 'Fact-checking, open licensing, policy',
  },
  {
    slug: 'open-education',
    title: 'Open education',
    what: 'Offline Wikipedia and learning resources for schools through Kiwix4Schools, plus the Summer Open School and a curriculum for new content contributors.',
    image: '/img/kiwix-schools.webp',
    tag: 'Kiwix4Schools, Summer Open School',
  },
  {
    slug: 'consultancy',
    title: 'Consultancy',
    what: 'Training and expert advice for organisations on copyright, licensing, research and deploying offline knowledge.',
    image: '/img/wikiskills-training.webp',
    tag: 'Training, licensing, Kiwix deployment',
  },
];

export const partners = [
  { name: 'Wikimedia Foundation', logo: '/brand/partners/wikimedia-foundation.png' },
  { name: 'Creative Commons', logo: '/brand/partners/creative-commons.png' },
  { name: 'Kiwix', logo: '/brand/partners/kiwix.png' },
  { name: 'Mozilla', logo: '/brand/partners/mozilla.png' },
  { name: 'Open Society Foundations', logo: '/brand/partners/open-society.png' },
  { name: 'Goethe-Institut', logo: '/brand/partners/goethe-institut.png' },
  { name: 'World Wide Web Foundation', logo: '/brand/partners/world-wide-web-foundation.png' },
  { name: 'African Women’s Development Fund', logo: '/brand/partners/awdf.png' },
  { name: 'Ashesi University', logo: '/brand/partners/ashesi.png' },
  { name: 'GIMPA', logo: '/brand/partners/gimpa.png' },
  { name: 'University of Education, Winneba', logo: '/brand/partners/uew.png' },
  { name: 'Ho Node Hub', logo: '/brand/partners/ho-node-hub.png' },
  { name: 'Yison Tech Hub', logo: '/brand/partners/yison-tech-hub.png' },
];
