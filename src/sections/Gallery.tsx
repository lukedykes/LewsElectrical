import { Expand, Phone } from 'lucide-react'
import { useRef, useState, type CSSProperties } from 'react'
import { css, cx } from '../../styled-system/css'
import { Lightbox } from '../components/Lightbox'
import { Button, ButtonLink, container, Highlight, Kicker, sectionY } from '../components/ui'
import { gallery, galleryFilters, type GalleryFilter } from '../data/gallery'
import { business } from '../data/site'
import { useContact } from '../lib/contact'
import { justify, useMeasure } from '../lib/justify'

/**
 * "Our work": the client's own job photos in justified rows (every photo keeps its
 * shape and each row fills the width), with filters and a full-screen viewer.
 */
export function Gallery() {
  const { openContact } = useContact()
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [viewing, setViewing] = useState<number | null>(null)
  const items = filter === 'all' ? gallery : gallery.filter((item) => item.filters.includes(filter as Exclude<GalleryFilter, 'all'>))
  const frame = useRef<HTMLDivElement>(null)
  const box = useMeasure(frame)
  const ratios = items.map((item) => item.photo.width / item.photo.height)
  // Until the width is known (first paint, or no JS layout) the CSS flex fallback below does a near-identical job.
  const tiles = box && box.width > 0 ? justify(ratios, box.width, rowHeight(box.width), box.gap) : null

  return (
    <section id="work" aria-labelledby="work-title" className={cx(sectionY, css({ position: 'relative', bg: 'navy.950', color: 'white', overflow: 'hidden' }))}>
      {/* Soft glow behind the photos. */}
      <span
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          bg: 'radial-gradient(60rem 30rem at 85% 0%, rgba(200, 16, 46, 0.18), transparent 70%), radial-gradient(50rem 30rem at 0% 100%, rgba(37, 99, 235, 0.12), transparent 70%)',
          pointerEvents: 'none',
        })}
      />
      <div className={cx(container, css({ position: 'relative' }))}>
        <div className={css({ display: 'flex', flexDir: { base: 'column', lg: 'row' }, alignItems: { lg: 'flex-end' }, justifyContent: 'space-between', gap: { base: '6', lg: '12' } })}>
          <div className={css({ maxW: '42rem' })}>
            <Kicker onNavy>Our work</Kicker>
            <h2 id="work-title" className={css({ textStyle: 'h2', mt: '3' })}>
              Recent <Highlight>projects</Highlight>
            </h2>
            <p className={css({ textStyle: 'lead', color: 'navy.100', mt: '5' })}>
              Real jobs by the Lews Electrical team: feature lighting, kitchens, rewires, fuse boards and more, across Essex and
              London.
            </p>
          </div>

          <p className={css({ display: { base: 'none', lg: 'block' }, flexShrink: '0', fontFamily: 'heading', fontWeight: '800', fontStyle: 'italic', fontSize: '5rem', lineHeight: '0.8', color: 'transparent', WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.28)', fontVariantNumeric: 'tabular-nums' })} aria-hidden>
            {String(gallery.length).padStart(2, '0')}
            <span className={css({ display: 'block', fontSize: '1rem', fontStyle: 'normal', fontWeight: '700', letterSpacing: '0.14em', color: 'navy.200', WebkitTextStroke: '0', textTransform: 'uppercase', mt: '3', textAlign: 'right' })}>Real job photos</span>
          </p>
        </div>

        {/* One swipeable row on phones, wrapping from tablet up. */}
        <div
          role="group"
          aria-label="Show photos of"
          className={css({
            display: 'flex',
            flexWrap: { base: 'nowrap', md: 'wrap' },
            gap: '2',
            mt: { base: '7', md: '9' },
            mx: { base: '-5', md: '0' },
            px: { base: '5', md: '0' },
            py: '1',
            overflowX: { base: 'auto', md: 'visible' },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            maskImage: { base: 'linear-gradient(to right, transparent 0, black 1.25rem, black calc(100% - 2.5rem), transparent 100%)', md: 'none' },
          })}
        >
          {galleryFilters.map((f) => {
            const total = f.id === 'all' ? gallery.length : gallery.filter((item) => item.filters.includes(f.id as Exclude<GalleryFilter, 'all'>)).length
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={css({
                  display: 'inline-flex',
                  flexShrink: '0',
                  alignItems: 'center',
                  gap: '2',
                  minH: '11',
                  whiteSpace: 'nowrap',
                  px: '4',
                  rounded: 'full',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  bg: 'rgba(255, 255, 255, 0.04)',
                  color: 'navy.100',
                  fontFamily: 'heading',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  _hover: { borderColor: 'rgba(255, 255, 255, 0.5)', color: 'white' },
                  '&[aria-pressed="true"]': { bg: 'crimson.600', borderColor: 'crimson.600', color: 'white' },
                })}
              >
                {f.label}
                <span
                  className={cx(
                    css({ fontFamily: 'body', fontSize: '0.75rem', fontWeight: '700', lineHeight: '1', px: '1.5', py: '1', rounded: 'full', fontVariantNumeric: 'tabular-nums' }),
                    active ? css({ bg: 'rgba(255, 255, 255, 0.22)' }) : css({ bg: 'rgba(255, 255, 255, 0.1)' }),
                  )}
                >
                  {total}
                </span>
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className={css({ srOnly: true })}>
          Showing {items.length} {items.length === 1 ? 'photo' : 'photos'}
        </p>

        {/* Justified rows (see lib/justify.ts): every photo keeps its shape and each row fills the width. */}
        <div ref={frame}>
          <ul
            key={filter}
            data-measured={tiles ? '' : undefined}
            style={box ? { gap: box.gap } : undefined}
            className={css({
              '--row': '140px',
              sm: { '--row': '190px' },
              md: { '--row': '220px' },
              lg: { '--row': '270px' },
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: { base: '2', md: '3' },
              mt: { base: '6', md: '8' },
              // Fallback only: keeps a short last row at natural size.
              '&:not([data-measured])::after': { content: '""', flexGrow: '999999' },
            })}
          >
            {items.map((item, i) => {
              const tile = tiles?.[i]
              const style = { '--ratio': ratios[i], animationDelay: `${Math.min(i, 10) * 45}ms` } as CSSProperties
              if (tile) Object.assign(style, { width: tile.width, height: tile.height, flexBasis: 'auto', flexGrow: tile.fill ? 1 : 0 })
              return (
                <li
                  key={item.id}
                  style={style}
                  className={css({
                    flexGrow: 'var(--ratio)',
                    flexBasis: 'calc(var(--ratio) * var(--row))',
                    minW: '0',
                    _motionSafe: { animation: 'riseIn 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both' },
                  })}
                >
                  <button
                    type="button"
                    onClick={() => setViewing(i)}
                    aria-label={`View larger: ${item.photo.caption}`}
                    className={css({
                      position: 'relative',
                      display: 'block',
                      w: '100%',
                      h: '100%',
                      p: '0',
                      rounded: { base: '6px', md: '10px' },
                      overflow: 'hidden',
                      bg: 'navy.800',
                      cursor: 'zoom-in',
                      isolation: 'isolate',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                      '& img': { transition: 'transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.7s' },
                      '& [data-overlay]': { opacity: 0, transition: 'opacity 0.35s' },
                      '& [data-caption]': { transform: 'translateY(10px)', transition: 'transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)' },
                      _canHover: {
                        _hover: {
                          '& img': { transform: 'scale(1.06)' },
                          '& [data-overlay]': { opacity: 1 },
                          '& [data-caption]': { transform: 'none' },
                        },
                      },
                      _focusVisible: {
                        '& [data-overlay]': { opacity: 1 },
                        '& [data-caption]': { transform: 'none' },
                      },
                    })}
                  >
                    <img
                      src={item.photo.small}
                      srcSet={`${item.photo.small} ${item.photo.smallWidth}w, ${item.photo.src} ${item.photo.width}w`}
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 60vw"
                      width={item.photo.width}
                      height={item.photo.height}
                      alt={item.photo.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ aspectRatio: `${item.photo.width} / ${item.photo.height}`, objectPosition: item.photo.position }}
                      className={css({ display: 'block', w: '100%', h: '100%', objectFit: 'cover' })}
                    />
                    <span
                      data-overlay
                      aria-hidden
                      className={css({
                        position: 'absolute',
                        inset: '0',
                        display: { base: 'none', sm: 'flex' },
                        flexDir: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        p: { sm: '3', md: '4' },
                        bg: 'linear-gradient(to top, rgba(6, 20, 48, 0.92) 0%, rgba(6, 20, 48, 0.35) 45%, transparent 70%)',
                      })}
                    >
                      <span className={css({ position: 'absolute', top: '3', right: '3', display: 'grid', placeItems: 'center', w: '9', h: '9', rounded: 'full', bg: 'crimson.600', color: 'white' })}>
                        <Expand size={16} />
                      </span>
                      <span data-caption>
                        <span className={css({ display: 'block', fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: 'crimson.500' })}>
                          {item.tag}
                        </span>
                        <span className={css({ display: 'block', fontWeight: '600', lineHeight: '1.25', mt: '0.5', color: 'white' })}>{item.photo.caption}</span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className={css({
            display: 'flex',
            flexDir: { base: 'column', md: 'row' },
            alignItems: { md: 'center' },
            justifyContent: 'space-between',
            gap: '5',
            mt: { base: '10', md: '14' },
            pt: { base: '8', md: '10' },
            borderTop: '1px solid {colors.lineOnNavy}',
          })}
        >
          <p className={css({ fontFamily: 'heading', fontWeight: '800', fontStyle: 'italic', textTransform: 'uppercase', fontSize: { base: '1.7rem', md: '2.1rem' }, lineHeight: '1' })}>
            Like what you see?
            <span className={css({ display: 'block', color: 'navy.200', fontStyle: 'normal', fontWeight: '600', fontFamily: 'body', textTransform: 'none', fontSize: '1rem', lineHeight: '1.5', mt: '2' })}>
              Tell us about your project and we’ll send you a free, no-obligation quote.
            </span>
          </p>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
            <Button size="lg" onClick={() => openContact()}>
              Get a free quote
            </Button>
            <ButtonLink href={business.phoneHref} variant="outlineLight" size="lg">
              <Phone size={18} aria-hidden /> {business.phone}
            </ButtonLink>
          </div>
        </div>
      </div>

      <Lightbox items={items} index={viewing} onIndex={setViewing} onClose={() => setViewing(null)} />
    </section>
  )
}

function rowHeight(width: number) {
  if (width < 480) return 140
  if (width < 768) return 190
  if (width < 1024) return 220
  return 270
}
