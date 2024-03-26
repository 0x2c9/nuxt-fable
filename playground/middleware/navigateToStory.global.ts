import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
	if (to.path === '/story')
		return

	return navigateTo('/story')
})
