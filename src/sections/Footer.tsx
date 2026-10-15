import { BadgeCheck, FileText, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Logo } from '../components/Logo'
import { Button, container } from '../components/ui'
import { business, navLinks, studio } from '../data/site'
import { useContact } from '../lib/contact'

export function Footer() {
  const { openContact } = useContact()
  const year = new Date().getFullYear()
  const credits = Object.values(photos).map((p) => p.credit)

  return (
    <footer className={css({ bg: 'navy.950', color: 'navy.200', pt: { base: '14', md: '20' }, pb: { base: '32', lg: '10' } })}>
      <div className={container}>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))', lg: 'minmax(0, 1.2fr) minmax(0, 1.3fr) minmax(0, 0.8fr)' },
            gap: { base: '12', lg: '12' },
          })}
        >
          <div>
            <Logo onNavy tagline lazy sizes="220px" imgCss={css.raw({ h: { base: '16', md: '20' } })} />
            <p className={css({ mt: '5', maxW: '22rem' })}>Electrical contractors for homes, businesses and the rail industry, across Essex and London.</p>
            <ul className={css({ display: 'grid', gap: '2', mt: '5', fontWeight: '600', color: 'white' })}>
              {business.accreditations.map((item) => (
                <li key={item} className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
                  <BadgeCheck size={18} className={css({ color: 'crimson.500' })} aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterTitle>Get in touch</FooterTitle>
            <ul className={css({ display: 'grid', gap: '4' })}>
              <ContactRow href={business.phoneHref} icon={<Phone size={22} strokeWidth={1.7} />}>
                <span className={css({ fontFamily: 'heading', fontWeight: '800', fontSize: '1.9rem', lineHeight: '1', color: 'white', letterSpacing: '0.01em' })}>{business.phone}</span>
              </ContactRow>
              <ContactRow href={business.whatsappHref} external icon={<MessageCircle size={22} strokeWidth={1.7} className={css({ color: '#25D366' })} />}>
                WhatsApp us
              </ContactRow>
              <ContactRow href={`mailto:${business.email}`} icon={<Mail size={22} strokeWidth={1.7} />}>
                <span className={css({ overflowWrap: 'anywhere' })}>{business.email}</span>
              </ContactRow>
              <ContactRow icon={<MapPin size={22} strokeWidth={1.7} />}>{business.area}</ContactRow>
            </ul>
            <Button size="lg" onClick={() => openContact()} className={css({ w: '100%', mt: '8' })}>
              <FileText size={18} aria-hidden /> Get a free quote
            </Button>
          </div>

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
        </div>

        <div className={css({ mt: { base: '12', md: '16' }, pt: '8', borderTop: '1px solid rgba(255, 255, 255, 0.14)', display: 'grid', gap: '3', fontSize: '0.9rem' })}>
          <p>
            {business.name}. NICEIC Approved Contractor. {business.area}.
          </p>
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p>
            Website by{' '}
            <a href={studio.url} target="_blank" rel="noreferrer" className={css({ color: 'white', fontWeight: '700', _hover: { textDecoration: 'underline', textUnderlineOffset: '2px' } })}>
              {studio.name}
            </a>
          </p>
          <details className={css({ mt: '2', fontSize: '0.85rem' })}>
            <summary className={css({ cursor: 'pointer', fontWeight: '600', color: 'white', w: 'fit-content' })}>Photo credits</summary>
            <p className={css({ mt: '3' })}>Job photos are Lews Electrical’s own work. The others are from Wikimedia Commons: local scenes, and one example of an older fuse board.</p>
            <ul className={css({ display: 'grid', gap: '1.5', mt: '3' })}>
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
            <p className={css({ mt: '3' })}>They have been resized and cropped, and don’t show work carried out by Lews Electrical.</p>
          </details>
        </div>
      </div>
    </footer>
  )
}

function FooterTitle({ children }: { children: ReactNode }) {
  return <p className={css({ textStyle: 'kicker', color: 'white', mb: '6' })}>{children}</p>
}

function FooterList({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>
      <ul className={css({ display: { base: 'flex', lg: 'grid' }, flexWrap: 'wrap', gap: '2.5', columnGap: '6' })}>{children}</ul>
    </div>
  )
}

function ContactRow({ href, external, icon, children }: { href?: string; external?: boolean; icon: ReactNode; children: ReactNode }) {
  const inner = (
    <>
      <span aria-hidden className={css({ display: 'grid', color: 'crimson.500', flexShrink: '0' })}>
        {icon}
      </span>
      <span className={css({ minW: '0', fontSize: '1.05rem' })}>{children}</span>
    </>
  )
  const row = css({ display: 'flex', alignItems: 'center', gap: '4' })
  return (
    <li>
      {href ? (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={cx(row, link)}>
          {inner}
        </a>
      ) : (
        <div className={row}>{inner}</div>
      )}
    </li>
  )
}

const link = css({ transition: 'color 0.15s', _hover: { color: 'white' } })
