import { useLayoutEffect, useState, type RefObject } from 'react'

export type Tile = { width: number; height: number; fill: boolean }

/**
 * Justified rows, as on Flickr or Google Photos: photos keep their shape, every
 * row is the same height across, and every row (the last one too) fills the width.
 * Picks the row breaks that keep row heights closest to `target` overall, so no
 * row ends up squashed or oversized.
 */
export function justify(ratios: number[], width: number, target: number, gap: number): Tile[] {
  const n = ratios.length
  if (!n || width <= 0 || target <= 0) return []
  const prefix = [0]
  for (const r of ratios) prefix.push(prefix[prefix.length - 1] + r)
  const heightOf = (from: number, to: number) => (width - gap * (to - from - 1)) / (prefix[to] - prefix[from])
  // Penalise how far a row's height strays from the target, proportionally.
  const cost = (from: number, to: number) => {
    const h = heightOf(from, to)
    return h <= 0 ? Infinity : Math.log(h / target) ** 2
  }

  // best[i]: lowest total cost to lay out the first i photos; from[i]: where its last row starts.
  const best = new Array<number>(n + 1).fill(Infinity)
  const from = new Array<number>(n + 1).fill(0)
  best[0] = 0
  for (let i = 1; i <= n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const total = best[j] + cost(j, i)
      if (total < best[i]) {
        best[i] = total
        from[i] = j
      }
      // A row shorter than half the target won't get better with more photos in it.
      if (heightOf(j, i) < target * 0.5) break
    }
  }

  const tiles: Tile[] = new Array(n)
  for (let end = n; end > 0; end = from[end]) {
    const start = from[end]
    const height = heightOf(start, end)
    for (let i = start; i < end; i++) {
      // Widths are floored so a row never overflows; the last tile soaks up the spare pixel or two.
      tiles[i] = { width: Math.floor(ratios[i] * height), height: Math.round(height), fill: i === end - 1 }
    }
  }
  return tiles
}

/** Content width of an element and the gap to use, kept up to date as it resizes. */
export function useMeasure(ref: RefObject<HTMLElement | null>) {
  const [box, setBox] = useState<{ width: number; gap: number } | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const width = Math.floor(el.getBoundingClientRect().width)
      const gap = window.matchMedia('(min-width: 768px)').matches ? 12 : 8
      setBox((prev) => (prev && prev.width === width && prev.gap === gap ? prev : { width, gap }))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return box
}
