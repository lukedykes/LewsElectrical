// Everything the client might want to change lives here.

export const business = {
  name: 'Lews Electrical Ltd',
  shortName: 'Lews Electrical',
  tagline: 'Powering people, places & possibilities',
  phone: '07964 154458',
  phoneHref: 'tel:+447964154458',
  smsHref: 'sms:+447964154458',
  email: 'lewselectricalltd@gmail.com',
  website: 'www.lewselectrical.co.uk',
  area: 'Across Essex & London',
  accreditations: ['NICEIC Approved Contractor', 'City & Guilds qualified'],
}

export const studio = {
  name: 'Own Time Studios',
  url: 'https://www.owntimestudios.com',
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'How it works', href: '#process' },
  { label: 'Refer & earn', href: '#refer' },
  { label: 'FAQ', href: '#faq' },
]

export type SectorId = 'domestic' | 'commercial' | 'rail'

export const sectors: {
  id: SectorId
  label: string
  title: string
  body: string
  points: string[]
  image: 'kitchen' | 'retail' | 'rail'
}[] = [
  {
    id: 'domestic',
    label: 'Domestic',
    title: 'Homes & families',
    body: 'Rewires, fuse board upgrades, new sockets and lighting, smart and outdoor lighting, plus EICRs for homeowners and landlords.',
    points: ['Full & part rewires', 'Consumer units', 'Smart & external lighting', 'Landlord EICRs'],
    image: 'kitchen',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    title: 'Shops, salons, offices & more',
    body: 'Lighting design, power and data, distribution boards and emergency lighting, planned around your opening hours.',
    points: ['Retail & salons', 'Hospitality', 'Offices', 'Gyms & studios'],
    image: 'retail',
  },
  {
    id: 'rail',
    label: 'Rail',
    title: 'Rail infrastructure',
    body: 'Electrical work for the rail industry, delivered with the safety culture, planning and paperwork the sector demands.',
    points: ['Infrastructure', 'Testing & inspection', 'Maintenance', 'Reactive works'],
    image: 'rail',
  },
]

export type ServiceImage =
  | 'rewire'
  | 'distribution-board'
  | 'consumer-unit'
  | 'boards'
  | 'pendants'
  | 'cctv'
  | 'electrician'

export const services: { id: string; title: string; body: string; tags: string[]; image: ServiceImage }[] = [
  {
    id: 'rewire',
    title: 'Full rewires',
    body: 'Old wiring out, a safe modern installation in. Planned room by room to keep disruption to a minimum.',
    tags: ['Domestic', 'Part rewires', 'New sockets & switches'],
    image: 'rewire',
  },
  {
    id: 'fuse-boards',
    title: 'New fuse boards',
    body: 'Single and three-phase consumer unit and distribution board upgrades with modern RCD and RCBO protection.',
    tags: ['Single phase', 'Three phase', 'Surge protection'],
    image: 'distribution-board',
  },
  {
    id: 'eicr',
    title: 'Testing & inspection (EICR)',
    body: 'Condition reports for homeowners, landlords and businesses. Clear results and clear next steps.',
    tags: ['Landlords', 'Home buyers', 'Commercial'],
    image: 'consumer-unit',
  },
  {
    id: 'fault-finding',
    title: 'Fault finding',
    body: 'Tripping circuits, dead sockets, flickering lights. We trace it, fix it and explain what went wrong.',
    tags: ['Tripping RCDs', 'Power loss', 'Repairs'],
    image: 'boards',
  },
  {
    id: 'lighting',
    title: 'Lighting design & installation',
    body: 'Feature, ambient, smart and outdoor lighting that makes a space feel finished, inside and out.',
    tags: ['Smart lighting', 'Feature & ambient', 'External'],
    image: 'pendants',
  },
  {
    id: 'cctv',
    title: 'CCTV installation',
    body: 'Discreet, reliable camera systems that protect your home or business and are simple to check from your phone.',
    tags: ['Homes', 'Businesses', 'Remote viewing'],
    image: 'cctv',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & reactive call-outs',
    body: 'Planned maintenance and responsive call-outs that keep homes, shops and sites up and running.',
    tags: ['Planned maintenance', 'Call-outs', 'Emergency lighting'],
    image: 'electrician',
  },
]

export const rewireSigns: { id: string; label: string; weight: number; urgent?: boolean }[] = [
  { id: 'fusebox', label: 'An old fuse box with pull-out fuses or a wooden back board', weight: 2 },
  { id: 'flicker', label: 'Lights flicker or dim when appliances switch on', weight: 1 },
  { id: 'tripping', label: 'Breakers trip or fuses blow regularly', weight: 1 },
  { id: 'scorch', label: 'Scorch marks, buzzing or warm sockets and switches', weight: 3, urgent: true },
  { id: 'sockets', label: 'Not enough sockets, with extension leads everywhere', weight: 1 },
  { id: 'cables', label: 'Round-pin sockets, or rubber or fabric covered cables', weight: 2 },
  { id: 'eicr', label: 'No EICR in the last 10 years (5 if you rent it out)', weight: 1 },
]

export const processSteps = [
  {
    title: 'Get in touch',
    body: 'Call, text or send the form. Tell us what you need, big job or small.',
  },
  {
    title: 'Free, written quote',
    body: 'We visit or talk it through, then put a clear price in writing. No pressure.',
  },
  {
    title: 'Tidy installation',
    body: 'Work is planned around you, with minimal disruption and a clean finish.',
  },
  {
    title: 'Tested & certified',
    body: 'Everything is tested and certified, and we walk you through it before we leave.',
  },
]

export const faqs = [
  {
    q: 'How long does a full house rewire take?',
    a: 'Most three-bedroom homes take around a week, depending on size, access and whether you are living in the property. You get a firm timeline with your quote, and the work is planned room by room to keep disruption down.',
  },
  {
    q: 'What is an EICR and how often do I need one?',
    a: 'An Electrical Installation Condition Report is a full check of your wiring, protection and fittings against the current wiring regulations (BS 7671). The usual guidance is every 10 years for homeowners and at least every 5 years for rented homes. Most commercial premises need one every 5 years, and some more often.',
  },
  {
    q: 'Can you upgrade my old fuse box?',
    a: 'Yes. We replace old fuse boxes with modern consumer units that have RCD and RCBO protection, in single or three phase. Modern boards trip in a fraction of a second when something goes wrong, which makes a real difference to safety.',
  },
  {
    q: 'Are you NICEIC approved?',
    a: 'Yes. Lews Electrical is an NICEIC Approved Contractor, so our work is regularly assessed against the national safety standard, and every job comes with the right certification.',
  },
  {
    q: 'Do you work around business opening hours?',
    a: 'Yes. For shops, salons and offices we plan the work around you, including early starts, evenings or phased installs, to keep disruption to a minimum.',
  },
  {
    q: 'Do you charge for quotes?',
    a: 'No. Quotes and advice are free, with no obligation. Tell us what you need and we will give you an honest, written price.',
  },
  {
    q: 'How does the referral reward work?',
    a: 'Recommend us to a friend, family member or business. Once their installation is complete, you receive £50 for your first referral and £150 for your second.',
  },
]

export const coverage = {
  essex: ['CM', 'CO', 'SS', 'RM', 'IG', 'EN'],
  london: ['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC', 'BR', 'CR', 'DA', 'HA', 'KT', 'SM', 'TW', 'UB'],
}

export const quoteServices = [
  'Full rewire',
  'Fuse board upgrade',
  'EICR / testing',
  'Fault finding',
  'Lighting',
  'CCTV',
  'Sockets & switches',
  'Maintenance',
  'Something else',
]
