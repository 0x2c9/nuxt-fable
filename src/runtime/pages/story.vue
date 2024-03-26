<script setup lang="ts">
// No docs, no issues, nothing about how to use a layout inside a module
// eslint-disable-next-line antfu/no-import-dist, antfu/no-import-node-modules-by-path
import { definePageMeta } from '../../../node_modules/nuxt/dist/pages/runtime/composables'
import type { IStory, IStoryVariant } from '../../types'
import FableTreeItem from '../components/FableTreeItem.vue'

import {
	computed,
	onMounted,
	onUnmounted,
	ref,
	shallowRef,
	useNuxtApp,
	useRoute,
	useRouter,
} from '#imports'

definePageMeta({
	layout: 'story-layout',
})

const { $storiesTree, $stories } = useNuxtApp()
const selectedStory = shallowRef<IStory | IStoryVariant | null>(null)
const router = useRouter()
const route = useRoute()

const storyEl = ref<HTMLDivElement>()
const minWidth = ref(320)

const openMenu = ref(false)
const isMobile = ref(false)

if (import.meta.client) {
	window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
	if (window.innerWidth < 1024) {
		isMobile.value = true
		return
	}

	isMobile.value = false
}

const showSidebar = computed(() => {
	return !isMobile.value || openMenu.value
})

const computedComponent = computed(() => {
	return selectedStory.value?.component
})

function setSelectedStory(story: IStory) {
	selectedStory.value = story
	router.push(`?component=${story.name}`)
	if (isMobile.value) {
		openMenu.value = false
	}
}

function setSelectedVariant(storyVariant: IStoryVariant) {
	router.push(`?component=${storyVariant.name}&variant=${storyVariant.variantName}`)
	selectedStory.value = storyVariant
	if (isMobile.value) {
		openMenu.value = false
	}
}

const openTree = ref(true)
const showIntro = ref(false)
const variantBackgroundColor = ref('#000000')

const computedStoryElStyle = computed(() => {
	if (isMobile.value) {
		return {
			gridTemplateColumns: `auto`,
		}
	}

	return {
		gridTemplateColumns: `${minWidth.value}px 1px auto`,
	}
})

onMounted(() => {
	if (window.innerWidth < 1024) {
		isMobile.value = true
	}

	const savedVariantColor = localStorage.getItem('variant-background-color')
	if (savedVariantColor) {
		variantBackgroundColor.value = savedVariantColor
		document.documentElement.style.setProperty('--variant-background-color', savedVariantColor)
	}

	document.documentElement.classList.add('nuxt-fable')
	if (!$stories || $stories.length === 0) {
		showIntro.value = true
		return
	}
	const story = $stories.find((story) => story.name === route.query.component)

	if (route.query.component && route.query.variant) {
		const variant = story?.variants?.find((variant) => variant.name === route.query.variant)
		if (variant) {
			setSelectedVariant(variant)
			return
		}
	}

	if (story) {
		setSelectedStory(story)
		return
	}

	setSelectedStory($stories[0])
})

onUnmounted(() => {
	document.documentElement.classList.remove('nuxt-fable')
	window.removeEventListener('resize', onWindowResize)
})

const computedActiveFile = computed(() => {
	return route.query.component as string || null
})

function onMousedown() {
	document.addEventListener('mousemove', resize, false)
	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', resize, false)
	}, false)
}

function resize(e: MouseEvent) {
	if (!storyEl.value)
		return

	const sidebarWidth = e.clientX

	if (sidebarWidth < minWidth.value)
		return

	storyEl.value.style.gridTemplateColumns = `${sidebarWidth}px 1px auto`
}

function onColorChange($event: Event) {
	if (!$event.target) {
		return
	}

	const color = ($event.target as HTMLInputElement).value
	document.documentElement.style.setProperty('--variant-background-color', color)

	localStorage.setItem('variant-background-color', color)
	variantBackgroundColor.value = color
}
</script>

