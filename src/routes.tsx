import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

// The single source of truth for every page: its URL, document title and description.
// App renders from it, Layout reads it to set the title, meta tags and route announcement,
// and scripts/sitemap uses it to build sitemap.xml.
export interface RouteDef {
  path: string;
  title: string;
  description: string;
  component: LazyExoticComponent<ComponentType>;
  /** Left out of the sitemap (error and legal-draft pages). */
  noindex?: boolean;
}

export const SITE_NAME = 'Open Foundation West Africa';

export const routes: RouteDef[] = [
  {
    path: '/',
    title: `${SITE_NAME} | Open knowledge, built by communities`,
    description:
      'OFWA trains communities across Ghana and West Africa to write, keep and share open knowledge on Wikipedia, Wikimedia Commons and Kiwix, and runs hubs, campaigns and digital skills programs.',
    component: lazy(() => import('./pages/Home/Home')),
  },
  {
    path: '/about',
    title: 'About OFWA',
    description:
      'A Ghana-based non-profit and recognised Wikimedia and Creative Commons affiliate, founded in 2016. Our vision, mission, principles, board and team.',
    component: lazy(() => import('./pages/About/About')),
  },
  {
    path: '/programs',
    title: 'Programs',
    description:
      'Africa Wiki Challenge, Kiwix4Schools, the Africa Wikimedia Technical Community, GLAM Ghana and WikiSkills for Librarians: how OFWA puts African knowledge on the open web.',
    component: lazy(() => import('./pages/Programs/Programs')),
  },
  {
    path: '/hubs',
    title: 'Hubs and clubs',
    description: 'Find an OFWA Wiki Hub or university and school club near you in Ghana, or start one.',
    component: lazy(() => import('./pages/Hubs/Hubs')),
  },
  {
    path: '/events',
    title: 'Events',
    description: 'Workshops, hackathons, campaigns and community meetings across the OFWA network, by year and month.',
    component: lazy(() => import('./pages/Events/Events')),
  },
  {
    path: '/news',
    title: 'News',
    description: 'Stories and reports from OFWA and its community, published on Wikimedia Diff.',
    component: lazy(() => import('./pages/News/News')),
  },
  {
    path: '/gallery',
    title: 'Gallery',
    description: 'Photographs of OFWA trainings, campaigns, hubs and school visits.',
    component: lazy(() => import('./pages/Gallery/Gallery')),
  },
  {
    path: '/volunteer',
    title: 'Volunteer',
    description: 'Volunteer as an editor, trainer, translator, photographer, developer or hub coordinator. No experience needed; we train you.',
    component: lazy(() => import('./pages/Volunteer/Volunteer')),
  },
  {
    path: '/partner',
    title: 'Partner with us',
    description: 'Work with OFWA as a company, university, NGO or public institution to build open knowledge in West Africa.',
    component: lazy(() => import('./pages/Partner/Partner')),
  },
  // Donate paused until OFWA confirms payment details.
  // {
  //   path: '/donate',
  //   title: 'Donate',
  //   description: 'Support OFWA hubs, training and open learning tools for schools.',
  //   component: lazy(() => import('./pages/Donate/Donate')),
  // },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Write to OFWA, call, or visit the Accra office. Questions about hubs, press, partnerships and more.',
    component: lazy(() => import('./pages/Contact/Contact')),
  },
  {
    path: '/accessibility',
    title: 'Accessibility statement',
    description: 'How this website is built to be usable by everyone, and how to report a problem.',
    component: lazy(() => import('./pages/Legal/Accessibility')),
  },
  {
    path: '/admin',
    title: 'Admin',
    description: 'OFWA staff sign-in.',
    component: lazy(() => import('./pages/Admin/Admin')),
    noindex: true,
  },
  {
    path: '/privacy',
    title: 'Privacy',
    description: 'What this website collects, why, and who sees it.',
    component: lazy(() => import('./pages/Legal/Privacy')),
  },
];

export const notFoundRoute = {
  title: 'Page not found',
  description: 'This page does not exist.',
  component: lazy(() => import('./pages/NotFound/NotFound')),
};
