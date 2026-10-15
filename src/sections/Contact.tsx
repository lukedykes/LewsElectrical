import { CheckCircle2, FileText, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { css, cx } from '../../styled-system/css'
import { Button, container, Highlight, Kicker, sectionY } from '../components/ui'
import { business, enquiryTypes } from '../data/site'
import { useContact } from '../lib/contact'

type Form = { name: string; phone: string; email: string; postcode: string; type: string; message: string }
type Status = 'idle' | 'sending' | 'sent' | 'demo'

const empty: Form = { name: '', phone: '', email: '', postcode: '', type: '', message: '' }

function validate(f: Form) {
  const errors: Partial<Record<keyof Form, string>> = {}
  if (!f.name.trim()) errors.name = 'Please tell us your name.'
  if (!f.phone.trim() && !f.email.trim()) errors.phone = 'Please give us a phone number or an email address.'
  else if (f.phone.trim() && f.phone.replace(/\D/g, '').length < 10) errors.phone = 'That phone number looks too short.'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = 'That email address doesn’t look right.'
  return errors
}

export function Contact() {
  const { enquiry } = useContact()
  const [form, setForm] = useState<Form>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const thanks = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enquiry) return
    setForm((f) => ({ ...f, type: enquiry.type }))
    setStatus('idle')
  }, [enquiry])

  useEffect(() => {
    if (status === 'sent' || status === 'demo') thanks.current?.focus()
  }, [status])

  const set = (key: keyof Form) => (value: string) => setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) {
      // Take people to the first problem, which on a phone may be off-screen.
      requestAnimationFrame(() => formEl.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setStatus('sending')
    // server.mjs advertises its enquiry endpoint in a meta tag. Static hosting (GitHub Pages,
    // the single-file build) has no backend, so the form runs in demo mode there.
    const endpoint = document.querySelector<HTMLMetaElement>('meta[name="enquiry-endpoint"]')?.content
    if (!endpoint) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return setStatus('demo')
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sector: '', services: form.type ? [form.type] : [] }),
      })
      setStatus(res.ok ? 'sent' : 'demo')
    } catch {
      setStatus('demo')
    }
  }

  return (
    <section id="contact" className={cx(sectionY, css({ bg: 'paper.100' }))}>
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.85fr) minmax(0, 1.15fr)' }, gap: { base: '10', lg: '16' } }))}>
        <div>
          <Kicker>Get in touch</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '4' })}>
            Get a free <Highlight>quote.</Highlight>
          </h2>
          <p className={css({ textStyle: 'lead', color: 'ink.500', mt: '5' })}>
            Call, WhatsApp or send the form, whichever suits you. We’ll talk it through and send you a clear, written price.
          </p>
          <ul className={css({ mt: '8', bg: 'white', border: '1px solid {colors.paper.200}', '& > li + li': { borderTop: '1px solid {colors.paper.200}' } })}>
            <ContactLine icon={<Phone size={24} strokeWidth={1.7} />} label="Call" href={business.phoneHref}>
              <span className={css({ fontFamily: 'heading', fontWeight: '800', fontSize: { base: '1.7rem', md: '2rem' }, letterSpacing: '0.01em', lineHeight: '1' })}>{business.phone}</span>
            </ContactLine>
            <ContactLine icon={<MessageCircle size={24} strokeWidth={1.7} className={css({ color: '#1FAF54' })} />} label="WhatsApp" href={business.whatsappHref}>
              Message us on WhatsApp
            </ContactLine>
            <ContactLine icon={<Mail size={24} strokeWidth={1.7} />} label="Email" href={`mailto:${business.email}`}>
              <span className={css({ overflowWrap: 'anywhere' })}>{business.email}</span>
            </ContactLine>
            <ContactLine icon={<MapPin size={24} strokeWidth={1.7} />} label="Area">
              {business.area}
            </ContactLine>
          </ul>
        </div>

        <div id="quote" className={css({ bg: 'white', color: 'text', rounded: '20px', p: { base: '6', md: '10' }, border: '1px solid {colors.paper.300}', boxShadow: '0 30px 60px -40px rgba(10, 30, 69, 0.45)' })}>
          {status === 'sent' || status === 'demo' ? (
            <div ref={thanks} tabIndex={-1} role="status" className={css({ outline: 'none', py: '6' })}>
              <CheckCircle2 size={44} className={css({ color: 'crimson.600' })} aria-hidden />
              <h3 className={css({ textStyle: 'h3', fontSize: '1.8rem', color: 'navy.900', mt: '4' })}>
                Thanks{form.name.trim() ? `, ${form.name.trim().split(/\s+/)[0]}` : ''}. Message received.
              </h3>
              {status === 'sent' ? (
                <p className={css({ color: 'ink.700', mt: '3' })}>We’ll be in touch shortly to talk through the job and arrange your free quote.</p>
              ) : (
                <p className={css({ color: 'ink.700', mt: '3' })}>
                  This is a demo, so nothing has actually been sent. On the live site your enquiry goes straight to Lews Electrical.
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setForm(empty)
                  setStatus('idle')
                }}
                className={css({ mt: '6', fontWeight: '700', color: 'crimson.600', textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'pointer' })}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className={css({ textStyle: 'h3', fontSize: { base: '2rem', md: '2.4rem' }, color: 'navy.950' })}>Send us the details</h3>
              <p className={css({ color: 'ink.500', mt: '2' })}>Tell us what you need and we’ll get back to you with a no-obligation quote.</p>
              <div className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: '4', mt: '5' })}>
                <Field label="Your name" error={errors.name} wide>
                  <input className={input} value={form.name} onChange={(e) => set('name')(e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input className={input} value={form.phone} onChange={(e) => set('phone')(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input className={input} value={form.email} onChange={(e) => set('email')(e.target.value)} type="email" autoComplete="email" aria-invalid={!!errors.email} />
                </Field>
                <Field label="Postcode" hint="Optional">
                  <input className={cx(input, css({ textTransform: 'uppercase' }))} value={form.postcode} onChange={(e) => set('postcode')(e.target.value)} autoComplete="postal-code" />
                </Field>
                <Field label="What do you need?" hint="Optional">
                  <select className={input} value={form.type} onChange={(e) => set('type')(e.target.value)}>
                    <option value="">Choose one</option>
                    {enquiryTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Tell us a bit about the job" hint="Optional" wide>
                  <textarea
                    className={cx(input, css({ h: '32', py: '3', resize: 'vertical' }))}
                    value={form.message}
                    onChange={(e) => set('message')(e.target.value)}
                    placeholder="For example: three-bed semi in Rayleigh, old fuse box, would like more sockets in the kitchen."
                  />
                </Field>
              </div>
              <Button type="submit" size="lg" disabled={status === 'sending'} className={css({ mt: '6', w: { base: '100%', sm: 'auto' } })}>
                {status === 'sending' ? (
                  'Sending…'
                ) : (
                  <>
                    <FileText size={18} aria-hidden /> Send enquiry
                  </>
                )}
              </Button>
              <p className={css({ fontSize: '0.85rem', color: 'muted', mt: '3' })}>We only use your details to reply to your enquiry.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function ContactLine({ icon, label, href, children }: { icon: ReactNode; label: string; href?: string; children: ReactNode }) {
  const body = (
    <>
      <span aria-hidden className={css({ display: 'grid', placeItems: 'center', color: 'crimson.600', flexShrink: '0' })}>
        {icon}
      </span>
      {/* Label above the value on phones, beside it from small tablets up. */}
      <span className={css({ display: 'flex', flexDir: { base: 'column', sm: 'row' }, alignItems: { sm: 'center' }, gap: { base: '1', sm: '4' }, minW: '0' })}>
        <span className={css({ textStyle: 'kicker', fontSize: '0.78rem', letterSpacing: '0.22em', color: 'ink.500', w: { sm: '6.5rem' }, flexShrink: '0' })}>{label}</span>
        <span data-value className={css({ minW: '0', fontWeight: '600', fontSize: '1.05rem', color: 'navy.950', transition: 'color 0.15s' })}>
          {children}
        </span>
      </span>
    </>
  )
  const row = css({ display: 'flex', alignItems: 'center', gap: { base: '3', sm: '4' }, px: { base: '4', sm: '6' }, py: '5' })
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          className={cx(row, css({ transition: 'background 0.15s', _hover: { bg: 'paper.100', '& [data-value]': { color: 'crimson.600' } } }))}
        >
          {body}
        </a>
      ) : (
        <div className={row}>{body}</div>
      )}
    </li>
  )
}

function Field({ label, hint, error, wide, children }: { label: string; hint?: string; error?: string; wide?: boolean; children: ReactNode }) {
  return (
    <label className={cx(css({ display: 'block' }), wide && css({ gridColumn: { sm: 'span 2' } }))}>
      <span className={css({ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: 'navy.900', mb: '1.5' })}>
        {label}
        {hint && <span className={css({ fontWeight: '400', color: 'muted', fontSize: '0.9rem' })}>{hint}</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className={css({ display: 'block', color: 'crimson.600', fontSize: '0.9rem', mt: '1' })}>
          {error}
        </span>
      )}
    </label>
  )
}

const input = css({
  w: '100%',
  h: '12',
  px: '3.5',
  rounded: '6px',
  border: '1px solid {colors.paper.300}',
  bg: 'white',
  color: 'text',
  fontSize: '1rem',
  outline: 'none',
  _focus: { borderColor: 'navy.700', boxShadow: '0 0 0 3px rgba(26, 58, 120, 0.15)' },
  '&[aria-invalid=true]': { borderColor: 'crimson.600' },
  _placeholder: { color: 'ink.300' },
})
