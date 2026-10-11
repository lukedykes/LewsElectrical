import { css } from '../styled-system/css'
import { Header } from './components/Header'
import { MobileCallBar } from './components/MobileCallBar'
import { ContactProvider } from './lib/contact'
import { Areas } from './sections/Areas'
import { Commercial } from './sections/Commercial'
import { Contact } from './sections/Contact'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Hero, SectorStrip } from './sections/Hero'
import { HowWeWork } from './sections/HowWeWork'
import { Rail } from './sections/Rail'
import { Referral } from './sections/Referral'
import { Rewires } from './sections/Rewires'
import { Services } from './sections/Services'

export function App() {
  return (
    <ContactProvider>
      <a
        href="#main"
        className={css({
          position: 'absolute',
          left: '3',
          top: '3',
          zIndex: '50',
          px: '4',
          py: '2',
          bg: 'white',
          color: 'navy.900',
          fontWeight: '700',
          rounded: '6px',
          transform: 'translateY(-200%)',
          _focusVisible: { transform: 'none' },
        })}
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <SectorStrip />
        <Services />
        <Rewires />
        <Commercial />
        <Rail />
        <HowWeWork />
        <Referral />
        <Areas />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </ContactProvider>
  )
}
