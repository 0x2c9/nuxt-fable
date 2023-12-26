<script setup lang="ts">
import type { NUXT_FABLE_ICONS } from '../composables/useNfIcons'
import { computed } from '#imports'

const { size = '20', name = '' } = defineProps<IBaseIcon>()

interface IBaseIcon {
	name: keyof typeof NUXT_FABLE_ICONS
	size?: string
}

const computedIconName = computed(() => {
	if (!name) {
		return ''
	}
	return `#${name}`
})

const computedIconSize = computed(() => {
	return `${size}px`
})
</script>

<template>
	<svg
		v-if="computedIconName"
		viewBox="0 0 100 100"
		class="icon"
	>
		<use :xlink:href="computedIconName" />
	</svg>
</template>

<style scoped>
svg {
	width: v-bind(computedIconSize);
	height: v-bind(computedIconSize);
}
</style>
