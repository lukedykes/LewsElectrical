import { FileText, MessageCircle, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { css, cx } from '../../styled-system/css'
import { business } from '../data/site'
import { useContact } from '../lib/contact'

const cell = css({
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5',
  minH: '16',
  pt: '2.5',
  pb: '2',
  textStyle: 'tracked',
  fontSize: '0.82rem',
  letterSpacing: '0.18em',
  cursor: 'pointer',
})

/** Call, WhatsApp and quote, always within thumb reach on phones (as on the reference site). */
export function MobileCallBar() {
  const { openContact } = useContact()

  return (
    <nav
      aria-label="Quick contact"
      className={css({
        position: 'fixed',
        insetX: '0',
        bottom: '0',
        zIndex: '30',
        display: { base: 'grid', lg: 'none' },
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        pb: 'env(safe-area-inset-bottom)',
        bg: 'white',
        borderTop: '1px solid {colors.paper.300}',
        boxShadow: '0 -8px 24px rgba(10, 30, 69, 0.1)',
      })}
    >
      <Cell href={business.phoneHref} icon={<Phone size={24} strokeWidth={1.8} className={css({ color: 'crimson.600' })} />} className={css({ color: 'navy.950' })}>
        Call
      </Cell>
      <Cell
        href={business.whatsappHref}
        external
        icon={<MessageCircle size={24} strokeWidth={1.8} className={css({ color: '#1FAF54' })} />}
        className={css({ color: 'navy.950', borderInline: '1px solid {colors.paper.300}' })}
      >
        WhatsApp
      </Cell>
      <button type="button" onClick={() => openContact()} className={cx(cell, css({ bg: 'crimson.600', color: 'white', _active: { bg: 'crimson.700' } }))}>
        <FileText size={24} strokeWidth={1.8} aria-hidden />
        Free quote
      </button>
    </nav>
  )
}

function Cell({ href, external, icon, className, children }: { href: string; external?: boolean; icon: ReactNode; className?: string; children: ReactNode }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={cx(cell, css({ _active: { bg: 'paper.100' } }), className)}>
      <span aria-hidden className={css({ display: 'grid' })}>
        {icon}
      </span>
      {children}
    </a>
  )
}
