import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import Unocss from 'unocss/astro'
import UnocssVite from 'unocss/vite'

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap(),vue({
		plugins: [UnocssVite()]
	}),Unocss()],
});
