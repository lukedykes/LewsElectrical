import Lenis from 'lenis'

const NAV_OFFSET = -84

let lenis: Lenis | null = null

/** Smooth scrolling for pointer devices; skipped entirely for reduced-motion users. */
export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: NAV_OFFSET } })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
