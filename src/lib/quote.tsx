import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { SectorId } from '../data/site'
import { scrollToId } from './scroll'

export type QuotePrefill = { sector?: SectorId; service?: string; nonce: number }

type QuoteContextValue = {
  prefill: QuotePrefill | null
  startQuote: (options?: { sector?: SectorId; service?: string }) => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null)

  const startQuote = useCallback((options: { sector?: SectorId; service?: string } = {}) => {
    setPrefill({ ...options, nonce: Date.now() })
    scrollToId('quote')
  }, [])

  const value = useMemo(() => ({ prefill, startQuote }), [prefill, startQuote])
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used inside QuoteProvider')
  return ctx
}
