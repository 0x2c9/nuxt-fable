<script setup lang="ts">
import type { IStory, IStoryVariant } from '../../types'
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

const validItemVariants = computed(() => {
	return props.item.variants?.filter((variant: IStoryVariant) => {
		return !!variant.variantName
	})
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
			<svg
				v-if="isFolder && folderIsOpen"
				id="ph-folder-notch-open-duotone"
				class="nf-size-6"
				viewBox="0 0 256 256"
			>
				<g fill="currentColor">
					<path
						d="M208 88v24h-61.58a8.07 8.07 0 0 0-4.44 1.34l-20 13.32a8.07 8.07 0 0 1-4.44 1.34H69.42a8 8 0 0 0-7.42 5l-30 75V64a8 8 0 0 1 8-8h53.33a8 8 0 0 1 4.8 1.6l27.74 20.8a8 8 0 0 0 4.8 1.6H200a8 8 0 0 1 8 8"
						opacity=".2"
					/>
					<path
						d="M245 110.64a16 16 0 0 0-13-6.64h-16V88a16 16 0 0 0-16-16h-69.33l-27.73-20.8a16.14 16.14 0 0 0-9.6-3.2H40a16 16 0 0 0-16 16v144a8 8 0 0 0 8 8h179.1a8 8 0 0 0 7.59-5.47l28.49-85.47a16.05 16.05 0 0 0-2.18-14.42M93.34 64l27.73 20.8a16.12 16.12 0 0 0 9.6 3.2H200v16h-53.57a16 16 0 0 0-8.88 2.69l-20 13.31H69.42a15.94 15.94 0 0 0-14.86 10.06L40 166.46V64Zm112 136H43.82l25.6-64h48.16a16 16 0 0 0 8.88-2.69l20-13.31H232Z"
					/>
				</g>
			</svg>

			<svg
				v-else-if="isFolder && !folderIsOpen"
				id="ph-folder-notch-duotone"
				class="nf-size-6"
				viewBox="0 0 256 256"
			>
				<g fill="currentColor">
					<path
						d="m128 80l-29.87 22.4a8 8 0 0 1-4.8 1.6H32V64a8 8 0 0 1 8-8h53.33a8 8 0 0 1 4.8 1.6Z"
						opacity=".2"
					/>
					<path
						d="M216 72h-85.33l-27.74-20.8a16.12 16.12 0 0 0-9.6-3.2H40a16 16 0 0 0-16 16v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16M40 64h53.33l21.34 16l-21.34 16H40Zm176 136H40v-88h53.33a16.12 16.12 0 0 0 9.6-3.2L130.67 88H216Z"
					/>
				</g>
			</svg>

			<svg
				v-else
				id="uim-layer-group"
				class="nf-size-6"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12 14.195c-.176 0-.348-.046-.5-.133l-9-5.198a1 1 0 0 1 0-1.732l9-5.194c.31-.177.69-.177 1 0l9 5.194a1 1 0 0 1 0 1.732l-9 5.198a1.002 1.002 0 0 1-.5.133"
					opacity=".25"
				/>
				<path
					fill="currentColor"
					d="m21.5 11.132l-1.964-1.134l-7.036 4.064c-.31.178-.69.178-1 0L4.464 9.998L2.5 11.132a1 1 0 0 0 0 1.732l9 5.198c.31.178.69.178 1 0l9-5.198a1 1 0 0 0 0-1.732"
					opacity=".5"
				/>
				<path
					fill="currentColor"
					d="m21.5 15.132l-1.964-1.134l-7.036 4.064c-.31.178-.69.178-1 0l-7.036-4.064L2.5 15.132a1 1 0 0 0 0 1.732l9 5.198c.31.178.69.178 1 0l9-5.198a1 1 0 0 0 0-1.732"
				/>
			</svg>

			<span class="nf-ml-2"> {{ item.name }}</span>
			<button
				v-if="!isFolder && hasVariants"
				class="nf-ml-auto nf-text-neutral-300 nf-size-6"
				@click.stop="onCollapseClick"
			>
				<svg viewBox="0 0 20 20">
					<path
						fill="currentColor"
						fill-rule="evenodd"
						d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06zm-4.31 9.81l3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
		<ul v-if="item.variants && item.variants.length && variantsIsOpen">
			<li
				v-for="variant of validItemVariants"
				:key="variant.variantName"
				class="nf-flex nf-items-center nf-relative nf-py-1.5 hover:nf-text-white nf-cursor-pointer nf-select-none nf-group nf-pr-4"
				:class="[computedVariantItemClass, activeClass(variant)]"
				@click="onSelectVariant(variant)"
			>
				<svg
					id="radix-icons-component-placeholder"
					class="nf-size-6"
					viewBox="0 0 15 15"
				>
					<g fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M12.803 7.146a.5.5 0 1 1 .707.708a.5.5 0 0 1-.707-.708m-.707 1.415a.5.5 0 1 1-.707.707a.5.5 0 0 1 .707-.707m-1.414 1.414a.5.5 0 1 1-.707.707a.5.5 0 0 1 .707-.707m-1.414 1.414a.5.5 0 1 1-.707.707a.5.5 0 0 1 .707-.707M7.146 13.51a.5.5 0 1 1 .708-.707a.5.5 0 0 1-.708.707"
							clip-rule="evenodd"
						/>
						<path
							d="M2.904 8.56a.5.5 0 1 0 .707.708a.5.5 0 0 0-.707-.707m1.414 1.415a.5.5 0 1 0 .707.707a.5.5 0 0 0-.707-.707m1.414 1.414a.5.5 0 1 0 .707.707a.5.5 0 0 0-.707-.707M2.197 7.854a.5.5 0 0 0 .064-.63a.506.506 0 0 0-.771-.078a.5.5 0 0 0 .707.708M3.61 5.732a.5.5 0 1 0-.707.707a.5.5 0 0 0 .707-.707m1.414-1.414a.5.5 0 1 0-.707.707a.5.5 0 0 0 .707-.707M6.44 2.904a.5.5 0 1 0-.707.707a.5.5 0 0 0 .707-.707M7.854 1.49a.5.5 0 1 0-.708.707a.5.5 0 0 0 .708-.707m1.414 1.414a.5.5 0 1 0-.707.707a.5.5 0 0 0 .707-.707m1.414 1.414a.5.5 0 1 0-.707.707a.5.5 0 0 0 .707-.707m1.414 1.414a.5.5 0 1 0-.707.707a.5.5 0 0 0 .707-.707"
						/>
					</g>
				</svg>

				<span class="nf-ml-2 nf-text-sm"> {{ variant.variantName }}</span>
			</li>
		</ul>
		<ul
			v-show="folderIsOpen"
			v-if="isFolder"
		>
			<FableTreeItem
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
