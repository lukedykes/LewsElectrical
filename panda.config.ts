import { defineConfig } from '@pandacss/dev'
import pandaBase from '@pandacss/preset-base'
import pandaPreset from '@pandacss/preset-panda'

// Colours follow the client's printed flyers (deep navy, signal red, white). The
// layout language (heavy upright condensed capitals, tracked red labels with a
// rule, thick dividers, soft icon tiles) follows the reference site they liked.
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
      keyframes: {
        riseIn: {
          from: { opacity: '0', transform: 'translateY(16px) scale(0.985)' },
          to: { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        zoomIn: {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'none' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
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
            // For small red text on navy or over photos (about 7:1 on navy.950).
            300: { value: '#FF8A99' },
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
            fontWeight: '900',
            textTransform: 'uppercase',
            fontSize: 'clamp(3.1rem, 7.4vw, 6.4rem)',
            lineHeight: '0.88',
            letterSpacing: '-0.012em',
          },
        },
        h2: {
          value: {
            fontFamily: 'heading',
            fontWeight: '800',
            textTransform: 'uppercase',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: '0.92',
            letterSpacing: '-0.008em',
          },
        },
        h3: {
          value: {
            fontFamily: 'heading',
            fontWeight: '800',
            textTransform: 'uppercase',
            fontSize: '1.6rem',
            lineHeight: '1.02',
            letterSpacing: '0',
          },
        },
        kicker: {
          value: {
            fontFamily: 'heading',
            fontWeight: '700',
            textTransform: 'uppercase',
            fontSize: '0.95rem',
            letterSpacing: '0.26em',
            lineHeight: '1.2',
          },
        },
        tracked: {
          value: {
            fontFamily: 'heading',
            fontWeight: '800',
            textTransform: 'uppercase',
            fontSize: '0.98rem',
            letterSpacing: '0.16em',
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
      // Keeps focused elements clear of the phone contact bar.
      scrollPaddingBottom: { base: '5rem', lg: '0' },
      _motionSafe: { scrollBehavior: 'smooth' },
    },
    body: {
      lineHeight: '1.6',
      overflowX: 'clip',
    },
    'p, li, figcaption, summary': {
      textWrap: 'pretty',
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
