import { css, cx } from '../../styled-system/css'
import type { SystemStyleObject } from '../../styled-system/types'
import { retryImage } from './ui'
import onDark320 from '../assets/brand/logo-on-dark-320.webp'
import onDark640 from '../assets/brand/logo-on-dark-640.webp'
import onLight320 from '../assets/brand/logo-on-light-320.webp'
import onLight640 from '../assets/brand/logo-on-light-640.webp'

// The client's cable-lettering logo (photos/originals/logo.png). "Electrical Ltd"
// is white in the artwork; scripts/photos/grade.py makes a navy version for
// light backgrounds.
const WIDTH = 640
const HEIGHT = 252

export function Logo({ onNavy, tagline, className, imgCss, sizes = '150px', lazy }: {
  onNavy?: boolean
  /** For copies below the fold (the footer). */
  lazy?: boolean
  tagline?: boolean
  className?: string
  /** Overrides for the image, made with css.raw() so they merge cleanly. */
  imgCss?: SystemStyleObject
  sizes?: string
}) {
  const [small, large] = onNavy ? [onDark320, onDark640] : [onLight320, onLight640]
  return (
    <span className={cx(css({ display: 'inline-flex', flexDir: 'column', alignItems: 'flex-start', gap: '2' }), className)}>
      <img
        src={small}
        srcSet={`${small} 320w, ${large} 640w`}
        sizes={sizes}
        width={WIDTH}
        height={HEIGHT}
        alt="Lews Electrical Ltd"
        loading={lazy ? 'lazy' : undefined}
        onError={retryImage({ src: large, small })}
        className={css({ display: 'block', h: { base: '11', md: '14' }, w: 'auto' }, imgCss)}
      />
      {tagline && (
        <span
          className={cx(
            css({ fontFamily: 'heading', fontWeight: '600', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.16em', lineHeight: '1.3' }),
            onNavy ? css({ color: 'navy.200' }) : css({ color: 'ink.500' }),
          )}
        >
          Powering people, places &amp; possibilities
        </span>
      )}
    </span>
  )
}
