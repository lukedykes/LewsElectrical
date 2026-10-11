import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { css, cva, cx, type RecipeVariantProps } from '../../styled-system/css'
import type { Photo } from '../assets/images'

export const container = css({
  w: '100%',
  maxW: '1360px',
  mx: 'auto',
  px: { base: '5', md: '8', xl: '12' },
})

export const sectionPadding = css({
  py: { base: '24', md: '32', xl: '40' },
})

export const easeOut = [0.16, 1, 0.3, 1] as const

export function Eyebrow({ index, children, tone = 'dark', className }: {
  index?: string
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <p
      className={cx(
        css({ textStyle: 'eyebrow', display: 'inline-flex', alignItems: 'center', gap: '3' }),
        tone === 'light' ? css({ color: 'fg.onPaperMuted' }) : css({ color: 'fg.subtle' }),
        className,
      )}
    >
      {index && <span className={css({ color: 'crimson.400', fontWeight: '600' })}>{index}</span>}
      <span aria-hidden className={css({ w: '8', h: '1px', bg: 'currentColor', opacity: 0.45 })} />
      <span>{children}</span>
    </p>
  )
}

export const button = cva({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2.5',
    fontWeight: '600',
    letterSpacing: '-0.01em',
    rounded: 'full',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'background 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.35s, transform 0.25s',
    _active: { transform: 'scale(0.98)' },
    '& .arrow': { transition: 'transform 0.35s {easings.out}' },
    _hover: { '& .arrow': { transform: 'translateX(4px)' } },
    _disabled: { opacity: 0.45, cursor: 'not-allowed' },
  },
  variants: {
    variant: {
      primary: {
        bg: 'crimson.500',
        color: 'white',
        boxShadow: '0 12px 34px -12px rgba(227, 23, 58, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
        _hover: { bg: 'crimson.400', boxShadow: '0 18px 44px -12px rgba(255, 77, 102, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.3)' },
      },
      ghost: {
        color: 'white',
        border: '1px solid',
        borderColor: 'line.strong',
        bg: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(12px)',
        _hover: { bg: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.5)' },
      },
      dark: {
        bg: 'navy.900',
        color: 'white',
        _hover: { bg: 'navy.700' },
      },
      light: {
        bg: 'white',
        color: 'navy.900',
        _hover: { bg: 'paper.100' },
      },
      outlineDark: {
        color: 'navy.900',
        border: '1px solid',
        borderColor: 'line.paper',
        _hover: { bg: 'navy.900', color: 'white', borderColor: 'navy.900' },
      },
    },
    size: {
      sm: { h: '10', px: '4', fontSize: 'sm' },
      md: { h: '12', px: '6', fontSize: 'sm' },
      lg: { h: '14', px: '7', fontSize: 'md' },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

type ButtonStyle = RecipeVariantProps<typeof button>

export function ButtonLink({ variant, size, arrow, className, children, ...rest }: ButtonStyle &
  AnchorHTMLAttributes<HTMLAnchorElement> & { arrow?: boolean }) {
  return (
    <a className={cx(button({ variant, size }), className)} {...rest}>
      {children}
      {arrow && <ArrowRight className="arrow" size={18} strokeWidth={2.2} aria-hidden />}
    </a>
  )
}

export function Button({ variant, size, arrow, className, children, type = 'button', ...rest }: ButtonStyle &
  ButtonHTMLAttributes<HTMLButtonElement> & { arrow?: boolean }) {
  return (
    <button type={type} className={cx(button({ variant, size }), className)} {...rest}>
      {children}
      {arrow && <ArrowRight className="arrow" size={18} strokeWidth={2.2} aria-hidden />}
    </button>
  )
}

export function Reveal({ children, delay = 0, y = 28, className, amount = 0.25 }: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

/** Splits a heading into words that rise into place when scrolled into view. */
export function RevealWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  // The in-view trigger sits on the outer span: the words start clipped by their
  // overflow-hidden masks, so observing them directly would never fire.
  return (
    <motion.span className={className} aria-label={text} role="text" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.5 }}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className={css({ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', pb: '0.08em', mb: '-0.08em' })}>
          <motion.span
            className={css({ display: 'inline-block' })}
            variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
            transition={{ duration: 0.85, delay: delay + i * 0.05, ease: easeOut }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function Img({ photo, sizes = '100vw', className, priority, alt }: {
  photo: Photo
  sizes?: string
  className?: string
  priority?: boolean
  alt?: string
}) {
  const portrait = photo.height > photo.width
  const srcSet = photo.small === photo.src ? undefined : `${photo.small} ${portrait ? 720 : 960}w, ${photo.src} ${photo.width}w`
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
      draggable={false}
      className={className}
    />
  )
}

export const coverImage = css({ position: 'absolute', inset: '0', w: '100%', h: '100%', objectFit: 'cover' })
