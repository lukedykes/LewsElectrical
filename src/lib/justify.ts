import { useLayoutEffect, useState, type RefObject } from 'react'

export type Tile = { width: number; height: number; fill: boolean }

/**
 * Justified rows, as on Flickr or Google Photos: photos keep their shape, every
 * row is the same height across, and rows fill the width. Each row breaks where
 * its height lands closest to `target`. A short last row is folded into the one
 * above, so the grid always ends square.
 */
export function justify(ratios: number[], width: number, target: number, gap: number): Tile[] {
  const rows: number[][] = []
  let row: number[] = []
  let sum = 0
  const heightOf = (total: number, count: number) => (width - gap * (count - 1)) / total

  ratios.forEach((ratio, i) => {
    if (row.length && (sum + ratio) * target + gap * row.length > width) {
      const without = heightOf(sum, row.length)
      const withIt = heightOf(sum + ratio, row.length + 1)
      if (Math.abs(without - target) <= Math.abs(withIt - target)) {
        rows.push(row)
        row = [i]
        sum = ratio
      } else {
        rows.push([...row, i])
        row = []
        sum = 0
      }
      return
    }
    row.push(i)
    sum += ratio
  })

  if (row.length) {
    const fill = (sum * target + gap * (row.length - 1)) / width
    if (fill < 0.6 && rows.length) rows[rows.length - 1].push(...row)
    else rows.push(row)
  }

  const tiles: Tile[] = new Array(ratios.length)
  for (const indexes of rows) {
    const total = indexes.reduce((acc, i) => acc + ratios[i], 0)
    const exact = heightOf(total, indexes.length)
    const height = Math.min(exact, target * 1.6)
    indexes.forEach((i, k) => {
      // Widths are floored so a row never overflows; the last tile soaks up the spare pixel or two.
      tiles[i] = { width: Math.floor(ratios[i] * height), height: Math.round(height), fill: k === indexes.length - 1 && height === exact }
    })
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
