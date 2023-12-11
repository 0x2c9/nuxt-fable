import tailwindPlaygroundConfig from './tailwind.config'

export default defineNuxtConfig({
	css: [
		'~/assets/styles.css',
	],
	experimental: {
		payloadExtraction: false,
	},
	postcss: {
		plugins: {
			tailwindcss: tailwindPlaygroundConfig,
			autoprefixer: {},
		},
	},
	modules: [
		'../src/module',
		'nuxt-icon',
	],
	fable: {
		devOnly: false,
	},
	ssr: false,
	imports: {
		autoImport: true,
	},
})
