import { ArrowRight, Cctv, CircuitBoard, ClipboardCheck, House, Lightbulb, Phone, Search, Settings, type LucideIcon } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { ButtonLink, container, Highlight, IconCircle, Kicker, sectionY } from '../components/ui'
import { business, services, type ServiceIcon } from '../data/site'
import { useContact } from '../lib/contact'

const icons: Record<ServiceIcon, LucideIcon> = {
  home: House,
  board: CircuitBoard,
  test: ClipboardCheck,
  fault: Search,
  lighting: Lightbulb,
  cctv: Cctv,
  maintenance: Settings,
}

export function Services() {
  const { openContact } = useContact()

  return (
    <section id="services" className={cx(sectionY, css({ bg: 'white' }))}>
      <div className={container}>
        <div className={css({ maxW: '44rem' })}>
          <Kicker>What we do</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '3' })}>
            Our <Highlight>services</Highlight>
          </h2>
          <p className={css({ textStyle: 'lead', color: 'muted', mt: '5' })}>
            Everything from a new socket to a full rewire, for homes, shops, offices and the rail industry. All work is tested and
            certified.
          </p>
        </div>

        <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: '5', mt: '12' })}>
          {services.map((service) => (
            <li
              key={service.title}
              className={css({
                display: 'flex',
                flexDir: 'column',
                p: '6',
                rounded: '8px',
                border: '1px solid {colors.paper.200}',
                borderTop: '4px solid {colors.crimson.600}',
                bg: 'white',
                boxShadow: '0 1px 2px rgba(10, 30, 69, 0.04)',
              })}
            >
              <IconCircle icon={icons[service.icon]} />
              <h3 className={css({ textStyle: 'h3', color: 'navy.900', mt: '5' })}>{service.title}</h3>
              <p className={css({ color: 'muted', mt: '2', flex: '1' })}>{service.body}</p>
              <button
                type="button"
                onClick={() => openContact(service.enquiry)}
                className={css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1.5',
                  alignSelf: 'flex-start',
                  mt: '5',
                  fontWeight: '700',
                  color: 'crimson.600',
                  cursor: 'pointer',
                  _hover: { textDecoration: 'underline', textUnderlineOffset: '3px' },
                })}
              >
                Get a quote <ArrowRight size={16} aria-hidden />
              </button>
            </li>
          ))}
          <li className={css({ display: 'flex', flexDir: 'column', justifyContent: 'center', p: '6', rounded: '8px', bg: 'navy.900', color: 'white' })}>
            <h3 className={css({ textStyle: 'h3' })}>Not sure what you need?</h3>
            <p className={css({ color: 'navy.200', mt: '2' })}>Give us a call for friendly, no-obligation advice.</p>
            <ButtonLink href={business.phoneHref} variant="red" className={css({ mt: '5', alignSelf: 'flex-start' })}>
              <Phone size={17} aria-hidden /> {business.phone}
            </ButtonLink>
          </li>
        </ul>
      </div>
    </section>
  )
}
