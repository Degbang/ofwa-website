-- Seed: the content the site shipped with. Run once after 0001_content_admin.sql.
-- Safe to skip if you prefer to enter everything by hand in /admin.

insert into public.hubs (region_id, name, type, location, detail, description, sort) values
  ('greater-accra', 'Accra Wiki Hub', 'Hub', 'Achimota & Abelemkpe, Accra', 'Flagship Community Hub', '', 0),
  ('greater-accra', 'UG Wiki Club', 'Club', 'University of Ghana, Legon', 'University Club', '', 1),
  ('greater-accra', 'GH Media Wiki Club', 'Club', 'GH Media School, Achimota', 'Media & Communications Club', '', 2),
  ('greater-accra', 'New Health Wiki Club', 'Club', 'Accra', 'Health & Open Knowledge Initiative', '', 3),
  ('ashanti', 'Kumasi Wiki Hub', 'Hub', 'Adum, Kumasi', 'Regional Training Centre', '', 4),
  ('ashanti', 'Wikitech Student Developers Club', 'Club', 'Kumasi', 'Student Developer Community', '', 5),
  ('northern', 'Tamale Wiki Hub', 'Hub', 'Tamale', 'Community & Regional Hub', '', 6),
  ('northern', 'UDS Wiki Tech', 'Club', 'University for Development Studies, Nyankpala', 'Wikitech Student Developers Club', 'Wiki Tech UDS is a Wikimedia-focused technology hub at the University for Development Studies (UDS), bringing together students passionate about technology and the Wikimedia movement. The hub explores how software, data, AI, and other emerging technologies can support Wikimedia projects and advance open knowledge. Through workshops, projects, and collaborative learning, we equip students with the technical skills to build tools and solutions that contribute to the Wikimedia ecosystem.', 7),
  ('upper-west', 'SDD UBIDS Wiki Club', 'Club', 'SD Dombo University, Wa', 'University Club', '', 8),
  ('upper-west', 'DHLTU Wiki Club', 'Club', 'Dr. Hilla Limann Technical University, Wa', 'Technical University Club', 'DHLTU Wiki Club is a student-led community at DHLTU dedicated to growing free knowledge. We organize training workshops, edit-a-thons, Photo walks and outreach to help students contribute to Wikipedia and other Wikimedia projects. Our focus is documenting local history, culture, and notable figures from our region. With OFWA’s support, we aim to build digital literacy and make reliable information about our community accessible worldwide.', 9),
  ('north-east', 'Walewale Wiki Hub', 'Hub', 'Walewale', 'Community Hub', 'The Walewale Wiki Hub is a vibrant community dedicated to empowering local youth and volunteers through digital literacy and open-knowledge advocacy. Operating in the North East Region of Ghana, the hub trains members in content creation, writing, and editing across Wikimedia platforms like Wikipedia, Wikidata, and Wikimedia Commons. By documenting local heritage, culture, and marginalized stories, we bridge the digital knowledge gap and amplify regional voices. Through active contest coordination and skills workshops, we cultivate a new generation of digital custodians and open-source contributors.', 10),
  ('volta', 'Ho Wiki Hub', 'Hub', 'Ho', 'Regional Community Hub', 'Ho Wiki Hub is a vibrant, youth-led community transforming local knowledge into global knowledge. Rooted in the Volta Region, the Hub brings together young people passionate about technology, culture, research, creativity, and storytelling to document and amplify underrepresented  voices. Beyond editing Wikipedia, Ho Hub creates opportunities for young people to learn, lead, collaborate, and contribute to the open knowledge movement. We are building a generation of confident knowledge creators who ensure that the stories and heritage of our communities are not lost or left untold.', 11),
  ('central', 'Central Wikitech Club', 'Club', 'Cape Coast / Central Region', 'Regional Wikitech Club', '', 12),
  ('western-north', 'EnchiCoE Wiki Club', 'Club', 'Enchi College of Education, Enchi', 'College Wiki Club', '', 13);

