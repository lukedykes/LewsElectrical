import { Check, type LucideIcon } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { css, cva, cx, type RecipeVariantProps } from '../../styled-system/css'
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

export function Kicker({ children, onNavy, className }: { children: ReactNode; onNavy?: boolean; className?: string }) {
  return (
    <p className={cx(css({ textStyle: 'kicker' }), onNavy ? css({ color: 'navy.200' }) : css({ color: 'crimson.600' }), className)}>
      {children}
    </p>
  )
}

/** White text on a slanted red block, like the banners on the client's flyers. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      className={css({
        position: 'relative',
        display: 'inline-block',
        color: 'white',
        px: '0.14em',
        isolation: 'isolate',
        _before: {
          content: '""',
          position: 'absolute',
          inset: '0.07em -0.03em 0.03em',
          bg: 'crimson.600',
          transform: 'skewX(-11deg)',
          zIndex: '-1',
        },
      })}
    >
      {children}
    </span>
  )
}

export const button = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    fontWeight: '700',
    letterSpacing: '0.01em',
    rounded: '6px',
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

/** Red ticked checklist, as used on the flyers. */
export function TickList({ items, columns = 1, onNavy, className }: { items: string[]; columns?: 1 | 2; onNavy?: boolean; className?: string }) {
  return (
    <ul
      className={cx(
        css({ display: 'grid', gap: '2.5', columnGap: '8' }),
        columns === 2 && css({ gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' } }),
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className={cx(css({ display: 'flex', alignItems: 'flex-start', gap: '3', lineHeight: '1.4' }), onNavy ? css({ color: 'navy.100' }) : css({ color: 'ink.700' }))}>
          <span
            aria-hidden
            className={css({ flexShrink: '0', display: 'grid', placeItems: 'center', w: '5', h: '5', mt: '0.5', rounded: '4px', bg: 'crimson.600', color: 'white' })}
          >
            <Check size={14} strokeWidth={3.2} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function IconCircle({ icon: Icon, size = 'md', className }: { icon: LucideIcon; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const dims = { sm: css({ w: '10', h: '10' }), md: css({ w: '14', h: '14' }), lg: css({ w: '16', h: '16' }) }[size]
  return (
    <span aria-hidden className={cx(css({ display: 'grid', placeItems: 'center', flexShrink: '0', rounded: 'full', bg: 'crimson.600', color: 'white' }), dims, className)}>
      <Icon size={size === 'sm' ? 18 : size === 'md' ? 26 : 30} strokeWidth={1.8} />
    </span>
  )
}

export function Img({ photo, sizes = '100vw', className, priority, alt }: {
  photo: Photo
  sizes?: string
  className?: string
  priority?: boolean
  alt?: string
}) {
  const srcSet = photo.small === photo.src ? undefined : `${photo.small} ${photo.smallWidth}w, ${photo.src} ${photo.width}w`
  return (
    <img
      src={photo.small}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={photo.position ? { objectPosition: photo.position } : undefined}
    />
  )
}

export const coverImage = css({ w: '100%', h: '100%', objectFit: 'cover' })