<template>
	<div
		ref="storyEl"
		class="nf-absolute nf-inset-0 nf-grid nf-grid-rows-[1fr] nf-overflow-hidden"
		:style="computedStoryElStyle"
	>
		<Transition
			name="fade"
			mode="out-in"
		>
			<aside
				v-show="showSidebar"
				class="nf-h-full nf-border-r nf-border-neutral-800/80 nf-bg-neutral-900 nf-pt-2 lg:nf-px-0 lg:nf-pt-12 nf-absolute nf-z-50 nf-inset-0 nf-transition lg:nf-relative lg:nf-inset-y-auto lg:nf-left-auto nf-flex nf-flex-col"
			>
				<ClientOnly>
					<button
						class="lg:nf-hidden nf-ml-4 nf-w-auto nf-self-start nf-mb-8 nf-size-6"
						@click="openMenu = !openMenu"
					>
						<svg viewBox="0 0 32 32">
							<path
								fill="currentColor"
								d="M4 6h24v2H4zm0 18h24v2H4zm0-12h24v2H4zm0 6h24v2H4z"
							/>
						</svg>
					</button>

					<ul v-if="computedActiveFile">
						<FableTreeItem
							:active-file="computedActiveFile"
							:item="$storiesTree"
							:open="openTree"
							:level="0"
							@select-story="setSelectedStory"
							@select-variant="setSelectedVariant"
						/>
					</ul>
				</ClientOnly>
			</aside>
		</Transition>
		<div
			class="nf-hidden lg:nf-block group nf-relative nf-inset-y-0 nf-left-[-8px] nf-w-4 nf-z-50 nf-cursor-col-resize"
			@mousedown="onMousedown"
		>
			<div
				class="nf-mx-auto nf-h-full nf-w-[1px] nf-transition nf-duration-500 nf-ease-out group-hover:nf-bg-primary"
			></div>
		</div>
		<main class="nf-relative nf-flex nf-h-full nf-flex-col nf-overflow-y-auto nf-px-2 lg:nf-px-8 nf-pb-2">
			<Transition
				name="fade"
				mode="out-in"
			>
				<div v-if="selectedStory && computedComponent">
					<header
						class="nf-py-2 nf-items-center nf-flex nf-justify-between nf-border-b nf-border-neutral-600 nf-absolute nf-top-0 nf-inset-x-0 nf-px-4 lg:nf-px-8"
					>
						<div class="nf-flex nf-items-center nf-gap-4">
							<button
								class="lg:nf-hidden nf-self-start nf-size-6"
								@click="openMenu = !openMenu"
							>
								<svg viewBox="0 0 32 32">
									<path
										fill="currentColor"
										d="M4 6h24v2H4zm0 18h24v2H4zm0-12h24v2H4zm0 6h24v2H4z"
									/>
								</svg>
							</button>
							<h1 class="nf-text-sm">
								{{ selectedStory.name }}
							</h1>
						</div>

						<div>
							<div class="nf-overflow-hidden nf-rounded-full nf-w-5 nf-h-5 nf-relative nf-border nf-border-neutral-500">
								<input
									v-model="variantBackgroundColor"
									class="nf-bg-transparent nf-w-full nf-h-full nf-border-none nf-outline-none nf-absolute nf-top-0 nf-left-0 nf-cursor-pointer nf-transform nf-scale-[5]"
									type="color"
									@input="onColorChange"
								>
							</div>
						</div>
					</header>
					<div class="nf-space-y-4 lg:nf-space-y-16 nf-pt-16">
						<Component :is="computedComponent" />
					</div>
				</div>

				<div
					v-else
					class="m-auto"
				>
					<ul>
						<h1>No stories found.</h1>
						<ul>
							<li>
								Create a <code>stories</code> folder in your root.
							</li>
							<li>
								Create your first story component in <code>stories/MyComponent.stories.vue</code>
							</li>
						</ul>
					</ul>
				</div>
			</Transition>
		</main>
	</div>
</template>
