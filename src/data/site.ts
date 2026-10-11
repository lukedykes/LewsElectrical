// Everything the client might want to change lives here. Most of the wording
// comes straight from Lews Electrical's own flyers.

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
  { label: 'Rewires', href: '#rewires' },
  { label: 'Commercial', href: '#commercial' },
  { label: 'Refer a friend', href: '#refer' },
  { label: 'Areas', href: '#areas' },
  { label: 'FAQs', href: '#faq' },
]

export type ServiceIcon = 'home' | 'board' | 'test' | 'fault' | 'lighting' | 'cctv' | 'maintenance'

export const services: { title: string; body: string; icon: ServiceIcon; enquiry: string }[] = [
  {
    title: 'Full rewires',
    body: 'Complete and part rewires for houses and flats, planned room by room to keep disruption down.',
    icon: 'home',
    enquiry: 'Full rewire',
  },
  {
    title: 'New fuse boards',
    body: 'Consumer unit and distribution board upgrades, single and three phase, with up-to-date RCD protection.',
    icon: 'board',
    enquiry: 'Fuse board upgrade',
  },
  {
    title: 'Testing & inspection (EICR)',
    body: 'Electrical Installation Condition Reports for homeowners, landlords and businesses.',
    icon: 'test',
    enquiry: 'EICR / testing',
  },
  {
    title: 'Fault finding',
    body: 'Tripping switches, dead sockets or flickering lights. We track down the fault and put it right.',
    icon: 'fault',
    enquiry: 'Fault finding',
  },
  {
    title: 'Lighting design & installation',
    body: 'Indoor, outdoor, feature and smart lighting for homes, shops and workplaces.',
    icon: 'lighting',
    enquiry: 'Lighting',
  },
  {
    title: 'CCTV installation',
    body: 'Camera systems for homes and businesses that you can check from your phone.',
    icon: 'cctv',
    enquiry: 'CCTV',
  },
  {
    title: 'Maintenance & reactive call outs',
    body: 'Planned maintenance, and a quick response when something stops working.',
    icon: 'maintenance',
    enquiry: 'Maintenance / call out',
  },
]

export const rewire = {
  benefits: ['Improve safety in your home', 'Increase property value', 'Modern and reliable installations', 'Fully tested & certified work'],
  checklist: [
    'Complete home rewires',
    'Modern distribution boards (single & three phase)',
    'New sockets, lighting & switches',
    'Smart lighting',
    'External lighting',
    'Testing & inspection (EICR)',
    'Fault finding',
    'Maintenance & repairs',
    'Minimal disruption & tidy work',
    'Free quotes & friendly advice',
  ],
  signs: [
    'An old fuse box with pull-out fuses',
    'Round-pin sockets or fabric-covered cable',
    'Scorch marks, or sockets and switches that feel warm',
    'A breaker that keeps tripping',
    'Extension leads everywhere because there aren’t enough sockets',
    'No electrical check in the last ten years',
  ],
}

export const commercial = {
  benefits: ['Enhance your space', 'Improve customer experience', 'Support business growth'],
  checklist: [
    'New lighting design & installation',
    'Feature & ambient lighting',
    'Smart lighting solutions',
    'Power & data for workstations',
    'Distribution board upgrades',
    'Emergency lighting',
    'Testing & inspection (EICR)',
    'Minimal disruption to your business',
    'Free quotes & friendly advice',
  ],
  venues: ['Retail', 'Salons', 'Hospitality', 'Offices', 'Gyms & studios'],
}

export const steps = [
  { title: 'Get in touch', body: 'Call, text or send us a message about what you need doing.' },
  { title: 'Free quote', body: 'We come and take a look or talk it through, then send you a clear written price.' },
  { title: 'The work', body: 'Booked in at a time that suits you, carried out safely and left tidy.' },
  { title: 'Signed off', body: 'Everything is tested and certified, and you get the paperwork for your records.' },
]

export const reasons = [
  { title: 'NICEIC approved', body: 'Our work is regularly assessed against the national safety standard.' },
  { title: 'City & Guilds qualified', body: 'Properly trained and working to the current wiring regulations.' },
  { title: 'Tidy and considerate', body: 'Minimal disruption while we work, and we clear up before we leave.' },
  { title: 'Free quotes', body: 'Friendly advice and a clear written price, with no obligation.' },
]

export const areas = [
  'Southend-on-Sea',
  'Leigh-on-Sea',
  'Rayleigh',
  'Basildon',
  'Billericay',
  'Wickford',
  'Brentwood',
  'Chelmsford',
  'Romford',
  'Grays & Thurrock',
  'Colchester',
  'East London',
  'Central London',
]

export const faqs = [
  {
    q: 'How long does a full house rewire take?',
    a: 'It depends on the size of the property and whether you are living there while the work is done. As a rough guide, a typical three-bedroom house takes around one to two weeks. You get a clear timeline with your quote.',
  },
  {
    q: 'What is an EICR and how often do I need one?',
    a: 'An Electrical Installation Condition Report is a full check of your wiring, fuse board and fittings against the current regulations (BS 7671). Homeowners are usually advised to have one every 10 years, and rented homes need one at least every 5 years. Most businesses need one every 5 years, and some more often.',
  },
  {
    q: 'Can you replace my old fuse box?',
    a: 'Yes. We replace old fuse boxes with modern consumer units with RCD and RCBO protection, in single or three phase.',
  },
  {
    q: 'Are you NICEIC approved?',
    a: 'Yes, we are an NICEIC Approved Contractor and City & Guilds qualified, and every job comes with the right certificates.',
  },
  {
    q: 'Can you work around my business opening hours?',
    a: 'Yes. For shops, salons and offices we plan the work around you, with early starts, evenings or work done in stages if needed.',
  },
  {
    q: 'Do you charge for quotes?',
    a: 'No. Quotes and advice are free and there is no obligation.',
  },
  {
    q: 'How does the referral reward work?',
    a: 'Recommend us to a friend, family member or business. Once their installation is complete you get £50 for your first referral and £150 for your second.',
  },
]

export const enquiryTypes = [
  'Full rewire',
  'Fuse board upgrade',
  'EICR / testing',
  'Fault finding',
  'Lighting',
  'CCTV',
  'Maintenance / call out',
  'Shop, salon or office work',
  'Rail',
  'Something else',
]
