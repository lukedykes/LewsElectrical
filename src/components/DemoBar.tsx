import { ArrowUpRight } from 'lucide-react'
import { css } from '../../styled-system/css'
import { business, studio } from '../data/site'

/** Makes it clear this is a pitch, not the live site, and credits the studio. */
export function DemoBar() {
  return (
    <div
      className={css({
        position: 'relative',
        zIndex: '60',
        bg: 'navy.950',
        borderBottom: '1px solid {colors.line.subtle}',
        color: 'ink.200',
        fontFamily: 'mono',
        fontSize: { base: '0.66rem', md: '0.7rem' },
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      })}
    >
      <div
        className={css({
          maxW: '1360px',
          mx: 'auto',
          px: { base: '5', md: '8', xl: '12' },
          h: '9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4',
        })}
      >
        <p className={css({ display: 'flex', alignItems: 'center', gap: '2.5', minW: '0' })}>
          <span
            aria-hidden
            className={css({ w: '1.5', h: '1.5', rounded: 'full', bg: 'spark.400', boxShadow: '0 0 10px {colors.spark.400}', flexShrink: '0' })}
          />
          <span className={css({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })}>
            Concept demo<span className={css({ display: { base: 'none', md: 'inline' } })}> for {business.name}</span>
          </span>
        </p>
        <a
          href={studio.url}
          target="_blank"
          rel="noreferrer"
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5',
            color: 'white',
            flexShrink: '0',
            transition: 'color 0.2s',
            _hover: { color: 'spark.300' },
          })}
        >
          <span className={css({ display: { base: 'none', sm: 'inline' } })}>Designed &amp; built</span>by {studio.name}
          <ArrowUpRight size={13} aria-hidden />
        </a>
      </div>
    </div>
  )
}
