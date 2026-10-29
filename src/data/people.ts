// Board, core team and hub leaders. Portraits are optimised copies in /public/people.
// Moves into the admin database once that exists.
export interface Person {
  name: string;
  role: string;
  image: string;
}

export const boardMembers: Person[] = [
  { name: "Raphael Berchie", role: "Board Chair and co-founder", image: '/people/raphael-berchie.webp' },
  { name: "Ama Serwah Nerquaye-Tetteh", role: "Vice Chairperson", image: '/people/ama-serwah-nerquaye-tetteh.webp' },
  { name: "Dr. George Tesilimi", role: "Lecturer and Librarian, University of Health and Allied Sciences", image: '/people/dr-george-tesilimi.webp' },
  { name: "Jesse Akrofi-Asiedu", role: "Digital humanist and open advocate", image: '/people/jesse-akrofi-asiedu.webp' },
  { name: "Jonathan Oberko", role: "Principal Accountant, Accra Technical University", image: '/people/jonathan-oberko.webp' },
  { name: "Philip Boakye Dua Oyinka", role: "Creative writing trainer, poet and writer", image: '/people/philip-boakye-dua-oyinka.webp' },
  { name: "Felix Nartey", role: "Advisor to the Board", image: '/people/felix-nartey.webp' },
];

export const coreTeam: Person[] = [
  { name: "Jael Serwaa Boateng", role: "Executive Director", image: '/people/jael-serwaa-boateng.webp' },
  { name: "Brian Ayiku Ocansey", role: "Admin and Programs Coordinator", image: '/people/brian-ayiku-ocansey.webp' },
  { name: "Dickson Kojo Anane", role: "Programs Officer", image: '/people/dickson-kojo-anane.webp' },
  { name: "Alfred Degbang", role: "Technical Coordinator", image: '/people/alfred-degbang.webp' },
  { name: "Edmund Quansah", role: "Media Strategist", image: '/people/edmund-quansah.webp' },
];

export const hubLeaders: Person[] = [
  { name: "Abdul-Rahim Ziblim", role: "Tamale Wiki Hub, president", image: '/people/abdul-rahim-ziblim.webp' },
  { name: "Lookman Sunday Ibrahim", role: "Tamale Wiki Hub, vice president", image: '/people/lookman-sunday-ibrahim.webp' },
  { name: "Asamoah Daniel Kwame Oware", role: "Kumasi Wiki Hub, assistant lead", image: '/people/asamoah-daniel-kwame-oware.webp' },
  { name: "Chris Ato Quamina", role: "Walewale Wiki Hub, leader", image: '/people/chris-ato-quamina.webp' },
  { name: "Mehetabel Enam Effe Akoto", role: "Ho Wiki Hub, assistant leader", image: '/people/mehetabel-enam-effe-akoto.webp' },
  { name: "Constantine Appiah", role: "Ho Wiki Club, leader", image: '/people/constantine-appiah.webp' },
  { name: "Sharif Tiisu", role: "UDS Wiki Tech, leader", image: '/people/sharif-tiisu.webp' },
  { name: "Tieruzie Zacchaeus Zinanibe", role: "DHLTU Wiki Club, leader", image: '/people/tieruzie-zacchaeus-zinanibe.webp' },
  { name: "Rexford Ameyaw", role: "EnchiCoE Wiki Club, leader", image: '/people/rexford-ameyaw.webp' },
];

