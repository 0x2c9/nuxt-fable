# Nuxt Fable

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module to view and work on components in isolation with Vue SFCs.

> [!WARNING]
> This is a small tool I built for myself. It's not tested and not optimized. There are probably a lot of bugs and edge cases. I apply fixes and features as I need them.

## Quick Setup

1. Add `nuxt-fable` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-fable

# Using yarn
yarn add --dev nuxt-fable

# Using npm
npm install --save-dev nuxt-fable
```

2. Add `nuxt-fable` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
	modules: [
		'nuxt-fable'
	]
})
```

3. Create a `stories` folder in the root of your project and add SFCs with `.story.vue` like `Button.story.vue`. Define story variants with the provided `<Variant>` component.

```html
<template>
	<Variant title="Button Variants">
		<MyButton primary>Hello World</MyButton>
		<MyButton secondary>Hello World</MyButton>
	</Variant>
	<Variant title="Button Sizes">
		<MyButton primary size="sm">Small Button</MyButton>
		<MyButton primary size="default">Default Button</MyButton>
		<MyButton primary size="large">Large Button</MyButton>
	</Variant>
</template>
```

If you want to use the whole page for a story use the `page-mode` prop for the  `<Variant>` component.

```html
<template>
	<Variant title="Authentication Form" :page-mode="true">
		<form>
			<!-- .... -->
		</form>
	</Variant>
</template>
```

To see your stories run your dev server and go to `/story`.

Per default the module won't be included in your build. If you want to deploy the stories too you can set `devOnly: false` in the module options.

```js
export default defineNuxtConfig({
	modules: [
		'nuxt-fable'
	],
	fable: {
		devOnly: false,
	}
})
```

That's it! You can now use Nuxt Fable in your Nuxt app ✨

## Development

```bash
# Install dependencies
pnpm install

# Develop with the playground
pnpm run dev

# Release new version
pnpm run prerelease

# because changelogen reformats package.json
pnpm run lint:fix

# Commit and tag the new version
git add . && git commit -m "Release v0.0.0" && git tag v0.0.0

pnpm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-fable/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-fable

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-fable.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-fable

[license-src]: https://img.shields.io/npm/l/nuxt-fable.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-fable

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
