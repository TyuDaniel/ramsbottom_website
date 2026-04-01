import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const GALLERY_DIR = 'public/media/gallery_images'
const VIRTUAL_ID = 'virtual:gallery-images'
const RESOLVED_ID = '\0' + VIRTUAL_ID

function galleryImagesPlugin() {
  return {
    name: 'gallery-images',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      const dir = path.resolve(__dirname, GALLERY_DIR)
      const files = fs.existsSync(dir)
        ? fs.readdirSync(dir).filter(f => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f))
        : []
      const paths = files.map(f => `/media/gallery_images/${f}`)
      return `export default ${JSON.stringify(paths)}`
    },
    configureServer(server) {
      const dir = path.resolve(__dirname, GALLERY_DIR)
      fs.watch(dir, () => {
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), galleryImagesPlugin()],
})
