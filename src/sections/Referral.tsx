import { Phone, UserPlus } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { ButtonLink, container, Highlight, Kicker, sectionY } from '../components/ui'
import { business } from '../data/site'

const referralMail = `mailto:${business.email}?subject=${encodeURIComponent('Referral for Lews Electrical')}&body=${encodeURIComponent(
  "Hi Lewis,\n\nI'd like to refer someone for some electrical work.\n\nTheir name:\nTheir phone or email:\nWhat they need:\n\nMy name:\nMy phone:\n",
)}`

const rewards = [
  { label: '1st referral', amount: '£50' },
  { label: '2nd referral', amount: '£150' },
]

export function Referral() {
  return (
    <section id="refer" className={cx(sectionY, css({ position: 'relative', bg: 'navy.950', color: 'white', overflow: 'hidden' }))}>
      {/* Red slash in the corner, as on the referral flyer. */}
      <span aria-hidden className={css({ display: { base: 'none', md: 'block' }, position: 'absolute', top: '0', right: '0', w: { md: '48', lg: '64' }, h: '100%', bg: 'crimson.600', clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 })} />
      <div className={cx(container, css({ position: 'relative', display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.1fr) minmax(0, 0.9fr)' }, gap: { base: '10', lg: '16' }, alignItems: 'center' }))}>
        <div>
          <Kicker onNavy>Recommend, reward, repeat</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '3' })}>
            Refer a friend
            <br />
            <Highlight>and be rewarded!</Highlight>
          </h2>
          <p className={css({ textStyle: 'lead', color: 'navy.100', mt: '5', maxW: '34rem' })}>
            Know someone who needs reliable, professional electrical work for their home, business or commercial project? Refer
            them to Lews Electrical Ltd and receive a reward once their installation is completed.
          </p>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', mt: '8' })}>
            <ButtonLink href={referralMail} size="lg">
              <UserPlus size={18} aria-hidden /> Refer someone
            </ButtonLink>
            <ButtonLink href={business.phoneHref} variant="outlineLight" size="lg">
              <Phone size={18} aria-hidden /> {business.phone}
            </ButtonLink>
          </div>
          <p className={css({ fontFamily: 'heading', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'navy.200', mt: '8' })}>
            Good people recommend great services. Thanks for your support!
          </p>
        </div>

        <ul className={css({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: { base: '3', md: '5' } })}>
          {rewards.map((reward) => (
            <li key={reward.label} className={css({ rounded: '8px', overflow: 'hidden', bg: 'navy.800', border: '2px solid {colors.navy.700}', textAlign: 'center' })}>
              <p className={css({ bg: 'crimson.600', fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', py: '2' })}>
                {reward.label}
              </p>
              <p className={css({ fontFamily: 'heading', fontWeight: '800', fontStyle: 'italic', fontSize: { base: '3.4rem', md: '4.6rem' }, lineHeight: '1', pt: '6' })}>
                {reward.amount}
              </p>
              <p className={css({ fontFamily: 'heading', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.88rem', letterSpacing: '0.04em', color: 'navy.200', px: '3', pt: '3', pb: '6' })}>
                Paid once the installation is complete
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
