import { ArrowRight, Cctv, CircuitBoard, ClipboardCheck, House, Lightbulb, Phone, Search, Settings, type LucideIcon } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { Bullets, ButtonLink, container, Highlight, IconTile, SectionIntro, sectionY, trackedLink } from '../components/ui'
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
    <section id="services" className={cx(sectionY, css({ bg: 'paper.100' }))}>
      <div className={container}>
        <SectionIntro
          kicker="What we do"
          title={
            <>
              Our <Highlight>services</Highlight>
            </>
          }
          lead="Everything from a new socket to a full rewire, for homes, shops, offices and the rail industry. All work is tested and certified."
        />

        <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: { base: '4', md: '5' } })}>
          {services.map((service) => (
            <li
              key={service.title}
              className={css({
                display: 'flex',
                flexDir: 'column',
                p: { base: '7', md: '7' },
                bg: 'white',
                border: '1px solid {colors.paper.200}',
                rounded: '4px',
                transition: 'box-shadow 0.25s, transform 0.25s',
                _canHover: { _hover: { boxShadow: '0 20px 40px -24px rgba(10, 30, 69, 0.35)', transform: 'translateY(-2px)' } },
              })}
            >
              <IconTile icon={icons[service.icon]} />
              <h3 className={css({ textStyle: 'h3', color: 'navy.950', mt: '6' })}>{service.title}</h3>
              <p className={css({ color: 'ink.500', mt: '3' })}>{service.body}</p>
              <hr className={css({ border: 'none', borderTop: '1px solid {colors.paper.300}', my: '5' })} />
              <Bullets items={service.points} className={css({ flex: '1' })} />
              <div className={css({ display: 'flex', flexWrap: 'wrap', columnGap: '6', rowGap: '3', mt: '6' })}>
                <button type="button" onClick={() => openContact(service.enquiry)} className={trackedLink}>
                  Get a quote <ArrowRight size={18} aria-hidden />
                </button>
                {service.icon === 'lighting' && (
                  <a href="#lighting" className={cx(trackedLink, css({ color: 'navy.950' }))}>
                    See lighting <ArrowRight size={18} aria-hidden />
                  </a>
                )}
              </div>
            </li>
          ))}
          <li className={css({ display: 'flex', flexDir: 'column', justifyContent: 'center', p: '7', rounded: '4px', bg: 'navy.950', color: 'white' })}>
            <h3 className={css({ textStyle: 'h3', fontSize: '2rem' })}>
              Not sure what <Highlight>you need?</Highlight>
            </h3>
            <p className={css({ color: 'navy.200', mt: '3' })}>Give us a call for friendly, no-obligation advice.</p>
            <ButtonLink href={business.phoneHref} variant="red" className={css({ mt: '6', alignSelf: 'flex-start' })}>
              <Phone size={17} aria-hidden /> {business.phone}
            </ButtonLink>
          </li>
        </ul>
      </div>
    </section>
  )
}
