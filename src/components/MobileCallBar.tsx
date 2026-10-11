import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { css } from '../../styled-system/css'
import { business } from '../data/site'
import { useQuote } from '../lib/quote'
import { Button, ButtonLink, easeOut } from './ui'

/** Thumb-reach call and quote buttons on phones, out of the way near the form. */
export function MobileCallBar() {
  const { scrollY } = useScroll()
  const { startQuote } = useQuote()
  const [pastHero, setPastHero] = useState(false)
  const [nearForm, setNearForm] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setPastHero(y > window.innerHeight * 0.8))

  useEffect(() => {
    const targets = ['quote'].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver((entries) => setNearForm(entries.some((e) => e.isIntersecting)), { rootMargin: '0px 0px -20% 0px' })
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {pastHero && !nearForm && (
        <motion.div
          initial={{ y: '120%' }}
          animate={{ y: '0%' }}
          exit={{ y: '120%' }}
          transition={{ duration: 0.5, ease: easeOut }}
          className={css({
            position: 'fixed',
            left: '3',
            right: '3',
            bottom: 'max(12px, env(safe-area-inset-bottom))',
            zIndex: '40',
            display: { base: 'grid', lg: 'none' },
            gridTemplateColumns: '1fr 1.3fr',
            gap: '2',
            p: '2',
            rounded: '2xl',
            bg: 'rgba(7, 14, 34, 0.82)',
            border: '1px solid',
            borderColor: 'line.default',
            backdropFilter: 'blur(18px) saturate(1.4)',
            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.7)',
          })}
        >
          <ButtonLink href={business.phoneHref} variant="ghost" size="md">
            <Phone size={16} aria-hidden /> Call
          </ButtonLink>
          <Button size="md" arrow onClick={() => startQuote()}>
            Free quote
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
