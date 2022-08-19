/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 14:03:23
 * @Description: 暂无
 */
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
