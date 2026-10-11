import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, BadgeCheck, Building2, Check, Home, Loader2, Mail, MessageSquareText, Phone, TrainFront } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { css, cx } from '../../styled-system/css'
import { Button, container, easeOut, Eyebrow, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { business, quoteServices, type SectorId } from '../data/site'
import { useQuote } from '../lib/quote'

const sectorOptions: { id: SectorId; label: string; hint: string; icon: typeof Home }[] = [
  { id: 'domestic', label: 'My home', hint: 'House, flat or rental', icon: Home },
  { id: 'commercial', label: 'My business', hint: 'Shop, salon, office, venue', icon: Building2 },
  { id: 'rail', label: 'Rail', hint: 'Infrastructure & contracts', icon: TrainFront },
]

const stepTitles = ['Where is the work?', 'What do you need?', 'How do we reach you?']

type Details = { name: string; phone: string; email: string; postcode: string; message: string; contact: 'call' | 'text' | 'email' }
type Status = 'idle' | 'sending' | 'sent' | 'demo'

const emptyDetails: Details = { name: '', phone: '', email: '', postcode: '', message: '', contact: 'call' }

function validate(d: Details) {
  const errors: Partial<Record<keyof Details, string>> = {}
  if (!d.name.trim()) errors.name = 'Please tell us your name.'
  if (!d.phone.trim() && !d.email.trim()) errors.phone = 'Add a phone number or an email so we can reply.'
  if (d.phone.trim() && d.phone.replace(/\D/g, '').length < 10) errors.phone = 'That phone number looks a little short.'
  if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) errors.email = 'That email address doesn’t look right.'
  return errors
}

