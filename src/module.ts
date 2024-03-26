import { addComponent, addLayout, addPlugin, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

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

		const { resolve } = createResolver(import.meta.url)

		addPlugin(resolve('runtime/plugin'))

		nuxt.options.css.push(resolve('runtime/styles.css'))

		addComponent({
			name: 'FableVariant',
			filePath: resolve('runtime/components', 'FableVariant.vue'),
		})

		addLayout(
			{
				src: resolve('runtime/layouts', 'story-layout.vue'),
				write: true,
				filename: 'story-layout.vue',
			},
			'story-layout',
		)

		extendPages((pages) => {
			pages.push({
				name: 'Story',
				path: '/story',
				file: resolve('runtime/pages', 'story.vue'),
			})
		})
	},
})
