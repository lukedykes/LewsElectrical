// Photography of Essex and London from Wikimedia Commons, used under the licences
// listed with each photo (credited in the footer). Swap in the client's own job
// photos before launch.
import areas from './areas.webp'
import areasSm from './areas-sm.webp'
import commercial from './commercial.webp'
import commercialSm from './commercial-sm.webp'
import domestic from './domestic.webp'
import domesticSm from './domestic-sm.webp'
import hero from './hero.webp'
import heroSm from './hero-sm.webp'
import home from './home.webp'
import homeSm from './home-sm.webp'
import newBoard from './new-board.webp'
import newBoardSm from './new-board-sm.webp'
import oldBoard from './old-board.webp'
import oldBoardSm from './old-board-sm.webp'
import rail from './rail.webp'
import railSm from './rail-sm.webp'
import railBanner from './rail-banner.webp'
import railBannerSm from './rail-banner-sm.webp'
import venue from './venue.webp'
import venueSm from './venue-sm.webp'

export type Credit = { title: string; author: string; license: string; licenseUrl: string; source: string }

export type Photo = {
  src: string
  small: string
  width: number
  height: number
  smallWidth: number
  alt: string
  caption: string
  position?: string
  credit: Credit
}

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`
const cc = (code: string, version: string) => `https://creativecommons.org/licenses/${code}/${version}/`

export const photos = {
  hero: {
    src: hero,
    small: heroSm,
    width: 1600,
    height: 1200,
    smallWidth: 800,
    alt: 'Southend Pier at dusk, with the lights of the seafront behind the pier railway',
    caption: 'Southend Pier at dusk',
    credit: { title: 'Southend Pier at dusk', author: 'HH58', license: 'CC BY-SA 4.0', licenseUrl: cc('by-sa', '4.0'), source: commons('Southend_Pier_at_dusk.jpg') },
  },
  domestic: {
    src: domestic,
    small: domesticSm,
    width: 1000,
    height: 643,
    smallWidth: 600,
    alt: 'A pair of Victorian houses on High Road, Rayleigh',
    caption: 'High Road, Rayleigh',
    credit: { title: 'Houses on High Road, Rayleigh', author: 'David Howard', license: 'CC BY-SA 2.0', licenseUrl: cc('by-sa', '2.0'), source: commons('Houses_on_High_Road,_Rayleigh_-_geograph.org.uk_-_6552716.jpg') },
  },
  commercial: {
    src: commercial,
    small: commercialSm,
    width: 1000,
    height: 561,
    smallWidth: 600,
    alt: 'Shops along Southend High Street on a sunny day, with bunting overhead',
    caption: 'Southend High Street',
    credit: { title: 'View north along Southend High Street', author: 'Colin Park', license: 'CC BY-SA 2.0', licenseUrl: cc('by-sa', '2.0'), source: commons('View_north_along_Southend_High_Street_(geograph_7675871).jpg') },
  },
  rail: {
    src: rail,
    small: railSm,
    width: 1000,
    height: 750,
    smallWidth: 600,
    alt: 'A c2c train waiting at a platform at Fenchurch Street station',
    caption: 'c2c at Fenchurch Street',
    position: '60% 50%',
    credit: { title: 'C2C Class 357 at Fenchurch Street', author: 'Likelife', license: 'CC BY-SA 3.0', licenseUrl: cc('by-sa', '3.0'), source: commons('C2C_Class_357_at_Fenchurch_Street.jpg') },
  },
  home: {
    src: home,
    small: homeSm,
    width: 1400,
    height: 933,
    smallWidth: 800,
    alt: 'Edwardian terraced houses on Osborne Road, Westcliff-on-Sea',
    caption: 'Osborne Road, Westcliff-on-Sea',
    position: '68% 50%',
    credit: { title: 'Osborne Road, Westcliff-on-Sea', author: 'David Kemp', license: 'CC BY-SA 2.0', licenseUrl: cc('by-sa', '2.0'), source: commons('Osborne_Road,_Westcliff-on-Sea_-_geograph.org.uk_-_5169648.jpg') },
  },
  oldBoard: {
    src: oldBoard,
    small: oldBoardSm,
    width: 800,
    height: 600,
    smallWidth: 480,
    alt: 'An old fuse board with a tangle of cables beneath it',
    caption: 'An older fuse board',
    credit: { title: 'Consumer unit, public bar, Railway Inn, Spofforth', author: 'Mtaylor848', license: 'CC BY-SA 4.0', licenseUrl: cc('by-sa', '4.0'), source: commons('Consumer_unit,_public_bar,_Railway_Inn,_Spofforth,_North_Yorkshire_(4th_May_2019)_002.jpg') },
  },
  newBoard: {
    src: newBoard,
    small: newBoardSm,
    width: 800,
    height: 600,
    smallWidth: 480,
    alt: 'A modern Hager consumer unit with RCD protection',
    caption: 'A modern consumer unit',
    credit: { title: 'Modern consumer unit (Hager)', author: 'Wikimedia Commons contributor', license: 'CC BY-SA 3.0', licenseUrl: cc('by-sa', '3.0'), source: commons('ModernConsumerUnitHager.JPG') },
  },
  venue: {
    src: venue,
    small: venueSm,
    width: 1400,
    height: 787,
    smallWidth: 800,
    alt: 'A pub bar lit with warm feature lighting along the back bar',
    caption: 'The Wenlock & Essex, Essex Road, London',
    credit: { title: 'Wenlock and Essex, Islington, N1', author: 'Ewan Munro', license: 'CC BY-SA 2.0', licenseUrl: cc('by-sa', '2.0'), source: commons('Wenlock_and_Essex,_Islington,_N1_(8050563748).jpg') },
  },
  railBanner: {
    src: railBanner,
    small: railBannerSm,
    width: 1920,
    height: 638,
    smallWidth: 960,
    alt: 'A Greater Anglia train crossing Cattawade Creek near Manningtree',
    caption: 'Greater Anglia at Cattawade Creek, near Manningtree',
    credit: { title: 'Greater Anglia Class 720 at Cattawade Creek', author: 'kitmasterbloke', license: 'CC BY 2.0', licenseUrl: cc('by', '2.0'), source: commons('Greater_Anglia_Bombardier_Class_720_530_Cattawade_Creek.jpg') },
  },
  areas: {
    src: areas,
    small: areasSm,
    width: 1400,
    height: 934,
    smallWidth: 800,
    alt: 'Southend Pier reflected in the wet sand at sunset',
    caption: 'Southend Pier at sunset',
    credit: { title: 'Pier Sunset', author: 'Stephen Sims', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', source: commons('Pier_Sunset_(219457381).jpeg') },
  },
} satisfies Record<string, Photo>
