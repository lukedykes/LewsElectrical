import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, type PointerEvent } from 'react'
import { css, cx } from '../../styled-system/css'
import type { GalleryItem } from '../data/gallery'

const navButton = css({
  display: 'grid',
  placeItems: 'center',
  w: { base: '11', md: '14' },
  h: { base: '11', md: '14' },
  rounded: 'full',
  bg: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  cursor: 'pointer',
  backdropFilter: 'blur(6px)',
  transition: 'background 0.15s, transform 0.15s',
  _hover: { bg: 'crimson.600', borderColor: 'crimson.600' },
  _active: { transform: 'scale(0.94)' },
})

/**
 * Full-screen photo viewer on a native <dialog>, so focus is trapped, Escape
 * closes it and focus goes back to the photo that opened it. Arrow keys, the
 * buttons, the thumbnails or a swipe move between photos.
 */
export function Lightbox({ items, index, onIndex, onClose }: {
  items: GalleryItem[]
  index: number | null
  onIndex: (index: number) => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const thumbs = useRef<HTMLDivElement>(null)
  const open = index !== null && items.length > 0
  const current = open ? items[Math.min(index, items.length - 1)] : null
  const count = items.length

  const step = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return
      onIndex((index + delta + count) % count)
    },
    [index, count, onIndex],
  )

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  // Keep the page behind still while the viewer is open.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Home') onIndex(0)
      else if (e.key === 'End') onIndex(count - 1)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step, onIndex, count])

  // Warm the cache for the photos either side, and keep the active thumbnail in view.
  useEffect(() => {
    if (index === null || count === 0) return
    for (const delta of [1, -1]) {
      const photo = items[(index + delta + count) % count].photo
      const img = new Image()
      img.sizes = '100vw'
      img.srcset = `${photo.small} ${photo.smallWidth}w, ${photo.src} ${photo.width}w`
      img.src = photo.small
    }
    thumbs.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [index, items, count])

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return
    swipeStart.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: PointerEvent) => {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1)
  }

  const photo = current?.photo

  return (
    <dialog
      ref={dialog}
      aria-label="Photo viewer"
      onClose={onClose}
      onClick={(e) => {
        // A click on the dark surround (not the photo or controls) closes it.
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.backdrop !== undefined) onClose()
      }}
      className={css({
        position: 'fixed',
        inset: '0',
        w: '100vw',
        h: '100dvh',
        maxW: '100vw',
        maxH: '100dvh',
        m: '0',
        p: '0',
        border: 'none',
        bg: 'rgba(3, 10, 26, 0.97)',
        backdropFilter: 'blur(12px)',
        color: 'white',
        overflow: 'hidden',
        _backdrop: { bg: 'transparent' },
        '&[open]': { display: 'grid', _motionSafe: { animation: 'fadeIn 0.25s ease-out' } },
        gridTemplateRows: 'auto minmax(0, 1fr) auto',
      })}
    >
      {photo && index !== null && (
        <>
          <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4', px: { base: '4', md: '6' }, pt: 'max(1rem, env(safe-area-inset-top))', pb: '2' })}>
            <p className={css({ fontFamily: 'heading', fontWeight: '700', letterSpacing: '0.08em', fontSize: '1rem', color: 'navy.200', fontVariantNumeric: 'tabular-nums' })}>
              <span className={css({ color: 'white' })}>{String(index + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')}
            </p>
            <button type="button" onClick={onClose} aria-label="Close photo viewer" className={navButton} autoFocus>
              <X size={22} aria-hidden />
            </button>
          </div>

          <div
            data-backdrop
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipeStart.current = null)}
            className={css({ position: 'relative', display: 'grid', placeItems: 'center', minH: '0', px: { base: '2', md: '24' }, touchAction: 'pan-y' })}
          >
            <figure key={current.id} data-backdrop className={css({ display: 'grid', placeItems: 'center', gap: '3', m: '0', maxH: '100%', minH: '0', _motionSafe: { animation: 'zoomIn 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)' } })}>
              <img
                src={photo.small}
                srcSet={`${photo.small} ${photo.smallWidth}w, ${photo.src} ${photo.width}w`}
                sizes="(min-width: 768px) 80vw, 100vw"
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                draggable={false}
                className={css({
                  display: 'block',
                  w: 'auto',
                  h: 'auto',
                  maxW: '100%',
                  maxH: { base: 'calc(100dvh - 190px)', md: 'calc(100dvh - 230px)' },
                  objectFit: 'contain',
                  rounded: '6px',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.55)',
                  userSelect: 'none',
                  bg: 'navy.900',
                })}
              />
              <figcaption aria-live="polite" className={css({ textAlign: 'center', px: '4' })}>
                <span className={css({ display: 'block', fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.82rem', color: 'crimson.500' })}>
                  {current.tag}
                </span>
                <span className={css({ display: 'block', fontWeight: '600', fontSize: { base: '1rem', md: '1.1rem' }, mt: '0.5' })}>{photo.caption}</span>
              </figcaption>
            </figure>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className={cx(navButton, css({ position: 'absolute', left: { base: '2', md: '6' }, top: '50%', translate: '0 -50%', display: { base: 'none', sm: 'grid' } }))}
                >
                  <ChevronLeft size={26} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className={cx(navButton, css({ position: 'absolute', right: { base: '2', md: '6' }, top: '50%', translate: '0 -50%', display: { base: 'none', sm: 'grid' } }))}
                >
                  <ChevronRight size={26} aria-hidden />
                </button>
              </>
            )}
          </div>

          <div className={css({ pb: 'max(1rem, env(safe-area-inset-bottom))', pt: '3' })}>
            {/* Phones: swipe, or use these. */}
            {count > 1 && (
              <div className={css({ display: { base: 'flex', sm: 'none' }, justifyContent: 'center', gap: '4', mb: '3' })}>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={navButton}>
                  <ChevronLeft size={24} aria-hidden />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className={navButton}>
                  <ChevronRight size={24} aria-hidden />
                </button>
              </div>
            )}
            <div
              ref={thumbs}
              className={css({
                display: { base: 'none', sm: 'flex' },
                gap: '2',
                px: '6',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                justifyContent: 'safe center',
                '&::-webkit-scrollbar': { display: 'none' },
              })}
            >
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onIndex(i)}
                  aria-label={`Show photo ${i + 1}: ${item.photo.caption}`}
                  aria-current={i === index}
                  className={css({
                    flexShrink: '0',
                    w: '16',
                    h: '12',
                    p: '0',
                    rounded: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    opacity: 0.45,
                    outline: '2px solid transparent',
                    outlineOffset: '2px',
                    transition: 'opacity 0.2s, outline-color 0.2s',
                    _hover: { opacity: 0.85 },
                    '&[aria-current="true"]': { opacity: 1, outlineColor: 'crimson.500' },
                  })}
                >
                  <img src={item.photo.small} alt="" loading="lazy" decoding="async" className={css({ w: '100%', h: '100%', objectFit: 'cover' })} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </dialog>
  )
}
