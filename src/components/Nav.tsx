import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { business, navLinks } from '../data/site'
import { useQuote } from '../lib/quote'
import { lockScroll } from '../lib/scroll'
import { Button, ButtonLink, container, easeOut } from './ui'
import { Logo } from './Wordmark'

export function Nav() {
  const { scrollY } = useScroll()
  const { startQuote } = useQuote()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 640 && y > previous + 2)
    if (y < previous - 2) setHidden(false)
  })

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: easeOut }}
        className={cx(
          css({
            position: 'sticky',
            top: '0',
            zIndex: '50',
            transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
            borderBottom: '1px solid transparent',
          }),
          scrolled &&
            css({
              bg: 'rgba(4, 8, 20, 0.9)',
              backdropFilter: 'blur(18px) saturate(1.4)',
              borderColor: 'line.subtle',
            }),
        )}
      >
        <nav aria-label="Main" className={cx(container, css({ h: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6' }))}>
          <a href="#top" aria-label={`${business.name}, back to top`} className={css({ flexShrink: '0' })}>
            <Logo />
          </a>

          <ul className={css({ display: { base: 'none', lg: 'flex' }, alignItems: 'center', gap: '1' })}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={css({
                    position: 'relative',
                    display: 'block',
                    px: '3.5',
                    py: '2',
                    fontSize: 'sm',
                    fontWeight: '500',
                    color: 'ink.100',
                    transition: 'color 0.2s',
                    _hover: { color: 'white', '& span': { transform: 'scaleX(1)' } },
                  })}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={css({
                      position: 'absolute',
                      left: '3.5',
                      right: '3.5',
                      bottom: '1',
                      h: '1px',
                      bg: 'crimson.400',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.35s {easings.out}',
                    })}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className={css({ display: 'flex', alignItems: 'center', gap: '2.5' })}>
            <a
              href={business.phoneHref}
              className={css({
                display: { base: 'none', xl: 'inline-flex' },
                alignItems: 'center',
                gap: '2',
                fontFamily: 'mono',
                fontSize: 'sm',
                color: 'ink.100',
                px: '3',
                _hover: { color: 'white' },
              })}
            >
              <Phone size={15} aria-hidden />
              {business.phone}
            </a>
            <Button size="sm" arrow onClick={() => startQuote()} className={css({ display: { base: 'none', sm: 'inline-flex' } })}>
              Free quote
            </Button>
            <a
              href={business.phoneHref}
              aria-label={`Call ${business.phone}`}
              className={cx(iconButton, css({ display: { base: 'inline-flex', lg: 'none' } }))}
            >
              <Phone size={18} aria-hidden />
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={cx(iconButton, css({ display: { base: 'inline-flex', lg: 'none' } }))}
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: easeOut }}
            className={css({
              position: 'fixed',
              inset: '0',
              zIndex: '45',
              bg: 'navy.950',
              pt: '28',
              pb: '10',
              display: 'flex',
              flexDir: 'column',
              overflowY: 'auto',
              bgImage: 'radial-gradient(120% 60% at 100% 0%, rgba(227, 23, 58, 0.18), transparent 60%)',
            })}
          >
            <ul className={cx(container, css({ display: 'flex', flexDir: 'column', gap: '1', flex: '1' }))}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: easeOut }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={css({
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '4',
                      py: '3',
                      fontFamily: 'display',
                      fontWeight: '750',
                      fontSize: 'clamp(2.1rem, 9vw, 3rem)',
                      letterSpacing: '-0.03em',
                      lineHeight: '1.05',
                      borderBottom: '1px solid {colors.line.subtle}',
                    })}
                  >
                    <span className={css({ fontFamily: 'mono', fontSize: 'xs', color: 'crimson.400', letterSpacing: '0.1em' })}>
                      0{i + 1}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={cx(container, css({ display: 'grid', gap: '3', mt: '10' }))}
            >
              <Button
                size="lg"
                arrow
                onClick={() => {
                  setOpen(false)
                  startQuote()
                }}
              >
                Get a free quote
              </Button>
              <ButtonLink href={business.phoneHref} variant="ghost" size="lg">
                <Phone size={18} aria-hidden /> {business.phone}
              </ButtonLink>
              <a href={`mailto:${business.email}`} className={css({ textAlign: 'center', color: 'fg.subtle', fontSize: 'sm', mt: '2' })}>
                {business.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const iconButton = css({
  alignItems: 'center',
  justifyContent: 'center',
  w: '11',
  h: '11',
  rounded: 'full',
  border: '1px solid',
  borderColor: 'line.default',
  bg: 'rgba(255, 255, 255, 0.04)',
  color: 'white',
  transition: 'background 0.2s',
  _hover: { bg: 'rgba(255, 255, 255, 0.1)' },
})
