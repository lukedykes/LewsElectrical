import { BadgeCheck, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Logo } from '../components/Logo'
import { container } from '../components/ui'
import { business, navLinks, services, studio } from '../data/site'

export function Footer() {
  const year = new Date().getFullYear()
  const credits = Object.values(photos).map((p) => p.credit)

  return (
    <footer className={css({ bg: 'navy.950', color: 'navy.100', pt: { base: '14', md: '16' }, pb: { base: '28', xl: '10' }, borderTop: '6px solid {colors.crimson.600}' })}>
      <div className={container}>
        <div className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))', lg: 'minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 0.8fr) minmax(0, 1.25fr)' }, gap: '10' })}>
          <div>
            <Logo onNavy tagline />
            <p className={css({ mt: '5', maxW: '22rem' })}>Electrical contractors for homes, businesses and the rail industry, across Essex and London.</p>
            <ul className={css({ display: 'grid', gap: '2', mt: '5', fontWeight: '600', color: 'white' })}>
              {business.accreditations.map((item) => (
                <li key={item} className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
                  <BadgeCheck size={18} className={css({ color: 'crimson.500' })} aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>

          <FooterList title="Services">
            {services.map((s) => (
              <li key={s.title}>
                <a href="#services" className={link}>
                  {s.title}
                </a>
              </li>
            ))}
          </FooterList>

          <FooterList title="Quick links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className={link}>
                Contact
              </a>
            </li>
          </FooterList>

          <FooterList title="Get in touch">
            <li>
              <a href={business.phoneHref} className={cx(link, css({ display: 'flex', alignItems: 'center', gap: '2', fontWeight: '700', color: 'white' }))}>
                <Phone size={16} aria-hidden /> {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className={cx(link, css({ display: 'flex', alignItems: 'center', gap: '2', overflowWrap: 'anywhere' }))}>
                <Mail size={16} aria-hidden /> {business.email}
              </a>
            </li>
            <li className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
              <MapPin size={16} aria-hidden /> {business.area}
            </li>
          </FooterList>
        </div>

        <details className={css({ mt: '12', pt: '6', borderTop: '1px solid {colors.lineOnNavy}', fontSize: '0.85rem' })}>
          <summary className={css({ cursor: 'pointer', fontWeight: '600', color: 'white', w: 'fit-content' })}>Photo credits</summary>
          <ul className={css({ display: 'grid', gap: '1.5', mt: '3', color: 'navy.200' })}>
            {credits.map((c) => (
              <li key={c.source}>
                <a href={c.source} target="_blank" rel="noreferrer" className={css({ textDecoration: 'underline', textUnderlineOffset: '2px', _hover: { color: 'white' } })}>
                  {c.title}
                </a>{' '}
                by {c.author},{' '}
                <a href={c.licenseUrl} target="_blank" rel="noreferrer" className={css({ textDecoration: 'underline', textUnderlineOffset: '2px', _hover: { color: 'white' } })}>
                  {c.license}
                </a>
                , via Wikimedia Commons
              </li>
            ))}
          </ul>
          <p className={css({ mt: '3', color: 'navy.200' })}>Photos have been resized and cropped. Shown as examples only, not work carried out by Lews Electrical.</p>
        </details>

        <div className={css({ display: 'flex', flexDir: { base: 'column', md: 'row' }, justifyContent: 'space-between', gap: '3', mt: '6', fontSize: '0.85rem', color: 'navy.200' })}>
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p>
            Website concept by{' '}
            <a href={studio.url} target="_blank" rel="noreferrer" className={css({ color: 'white', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '2px' })}>
              {studio.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterList({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className={css({ fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '1.05rem', color: 'white', mb: '4' })}>{title}</p>
      <ul className={css({ display: 'grid', gap: '2' })}>{children}</ul>
    </div>
  )
}

const link = css({ _hover: { color: 'white', textDecoration: 'underline', textUnderlineOffset: '2px' } })
