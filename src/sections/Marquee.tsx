import { css, cx } from '../../styled-system/css'

const services = ['Full rewires', 'Fuse boards', 'EICR testing', 'Fault finding', 'Lighting design', 'CCTV', 'Smart lighting', 'Call-outs']
const values = ['Safe', 'Reliable', 'Professional', 'High quality', 'Local', 'A brighter tomorrow']

export function Marquee() {
  return (
    <section
      aria-label="What we do at a glance"
      className={css({ position: 'relative', py: { base: '10', md: '14' }, overflow: 'hidden', bg: 'navy.950' })}
    >
      <Band items={services} tone="crimson" />
      <Band items={values} tone="ink" reverse />
    </section>
  )
}

function Band({ items, tone, reverse }: { items: string[]; tone: 'crimson' | 'ink'; reverse?: boolean }) {
  const row = [...items, ...items]
  return (
    <div
      className={cx(
        css({ position: 'relative', w: '106%', ml: '-3%', py: { base: '3', md: '4' }, overflow: 'hidden' }),
        tone === 'crimson'
          ? css({ bg: 'crimson.500', rotate: '-2deg', zIndex: '1', boxShadow: '0 20px 60px -20px rgba(227, 23, 58, 0.55)' })
          : css({ bg: 'navy.800', rotate: '1.4deg', mt: { base: '-2', md: '-3' }, borderBlock: '1px solid {colors.line.default}' }),
      )}
    >
      <div
        className={cx(
          css({ display: 'flex', w: 'max-content', _hover: { animationPlayState: 'paused' } }),
          reverse
            ? css({ _motionSafe: { animation: 'marquee 52s linear infinite reverse' } })
            : css({ _motionSafe: { animation: 'marquee 46s linear infinite' } }),
        )}
      >
        {row.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className={css({ display: 'flex', alignItems: 'center', gap: { base: '5', md: '8' }, pr: { base: '5', md: '8' } })}
          >
            <span
              className={cx(
                css({
                  fontFamily: 'display',
                  fontWeight: '800',
                  fontStretch: '110%',
                  fontSize: { base: '1.7rem', md: '2.6rem' },
                  letterSpacing: '-0.02em',
                  lineHeight: '1',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }),
                tone === 'ink' && css({ color: 'transparent', WebkitTextStroke: '1px rgba(255, 255, 255, 0.55)' }),
              )}
            >
              {item}
            </span>
            <Bolt className={tone === 'crimson' ? css({ color: 'spark.300' }) : css({ color: 'crimson.400' })} />
          </span>
        ))}
      </div>
    </div>
  )
}

function Bolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cx(css({ w: { base: '5', md: '7' }, h: { base: '5', md: '7' }, flexShrink: '0' }), className)}>
      <path d="M13.5 2 4 14h7l-1.5 8L20 10h-7z" fill="currentColor" />
    </svg>
  )
}
