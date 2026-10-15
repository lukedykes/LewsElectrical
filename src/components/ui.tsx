import type { LucideIcon } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, SyntheticEvent } from 'react'
import { css, cva, cx, type RecipeVariantProps } from '../../styled-system/css'
import type { SystemStyleObject } from '../../styled-system/types'
import type { Photo } from '../assets/images'

export const container = css({
  w: '100%',
  maxW: '1200px',
  mx: 'auto',
  px: { base: '5', md: '8' },
})

export const sectionY = css({
  py: { base: '16', md: '24' },
})

/** Tracked red label with a short red rule in front: "— WHAT WE DO". */
export function Kicker({ children, onNavy, className }: { children: ReactNode; onNavy?: boolean; className?: string }) {
  return (
    <p className={cx(css({ textStyle: 'kicker', display: 'flex', alignItems: 'flex-start', gap: '3.5', textWrap: 'balance' }), onNavy ? css({ color: 'white' }) : css({ color: 'crimson.600' }), className)}>
      {/* Lines up with the first line even if the label wraps. */}
      <span aria-hidden className={css({ flexShrink: '0', w: '10', h: '2px', mt: '0.55em', bg: 'crimson.500' })} />
      {children}
    </p>
  )
}

/** The key word of a heading, in red. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className={css({ color: 'crimson.500' })}>{children}</span>
}

/** Section opener: tracked label, big heading, intro line, then a thick rule across. */
export function SectionIntro({ kicker, title, lead, id, onNavy, intro, children }: {
  kicker: ReactNode
  title: ReactNode
  lead?: ReactNode
  id?: string
  onNavy?: boolean
  /** Overrides for the wrapper, made with css.raw() so they merge cleanly. */
  intro?: SystemStyleObject
  children?: ReactNode
}) {
  return (
    <div
      className={cx(
        css({ pb: { base: '8', md: '10' }, mb: { base: '10', md: '12' }, borderBottom: '3px solid' }, intro),
        onNavy ? css({ borderColor: 'rgba(255, 255, 255, 0.85)' }) : css({ borderColor: 'navy.950' }),
      )}
    >
      <Kicker onNavy={onNavy}>{kicker}</Kicker>
      <h2 id={id} className={css({ textStyle: 'h2', mt: '4' })}>
        {title}
      </h2>
      {lead && <p className={cx(css({ textStyle: 'lead', mt: '5', maxW: '46rem' }), onNavy ? css({ color: 'navy.100' }) : css({ color: 'ink.500' }))}>{lead}</p>}
      {children}
    </div>
  )
}

/** Small red squares, as on the reference site's service cards. */
export function Bullets({ items, onNavy, columns = 1, className }: { items: string[]; onNavy?: boolean; columns?: 1 | 2; className?: string }) {
  return (
    <ul
      className={cx(
        css({ display: 'grid', gap: '2.5', columnGap: '8', alignContent: 'start' }),
        columns === 2 && css({ gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' } }),
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className={cx(css({ display: 'flex', alignItems: 'baseline', gap: '3.5', lineHeight: '1.4' }), onNavy ? css({ color: 'navy.100' }) : css({ color: 'ink.700' }))}>
          <span aria-hidden className={css({ flexShrink: '0', w: '1.5', h: '1.5', bg: 'crimson.500', transform: 'translateY(-0.2em)' })} />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Tracked red text link with an arrow: "VIEW OUR WORK →". */
export const trackedLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2',
  textStyle: 'tracked',
  color: 'crimson.600',
  cursor: 'pointer',
  transition: 'gap 0.2s',
  _hover: { gap: '3' },
})

export const button = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    fontWeight: '700',
    letterSpacing: '0.01em',
    rounded: '4px',
    border: '2px solid transparent',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '1.2',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
    _disabled: { opacity: 0.6, cursor: 'not-allowed' },
  },
  variants: {
    variant: {
      red: { bg: 'crimson.600', color: 'white', _hover: { bg: 'crimson.700' } },
      navy: { bg: 'navy.900', color: 'white', _hover: { bg: 'navy.800' } },
      outline: { borderColor: 'navy.900', color: 'navy.900', _hover: { bg: 'navy.900', color: 'white' } },
      outlineLight: { borderColor: 'rgba(255, 255, 255, 0.7)', color: 'white', _hover: { bg: 'white', color: 'navy.900', borderColor: 'white' } },
      white: { bg: 'white', color: 'navy.900', _hover: { bg: 'paper.200' } },
    },
    size: {
      md: { minH: '12', px: '5', py: '2', fontSize: '1rem' },
      lg: { minH: '14', px: { base: '5', sm: '7' }, py: '2.5', fontSize: '1.06rem' },
      icon: { h: '12', w: '12', px: '0', flexShrink: '0' },
    },
  },
  defaultVariants: { variant: 'red', size: 'md' },
})

type ButtonStyle = RecipeVariantProps<typeof button>

export function ButtonLink({ variant, size, className, ...rest }: ButtonStyle & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cx(button({ variant, size }), className)} {...rest} />
}

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonStyle & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cx(button({ variant, size }), className)} {...rest} />
}

/** Outline icon on a soft red tile. */
export function IconTile({ icon: Icon, size = 'md', className }: { icon: LucideIcon; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const dims = { sm: css({ w: '11', h: '11', rounded: '10px' }), md: css({ w: '14', h: '14', rounded: '14px' }), lg: css({ w: '16', h: '16', rounded: '16px' }) }[size]
  return (
    <span aria-hidden className={cx(css({ display: 'grid', placeItems: 'center', flexShrink: '0', bg: 'crimson.100', color: 'navy.950' }), dims, className)}>
      <Icon size={size === 'sm' ? 20 : size === 'md' ? 26 : 30} strokeWidth={1.7} />
    </span>
  )
}

/** srcset for a photo's two sizes, or nothing when both are the same file (the single-file demo build). */
export function srcSetFor(photo: Photo) {
  return photo.small === photo.src ? undefined : `${photo.small} ${photo.smallWidth}w, ${photo.src} ${photo.width}w`
}

const fileOf = (url: string) => (url.startsWith('data:') ? url : url.split('?')[0].split('/').pop())

/**
 * onError handler that makes a photo heal itself. If a file fails (a dropped connection,
 * or a page cached from before a deploy), it tries the photo's other size, then that
 * file once more, fresh. If that fails too, the photo is hidden so its tile shows a plain
 * background instead of a broken-image icon.
 */
export function retryImage(photo: { src: string; small: string }) {
  return (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const tries = Number(img.dataset.retries ?? '0')
    if (tries >= 2) {
      img.style.visibility = 'hidden'
      return
    }
    img.dataset.retries = String(tries + 1)
    img.removeAttribute('srcset')
    img.removeAttribute('sizes')
    img.loading = 'eager'
    const failed = fileOf(img.currentSrc || img.src)
    const next = tries === 0 ? (failed === fileOf(photo.small) ? photo.src : photo.small) : img.src.split('?')[0]
    img.src = tries === 0 || next.startsWith('data:') ? next : `${next}?retry=${Date.now()}`
  }
}

export function Img({ photo, sizes = '100vw', className, priority, alt }: {
  photo: Photo
  sizes?: string
  className?: string
  priority?: boolean
  alt?: string
}) {
  const srcSet = srcSetFor(photo)
  return (
    <img
      src={photo.small}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={retryImage(photo)}
      className={className}
      style={photo.position ? { objectPosition: photo.position } : undefined}
    />
  )
}

export const coverImage = css({ w: '100%', h: '100%', objectFit: 'cover' })
