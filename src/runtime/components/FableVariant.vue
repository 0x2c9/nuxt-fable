<script setup lang="ts">
import { computed, ref, useRoute } from '#imports'

interface IVariant {
	title?: string
	pageMode?: boolean
}
const props = defineProps<IVariant>()

const route = useRoute()

const variantStage = ref<HTMLElement | null>(null)

const isSingleVariant = computed(() => {
	return route.query.variant === props.title
})

const computedShow = computed(() => {
	if (!route.query.variant)
		return true

	return route.query.variant === props.title
})
const zoomLevel = ref(1)

const computedMaxHeight = computed(() => {
	if (!variantStage.value) {
		return 'none'
	}

	if (isSingleVariant.value) {
		// if its single variant max height can go to the bottom of the screen
		return 'calc(100vh - 200px)'
	}

	const rect = variantStage.value.getBoundingClientRect()
	return `${rect.height + 300}px`
})
function onZoom(direction: 'in' | 'out' | 'reset') {
	if (!variantStage.value)
		return

	if (direction === 'reset') {
		zoomLevel.value = 1
		return
	}

	if (direction === 'in') {
		zoomLevel.value += 0.3
	} else {
		zoomLevel.value -= 0.3
	}
}
</script>

<template>
	<div
		v-if="computedShow"
		:class="{
			'nf-rounded nf-border nf-border-neutral-600 nf-overflow-hidden': !pageMode,
		}"
	>
		<header
			v-if="title"
			class="nf-border-b nf-border-b-neutral-600 nf-px-4 nf-py-2 nf-flex nf-justify-between nf-items-center"
		>
			<h2 class="nf-text font-bold ">
				{{ title }}
			</h2>

			<div
				v-if="!pageMode"
				class="nf-flex nf-gap-4 nf-text-neutral-500 "
			>
				<button
					class="active:nf-scale-95 nf-transition nf-transform active:nf-text-neutral-400 nf-size-6"
					@click="onZoom('out')"
				>
					<svg viewBox="0 0 32 32">
						<path
							fill="currentColor"
							d="M16 19h8v2h-8z"
						/>
						<path
							fill="currentColor"
							d="m31 29.586l-4.688-4.688a8.028 8.028 0 1 0-1.415 1.414L29.586 31zM20 26a6 6 0 1 1 6-6a6.007 6.007 0 0 1-6 6M4 8H2V4a2.002 2.002 0 0 1 2-2h4v2H4zm22 0h-2V4h-4V2h4a2.002 2.002 0 0 1 2 2zM12 2h4v2h-4zM8 26H4a2.002 2.002 0 0 1-2-2v-4h2v4h4zM2 12h2v4H2z"
						/>
					</svg>
				</button>
				<button
					class="active:nf-scale-95 nf-transition-transform nf-transform active:nf-text-neutral-400 nf-size-6"
					@click="onZoom('reset')"
				>
					<svg viewBox="0 0 32 32">
						<path
							fill="currentColor"
							d="M22.448 21A10.855 10.855 0 0 0 25 14A10.99 10.99 0 0 0 6 6.466V2H4v8h8V8H7.332a8.977 8.977 0 1 1-2.1 8h-2.04A11.012 11.012 0 0 0 14 25a10.855 10.855 0 0 0 7-2.552L28.586 30L30 28.586Z"
						/>
					</svg>
				</button>
				<button
					class="active:nf-scale-95 nf-transition nf-transform active:nf-text-neutral-400 nf-size-6"
					@click="onZoom('in')"
				>
					<svg
						id="carbon-zoom-in-area"
						viewBox="0 0 32 32"
					>
						<path
							fill="currentColor"
							d="M24 19h-3v-3h-2v3h-3v2h3v3h2v-3h3z"
						/>
						<path
							fill="currentColor"
							d="m31 29.586l-4.688-4.688a8.028 8.028 0 1 0-1.415 1.414L29.586 31zM20 26a6 6 0 1 1 6-6a6.007 6.007 0 0 1-6 6M4 8H2V4a2.002 2.002 0 0 1 2-2h4v2H4zm22 0h-2V4h-4V2h4a2.002 2.002 0 0 1 2 2zM12 2h4v2h-4zM8 26H4a2.002 2.002 0 0 1-2-2v-4h2v4h4zM2 12h2v4H2z"
						/>
					</svg>
				</button>
			</div>
		</header>
		<div
			class="nf-h-full nf-w-full nf-relative"
			:style="{
				maxHeight: computedMaxHeight,
				overflow: zoomLevel === 1 ? 'hidden' : 'scroll',
				backgroundColor: !pageMode ? 'var(--variant-background-color)' : 'transparent',
			}"
		>
			<div
				ref="variantStage"
				:class="{
					'zoom nf-flex nf-flex-col nf-items-start lg:nf-flex-row lg:nf-flex-wrap  nf-gap-4 lg:nf-gap-20 nf-p-2 lg:nf-p-8 lg:nf-items-end': !pageMode,
				}"
				:style="{
					zoom: zoomLevel,
				}"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>
