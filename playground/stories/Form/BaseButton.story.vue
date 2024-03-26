<template>
	<FableVariant
		title="Default"
	>
		<BaseButton variant="primary">
			Primary
		</BaseButton>

		<BaseButton
			to="#page"
			variant="secondary"
		>
			Secondary
		</BaseButton>
	</FableVariant>

	<FableVariant
		title="Sizes"
	>
		<BaseButton>Default Button</BaseButton>

		<BaseButton small>
			Small Button
		</BaseButton>
		<BaseButton variant="secondary">
			Default Button
		</BaseButton>

		<BaseButton
			small
			variant="secondary"
		>
			Small Button
		</BaseButton>
	</FableVariant>

	<FableVariant
		title="Prefix and Suffix"
	>
		<BaseButton icon="upload">
			Prefix Icon
		</BaseButton>

		<BaseButton icon-right="upload">
			Suffix Icon
		</BaseButton>
		<BaseButton
			icon="upload"
			icon-right="upload"
		>
			Pre & Suffix Icon
		</BaseButton>
		<BaseButton
			icon="upload"
			variant="secondary"
		>
			Prefix Icon
		</BaseButton>

		<BaseButton
			icon-right="upload"
			variant="secondary"
		>
			Suffix Icon
		</BaseButton>
		<BaseButton
			icon="upload"
			icon-right="upload"
			variant="secondary"
		>
			Pre & Suffix Icon
		</BaseButton>
	</FableVariant>

	<FableVariant
		title="Types"
	>
		<BaseButton>Primary Button</BaseButton>
		<BaseButton variant="secondary">
			Secondary Button
		</BaseButton>
	</FableVariant>

	<FableVariant
		title="Disabled"
	>
		<BaseButton
			small
			:disabled="true"
		>
			Confirm
		</BaseButton>
		<BaseButton :disabled="true">
			Confirm
		</BaseButton>
		<BaseButton
			small
			:disabled="true"
			variant="secondary"
		>
			Confirm
		</BaseButton>
		<BaseButton
			:disabled="true"
			variant="secondary"
		>
			Confirm
		</BaseButton>
	</FableVariant>
</template>
