import type { EventProps } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'
import type Checkbox from './checkbox.vue'

export const checkboxProps = {
	modelValue: [Object, Number, String, Boolean] as PropType<EventProps['modelValue']>,
	dic: {
		type: Array as PropType<EventProps['dic']>,
		default: () => []
	},
	column: {
		type: Object as PropType<EventProps['column']>,
		default: () => ({
			all: false
		})
	},
	size: {
		type: String as PropType<EventProps['size']>,
		default: 'small'
	},
	disabled: Boolean,
	tableData: Object as PropType<EventProps['tableData']>,
	readonly: Boolean,
	placeholder: String,
	props: {
		type: Object as PropType<EventProps['props']>,
		default: () => ({})
	},
	propsHttp: {
		type: Object as PropType<EventProps['propsHttp']>,
		default: () => ({})
	},
	type: {
		type: String
	}
}
export type CheckboxInstance = InstanceType<typeof Checkbox>