export function Quote() {
  const { prefill } = useQuote()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [sector, setSector] = useState<SectorId | null>(null)
  const [services, setServices] = useState<string[]>([])
  const [details, setDetails] = useState<Details>(emptyDetails)
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({})
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (!prefill) return
    if (prefill.sector) setSector(prefill.sector)
    if (prefill.service) setServices((list) => (list.includes(prefill.service!) ? list : [...list, prefill.service!]))
    setStatus('idle')
    setDirection(1)
    setStep(prefill.sector ? (prefill.service ? 2 : 1) : 0)
  }, [prefill])

  const canContinue = step === 0 ? sector !== null : step === 1 ? services.length > 0 : true

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      if (canContinue) go(step + 1)
      return
    }
    const found = validate(details)
    setErrors(found)
    if (Object.keys(found).length) return
    setStatus('sending')
    // server.mjs advertises its enquiry endpoint in a meta tag. Static hosting (GitHub Pages,
    // the single-file build) has no backend, so the form runs in demo mode there.
    const endpoint = document.querySelector<HTMLMetaElement>('meta[name="enquiry-endpoint"]')?.content
    if (!endpoint) {
      await new Promise((resolve) => setTimeout(resolve, 700))
      return setStatus('demo')
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector, services, ...details }),
      })
      setStatus(res.ok ? 'sent' : 'demo')
    } catch {
      setStatus('demo')
    }
  }

  const reset = () => {
    setStep(0)
    setSector(null)
    setServices([])
    setDetails(emptyDetails)
    setErrors({})
    setStatus('idle')
  }

  const done = status === 'sent' || status === 'demo'

  return (
    <section id="quote" className={cx(sectionPadding, css({ position: 'relative', bg: 'navy.950', overflow: 'hidden', isolation: 'isolate' }))}>
      <div
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          zIndex: '-1',
          bgImage:
            'radial-gradient(50% 50% at 75% 40%, rgba(227, 23, 58, 0.2), transparent 70%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          bgSize: 'auto, 48px 48px, 48px 48px',
          maskImage: 'linear-gradient(180deg, transparent, #000 15%, #000 85%, transparent)',
        })}
      />
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' }, gap: { base: '12', lg: '16', xl: '24' }, alignItems: 'start' }))}>
        <div>
          <Reveal>
            <Eyebrow index="09">Free quote</Eyebrow>
          </Reveal>
          <h2 className={css({ textStyle: 'title', mt: '5' })}>
            <RevealWords text="Let’s get you" /> <RevealWords text="powered up." delay={0.15} className={css({ color: 'crimson.400' })} />
          </h2>
          <Reveal delay={0.1}>
            <p className={css({ textStyle: 'lead', color: 'fg.muted', mt: '6', maxW: '32rem' })}>
              Tell us a little about the job and we will come back with a clear, written quote. Prefer to talk? Give us a call
              or drop us a text.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className={css({ display: 'grid', gap: '3', mt: '10', maxW: '28rem' })}>
              <ContactRow href={business.phoneHref} icon={<Phone size={20} aria-hidden />} label="Call" value={business.phone} />
              <ContactRow href={business.smsHref} icon={<MessageSquareText size={20} aria-hidden />} label="Text" value={business.phone} />
              <ContactRow href={`mailto:${business.email}`} icon={<Mail size={20} aria-hidden />} label="Email" value={business.email} />
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', mt: '8' })}>
              {business.accreditations.map((item) => (
                <span
                  key={item}
                  className={css({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2',
                    px: '4',
                    py: '2.5',
                    rounded: 'xl',
                    border: '1px solid',
                    borderColor: 'line.default',
                    bg: 'rgba(255,255,255,0.03)',
                    fontSize: 'sm',
                    fontWeight: '600',
                  })}
                >
                  <BadgeCheck size={18} className={css({ color: 'spark.400' })} aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className={css({
              position: 'relative',
              rounded: 'card',
              p: { base: '6', md: '10' },
              bg: 'linear-gradient(180deg, rgba(20,38,79,0.7), rgba(10,20,48,0.9))',
              border: '1px solid',
              borderColor: 'line.default',
              boxShadow: '0 60px 120px -50px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)',
              backdropFilter: 'blur(18px)',
              minH: { md: '600px' },
              display: 'flex',
              flexDir: 'column',
            })}
          >
            {done ? (
              <Success name={details.name} status={status} onReset={reset} />
            ) : (
              <form onSubmit={submit} noValidate className={css({ display: 'flex', flexDir: 'column', flex: '1' })}>
                <div className={css({ display: 'flex', gap: '2', mb: '8' })} aria-hidden>
                  {stepTitles.map((title, i) => (
                    <span key={title} className={css({ flex: '1', h: '4px', rounded: 'full', bg: 'rgba(255,255,255,0.1)', overflow: 'hidden' })}>
                      <motion.span
                        initial={false}
                        animate={{ scaleX: i <= step ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: easeOut }}
                        className={css({ display: 'block', h: '100%', bgImage: 'linear-gradient(90deg, {colors.crimson.500}, {colors.spark.400})', transformOrigin: 'left' })}
                      />
                    </span>
                  ))}
                </div>
                <p className={css({ textStyle: 'eyebrow', color: 'fg.subtle' })}>
                  Step {step + 1} of 3
                </p>

                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.fieldset
                    key={step}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -28 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className={css({ flex: '1', mt: '2' })}
                  >
                    <legend className={css({ fontFamily: 'display', fontWeight: '750', fontSize: { base: '1.6rem', md: '2rem' }, letterSpacing: '-0.025em', mb: '6' })}>
                      {stepTitles[step]}
                    </legend>

                    {step === 0 && (
                      <div role="radiogroup" aria-label="Type of work" className={css({ display: 'grid', gap: '3' })}>
                        {sectorOptions.map(({ id, label, hint, icon: Icon }) => {
                          const on = sector === id
                          return (
                            <button
                              key={id}
                              type="button"
                              role="radio"
                              aria-checked={on}
                              onClick={() => {
                                setSector(id)
                                go(1)
                              }}
                              className={cx(optionCard, on && optionCardOn)}
                            >
                              <span className={cx(optionIcon, on && css({ bg: 'crimson.500', borderColor: 'crimson.500' }))}>
                                <Icon size={22} aria-hidden />
                              </span>
                              <span className={css({ flex: '1' })}>
                                <span className={css({ display: 'block', fontWeight: '650', fontSize: 'lg' })}>{label}</span>
                                <span className={css({ display: 'block', color: 'fg.subtle', fontSize: 'sm' })}>{hint}</span>
                              </span>
                              <span className={cx(radioDot, on && css({ borderColor: 'crimson.400', _after: { transform: 'scale(1)' } }))} />
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {step === 1 && (
                      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '2.5' })} aria-label="Services">
                        {quoteServices.map((service) => {
                          const on = services.includes(service)
                          return (
                            <button
                              key={service}
                              type="button"
                              role="checkbox"
                              aria-checked={on}
                              onClick={() => setServices((list) => (on ? list.filter((s) => s !== service) : [...list, service]))}
                              className={cx(
                                css({
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2',
                                  px: '4',
                                  py: '2.5',
                                  rounded: 'full',
                                  border: '1px solid',
                                  fontSize: 'sm',
                                  fontWeight: '550',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }),
                                on
                                  ? css({ bg: 'white', color: 'navy.900', borderColor: 'white' })
                                  : css({ bg: 'rgba(255,255,255,0.04)', borderColor: 'line.default', color: 'ink.100', _hover: { borderColor: 'line.strong', bg: 'rgba(255,255,255,0.08)' } }),
                              )}
                            >
                              {on && <Check size={15} strokeWidth={3} aria-hidden />}
                              {service}
                            </button>
                          )
                        })}
                        <p className={css({ w: '100%', color: 'fg.subtle', fontSize: 'sm', mt: '4' })}>Pick as many as you like.</p>
                      </div>
                    )}

                    {step === 2 && (
                      <div className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'minmax(0, 1fr) minmax(0, 1fr)' }, gap: '4' })}>
                        <Field label="Your name" error={errors.name} className={css({ gridColumn: { sm: 'span 2' } })}>
                          <input
                            className={inputStyle}
                            value={details.name}
                            onChange={(e) => setDetails({ ...details, name: e.target.value })}
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                          />
                        </Field>
                        <Field label="Phone" error={errors.phone}>
                          <input
                            className={inputStyle}
                            value={details.phone}
                            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            aria-invalid={!!errors.phone}
                          />
                        </Field>
                        <Field label="Email" error={errors.email}>
                          <input
                            className={inputStyle}
                            value={details.email}
                            onChange={(e) => setDetails({ ...details, email: e.target.value })}
                            type="email"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                          />
                        </Field>
                        <Field label="Postcode" optional>
                          <input
                            className={cx(inputStyle, css({ textTransform: 'uppercase' }))}
                            value={details.postcode}
                            onChange={(e) => setDetails({ ...details, postcode: e.target.value })}
                            autoComplete="postal-code"
                          />
                        </Field>
                        <div>
                          <span id="contact-pref" className={css({ display: 'block', fontSize: 'sm', fontWeight: '550', color: 'ink.100', mb: '2' })}>
                            Best way to reach you
                          </span>
                          <div role="group" aria-labelledby="contact-pref" className={css({ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1', p: '1', rounded: 'xl', bg: 'rgba(4,8,20,0.5)', border: '1px solid', borderColor: 'line.default' })}>
                            {(['call', 'text', 'email'] as const).map((method) => (
                              <button
                                key={method}
                                type="button"
                                aria-pressed={details.contact === method}
                                onClick={() => setDetails({ ...details, contact: method })}
                                className={cx(
                                  css({ h: '10', rounded: 'lg', fontSize: 'sm', fontWeight: '600', textTransform: 'capitalize', transition: 'all 0.2s', cursor: 'pointer' }),
                                  details.contact === method ? css({ bg: 'white', color: 'navy.900' }) : css({ color: 'ink.200', _hover: { color: 'white' } }),
                                )}
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                        </div>
                        <Field label="Anything else we should know?" optional className={css({ gridColumn: { sm: 'span 2' } })}>
                          <textarea
                            className={cx(inputStyle, css({ h: '28', py: '3', resize: 'vertical' }))}
                            value={details.message}
                            onChange={(e) => setDetails({ ...details, message: e.target.value })}
                            placeholder="e.g. 3-bed semi, fuse box looks original, would like more sockets in the kitchen"
                          />
                        </Field>
                      </div>
                    )}
                  </motion.fieldset>
                </AnimatePresence>

                <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3', mt: '8', pt: '6', borderTop: '1px solid {colors.line.subtle}' })}>
                  {step > 0 ? (
                    <button type="button" onClick={() => go(step - 1)} className={css({ display: 'inline-flex', alignItems: 'center', gap: '2', color: 'ink.200', fontWeight: '550', fontSize: 'sm', _hover: { color: 'white' } })}>
                      <ArrowLeft size={16} aria-hidden /> Back
                    </button>
                  ) : (
                    <span className={css({ fontSize: 'xs', color: 'fg.subtle' })}>Takes about a minute</span>
                  )}
                  {step < 2 ? (
                    <Button type="submit" arrow disabled={!canContinue}>
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={18} className={css({ animation: 'spin 0.8s linear infinite' })} aria-hidden /> Sending
                        </>
                      ) : (
                        'Send my enquiry'
                      )}
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ContactRow({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  return (
    <li>
      <a
        href={href}
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '4',
          p: '4',
          rounded: '2xl',
          border: '1px solid',
          borderColor: 'line.subtle',
          bg: 'rgba(255,255,255,0.03)',
          transition: 'background 0.25s, border-color 0.25s',
          _hover: { bg: 'rgba(255,255,255,0.07)', borderColor: 'line.default', '& .go': { transform: 'translateX(4px)', color: 'white' } },
        })}
      >
        <span className={css({ display: 'grid', placeItems: 'center', w: '12', h: '12', rounded: 'xl', bg: 'rgba(227,23,58,0.14)', color: 'crimson.400', flexShrink: '0' })}>{icon}</span>
        <span className={css({ flex: '1', minW: '0' })}>
          <span className={css({ display: 'block', textStyle: 'eyebrow', color: 'fg.subtle' })}>{label}</span>
          <span className={css({ display: 'block', fontWeight: '600', mt: '0.5', overflow: 'hidden', textOverflow: 'ellipsis' })}>{value}</span>
        </span>
        <span className={cx('go', css({ color: 'fg.subtle', transition: 'transform 0.3s, color 0.3s' }))} aria-hidden>
          →
        </span>
      </a>
    </li>
  )
}

function Field({ label, error, optional, className, children }: { label: string; error?: string; optional?: boolean; className?: string; children: ReactNode }) {
  return (
    <label className={cx(css({ display: 'block' }), className)}>
      <span className={css({ display: 'flex', justifyContent: 'space-between', fontSize: 'sm', fontWeight: '550', color: 'ink.100', mb: '2' })}>
        {label}
        {optional && <span className={css({ color: 'fg.subtle', fontWeight: '400' })}>Optional</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className={css({ display: 'block', color: 'crimson.300', fontSize: 'xs', mt: '1.5' })}>
          {error}
        </span>
      )}
    </label>
  )
}

function Success({ name, status, onReset }: { name: string; status: Status; onReset: () => void }) {
  const first = name.trim().split(/\s+/)[0]
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => heading.current?.focus(), [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className={css({ flex: '1', display: 'flex', flexDir: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: '8' })}
      role="status"
    >
      <Bulb />
      <h3
        ref={heading}
        tabIndex={-1}
        className={css({ fontFamily: 'display', fontWeight: '800', fontSize: { base: '2rem', md: '2.6rem' }, letterSpacing: '-0.03em', mt: '6', lineHeight: '1.05', outline: 'none' })}
      >
        Thanks{first ? `, ${first}` : ''}.<br />You’re all wired up.
      </h3>
      {status === 'sent' ? (
        <p className={css({ color: 'ink.100', mt: '4', maxW: '26rem' })}>Your enquiry is in. We will be in touch shortly to arrange your free quote.</p>
      ) : (
        <p className={css({ color: 'ink.100', mt: '4', maxW: '28rem' })}>
          This is a demo, so nothing has been sent. On the live site your enquiry lands straight in the Lews Electrical inbox.
        </p>
      )}
      <button type="button" onClick={onReset} className={css({ mt: '8', fontSize: 'sm', color: 'fg.subtle', textDecoration: 'underline', textUnderlineOffset: '4px', _hover: { color: 'white' } })}>
        Start another enquiry
      </button>
    </motion.div>
  )
}

function Bulb() {
  return (
    <div className={css({ position: 'relative', w: '28', h: '36' })}>
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 0.4, 1], scale: 1 }}
        transition={{ duration: 1.2, times: [0, 0.3, 0.45, 1], delay: 0.3 }}
        className={css({ position: 'absolute', inset: '-40px', rounded: 'full', bgImage: 'radial-gradient(circle, rgba(255,181,71,0.55), transparent 65%)', filter: 'blur(6px)' })}
      />
      <svg viewBox="0 0 64 84" className={css({ position: 'relative', w: '100%', h: '100%' })} aria-hidden>
        <motion.path
          d="M32 4C18 4 8 14 8 27c0 9 5 15 9 20 3 4 4 7 4 11h22c0-4 1-7 4-11 4-5 9-11 9-20C56 14 46 4 32 4z"
          initial={{ fill: 'rgba(255,255,255,0.06)' }}
          animate={{ fill: ['rgba(255,255,255,0.06)', 'rgba(255,214,150,0.9)', 'rgba(255,214,150,0.35)', 'rgba(255,224,170,0.95)'] }}
          transition={{ duration: 1.2, times: [0, 0.3, 0.45, 1], delay: 0.3 }}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
        />
        <path d="M24 46c0-6 3-9 8-15 5 6 8 9 8 15" fill="none" stroke="#B4561C" strokeWidth="2" strokeLinecap="round" />
        <rect x="21" y="60" width="22" height="6" rx="2" fill="#AAB4CC" />
        <rect x="22" y="68" width="20" height="5" rx="2" fill="#8E98AD" />
        <path d="M26 76h12l-3 5h-6z" fill="#68769A" />
      </svg>
    </div>
  )
}

const optionCard = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  w: '100%',
  p: '4',
  rounded: '2xl',
  border: '1px solid',
  borderColor: 'line.default',
  bg: 'rgba(255,255,255,0.03)',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'background 0.25s, border-color 0.25s, transform 0.25s',
  _hover: { bg: 'rgba(255,255,255,0.07)', borderColor: 'line.strong' },
})

const optionCardOn = css({ bg: 'rgba(227,23,58,0.12)', borderColor: 'crimson.400', _hover: { bg: 'rgba(227,23,58,0.16)', borderColor: 'crimson.400' } })

const optionIcon = css({
  display: 'grid',
  placeItems: 'center',
  w: '12',
  h: '12',
  rounded: 'xl',
  bg: 'rgba(255,255,255,0.06)',
  border: '1px solid',
  borderColor: 'line.default',
  flexShrink: '0',
  transition: 'background 0.25s, border-color 0.25s',
})

const radioDot = css({
  position: 'relative',
  w: '5',
  h: '5',
  rounded: 'full',
  border: '2px solid',
  borderColor: 'ink.400',
  flexShrink: '0',
  _after: {
    content: '""',
    position: 'absolute',
    inset: '3px',
    rounded: 'full',
    bg: 'crimson.400',
    transform: 'scale(0)',
    transition: 'transform 0.25s {easings.snap}',
  },
})

const inputStyle = css({
  w: '100%',
  h: '12',
  px: '4',
  rounded: 'xl',
  bg: 'rgba(4,8,20,0.5)',
  border: '1px solid',
  borderColor: 'line.default',
  color: 'white',
  fontSize: 'md',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  _placeholder: { color: 'ink.400' },
  _focus: { borderColor: 'spark.400', boxShadow: '0 0 0 4px rgba(255,181,71,0.12)' },
  '&[aria-invalid=true]': { borderColor: 'crimson.400' },
})
