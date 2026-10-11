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
          chunkSizeWarningLimit: 2000,
        }
      : {
          outDir: 'dist',
          assetsInlineLimit: 4096,
          // One page, one bundle: React, framer-motion and the Panda runtime come to ~165 kB gzipped.
          chunkSizeWarningLimit: 700,
        },
  }
})
