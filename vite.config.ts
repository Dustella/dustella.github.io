/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [Unocss({
    theme: {
      colors: {
        'primary': 'hsla(var(--p))',
        'primary-focus': 'hsla(var(--pf))',
        'primary-content': 'hsla(var(--pc))',
        'secondary': 'hsla(var(--s))',
        'secondary-focus': 'hsla(var(--sf))',
        'secondary-content': 'hsla(var(--sc))',
        'accent': 'hsla(var(--a))',
        'accent-focus': 'hsla(var(--af))',
        'accent-content': 'hsla(var(--ac))',
        'neutral': 'hsla(var(--n))',
        'neutral-focus': 'hsla(var(--nf))',
        'neutral-content': 'hsla(var(--nc))',
        'base-100': 'hsla(var(--b1))',
        'base-200': 'hsla(var(--b2))',
        'base-300': 'hsla(var(--b3))',
        'base-content': 'hsla(var(--bc))',
        'info': 'hsla(var(--in))',
        'info-content': 'hsla(var(--inc))',
        'success': 'hsla(var(--su))',
        'success-content': 'hsla(var(--suc))',
        'warning': 'hsla(var(--wa))',
        'warning-content': 'hsla(var(--wac))',
        'error': 'hsla(var(--er))',
        'error-content': 'hsla(var(--erc))',
      }
    }
  })],
  build: {
    target: 'esnext',
    outDir: '../backend/static',
    emptyOutDir: true,
  },

})
