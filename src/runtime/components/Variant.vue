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
		class="nf-rounded nf-border nf-border-neutral-600"
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
					class="active:nf-scale-95 nf-transition nf-transform active:nf-text-neutral-400"
					@click="onZoom('out')"
				>
					<NfIcons
						name="zoom-out"
						size="16"
					/>
				</button>
				<button
					class="active:nf-scale-95 nf-transition-transform nf-transform active:nf-text-neutral-400"
					@click="onZoom('reset')"
				>
					<NfIcons
						name="zoom-reset"
						size="16"
					/>
				</button>
				<button
					class="active:nf-scale-95 nf-transition nf-transform active:nf-text-neutral-400"
					@click="onZoom('in')"
				>
					<NfIcons
						name="zoom-in"
						size="16"
					/>
				</button>
			</div>
		</header>
		<div
			class="nf-h-full nf-w-full nf-relative"
			:style="{
				maxHeight: computedMaxHeight,
				overflow: zoomLevel === 1 ? 'hidden' : 'scroll',
				backgroundColor: 'var(--variant-background-color)',
			}"
		>
			<div
				ref="variantStage"
				:class="{
					'zoom nf-flex nf-flex-wrap nf-gap-20 nf-p-8 nf-items-end': !pageMode,
				}"
				:style="{
					zoom: zoomLevel,
				}"
			>
				<slot />
			</div>
		</div>
	</div>
</template>
