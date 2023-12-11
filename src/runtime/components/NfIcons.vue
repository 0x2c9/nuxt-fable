<script setup lang="ts">
import { useNfIcons } from '../composables/useNfIcons'

const { size = '20' } = defineProps<{
	name: keyof typeof icons
	size?: string
}
>()

const icons = useNfIcons()
</script>

<template>
	<Icon
		:name="icons[name]"
		:size="size"
	/>
</template>
