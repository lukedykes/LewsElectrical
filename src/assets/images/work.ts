// Lews Electrical's own job photos. The untouched originals live in
// photos/originals/; scripts/photos/grade.py crops, cleans up, upscales and
// colour-grades them into ./work/ and writes the pixel sizes to manifest.json.
import manifest from './work/manifest.json'
import type { Photo } from './index'

const urls = import.meta.glob<string>('./work/*.webp', { eager: true, import: 'default' })

type WorkName = keyof typeof manifest

function job(name: WorkName, alt: string, caption: string, position?: string): Photo {
  const size = manifest[name]
  const src = urls[`./work/${name}.webp`]
  const small = urls[`./work/${name}-sm.webp`]
  if (!src || !small) throw new Error(`Missing graded photo: ${name}`)
  return { src, small, width: size.width, height: size.height, smallWidth: size.smallWidth, alt, caption, position }
}

export const work = {
  hero: job(
    'hero',
    'A media wall with a wide electric fire, a recessed TV and soundbar, and warm LED lighting in the shelves and along the ceiling',
    'Media wall lighting',
    '50% 55%',
  ),
  mediaWall: job(
    'media-wall',
    'A white media wall with lit display shelves either side of a recessed TV, a long electric fire below and a warm LED strip along the ceiling',
    'Media wall with shelf, fire and ceiling lighting',
  ),
  mediaWallAngle: job(
    'media-wall-angle',
    'The media wall from the side, showing downlights in each recessed shelf and the warm LED cove above',
    'Downlit shelves and LED cove',
  ),
  kitchenPeninsula: job(
    'kitchen-peninsula',
    'A finished grey gloss kitchen with a white peninsula worktop, downlights and a black extractor hood',
    'Finished kitchen with downlights',
  ),
  kitchenCorner: job(
    'kitchen-corner',
    'A grey kitchen corner with LED strips under the wall units and along the plinth, lighting the worktop and floor',
    'Under-cabinet and plinth lighting',
  ),
  kitchenWindow: job(
    'kitchen-window',
    'A long galley-style kitchen with a glowing LED plinth strip running along the base units to the window',
    'LED plinth lighting',
  ),
  stripOut: job(
    'kitchen-strip-out',
    'A stripped-out room back to brick and timber studs, with new white cables run through the walls and ceiling',
    'First fix: new cables in before plastering',
  ),
  stripOutElectrician: job(
    'kitchen-strip-out-electrician',
    'An electrician at work on a stripped-out wall, with new cables hanging ready from the ceiling joists',
    'First fix on a kitchen job',
    '62% 40%',
  ),
  consumerUnit: job(
    'consumer-unit',
    'A new FuseBox consumer unit with RCBO and surge protection, every cable neatly dressed into place',
    'New consumer unit with surge protection',
  ),
  garageWallLights: job(
    'garage-wall-lights',
    'A brick garage at dusk with up-and-down wall lights either side of the black garage door and the window',
    'Up-and-down wall lights at dusk',
  ),
  garageWallLightsClose: job(
    'garage-wall-lights-close',
    'The front of a house at dusk, with up-and-down wall lights glowing on the brickwork around a window and garage door',
    'Exterior wall lights',
  ),
  garageFloodlight: job(
    'garage-floodlight',
    'An LED floodlight mounted above a grey garage door',
    'LED security floodlight',
  ),
  soffitDownlights: job(
    'soffit-downlights',
    'A brick extension with LED downlights set into the white soffit above grey bi-fold doors',
    'Soffit downlights on an extension',
  ),
  extensionUplights: job(
    'extension-uplights',
    'A new rendered extension at dusk, lit by a row of soffit downlights washing light down the walls above the bi-fold doors',
    'Extension lighting at dusk',
  ),
  deckingLights: job(
    'decking-lights',
    'Garden decking steps at dusk with small round LED lights set into each riser',
    'Decking step lights',
  ),
  cctv: job(
    'cctv-dome',
    'An infrared CCTV dome camera fixed to the corner of a brick house',
    'CCTV dome camera',
  ),
  airCon: job(
    'air-conditioning',
    'Three air conditioning outdoor units on a brick gable wall, each with its own outdoor isolator and neat white trunking',
    'Air conditioning units with isolators',
  ),
} satisfies Record<string, Photo>
