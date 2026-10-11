import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { business } from '../data/site'
import { useContact } from '../lib/contact'
import { Button, ButtonLink } from './ui'

/** Call and quote buttons within thumb reach on phones. */
export function MobileCallBar() {
  const { openContact } = useContact()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={cx(
        css({
          position: 'fixed',
          insetX: '0',
          bottom: '0',
          zIndex: '30',
          display: { base: 'grid', xl: 'none' },
          gridTemplateColumns: '1fr 1fr',
          gap: '2',
          p: '2',
          pb: 'max(0.5rem, env(safe-area-inset-bottom))',
          bg: 'white',
          borderTop: '1px solid {colors.paper.300}',
          boxShadow: '0 -6px 20px rgba(10, 30, 69, 0.12)',
          transition: 'transform 0.25s',
        }),
        visible ? css({ transform: 'translateY(0)' }) : css({ transform: 'translateY(110%)' }),
      )}
    >
      <ButtonLink href={business.phoneHref} variant="navy" tabIndex={visible ? 0 : -1}>
        <Phone size={17} aria-hidden /> Call now
      </ButtonLink>
      <Button onClick={() => openContact()} tabIndex={visible ? 0 : -1}>
        Free quote
      </Button>
    </div>
  )
}
