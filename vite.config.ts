import path from 'node:path'
import process from 'node:process'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: '/',
    root: 'apps/web',
    define: { process },
    envPrefix: [`VITE_`],
    plugins: [
      vue(),
      tailwindcss(),
      vueDevTools({
        launchEditor: env.VITE_LAUNCH_EDITOR ?? `code`,
      }),
      nodePolyfills({
        include: [`path`, `util`, `timers`, `stream`, `fs`],
      }),
      AutoImport({
        imports: [`vue`, `pinia`, `@vueuse/core`],
        dirs: [`./src/stores`, `./src/utils/toast`, `./src/composables`],
      }),
      Components({
        resolvers: [],
      }),
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, `./apps/web/src`) },
    },
    css: { devSourcemap: true },
    build: {
      outDir: '../../dist',
      emptyOutDir: true,
      rollupOptions: {
        external: [`mermaid`],
        output: {
          chunkFileNames: `assets/js/[name]-[hash].js`,
          entryFileNames: `assets/js/[name]-[hash].js`,
          assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
          globals: { mermaid: `mermaid` },
          manualChunks(id) {
            if (id.includes(`node_modules`)) {
              if (id.includes(`katex`))
                return `katex`
              if (id.includes(`highlight.js`))
                return `hljs`
              if (id.includes(`codemirror`))
                return `codemirror`
              if (id.includes(`prettier`))
                return `prettier`
              const pkg = id
                .split(`node_modules/`)[1]
                .split(`/`)[0]
                .replace(`@`, `npm_`)
              return `vendor_${pkg}`
            }
          },
        },
      },
    },
    publicDir: 'apps/web/public',
  }
})