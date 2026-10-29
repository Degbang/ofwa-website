import { ghanaRegionsData } from '../../data/hubs';

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'image';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
  options?: { value: string; label: string }[];
}

export interface Resource {
  key: string;
  table: string;
  label: string;
  singular: string;
  intro: string;
  fields: Field[];
  /** Column names shown in the list, first is the row title. */
  columns: string[];
  defaults: Record<string, string | number | boolean>;
  orderBy: string[];
}

const opts = (values: string[]) => values.map((v) => ({ value: v, label: v }));

export const resources: Resource[] = [
  {
    key: 'events',
    table: 'events',
    label: 'Events',
    singular: 'event',
    intro: 'The annual plan shown on the Events page. An event appears under every month its period covers.',
    columns: ['title', 'year', 'period'],
    orderBy: ['year', 'sort'],
    defaults: { year: new Date().getFullYear(), period: '', start_week: '', end_week: '', title: '', description: '', published: true },
    fields: [
      { name: 'title', label: 'Event or programme', type: 'text', required: true },
      { name: 'year', label: 'Year', type: 'number', required: true },
      { name: 'period', label: 'Period', type: 'text', required: true, hint: 'A month ("March") or a range ("May - June").' },
      { name: 'start_week', label: 'Start week', type: 'text', hint: 'Optional, for example W5.' },
      { name: 'end_week', label: 'End week', type: 'text', hint: 'Optional, for example W8.' },
      { name: 'description', label: 'What happens', type: 'textarea' },
    ],
  },
  {
    key: 'gallery',
    table: 'gallery_photos',
    label: 'Gallery',
    singular: 'photo',
    intro: 'Photographs on the Gallery page. Upload a JPEG, PNG or WebP under 8 MB; wide photos work best.',
    columns: ['caption', 'grp'],
    orderBy: ['sort'],
    defaults: { src: '', caption: '', grp: 'Training', ratio: 1.5, published: true },
    fields: [
      { name: 'src', label: 'Photo', type: 'image', required: true },
      { name: 'caption', label: 'Caption', type: 'text', required: true, hint: 'Say what and where: the event, place and year.' },
      { name: 'grp', label: 'Group', type: 'select', required: true, options: opts(['Campaigns', 'Training', 'Hubs', 'Community']) },
    ],
  },
  {
    key: 'hubs',
    table: 'hubs',
    label: 'Hubs and clubs',
    singular: 'hub or club',
    intro: 'Hubs and clubs on the map and the Hubs page. Regions and their map positions are fixed.',
    columns: ['name', 'type', 'location'],
    orderBy: ['sort'],
    defaults: { region_id: 'greater-accra', name: '', type: 'Club', location: '', detail: '', description: '', published: true },
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'type', label: 'Type', type: 'select', required: true, options: opts(['Hub', 'Club']) },
      {
        name: 'region_id',
        label: 'Region',
        type: 'select',
        required: true,
        options: ghanaRegionsData.map((r) => ({ value: r.id, label: r.name.replace(' Region', '') })),
      },
      { name: 'location', label: 'Location', type: 'text', required: true, hint: 'Town and place, for example "Adum, Kumasi".' },
      { name: 'detail', label: 'Short label', type: 'text', hint: 'For example "University Club".' },
      { name: 'description', label: 'Description', type: 'textarea', hint: 'Optional.' },
    ],
  },
];
