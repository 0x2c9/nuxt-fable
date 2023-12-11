export interface IStory {
	name: string
	path: string
	component: any
	variants: IStoryVariant[]
}

export interface IStoryVariant {
	name: string
	component: string
	variantName: string
	variantComponent: string
	isVariant: boolean
}

export interface ITreeItem {
	name: string
	children?: ITreeItem[]
	component?: string
	variants?: any[]
}
