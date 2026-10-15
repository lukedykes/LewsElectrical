import { Expand, FileText, Phone } from 'lucide-react'
import { useRef, useState, type CSSProperties } from 'react'
import { css, cx } from '../../styled-system/css'
import { Lightbox } from '../components/Lightbox'
import { Button, ButtonLink, container, Highlight, SectionIntro, sectionY, srcSetFor } from '../components/ui'
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
    <section id="work" aria-labelledby="work-title" className={cx(sectionY, css({ bg: 'white' }))}>
      <div className={container}>
        <SectionIntro
          id="work-title"
          kicker="Photo library"
          title={
            <>
              Real jobs, <Highlight>real photos.</Highlight>
            </>
          }
          lead="Every job photo on the site, grouped by the kind of work. Tap any photo to see it full size."
          intro={css.raw({ mb: { base: '8', md: '10' } })}
        />

        {/* One swipeable row on phones, wrapping from tablet up. */}
        <div
          role="group"
          aria-label="Show photos of"
          className={css({
            display: 'flex',
            flexWrap: { base: 'nowrap', md: 'wrap' },
            gap: '2',
            mx: { base: '-5', md: '0' },
            px: { base: '5', md: '0' },
            py: '1',
            overflowX: { base: 'auto', md: 'visible' },
            scrollPaddingInline: '1.5rem 3rem',
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
                // On phones the row scrolls sideways: bring a chip fully into view when it gets keyboard focus.
                onFocus={(e) => e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' })}
                className={css({
                  display: 'inline-flex',
                  flexShrink: '0',
                  alignItems: 'center',
                  gap: '2',
                  minH: '11',
                  whiteSpace: 'nowrap',
                  px: '4',
                  rounded: 'full',
                  border: '1px solid {colors.paper.300}',
                  bg: 'white',
                  color: 'navy.950',
                  fontFamily: 'heading',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  _hover: { borderColor: 'navy.950' },
                  '&[aria-pressed="true"]': { bg: 'navy.950', borderColor: 'navy.950', color: 'white' },
                })}
              >
                {f.label}
                <span
                  className={cx(
                    css({ fontFamily: 'body', fontSize: '0.75rem', fontWeight: '700', lineHeight: '1', px: '1.5', py: '1', rounded: 'full', fontVariantNumeric: 'tabular-nums' }),
                    active ? css({ bg: 'crimson.500', color: 'white' }) : css({ bg: 'paper.200', color: 'ink.700' }),
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
                    className={css({
                      position: 'relative',
                      display: 'block',
                      w: '100%',
                      h: '100%',
                      p: '0',
                      rounded: { base: '8px', md: '14px' },
                      overflow: 'hidden',
                      bg: 'paper.200',
                      cursor: 'zoom-in',
                      isolation: 'isolate',
                      boxShadow: '0 14px 30px -18px rgba(10, 30, 69, 0.45)',
                      '& [data-overlay]': { opacity: 0, transition: 'opacity 0.35s' },
                      _canHover: { _hover: { '& [data-overlay]': { opacity: 1 } } },
                      _focusVisible: { '& [data-overlay]': { opacity: 1 } },
                      // The zoom and caption slide only when motion is welcome; the fade stays either way.
                      _motionSafe: {
                        '& img': { transition: 'transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)' },
                        '& [data-caption]': { transform: 'translateY(10px)', transition: 'transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)' },
                        _canHover: { _hover: { '& img': { transform: 'scale(1.06)' }, '& [data-caption]': { transform: 'none' } } },
                        _focusVisible: { '& [data-caption]': { transform: 'none' } },
                      },
                    })}
                  >
                    <img
                      src={item.photo.small}
                      srcSet={srcSetFor(item.photo)}
                      // The layout knows each tile's width, so ask for exactly that (before it's measured, estimate from the row height).
                      sizes={srcSetFor(item.photo) && `${tile ? tile.width : Math.round(ratios[i] * 270)}px`}
                      width={item.photo.width}
                      height={item.photo.height}
                      alt={item.photo.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ aspectRatio: `${item.photo.width} / ${item.photo.height}`, objectPosition: item.photo.position }}
                      className={css({ display: 'block', w: '100%', h: '100%', objectFit: 'cover' })}
                    />
                    <span className={css({ srOnly: true })}>(view larger)</span>
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
                        bg: 'linear-gradient(to top, rgba(6, 20, 48, 0.95) 0%, rgba(6, 20, 48, 0.7) 32%, rgba(6, 20, 48, 0.2) 60%, transparent 75%)',
                      })}
                    >
                      <span className={css({ position: 'absolute', top: '3', right: '3', display: 'grid', placeItems: 'center', w: '9', h: '9', rounded: 'full', bg: 'crimson.600', color: 'white' })}>
                        <Expand size={16} />
                      </span>
                      <span data-caption>
                        <span className={css({ display: 'block', fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: 'crimson.300' })}>
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
            borderTop: '1px solid {colors.paper.300}',
          })}
        >
          <p className={css({ textStyle: 'h3', fontSize: { base: '2rem', md: '2.4rem' }, color: 'navy.950' })}>
            Like what <Highlight>you see?</Highlight>
            <span className={css({ display: 'block', color: 'ink.500', fontWeight: '400', fontFamily: 'body', textTransform: 'none', fontSize: '1.05rem', lineHeight: '1.5', mt: '2' })}>
              Tell us about your project and we’ll send you a free, no-obligation quote.
            </span>
          </p>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', '& > *': { flex: { base: '1 1 100%', sm: '0 0 auto' } } })}>
            <Button size="lg" onClick={() => openContact()}>
              <FileText size={18} aria-hidden /> Get a free quote
            </Button>
            <ButtonLink href={business.phoneHref} variant="outline" size="lg">
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
