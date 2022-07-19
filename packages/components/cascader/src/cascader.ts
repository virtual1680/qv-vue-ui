import { EventProps } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'
import type Cascader from './cascader.vue'

export const cascaderProps = {
	modelValue: [Array, String] as PropType<EventProps['modelValue']>,
	dic: {
		type: Array as PropType<EventProps['dic']>,
		default: () => []
	},
	column: {
		type: Object as PropType<EventProps['column']>,
		default: () => ({
			checkStrictly: false,
			emitPath: true,
			tags: false,
			showAllLevels: true,
			lazy: false,
			filterable: false,
			expandTrigger: 'click'
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
export type CascaderInstance = InstanceType<typeof Cascader>