insert into public.gallery_photos (src, caption, grp, ratio, sort) values
  ('/img/africa-wiki-challenge.webp', 'Africa Wiki Challenge 2025 launch', 'Campaigns', 1.25, 0),
  ('/img/workshop-afrocreatives.webp', 'AfroCreatives 2025 workshop', 'Training', 1.25, 1),
  ('/img/team-afrocreatives.webp', 'AfroCreatives 2025 launch, the OFWA team and volunteers', 'Campaigns', 1.25, 2),
  ('/img/kiwix-schools.webp', 'Kiwix 4 Schools Initiative', 'Training', 1.5, 3),
  ('/img/schools-computer-lab.webp', 'Students in a computer lab session', 'Training', 1.5, 4),
  ('/img/schools-computer-lab-2.webp', 'Students at work in a computer lab', 'Training', 1.5, 5),
  ('/img/schools-group.webp', 'Students and volunteers after a school session', 'Community', 1.5, 6),
  ('/img/ict-centre.webp', 'Students outside an ICT Resource Centre and Library', 'Community', 1.25, 7),
  ('/img/digital-skills-women.webp', 'Digital Skills Workshop for Women', 'Training', 1.25, 8),
  ('/img/accra-hub.webp', 'Accra Wiki Hub', 'Hubs', 1.4, 9),
  ('/img/kumasi-hub.webp', 'Kumasi Wiki Hub', 'Hubs', 1.3, 10),
  ('/img/wikiskills-training.webp', 'WikiSkills for Librarians at the Goethe-Institut Ghana', 'Training', 1.6, 11),
  ('/img/training-roundtable.webp', 'A training session around the table', 'Training', 1.5, 12),
  ('/img/volunteers-group.webp', 'OFWA volunteers', 'Community', 1.5, 13),
  ('/img/constantine-appiah.webp', 'Constantine Appiah, Ho Wiki Club leader, leading a session', 'Community', 0.66, 14);

insert into public.events (year, period, start_week, end_week, title, description, sort) values
  (2026, 'January', 'W3', 'W4', 'Team Retreat', 'Retreat execution', 0),
  (2026, 'January', 'W3', 'W4', 'Wikimedia @ 25', 'Anniversary activities, including the spoken word/poetry contest', 1),
  (2026, 'February', 'W5', 'W5', 'Trainer of Trainers (TOT)', 'ToT sessions, practical exercises and participant assessment', 2),
  (2026, 'February', 'W5', 'W8', 'AWMT Hackathon — Cycle 1', 'Hackathon launch, execution, mentorship and evaluation', 3),
  (2026, 'March', 'W9', 'W9', 'Newbie Training', 'Wikipedia basics and hands-on editing training', 4),
  (2026, 'March–April', 'W9', 'W17', 'Shine Her Light', 'Main launch, edit-a-thons/content creation sessions and virtual hours', 5),
  (2026, 'May', 'W18', 'W21', 'AWMT Hackathon — Cycle 2', 'Hackathon launch, execution, mentorship and evaluation', 6),
  (2026, 'May–July', 'W19', 'W30', 'Africa Wiki Challenge', 'Main launch, edit-a-thons/content creation and participant engagement', 7),
  (2026, 'June', 'W23', 'W25', 'Information Integrity Workshop – Media Training — Cycle 1', 'Workshop sessions, discussions, case studies and practical exercises', 8),
  (2026, 'August', 'W31', 'W34', 'AWMT Hackathon — Cycle 3', 'Hackathon launch, execution, mentorship and evaluation', 9),
  (2026, 'August–September', 'W33', 'W36', 'Wiki Skills 4 Librarians', 'Wikipedia demonstrations, hands-on editing and article improvement', 10),
  (2026, 'September–October', 'W39', 'W41', 'Afro-Creative Film', 'Main workshop, edit-a-thon/content creation and participant engagement', 11),
  (2026, 'November', 'W44', 'W47', 'AWMT Hackathon — Cycle 4', 'Hackathon launch, execution, mentorship and evaluation', 12),
  (2026, 'November', 'W44', 'W47', 'Information Integrity Workshop – Media Training — Cycle 2', 'Workshop sessions, discussions, case studies and practical exercises', 13),
  (2026, 'November–December', 'W47', 'W49', 'Pre-Annual General Meeting', 'Recognition activities, awards and pre-AGM communication', 14),
  (2026, 'December', 'W49', 'W51', 'Annual General Meeting', 'AGM session, discussions, voting and programme/strategic reports', 15);
