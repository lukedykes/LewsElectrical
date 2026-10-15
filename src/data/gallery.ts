import { work, type Photo } from '../assets/images'

export type GalleryFilter = 'all' | 'indoor' | 'outdoor' | 'kitchens' | 'boards'

export const galleryFilters: { id: GalleryFilter; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'indoor', label: 'Indoor lighting' },
  { id: 'outdoor', label: 'Outdoor lighting' },
  { id: 'kitchens', label: 'Kitchens & rewires' },
  { id: 'boards', label: 'Boards, CCTV & more' },
]

export type GalleryItem = { id: string; photo: Photo; tag: string; filters: Exclude<GalleryFilter, 'all'>[] }

// Ordered so portrait and landscape shots mix well in the justified rows.
export const gallery: GalleryItem[] = [
  { id: 'media-wall', photo: work.mediaWall, tag: 'Indoor lighting', filters: ['indoor'] },
  { id: 'garage-wall-lights', photo: work.garageWallLights, tag: 'Outdoor lighting', filters: ['outdoor'] },
  { id: 'consumer-unit', photo: work.consumerUnit, tag: 'Fuse boards', filters: ['boards'] },
  { id: 'kitchen-peninsula', photo: work.kitchenPeninsula, tag: 'Kitchens', filters: ['kitchens', 'indoor'] },
  { id: 'extension-uplights', photo: work.extensionUplights, tag: 'Outdoor lighting', filters: ['outdoor'] },
  { id: 'decking-lights', photo: work.deckingLights, tag: 'Garden lighting', filters: ['outdoor'] },
  { id: 'kitchen-corner', photo: work.kitchenCorner, tag: 'Kitchens', filters: ['kitchens', 'indoor'] },
  { id: 'soffit-downlights', photo: work.soffitDownlights, tag: 'Outdoor lighting', filters: ['outdoor'] },
  { id: 'cctv', photo: work.cctv, tag: 'CCTV', filters: ['boards'] },
  { id: 'strip-out-electrician', photo: work.stripOutElectrician, tag: 'Rewires', filters: ['kitchens'] },
  { id: 'media-wall-angle', photo: work.mediaWallAngle, tag: 'Indoor lighting', filters: ['indoor'] },
  { id: 'garage-wall-lights-close', photo: work.garageWallLightsClose, tag: 'Outdoor lighting', filters: ['outdoor'] },
  { id: 'air-con', photo: work.airCon, tag: 'AC supplies', filters: ['boards'] },
  { id: 'kitchen-window', photo: work.kitchenWindow, tag: 'Kitchens', filters: ['kitchens', 'indoor'] },
  { id: 'garage-floodlight', photo: work.garageFloodlight, tag: 'Security lighting', filters: ['outdoor'] },
  { id: 'strip-out', photo: work.stripOut, tag: 'Rewires', filters: ['kitchens'] },
]
