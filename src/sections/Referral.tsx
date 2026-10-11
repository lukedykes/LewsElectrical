import { animate, motion, useInView } from 'framer-motion'
import { Gift, HeartHandshake, Phone, Repeat } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { ButtonLink, container, easeOut, Eyebrow, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { business } from '../data/site'

const referralMail = `mailto:${business.email}?subject=${encodeURIComponent('Referral for Lews Electrical')}&body=${encodeURIComponent(
  "Hi Lewis,\n\nI'd like to refer someone who needs electrical work.\n\nTheir name:\nTheir phone or email:\nWhat they need:\n\nMy name:\nMy phone:\n",
)}`

export function Referral() {
  return (
    <section id="refer" className={cx(sectionPadding, css({ position: 'relative', bg: 'navy.950', overflow: 'hidden', isolation: 'isolate' }))}>
      <div
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          zIndex: '-1',
          bgImage: 'radial-gradient(55% 60% at 80% 50%, rgba(227, 23, 58, 0.28), transparent 70%), radial-gradient(30% 40% at 95% 10%, rgba(255, 181, 71, 0.16), transparent 70%)',
        })}
      />
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' }, gap: { base: '14', lg: '16' }, alignItems: 'center' }))}>
        <div>
          <Reveal>
            <Eyebrow index="06">Refer &amp; earn</Eyebrow>
          </Reveal>
          <h2 className={css({ textStyle: 'title', mt: '5' })}>
            <RevealWords text="Recommend." />
            <br />
            <RevealWords text="Reward." delay={0.1} className={css({ color: 'spark.400' })} />
            <br />
            <RevealWords text="Repeat." delay={0.2} className={css({ color: 'crimson.400' })} />
          </h2>
          <Reveal delay={0.1}>
            <p className={css({ textStyle: 'lead', color: 'fg.muted', mt: '6', maxW: '32rem' })}>
              Know someone who needs reliable, professional electrical work for their home or business? Send them our way and
              we will say thank you properly, once their installation is complete.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ol className={css({ display: 'grid', gap: '4', mt: '8' })}>
              {[
                { icon: HeartHandshake, text: 'Recommend us to friends, family or a business' },
                { icon: Gift, text: 'They get a great job, you get rewarded when it is finished' },
                { icon: Repeat, text: 'Your second referral earns even more' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className={css({ display: 'flex', alignItems: 'center', gap: '4', color: 'ink.100' })}>
                  <span className={css({ display: 'grid', placeItems: 'center', w: '10', h: '10', rounded: 'full', bg: 'rgba(255,255,255,0.06)', border: '1px solid', borderColor: 'line.default', flexShrink: '0' })}>
                    <Icon size={18} className={css({ color: 'spark.300' })} aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.2} className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', mt: '10' })}>
            <ButtonLink href={referralMail} size="lg" arrow>
              Refer someone
            </ButtonLink>
            <ButtonLink href={business.phoneHref} variant="ghost" size="lg">
              <Phone size={17} aria-hidden /> Ask about the scheme
            </ButtonLink>
          </Reveal>
        </div>

        <div className={css({ position: 'relative', h: { base: '440px', sm: '480px', lg: '560px' } })}>
          <Ticket order="1st referral" amount={50} className={css({ top: '0', left: { base: '0', sm: '4%' }, rotate: '-7deg' })} delay={0} />
          <Ticket order="2nd referral" amount={150} featured className={css({ bottom: '0', right: { base: '0', sm: '4%' }, rotate: '5deg' })} delay={0.15} />
          <ThanksBadge />
        </div>
      </div>
    </section>
  )
}

function ThanksBadge() {
  const text = 'Thanks for your support • Thanks for your support • '
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.8, ease: easeOut }}
      className={css({
        position: 'absolute',
        zIndex: '4',
        top: { base: '-12', sm: '-14' },
        right: { base: '-1', sm: '0' },
        w: { base: '28', md: '36' },
        h: { base: '28', md: '36' },
        display: 'grid',
        placeItems: 'center',
      })}
    >
      <svg viewBox="0 0 120 120" className={css({ position: 'absolute', inset: '0', w: '100%', h: '100%', _motionSafe: { animation: 'spin 22s linear infinite' } })}>
        <defs>
          <path id="thanks-ring" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#070E22" stroke="rgba(255,255,255,0.14)" />
        <text fontSize="8.6" fontFamily="JetBrains Mono Variable, monospace" letterSpacing="0.42" fill="#FFD08A">
          <textPath href="#thanks-ring">{text.toUpperCase()}</textPath>
        </text>
      </svg>
      <span className={css({ position: 'relative', display: 'grid', placeItems: 'center', w: '12', h: '12', rounded: 'full', bg: 'crimson.500', boxShadow: '0 0 30px rgba(227,23,58,0.6)' })}>
        <HeartHandshake size={22} />
      </span>
    </motion.div>
  )
}

function Ticket({ order, amount, featured, className, delay }: { order: string; amount: number; featured?: boolean; className?: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, delay, ease: easeOut }}
      className={cx(
        css({ position: 'absolute', w: { base: '84%', sm: '72%' }, maxW: '420px', transition: 'rotate 0.6s {easings.out}', _hover: { rotate: '0deg', zIndex: '3' } }),
        className,
      )}
    >
      <div
        className={cx(
          css({
            position: 'relative',
            rounded: '24px',
            p: { base: '6', md: '8' },
            // Punched notches on both sides, like a raffle ticket.
            maskImage: 'radial-gradient(circle 16px at 0 62%, transparent 98%, #000 100%), radial-gradient(circle 16px at 100% 62%, transparent 98%, #000 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }),
          featured
            ? css({ bg: 'linear-gradient(140deg, {colors.crimson.500}, {colors.crimson.700})', boxShadow: '0 40px 80px -30px rgba(227,23,58,0.8)' })
            : css({ bg: 'linear-gradient(140deg, {colors.navy.700}, {colors.navy.850})', border: '1px solid', borderColor: 'line.default', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.8)' }),
        )}
      >
        <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              px: '3',
              py: '1',
              rounded: 'full',
              bg: 'rgba(255,255,255,0.14)',
            })}
          >
            {order}
          </span>
          <Gift size={22} aria-hidden className={css({ opacity: 0.8 })} />
        </div>
        <p
          className={css({
            fontFamily: 'display',
            fontWeight: '800',
            fontStretch: '110%',
            fontSize: { base: '5rem', md: '6.5rem' },
            lineHeight: '1',
            letterSpacing: '-0.05em',
            mt: '6',
          })}
        >
          £<Count to={amount} />
        </p>
        <div className={css({ borderTop: '1.5px dashed rgba(255,255,255,0.3)', mt: '7', pt: '4', fontFamily: 'mono', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85 })}>
          Paid once the installation is complete
        </div>
      </div>
    </motion.div>
  )
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.4, ease: easeOut, onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return <span ref={ref}>{value}</span>
}
