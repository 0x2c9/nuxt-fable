import type { IStory, ITreeItem } from './types'

declare module '#app' {
	interface NuxtApp {
		$storiesTree: ITreeItem[]
		$stories: IStory[]
	}
}
