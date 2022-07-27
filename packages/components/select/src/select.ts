import type Select from './select.vue'
import type { PropType } from 'vue'
import type { EventProps } from '@qv-vue/types/qvue-ui'

export const selectProps = {
	modelValue: [Number, String, Boolean, Array] as PropType<EventProps['modelValue']>,
	dic: {
		type: Array as PropType<EventProps['dic']>,
		default: () => []
	},
	column: {
		type: Object as PropType<EventProps['column']>,
		default: () => ({
			drag: false,
			remote: false,
			tags: false,
			limit: 0,
			filterable: false,
			allowCreate: false,
			defaultFirstOption: false,
			all: false,
			popperAppendToBody: true
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

export type SelectInstance = InstanceType<typeof Select>
