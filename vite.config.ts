import { existsSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// `vite build --mode single` produces one self-contained HTML file (see scripts/inline-build.mjs).
// In that mode every photo resolves to its small variant to keep the file small.
function smallImagesForSingleFile(): Plugin {
  return {
    name: 'single-file-small-images',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!source.endsWith('.webp') || source.endsWith('-sm.webp')) return null
      const resolved = await this.resolve(source, importer, { ...options, skipSelf: true })
      if (!resolved || !resolved.id.includes('/assets/images/')) return resolved
      const small = resolved.id.replace(/\.webp$/, '-sm.webp')
      return existsSync(small) ? small : resolved
    },
  }
}

export default defineConfig(({ mode }) => {
  const single = mode === 'single'
  return {
    base: './',
    plugins: [react(), single && smallImagesForSingleFile()],
    build: single
      ? {
          outDir: 'dist-single',
          assetsInlineLimit: () => true,
          cssCodeSplit: false,
          modulePreload: false,
          rolldownOptions: { output: { codeSplitting: false } },
          // Every photo, font and the logo are inlined, so the one bundle is big by design.
          chunkSizeWarningLimit: 4000,
        }
      : {
          outDir: 'dist',
          // Photos are always separate files (smaller script, and each one can retry on its own).
          assetsInlineLimit: (file: string) => (/\.(webp|jpe?g|png|avif)$/i.test(file) ? false : undefined),
          // No content hashes in file names. GitHub Pages caches every file for about ten
          // minutes and each deploy replaces the whole site, so a hashed name from the last
          // deploy that's still cached in someone's browser would point at a file that's gone
          // (broken photos or a blank page). With fixed names every file is always there.
          rolldownOptions: {
            output: {
              entryFileNames: 'assets/[name].js',
              chunkFileNames: 'assets/[name].js',
              assetFileNames: (asset) => (/\.(webp|jpe?g|png|avif)$/i.test(asset.names?.[0] ?? '') ? 'assets/photos/[name][extname]' : 'assets/[name][extname]'),
            },
          },
          // One page, one bundle: React, framer-motion and the Panda runtime come to ~165 kB gzipped.
          chunkSizeWarningLimit: 700,
        },
  }
})
