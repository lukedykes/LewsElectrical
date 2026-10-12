import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type ContactContextValue = {
  enquiry: { type: string; nonce: number } | null
  /** Jump to the contact form, optionally with an enquiry type picked. */
  openContact: (type?: string) => void
}

const ContactContext = createContext<ContactContextValue | null>(null)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [enquiry, setEnquiry] = useState<ContactContextValue['enquiry']>(null)

  const openContact = useCallback((type?: string) => {
    if (type) setEnquiry({ type, nonce: Date.now() })
    document.getElementById('contact')?.scrollIntoView({ block: 'start' })
  }, [])

  const value = useMemo(() => ({ enquiry, openContact }), [enquiry, openContact])
  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
}

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used inside ContactProvider')
  return ctx
}
