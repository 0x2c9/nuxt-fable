import type { Config } from 'tailwindcss'

export default {
	content: [
		'./playground/stories/**/*.vue',
		'./playground/components/**/*.vue',
		'./playground/layouts/**/*.vue',
		'./playground/pages/**/*.vue',
		'./playground/composables/**/*.ts',
		'./playground/app.vue',
	],
	theme: {
		fontFamily: {
			inter: ['Inter', 'monospace'],
		},
	},
	corePlugins: {
		textOpacity: false,
		backgroundOpacity: false,
		borderOpacity: false,
	},
} satisfies Config
