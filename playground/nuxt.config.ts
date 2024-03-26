import tailwindPlaygroundConfig from './tailwind.config'

export default defineNuxtConfig({
	css: [
		'~/assets/styles.css',
	],
	devServer: {
		port: 3001,
	},
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
	],
	fable: {
		devOnly: false,
	},
	imports: {
		autoImport: true,
	},
	typescript: {
		strict: true,
	},
})
