// Ghana regions and the OFWA hubs and clubs in each. Source of truth until the admin system takes over.
export interface HubItem {
  name: string;
  type: string;
  location: string;
  detail: string;
  description?: string;
}

export interface GhanaRegion {
  id: string;
  name: string;
  shortName: string;
  capital: string;
  color: string;
  xPercent: number;
  yPercent: number;
  hubs: HubItem[];
}

export const ghanaRegionsData: GhanaRegion[] = [
  {
    id: 'greater-accra',
    name: 'Greater Accra Region',
    shortName: 'GREATER ACCRA',
    capital: 'ACCRA',
    color: '#d60000',
    xPercent: 71,
    yPercent: 81,
    hubs: [
      { name: 'Accra Wiki Hub', type: 'Hub', location: 'Achimota & Abelemkpe, Accra', detail: 'Flagship Community Hub' },
      { name: 'UG Wiki Club', type: 'Club', location: 'University of Ghana, Legon', detail: 'University Club' },
      { name: 'GH Media Wiki Club', type: 'Club', location: 'GH Media School, Achimota', detail: 'Media & Communications Club' },
      { name: 'New Health Wiki Club', type: 'Club', location: 'Accra', detail: 'Health & Open Knowledge Initiative' },


    ],
  },
  {
    id: 'ashanti',
    name: 'Ashanti Region',
    shortName: 'ASHANTI',
    capital: 'KUMASI',
    color: '#f8c82a',
    xPercent: 38,
    yPercent: 68,
    hubs: [
      { name: 'Kumasi Wiki Hub', type: 'Hub', location: 'Adum, Kumasi', detail: 'Regional Training Centre' },
      { name: 'Wikitech Student Developers Club', type: 'Club', location: 'Kumasi', detail: 'Student Developer Community' },
    ],
  },
  {
    id: 'northern',
    name: 'Northern Region',
    shortName: 'NORTHERN',
    capital: 'TAMALE',
    color: '#96e072',
    xPercent: 64,
    yPercent: 23,
    hubs: [
      { name: 'Tamale Wiki Hub', type: 'Hub', location: 'Tamale', detail: 'Community & Regional Hub' },
      { name: 'UDS Wiki Tech', type: 'Club', location: 'University for Development Studies, Nyankpala', detail: 'Wikitech Student Developers Club', description: 'Wiki Tech UDS is a Wikimedia-focused technology hub at the University for Development Studies (UDS), bringing together students passionate about technology and the Wikimedia movement. The hub explores how software, data, AI, and other emerging technologies can support Wikimedia projects and advance open knowledge. Through workshops, projects, and collaborative learning, we equip students with the technical skills to build tools and solutions that contribute to the Wikimedia ecosystem.' },
    ],
  },
  {
    id: 'upper-west',
    name: 'Upper West Region',
    shortName: 'UPPER WEST',
    capital: 'WA',
    color: '#d99b38',
    xPercent: 19,
    yPercent: 14,
    hubs: [
      { name: 'SDD UBIDS Wiki Club', type: 'Club', location: 'SD Dombo University, Wa', detail: 'University Club' },
      { name: 'DHLTU Wiki Club', type: 'Club', location: 'Dr. Hilla Limann Technical University, Wa', detail: 'Technical University Club', description: "DHLTU Wiki Club is a student-led community at DHLTU dedicated to growing free knowledge. We organize training workshops, edit-a-thons, Photo walks and outreach to help students contribute to Wikipedia and other Wikimedia projects. Our focus is documenting local history, culture, and notable figures from our region. With OFWA’s support, we aim to build digital literacy and make reliable information about our community accessible worldwide." }
    ],
  },
  {
    id: 'north-east',
    name: 'North East Region',
    shortName: 'NORTH EAST',
    capital: 'NALERIGU',
    color: '#323e7e',
    xPercent: 61,
    yPercent: 13,
    hubs: [
      { name: 'Walewale Wiki Hub', type: 'Hub', location: 'Walewale', detail: 'Community Hub', description: "The Walewale Wiki Hub is a vibrant community dedicated to empowering local youth and volunteers through digital literacy and open-knowledge advocacy. Operating in the North East Region of Ghana, the hub trains members in content creation, writing, and editing across Wikimedia platforms like Wikipedia, Wikidata, and Wikimedia Commons. By documenting local heritage, culture, and marginalized stories, we bridge the digital knowledge gap and amplify regional voices. Through active contest coordination and skills workshops, we cultivate a new generation of digital custodians and open-source contributors." },
    ],
  },
  {
    id: 'volta',
    name: 'Volta Region',
    shortName: 'VOLTA',
    capital: 'HO',
    color: '#73ccf4',
    xPercent: 82,
    yPercent: 70,
    hubs: [
      { name: 'Ho Wiki Hub', type: 'Hub', location: 'Ho', detail: 'Regional Community Hub', description: "Ho Wiki Hub is a vibrant, youth-led community transforming local knowledge into global knowledge. Rooted in the Volta Region, the Hub brings together young people passionate about technology, culture, research, creativity, and storytelling to document and amplify underrepresented  voices. Beyond editing Wikipedia, Ho Hub creates opportunities for young people to learn, lead, collaborate, and contribute to the open knowledge movement. We are building a generation of confident knowledge creators who ensure that the stories and heritage of our communities are not lost or left untold." },
    ],
  },
  {
    id: 'central',
    name: 'Central Region',
    shortName: 'CENTRAL',
    capital: 'CAPE COAST',
    color: '#d80098',
    xPercent: 47,
    yPercent: 87,
    hubs: [
      { name: 'Central Wikitech Club', type: 'Club', location: 'Cape Coast / Central Region', detail: 'Regional Wikitech Club' },
    ],
  },
  {
    id: 'western-north',
    name: 'Western North Region',
    shortName: 'WESTERN NORTH',
    capital: 'SEFWI WIAWSO',
    color: '#784936',
    xPercent: 12,
    yPercent: 75,
    hubs: [
      { name: 'EnchiCoE Wiki Club', type: 'Club', location: 'Enchi College of Education, Enchi', detail: 'College Wiki Club' },
    ],
  },
  {
    id: 'upper-east',
    name: 'Upper East Region',
    shortName: 'UPPER EAST',
    capital: 'BOLGATANGA',
    color: '#e62655',
    xPercent: 55,
    yPercent: 7,
    hubs: [],
  },
  {
    id: 'savannah',
    name: 'Savannah Region',
    shortName: 'SAVANNAH REGION',
    capital: 'DAMANGO',
    color: '#2b7a18',
    xPercent: 31,
    yPercent: 31,
    hubs: [],
  },
  {
    id: 'bono-east',
    name: 'Bono East Region',
    shortName: 'BONO EAST',
    capital: 'TECHIMAN',
    color: '#e05316',
    xPercent: 48,
    yPercent: 45,
    hubs: [],
  },
  {
    id: 'bono',
    name: 'Bono Region',
    shortName: 'BONO',
    capital: 'SUNYANI',
    color: '#f87979',
    xPercent: 16,
    yPercent: 54,
    hubs: [],
  },
  {
    id: 'oti',
    name: 'Oti Region',
    shortName: 'OTI',
    capital: 'DAMBAI',
    color: '#6b3ba7',
    xPercent: 80,
    yPercent: 51,
    hubs: [],
  },
  {
    id: 'ahafo',
    name: 'Ahafo Region',
    shortName: 'AHAFO',
    capital: 'GOASO',
    color: '#4ebc45',
    xPercent: 15,
    yPercent: 66,
    hubs: [],
  },
  {
    id: 'eastern',
    name: 'Eastern Region',
    shortName: 'EASTERN',
    capital: 'KOFORIDUA',
    color: '#f28527',
    xPercent: 59,
    yPercent: 72,
    hubs: [],
  },
  {
    id: 'western',
    name: 'Western Region',
    shortName: 'WESTERN',
    capital: 'SEKONDI TAKORADI',
    color: '#00a4e4',
    xPercent: 22,
    yPercent: 88,
    hubs: [],
  },
];

