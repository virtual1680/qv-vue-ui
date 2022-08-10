import type { QvOption } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'
export interface DialogFormProps {
	option: QvOption
	dialog: any
	data: any
}
export const dialogFormProps = {
	option: {
		type: Object as PropType<DialogFormProps['option']>,
		default: () => {
			return {}
		}
	},
	dialog: Object as PropType<DialogFormProps['dialog']>,
	data: {
		type: Object as PropType<DialogFormProps['data']>,
		default: () => {
			return {}
		}
	}
}
