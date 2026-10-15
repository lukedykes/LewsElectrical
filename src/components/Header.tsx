import { BadgeCheck, Mail, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { business, navLinks, studio } from '../data/site'
import { useContact } from '../lib/contact'
import { Button, ButtonLink, container } from './ui'
import { Logo } from './Logo'

export function Header() {
  const { openContact } = useContact()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Says plainly that this is a pitch, not the live site. */}
      <p className={css({ bg: 'paper.100', color: 'ink.500', fontSize: '0.8rem', textAlign: 'center', py: '1.5', px: '4' })}>
        Website concept for {business.name}, designed by{' '}
        <a href={studio.url} target="_blank" rel="noreferrer" className={css({ color: 'navy.900', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '2px' })}>
          {studio.name}
        </a>
      </p>

      <div className={css({ display: { base: 'none', md: 'block' }, bg: 'navy.950', color: 'white', fontSize: '0.9rem' })}>
        <div className={cx(container, css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', h: '10', gap: '6' }))}>
          <ul className={css({ display: 'flex', gap: '6' })}>
            {[...business.accreditations, 'Free quotes'].map((item) => (
              <li key={item} className={css({ display: 'flex', alignItems: 'center', gap: '1.5' })}>
                <BadgeCheck size={16} className={css({ color: 'crimson.500' })} aria-hidden /> {item}
              </li>
            ))}
          </ul>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '6' })}>
            <a href={business.phoneHref} className={css({ display: 'flex', alignItems: 'center', gap: '1.5', fontWeight: '600', _hover: { textDecoration: 'underline' } })}>
              <Phone size={15} aria-hidden /> {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className={css({ display: { base: 'none', lg: 'flex' }, alignItems: 'center', gap: '1.5', _hover: { textDecoration: 'underline' } })}>
              <Mail size={15} aria-hidden /> {business.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cx(
          css({ position: 'sticky', top: '0', zIndex: '40', bg: 'white', borderBottom: '1px solid {colors.paper.200}', transition: 'box-shadow 0.2s' }),
          scrolled && css({ boxShadow: '0 4px 18px rgba(10, 30, 69, 0.08)' }),
        )}
      >
        <nav aria-label="Main" className={cx(container, css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: { base: '3', md: '6' }, h: { base: '16', md: '20' } }))}>
          <a href="#top" onClick={() => setOpen(false)} className={css({ flexShrink: '0' })}>
            <Logo imgCss={css.raw({ h: { base: '12', md: '16' } })} sizes="(min-width: 768px) 163px, 122px" />
          </a>

          <ul className={css({ display: { base: 'none', xl: 'flex' }, alignItems: 'center', gap: '6' })}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={css({
                    fontFamily: 'heading',
                    fontWeight: '700',
                    fontSize: '1.08rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    whiteSpace: 'nowrap',
                    color: 'navy.900',
                    py: '2',
                    borderBottom: '3px solid transparent',
                    _hover: { borderColor: 'crimson.600' },
                  })}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Responsive visibility lives on wrappers so it never fights the button recipe's own display. */}
          <div className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
            <span className={css({ display: { base: 'none', sm: 'inline-flex' } })}>
              <Button onClick={() => openContact()}>Get a free quote</Button>
            </span>
            <span className={css({ display: { base: 'inline-flex', xl: 'none' }, gap: '2' })}>
              <span className={css({ display: 'inline-flex', '@media (max-width: 359px)': { display: 'none' } })}>
                <ButtonLink href={business.phoneHref} variant="outline" size="icon" aria-label={`Call ${business.phone}`}>
                  <Phone size={18} aria-hidden />
                </ButtonLink>
              </span>
              <Button
                variant="navy"
                size="icon"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
              </Button>
            </span>
          </div>
        </nav>

        <div
          id="mobile-menu"
          hidden={!open}
          className={css({ display: { xl: 'none' }, borderTop: '1px solid {colors.paper.200}', bg: 'white', boxShadow: '0 16px 30px rgba(10, 30, 69, 0.12)' })}
        >
          <ul className={cx(container, css({ py: '3' }))}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={css({
                    display: 'block',
                    py: '3',
                    fontFamily: 'heading',
                    fontWeight: '700',
                    fontSize: '1.3rem',
                    textTransform: 'uppercase',
                    color: 'navy.900',
                    borderBottom: '1px solid {colors.paper.200}',
                  })}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={cx(container, css({ display: 'grid', gap: '2', pb: '5' }))}>
            <Button
              size="lg"
              onClick={() => {
                setOpen(false)
                openContact()
              }}
            >
              Get a free quote
            </Button>
            <ButtonLink href={business.phoneHref} variant="outline" size="lg">
              <Phone size={18} aria-hidden /> Call {business.phone}
            </ButtonLink>
          </div>
        </div>
      </header>
    </>
  )
}
