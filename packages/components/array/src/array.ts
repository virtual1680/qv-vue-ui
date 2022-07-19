import type { PropType } from 'vue'
import type QvArray from './array.vue'

export interface ArrayProps {
	modelValue: any[] | string
	alone: boolean
	type: string
	size: '' | 'default' | 'small' | 'large' | undefined
	placeholder: string
	readonly: boolean
	disabled: boolean
	limit: number
	target: string
}
export const arrayProps = {
	modelValue: [Array, String] as PropType<ArrayProps['modelValue']>,
	alone: Boolean,
	size: {
		type: String as PropType<ArrayProps['size']>,
		default: 'small'
	},
	disabled: Boolean,
	readonly: Boolean,
	placeholder: String,
	limit: Number,
	target: String,
	type: {
		type: String
	}
}
export type ArrayInstance = InstanceType<typeof QvArray>
