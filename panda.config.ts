import { defineConfig } from '@pandacss/dev'
import pandaBase from '@pandacss/preset-base'
import pandaPreset from '@pandacss/preset-panda'

export default defineConfig({
  presets: [pandaBase, pandaPreset],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',

  conditions: {
    extend: {
      motionSafe: '@media (prefers-reduced-motion: no-preference)',
      motionReduce: '@media (prefers-reduced-motion: reduce)',
      canHover: '@media (hover: hover) and (pointer: fine)',
      lit: '[data-lit=true] &',
    },
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          navy: {
            950: { value: '#040814' },
            900: { value: '#070E22' },
            850: { value: '#0A1430' },
            800: { value: '#0E1B3D' },
            700: { value: '#14264F' },
            600: { value: '#1D3466' },
            500: { value: '#2A4682' },
            400: { value: '#4A66A6' },
          },
          crimson: {
            300: { value: '#FF95A3' },
            400: { value: '#FF4D66' },
            500: { value: '#E3173A' },
            600: { value: '#C20F2E' },
            700: { value: '#940B23' },
          },
          spark: {
            200: { value: '#FFE7C2' },
            300: { value: '#FFD08A' },
            400: { value: '#FFB547' },
            500: { value: '#F59A1B' },
            600: { value: '#D47A0B' },
          },
          // UK cable core colours, used for the "wire" motif.
          wire: {
            brown: { value: '#9A5A35' },
            blue: { value: '#2F7BFF' },
            earth: { value: '#2FC26B' },
            yellow: { value: '#F6D23A' },
            grey: { value: '#8E98AD' },
            copper: { value: '#E08A4F' },
          },
          paper: {
            50: { value: '#FBFAF7' },
            100: { value: '#F4F2ED' },
            200: { value: '#E8E5DC' },
            300: { value: '#D3CFC3' },
          },
          ink: {
            50: { value: '#F2F5FB' },
            100: { value: '#DCE3F2' },
            200: { value: '#B9C4DD' },
            300: { value: '#8E9BBA' },
            400: { value: '#68769A' },
            500: { value: '#4B5878' },
          },
        },
        fonts: {
          display: { value: "'Archivo Variable', 'Archivo', system-ui, sans-serif" },
          body: { value: "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif" },
          mono: { value: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" },
        },
        easings: {
          out: { value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
          inOut: { value: 'cubic-bezier(0.65, 0, 0.35, 1)' },
          snap: { value: 'cubic-bezier(0.2, 0.9, 0.1, 1.2)' },
        },
        radii: {
          card: { value: '28px' },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: { value: '{colors.navy.950}' },
            surface: { value: '{colors.navy.900}' },
            raised: { value: '{colors.navy.800}' },
            paper: { value: '{colors.paper.100}' },
          },
          fg: {
            default: { value: '#FFFFFF' },
            muted: { value: '{colors.ink.200}' },
            subtle: { value: '{colors.ink.300}' },
            onPaper: { value: '{colors.navy.900}' },
            onPaperMuted: { value: '{colors.ink.500}' },
          },
          accent: {
            default: { value: '{colors.crimson.500}' },
            hover: { value: '{colors.crimson.400}' },
          },
          line: {
            subtle: { value: 'rgba(255, 255, 255, 0.08)' },
            default: { value: 'rgba(255, 255, 255, 0.14)' },
            strong: { value: 'rgba(255, 255, 255, 0.28)' },
            paper: { value: 'rgba(7, 14, 34, 0.12)' },
          },
        },
      },
      textStyles: {
        display: {
          value: {
            fontFamily: 'display',
            fontWeight: '800',
            fontStretch: '108%',
            lineHeight: '0.9',
            letterSpacing: '-0.035em',
            fontSize: 'clamp(2.9rem, 7.4vw, 7.6rem)',
          },
        },
        title: {
          value: {
            fontFamily: 'display',
            fontWeight: '780',
            fontStretch: '104%',
            lineHeight: '0.96',
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2.3rem, 5.2vw, 4.75rem)',
          },
        },
        subtitle: {
          value: {
            fontFamily: 'display',
            fontWeight: '700',
            lineHeight: '1.08',
            letterSpacing: '-0.02em',
            fontSize: 'clamp(1.45rem, 2.2vw, 2rem)',
          },
        },
        eyebrow: {
          value: {
            fontFamily: 'mono',
            fontSize: '0.75rem',
            fontWeight: '500',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            lineHeight: '1.4',
          },
        },
        lead: {
          value: {
            fontSize: 'clamp(1.05rem, 1.3vw, 1.22rem)',
            lineHeight: '1.62',
          },
        },
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.6)', opacity: '0.9' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        flicker: {
          '0%': { opacity: '0' },
          '8%': { opacity: '1' },
          '10%': { opacity: '0.15' },
          '18%': { opacity: '1' },
          '22%': { opacity: '0.35' },
          '30%, 100%': { opacity: '1' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        dash: {
          to: { strokeDashoffset: '0' },
        },
        scrollCue: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(260%)' },
        },
        current: {
          from: { strokeDashoffset: '0' },
          to: { strokeDashoffset: '-1000' },
        },
      },
    },
  },

  globalCss: {
    html: {
      bg: 'bg.canvas',
      color: 'fg.default',
      fontFamily: 'body',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      scrollPaddingTop: '96px',
    },
    body: {
      bg: 'bg.canvas',
      overflowX: 'clip',
      lineHeight: '1.6',
    },
    '::selection': {
      bg: 'crimson.500',
      color: 'white',
    },
    'a, button': {
      WebkitTapHighlightColor: 'transparent',
    },
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: 'spark.400',
      outlineOffset: '3px',
    },
    img: {
      maxW: '100%',
    },
    'html.lenis, html.lenis body': {
      height: 'auto',
    },
    '.lenis.lenis-smooth': {
      scrollBehavior: 'auto !important',
    },
    '.lenis.lenis-stopped': {
      overflow: 'hidden',
    },
  },
})
