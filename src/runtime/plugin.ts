import { defineNuxtPlugin } from '#app'
import { defineAsyncComponent } from '#imports'
import type { IStory, ITreeItem } from '@/src/types'

export default defineNuxtPlugin(async (_nuxtApp) => {
	const storyModules = import.meta.glob('/stories/**/*.story.vue')

	const storiesTree = {} as ITreeItem
	const stories = [] as IStory[]
	try {
		for (const storyPath in storyModules) {
			const storyVariants = []
			const storyPathParts = storyPath.split('/').splice(2)
			const storyTitle = storyPathParts.slice(-1)[0].split('.')[0]
			const storyComponentImport = storyModules[storyPath] as () => Promise<{ default: any }>
			const storyComponent = defineAsyncComponent(storyComponentImport)

			const storyCompomentImport = await storyComponentImport()

			if (storyCompomentImport?.default?.render) {
				const r = storyCompomentImport.default.render()

				if (r.children?.length > 1) {
					for (const variant of r.children) {
						storyVariants.push({
							name: storyTitle,
							component: storyComponent,
							variantName: variant.props?.title,
							isVariant: true,
						})
					}
				}
			}

			let currentTree = storiesTree
			for (let i = 0; i < storyPathParts.length; i++) {
				const pathPart = storyPathParts[i]
				const isFolder = !pathPart.includes('.vue')

				if (!currentTree.children && isFolder) {
					currentTree.children = []
				}

				let folder = currentTree.children?.find((child) => child.name === pathPart)
				if (!folder && isFolder) {
					folder = {
						name: pathPart,
						children: [],
					}
					if (currentTree.children) {
						currentTree.children.push(folder)
					}
				} else if (!isFolder) {
					const storyEntr = {
						name: storyTitle,
						path: storyPath,
						component: storyComponent,
						variants: storyVariants,
					}

					if (!currentTree.children) {
						currentTree.children = []
					}
					currentTree.children.push(storyEntr)
				}

				if (isFolder && folder) {
					currentTree = folder
				}
			}

			stories.push({
				name: storyTitle,
				path: storyPath,
				component: storyComponent,
				variants: storyVariants,
			})
		}
	} catch (error) {
		console.error(error)
	}

	return {
		provide: {
			stories,
			storiesTree,
		},
	}
})
