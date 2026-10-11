import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { css } from '../styled-system/css'
import { DemoBar } from './components/DemoBar'
import { MobileCallBar } from './components/MobileCallBar'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { QuoteProvider } from './lib/quote'
import { startSmoothScroll } from './lib/scroll'
import { Business } from './sections/Business'
import { Coverage } from './sections/Coverage'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Process } from './sections/Process'
import { Quote } from './sections/Quote'
import { Referral } from './sections/Referral'
import { RewireCheck } from './sections/RewireCheck'
import { Sectors } from './sections/Sectors'
import { Services } from './sections/Services'
import { Standard } from './sections/Standard'

export function App() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <QuoteProvider>
        <a
          href="#main"
          className={css({
            position: 'fixed',
            top: '3',
            left: '3',
            zIndex: '80',
            px: '4',
            py: '2',
            rounded: 'md',
            bg: 'white',
            color: 'navy.900',
            fontWeight: '600',
            transform: 'translateY(-200%)',
            _focusVisible: { transform: 'translateY(0)' },
          })}
        >
          Skip to content
        </a>
        <ScrollProgress />
        <DemoBar />
        <Nav />
        <main id="main">
          <Hero />
          <Marquee />
          <Sectors />
          <Services />
          <RewireCheck />
          <Business />
          <Standard />
          <Process />
          <Referral />
          <Coverage />
          <Faq />
          <Quote />
        </main>
        <Footer />
        <MobileCallBar />
      </QuoteProvider>
    </MotionConfig>
  )
}
