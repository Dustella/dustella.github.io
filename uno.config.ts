import transformerVariantGroup from '@unocss/transformer-variant-group'
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...
  transformers: [
    transformerVariantGroup(),
  ],
})
