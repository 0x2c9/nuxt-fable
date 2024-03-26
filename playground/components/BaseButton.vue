<script setup lang="ts">
const props = withDefaults(defineProps<IButtonProps>(), {
	variant: 'primary',
})

interface IButtonProps {
	type?: 'submit' | 'button' | 'reset'
	variant?: 'primary' | 'secondary'
	small?: boolean
	to?: string
}

const computedButtonType = computed(() => props.to ? undefined : props.type)

const component = computed(() => {
	if (props.to) {
		return resolveComponent('NuxtLink')
	}

	return 'button'
})

const computedButtonClasses = computed(() => {
	return {
		'bg-white text-neutral-950 before:ring-neutral-300/90 after:hover:bg-neutral-100/50 after:active:bg-neutral-200/40': props.variant === 'primary',
		'bg-neutral-800 text-white before:ring-neutral-950/90 after:hover:bg-neutral-900/10 after:active:bg-neutral-900/20': props.variant === 'secondary',
		'px-3 h-10': !props.small,
		'px-2.5 h-8': props.small,
	}
})
</script>

<template>
	<component
		:is="component"
		:to="to"
		:type="computedButtonType"
		:class="computedButtonClasses"
		class="
      flex
      items-center
      relative
      rounded

      text-sm
      font-semibold
      shadow-[inset_0_1px_0_0_#ffffff1e]

      before:absolute
      before:inset-0
      before:rounded-md
      before:mix-blend-multiply
      before:shadow-sm
      before:ring-1

      after:hover:absolute
      after:hover:inset-0
      after:hover:rounded-md
    "
	>
		<span class="relative z-10 flex items-center">

			<slot></slot>

		</span>
	</component>
</template>
