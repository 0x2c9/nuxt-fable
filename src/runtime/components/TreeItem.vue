<script setup lang="ts">
import type { IStory, IStoryVariant } from '../../types'

import NfIcons from './NfIcons.vue'
import { computed, ref, useRoute } from '#imports'

const props = defineProps<{
	item: any
	level: number
	activeFile: string
}>()

const emits = defineEmits<{
	(event: 'selectStory', story: IStory): void
	(event: 'selectVariant', variant: IStoryVariant): void
}>()

const route = useRoute()
const folderIsOpen = ref(true)
const variantsIsOpen = ref(false)

const isFolder = computed(() => {
	return props.item.children?.length > 0
})

const hasVariants = computed(() => {
	return props.item.variants?.length > 0
})
const treeSpacing = ['nf-pl-0', 'nf-pl-2', 'nf-pl-4', 'nf-pl-6', 'nf-pl-8', 'nf-pl-10']
const computedTreeSpacing = computed(() => {
	const spacing = treeSpacing[props.level]

	return {
		[spacing]: true,
	}
})

function activeClass(variant: IStoryVariant) {
	const isActive = route.query?.component === props.item.name && route.query?.variant === variant.variantName

	return {
		'nf-text-white font-bold': isActive,
		'nf-text-neutral-500': !isActive,
	}
}

const computedVariantItemClass = computed(() => {
	const spacing = treeSpacing[props.level + 1]

	return {
		[spacing]: true,
	}
})

function onTreeItemClick() {
	if (isFolder.value) {
		folderIsOpen.value = !folderIsOpen.value
		return
	}

	emits('selectStory', props.item)
}

function onCollapseClick() {
	variantsIsOpen.value = !variantsIsOpen.value
}

function onSelectVariant(variant: IStoryVariant) {
	if (route.query?.variant === variant.variantName) {
		emits('selectStory', props.item)
		return
	}
	emits('selectVariant', variant)
}

const computedComponentName = computed(() => {
	return route.query?.component as string
})
</script>

<template>
	<li>
		<div
			v-if="item.name"
			:class="{
				'nf-bg-neutral-800': props.activeFile === props.item.name,
				...computedTreeSpacing,
			}"
			class="nf-flex nf-cursor-pointer nf-select-none nf-items-center nf-py-1.5 nf-pr-4 hover:nf-bg-neutral-600"
			@click="onTreeItemClick"
		>
			<NfIcons
				v-if="isFolder && folderIsOpen"
				name="ph-folder-notch-open-duotone"
				size="24"
			/>

			<NfIcons
				v-else-if="isFolder && !folderIsOpen"
				name="ph-folder-notch-duotone"
				size="24"
			/>

			<NfIcons
				v-else
				name="uim-layer-group"
			/>
			<span class="nf-ml-2"> {{ item.name }}</span>
			<button
				v-if="!isFolder && hasVariants"
				class="nf-ml-auto nf-text-neutral-300"
				@click.stop="onCollapseClick"
			>
				<NfIcons
					name="heroicons-chevron-up-down-20-solid"
					size="16"
				/>
			</button>
		</div>
		<ul
			v-if="item.variants && item.variants.length && variantsIsOpen"
		>
			<li
				v-for="variant of item.variants"
				:key="variant.variantName"
				class="nf-flex nf-items-center nf-relative nf-py-1.5 hover:nf-text-white nf-cursor-pointer nf-select-none nf-group nf-pr-4"
				:class="[computedVariantItemClass, activeClass(variant)]"
				@click="onSelectVariant(variant)"
			>
				<NfIcons
					name="radix-icons-component-placeholder"
				/>
				<span class="nf-ml-2 nf-text-sm"> {{ variant.variantName }}</span>
			</li>
		</ul>
		<ul
			v-show="folderIsOpen"
			v-if="isFolder"
		>
			<TreeItem
				v-for="(child, index) in item.children"
				:key="index"
				:level="level + 1"
				:class="`${level + 1}`"
				:item="child"
				:active-file="computedComponentName"
				@select-story="emits('selectStory', $event)"
				@select-variant="emits('selectVariant', $event)"
			/>
		</ul>
	</li>
</template>
