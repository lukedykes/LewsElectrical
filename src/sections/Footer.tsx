import { useInView } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Mail, MapPin, Phone } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { css, cx } from '../../styled-system/css'
import { Button, ButtonLink, container } from '../components/ui'
import { Wordmark } from '../components/Wordmark'
import { business, navLinks, services, studio } from '../data/site'
import { useQuote } from '../lib/quote'

export function Footer() {
  const { startQuote } = useQuote()
  const year = new Date().getFullYear()

  return (
    <footer className={css({ position: 'relative', bg: 'navy.950', borderTop: '1px solid {colors.line.subtle}', overflow: 'hidden', pb: { base: '28', lg: '10' } })}>
      <div className={cx(container, css({ pt: { base: '20', md: '28' } }))}>
        <div className={css({ display: 'flex', flexDir: { base: 'column', md: 'row' }, alignItems: { md: 'flex-end' }, justifyContent: 'space-between', gap: '8' })}>
          <p
            className={css({
              fontFamily: 'display',
              fontWeight: '800',
              fontSize: 'clamp(2.4rem, 6vw, 5.4rem)',
              letterSpacing: '-0.04em',
              lineHeight: '0.95',
              maxW: '11ch',
            })}
          >
            Ready when <span className={css({ color: 'spark.400' })}>you are.</span>
          </p>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
            <Button size="lg" arrow onClick={() => startQuote()}>
              Get a free quote
            </Button>
            <ButtonLink href={business.phoneHref} variant="ghost" size="lg">
              <Phone size={17} aria-hidden /> {business.phone}
            </ButtonLink>
          </div>
        </div>

        <div className={css({ mt: { base: '16', md: '24' }, mb: { base: '14', md: '20' } })}>
          <FooterWordmark />
        </div>

        <div className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr) minmax(0, 1fr)', md: 'minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)' }, gap: { base: '10', md: '8' } })}>
          <div className={css({ gridColumn: { base: 'span 2', md: 'auto' } })}>
            <p className={css({ fontFamily: 'display', fontWeight: '750', fontSize: 'xl', letterSpacing: '-0.02em' })}>{business.name}</p>
            <p className={css({ color: 'fg.subtle', mt: '2', maxW: '24rem', fontSize: 'sm' })}>
              {business.tagline}. Electrical contractors for homes, businesses and the rail industry.
            </p>
            <ul className={css({ display: 'grid', gap: '2', mt: '6' })}>
              {business.accreditations.map((item) => (
                <li key={item} className={css({ display: 'flex', alignItems: 'center', gap: '2', fontSize: 'sm', color: 'ink.100' })}>
                  <BadgeCheck size={16} className={css({ color: 'spark.400' })} aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Services">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <a href="#services" className={footerLink}>
                  {s.title}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Explore">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={footerLink}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#coverage" className={footerLink}>
                Areas we cover
              </a>
            </li>
          </FooterColumn>

          <FooterColumn title="Contact" className={css({ gridColumn: { base: 'span 2', md: 'auto' } })}>
            <li>
              <a href={business.phoneHref} className={cx(footerLink, css({ display: 'flex', alignItems: 'center', gap: '2' }))}>
                <Phone size={15} aria-hidden /> {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className={cx(footerLink, css({ display: 'flex', alignItems: 'center', gap: '2', wordBreak: 'break-all' }))}>
                <Mail size={15} aria-hidden /> {business.email}
              </a>
            </li>
            <li className={css({ display: 'flex', alignItems: 'center', gap: '2', color: 'ink.200', fontSize: 'sm' })}>
              <MapPin size={15} aria-hidden /> {business.area}
            </li>
          </FooterColumn>
        </div>

        <div
          className={css({
            display: 'flex',
            flexDir: { base: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: '4',
            mt: { base: '14', md: '20' },
            pt: '6',
            borderTop: '1px solid {colors.line.subtle}',
            fontSize: 'xs',
            color: 'fg.subtle',
          })}
        >
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <a
            href={studio.url}
            target="_blank"
            rel="noreferrer"
            className={css({ display: 'inline-flex', alignItems: 'center', gap: '1.5', color: 'ink.200', _hover: { color: 'spark.300' } })}
          >
            Website concept by {studio.name} <ArrowUpRight size={13} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterWordmark() {
  return (
    <div className={css({ position: 'relative' })}>
      <WordmarkOnView />
      <p
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '4',
          mt: { base: '4', md: '6' },
          fontFamily: 'mono',
          fontSize: { base: '0.62rem', md: '0.8rem' },
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'ink.200',
          _before: { content: '""', flex: '1', h: '1px', bg: 'line.default' },
          _after: { content: '""', flex: '1', h: '1px', bg: 'line.default' },
        })}
      >
        Electrical Ltd · Powering people, places &amp; possibilities
      </p>
    </div>
  )
}

function WordmarkOnView() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <div ref={ref}>
      <Wordmark className={css({ w: '100%', h: 'auto' })} strokeWidth={4.6} animate play={inView} />
    </div>
  )
}

function FooterColumn({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className={css({ textStyle: 'eyebrow', color: 'fg.subtle', mb: '4' })}>{title}</p>
      <ul className={css({ display: 'grid', gap: '2.5' })}>{children}</ul>
    </div>
  )
}

const footerLink = css({ fontSize: 'sm', color: 'ink.200', transition: 'color 0.2s', _hover: { color: 'white' } })
