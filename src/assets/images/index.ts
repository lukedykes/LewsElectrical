// Stock photography for the demo (Unsplash Licence and StockSnap CC0, see CREDITS.md).
// Swap these for the client's own project photos before launch.
import boards from './boards-960.webp'
import cctv from './cctv.webp'
import cctvSm from './cctv-960.webp'
import consumerUnit from './consumer-unit-960.webp'
import distributionBoard from './distribution-board.webp'
import distributionBoardSm from './distribution-board-960.webp'
import electrician from './electrician.webp'
import electricianSm from './electrician-960.webp'
import hero from './hero.webp'
import heroSm from './hero-960.webp'
import heroOff from './hero-off.webp'
import heroOffSm from './hero-off-960.webp'
import heroPortrait from './hero-portrait.webp'
import heroPortraitSm from './hero-portrait-960.webp'
import heroPortraitOff from './hero-portrait-off.webp'
import heroPortraitOffSm from './hero-portrait-off-960.webp'
import homeDusk from './home-dusk.webp'
import homeDuskSm from './home-dusk-960.webp'
import kitchen from './kitchen.webp'
import kitchenSm from './kitchen-960.webp'
import pendants from './pendants.webp'
import pendantsSm from './pendants-960.webp'
import pylons from './pylons.webp'
import pylonsSm from './pylons-960.webp'
import rail from './rail.webp'
import railSm from './rail-960.webp'
import retail from './retail.webp'
import retailSm from './retail-960.webp'
import rewire from './rewire-960.webp'
import salon from './salon.webp'
import salonSm from './salon-960.webp'

export type Photo = { src: string; small: string; width: number; height: number; alt: string }

const photo = (src: string, small: string, width: number, height: number, alt: string): Photo => ({
  src,
  small,
  width,
  height,
  alt,
})

export const photos = {
  hero: photo(hero, heroSm, 1920, 1280, 'A modern family home at dusk with its interior lights glowing'),
  heroOff: photo(heroOff, heroOffSm, 1920, 1280, ''),
  heroPortrait: photo(heroPortrait, heroPortraitSm, 1080, 1620, 'A contemporary house entrance lit warmly at dusk'),
  heroPortraitOff: photo(heroPortraitOff, heroPortraitOffSm, 1080, 1620, ''),
  homeDusk: photo(homeDusk, homeDuskSm, 1920, 1280, 'A timber family home at blue hour with warm lights in every window'),
  kitchen: photo(kitchen, kitchenSm, 1440, 956, 'A bright modern kitchen with black pendant lights over the island'),
  retail: photo(retail, retailSm, 1440, 961, 'A boutique clothing shop lit by a row of white pendant lights'),
  rail: photo(rail, railSm, 1080, 1619, 'A passenger train waiting at a UK station under a glass roof'),
  rewire: photo(rewire, rewire, 960, 639, 'New brown, blue and green and yellow cables coming out of a freshly chased wall'),
  distributionBoard: photo(distributionBoard, distributionBoardSm, 1440, 960, 'A neatly wired distribution board with rows of breakers'),
  consumerUnit: photo(consumerUnit, consumerUnit, 960, 1443, 'An electrician testing circuits in a consumer unit'),
  boards: photo(boards, boards, 960, 639, 'An electrician in overalls working on distribution boards'),
  pendants: photo(pendants, pendantsSm, 1080, 1620, 'A cluster of copper pendant lights'),
  cctv: photo(cctv, cctvSm, 1440, 968, 'Rows of CCTV cameras mounted on a brick wall'),
  electrician: photo(electrician, electricianSm, 1440, 962, 'An electrician in a hard hat working on a meter'),
  salon: photo(salon, salonSm, 1920, 1333, 'A modern salon with round mirrors and linear lighting'),
  pylons: photo(pylons, pylonsSm, 1920, 1280, 'Power lines crossing a field at sunset'),
}

export type PhotoName = keyof typeof photos
