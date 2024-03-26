import type { Config } from 'tailwindcss'

export default {
	prefix: 'nf-',
	content: [
		'./src/runtime/components/*.vue',
		'./src/runtime/layouts/*.vue',
		'./src/runtime/pages/*.vue',
	],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config
