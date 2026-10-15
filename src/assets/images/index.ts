// Local photography of Essex and London from Wikimedia Commons, used under the
// licences listed with each photo (credited in the footer). These only fill the
// spots where there's no job photo yet (commercial, rail, areas, an old board);
// everything else on the site is Lews Electrical's own work, in ./work.ts.
import areas from './areas.webp'
import areasSm from './areas-sm.webp'
import commercial from './commercial.webp'
import commercialSm from './commercial-sm.webp'
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
  /** Only for photos that aren't Lews Electrical's own. */
  credit?: Credit
}

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`
const cc = (code: string, version: string) => `https://creativecommons.org/licenses/${code}/${version}/`

export const photos = {
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
    height: 804,
    smallWidth: 600,
    alt: 'The brick arches of Chappel Viaduct above a country lane, with the Chappel village sign in the hedge',
    caption: 'Chappel Viaduct',
    credit: { title: 'Chappel Viaduct and highway', author: 'Sumit Surai', license: 'CC BY-SA 4.0', licenseUrl: cc('by-sa', '4.0'), source: commons('Chappel_Viaduct_And_Highway.jpg') },
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
    height: 640,
    smallWidth: 960,
    alt: 'Chappel Viaduct crossing the Colne Valley, with sheep grazing in the field in front',
    caption: 'Chappel Viaduct in the Colne Valley',
    credit: { title: 'Sheep near Chappel Viaduct', author: 'Roger Jones', license: 'CC BY-SA 2.0', licenseUrl: cc('by-sa', '2.0'), source: commons('Sheep_near_Chappel_Viaduct_-_geograph.org.uk_-_4517827.jpg') },
  },
  areas: {
    src: areas,
    small: areasSm,
    width: 1400,
    height: 937,
    smallWidth: 800,
    alt: 'Fishing boats moored in the creek at Leigh-on-Sea under a pink sunset sky',
    caption: 'Sunset over Leigh Marsh, Leigh-on-Sea',
    credit: { title: 'Sunset reflected in the channel in the Leigh Marsh', author: 'Robert Lamb', license: 'CC BY-SA 2.0', licenseUrl: cc('by-sa', '2.0'), source: commons('View_of_the_sunset_reflected_in_the_channel_in_the_Leigh_Marsh_-_geograph.org.uk_-_5432468.jpg') },
  },
} satisfies Record<string, Photo & { credit: Credit }>

export { work } from './work'
