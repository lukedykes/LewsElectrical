import { defineConfig } from '@pandacss/dev'
import pandaBase from '@pandacss/preset-base'
import pandaPreset from '@pandacss/preset-panda'

// Colours and type follow the client's printed flyers: deep navy, signal red,
// white, and heavy italic condensed capitals for headlines.
export default defineConfig({
  presets: [pandaBase, pandaPreset],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',

  conditions: {
    extend: {
      canHover: '@media (hover: hover) and (pointer: fine)',
      motionSafe: '@media (prefers-reduced-motion: no-preference)',
    },
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          navy: {
            950: { value: '#061430' },
            900: { value: '#0A1E45' },
            800: { value: '#102A5C' },
            700: { value: '#1A3A78' },
            200: { value: '#C9D3E6' },
            100: { value: '#E9EDF5' },
          },
          crimson: {
            700: { value: '#A30D24' },
            600: { value: '#C8102E' },
            500: { value: '#DD1A36' },
            100: { value: '#FBE7EA' },
          },
          ink: {
            900: { value: '#111A2B' },
            700: { value: '#2F3B50' },
            500: { value: '#5A6577' },
            300: { value: '#98A1B0' },
          },
          paper: {
            100: { value: '#F3F5F8' },
            200: { value: '#E5E9F0' },
            300: { value: '#D2D8E2' },
          },
          // UK cable core colours, used only in the logo.
          wire: {
            brown: { value: '#9C5A33' },
            blue: { value: '#2563EB' },
            earth: { value: '#1F9D55' },
            yellow: { value: '#F2C200' },
            copper: { value: '#D9883F' },
          },
        },
        fonts: {
          body: { value: "'Barlow', 'Helvetica Neue', Arial, sans-serif" },
          heading: { value: "'Barlow Condensed', 'Arial Narrow', 'Barlow', sans-serif" },
        },
      },
      semanticTokens: {
        colors: {
          text: { value: '{colors.ink.900}' },
          muted: { value: '{colors.ink.500}' },
          line: { value: '{colors.paper.300}' },
          lineOnNavy: { value: 'rgba(255, 255, 255, 0.16)' },
        },
      },
      textStyles: {
        display: {
          value: {
            fontFamily: 'heading',
            fontWeight: '800',
            fontStyle: 'italic',
            textTransform: 'uppercase',
            fontSize: 'clamp(2.75rem, 6.2vw, 5.5rem)',
            lineHeight: '0.92',
            letterSpacing: '0.005em',
          },
        },
        h2: {
          value: {
            fontFamily: 'heading',
            fontWeight: '800',
            fontStyle: 'italic',
            textTransform: 'uppercase',
            fontSize: 'clamp(2.1rem, 4.4vw, 3.6rem)',
            lineHeight: '0.95',
            letterSpacing: '0.005em',
          },
        },
        h3: {
          value: {
            fontFamily: 'heading',
            fontWeight: '700',
            textTransform: 'uppercase',
            fontSize: '1.4rem',
            lineHeight: '1.1',
            letterSpacing: '0.01em',
          },
        },
        kicker: {
          value: {
            fontFamily: 'heading',
            fontWeight: '600',
            textTransform: 'uppercase',
            fontSize: '1.05rem',
            letterSpacing: '0.08em',
            lineHeight: '1.2',
          },
        },
        lead: {
          value: {
            fontSize: 'clamp(1.08rem, 1.3vw, 1.22rem)',
            lineHeight: '1.6',
          },
        },
      },
    },
  },

  globalCss: {
    html: {
      color: 'text',
      bg: 'white',
      fontFamily: 'body',
      fontSize: '17px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      scrollPaddingTop: '96px',
      _motionSafe: { scrollBehavior: 'smooth' },
    },
    body: {
      lineHeight: '1.6',
      overflowX: 'clip',
    },
    '::selection': {
      bg: 'crimson.600',
      color: 'white',
    },
    ':focus-visible': {
      outline: '3px solid',
      outlineColor: 'crimson.500',
      outlineOffset: '2px',
    },
    img: {
      maxW: '100%',
    },
  },
})
