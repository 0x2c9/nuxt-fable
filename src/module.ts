import { fileURLToPath } from 'node:url'
import { addComponentsDir, addImportsDir, addLayout, addPlugin, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export interface ModuleOptions {
	/**
	 * Set to false to deploy stories to production.
	 *
	 * @default true
	 */
	devOnly: boolean
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'nuxt-fable',
		version: '0.0.1',
		configKey: 'fable',
	},
	defaults: {
		devOnly: true,
	},
	async setup(options, nuxt) {
		if (options.devOnly && !nuxt.options.dev)
			return

		const resolver = createResolver(import.meta.url)

		addPlugin(resolver.resolve('./runtime/plugin'))

		nuxt.options.css.push(resolver.resolve('./runtime/styles.css'))

		await addComponentsDir({
			path: resolver.resolve('runtime/components'),
			pathPrefix: false,
			pattern: '**/*.vue',
		})

		const layoutsDir = fileURLToPath(new URL('./runtime/layouts', import.meta.url))

		addLayout(
			{
				src: resolver.resolve(layoutsDir, 'story-layout.vue'),
				write: true,
				filename: 'story-layout.vue',
			},
			'story-layout',
		)

		const pagesDir = fileURLToPath(new URL('./runtime/pages', import.meta.url))
		extendPages((pages) => {
			pages.push({
				name: 'Story',
				path: '/story',
				file: resolver.resolve(pagesDir, 'story.vue'),
			})
		})

		const composablesDir = fileURLToPath(new URL('./runtime/composables', import.meta.url))
		addImportsDir(resolver.resolve(composablesDir))
	},
})
