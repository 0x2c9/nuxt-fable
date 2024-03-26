import type { ComponentPublicInstance } from '#imports'

export type IStory = {
	name: string
	path: string
	component: ComponentPublicInstance
	variants: IStoryVariant[]
}

export type IStoryVariant = {
	name: string
	component: string
	variantName: string
	isVariant: boolean
}

export type ITreeItem = {
	name: string
	children?: ITreeItem[]
	component?: string
	variants?: IStoryVariant[]
}
