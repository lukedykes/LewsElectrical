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
      <div className={cx(container, css({ position: 'relative', display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.1fr) minmax(0, 0.9fr)' }, gap: { base: '10', lg: '16' }, alignItems: 'center' }))}>
        <div>
          <Kicker onNavy>Recommend, reward, repeat</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '4' })}>
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
          <p className={css({ textStyle: 'tracked', fontSize: '0.86rem', color: 'navy.200', mt: '8', textWrap: 'balance' })}>
            Good people recommend great services. Thanks for your support!
          </p>
        </div>

        <ul className={css({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: { base: '3', md: '5' } })}>
          {rewards.map((reward) => (
            <li key={reward.label} className={css({ rounded: '4px', bg: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.16)', px: { base: '4', md: '6' }, py: { base: '6', md: '8' } })}>
              <p className={css({ textStyle: 'kicker', fontSize: '0.8rem', color: 'crimson.300' })}>{reward.label}</p>
              <p className={css({ fontFamily: 'heading', fontWeight: '900', fontSize: { base: '3.6rem', md: '4.8rem' }, lineHeight: '1', mt: '3' })}>
                {reward.amount}
              </p>
              <hr className={css({ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.16)', my: '4' })} />
              <p className={css({ fontSize: '0.92rem', color: 'navy.200', lineHeight: '1.4', textWrap: 'balance' })}>
                Paid once the installation is complete
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
