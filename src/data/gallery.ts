// Gallery photos, all optimised copies of real OFWA photos in /public/img.
// Captions come from the original file names; replace with exact event, place and date when known.
export interface GalleryPhoto {
  src: string;
  caption: string;
  group: 'Campaigns' | 'Training' | 'Hubs' | 'Community';
  /** Rough aspect ratio, used only to balance the columns before images load. */
  ratio: number;
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: '/img/africa-wiki-challenge.webp', caption: 'Africa Wiki Challenge 2025 launch', group: 'Campaigns', ratio: 1.25 },
  { src: '/img/workshop-afrocreatives.webp', caption: 'AfroCreatives 2025 workshop', group: 'Training', ratio: 1.25 },
  { src: '/img/team-afrocreatives.webp', caption: 'AfroCreatives 2025 launch, the OFWA team and volunteers', group: 'Campaigns', ratio: 1.25 },
  { src: '/img/kiwix-schools.webp', caption: 'Kiwix 4 Schools Initiative', group: 'Training', ratio: 1.5 },
  { src: '/img/schools-computer-lab.webp', caption: 'Students in a computer lab session', group: 'Training', ratio: 1.5 },
  { src: '/img/schools-computer-lab-2.webp', caption: 'Students at work in a computer lab', group: 'Training', ratio: 1.5 },
  { src: '/img/schools-group.webp', caption: 'Students and volunteers after a school session', group: 'Community', ratio: 1.5 },
  { src: '/img/ict-centre.webp', caption: 'Students outside an ICT Resource Centre and Library', group: 'Community', ratio: 1.25 },
  { src: '/img/digital-skills-women.webp', caption: 'Digital Skills Workshop for Women', group: 'Training', ratio: 1.25 },
  { src: '/img/accra-hub.webp', caption: 'Accra Wiki Hub', group: 'Hubs', ratio: 1.4 },
  { src: '/img/kumasi-hub.webp', caption: 'Kumasi Wiki Hub', group: 'Hubs', ratio: 1.3 },
  { src: '/img/wikiskills-training.webp', caption: 'WikiSkills for Librarians at the Goethe-Institut Ghana', group: 'Training', ratio: 1.6 },
  { src: '/img/training-roundtable.webp', caption: 'A training session around the table', group: 'Training', ratio: 1.5 },
  { src: '/img/volunteers-group.webp', caption: 'OFWA volunteers', group: 'Community', ratio: 1.5 },
  { src: '/img/constantine-appiah.webp', caption: 'Constantine Appiah, Ho Wiki Club leader, leading a session', group: 'Community', ratio: 0.66 },
];
