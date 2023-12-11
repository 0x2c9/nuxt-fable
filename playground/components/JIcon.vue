<script setup lang="ts">
withDefaults(defineProps<IBaseIcon>(), {
	size: '20',
})

const icons = useIcons()

interface IBaseIcon {
	name: keyof typeof icons
	size?: string
}
</script>

<template>
	<Icon
		:name="icons[name]"
		:size="size"
	/>
</template>
