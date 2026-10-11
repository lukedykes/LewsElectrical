import { motion, useScroll, useSpring } from 'framer-motion'
import { css } from '../../styled-system/css'

/** A thin "current" running along the top edge as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={css({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        h: '2px',
        zIndex: '70',
        transformOrigin: 'left',
        bgImage: 'linear-gradient(90deg, {colors.crimson.500}, {colors.spark.400})',
        boxShadow: '0 0 12px rgba(255, 181, 71, 0.7)',
      })}
    />
  )
}
