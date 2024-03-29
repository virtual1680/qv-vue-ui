/*
 * @Author: virtual1680 virtual1680@gmail.com
 * @Date: 2022-07-17 22:18:54
 * @LastEditTime: 2022-10-29 13:46:52
 * @Description: 暂无
 */
import type { QvOption } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'
import type Form from './form.vue'
export interface FormProps {
	uploadBefore?: () => void
	uploadAfter?: () => void
	uploadDelete?: () => void
	uploadPreview?: () => void
	uploadError?: () => void
	uploadExceed?: () => void
	option: QvOption
	status?: boolean
	isCrud?: boolean
	modelValue?: any
	formBtn?: 'search' | 'default' | 'dialog'
}
export const formProps = {
	uploadBefore: Function as PropType<FormProps['uploadBefore']>,
	uploadDelete: Function as PropType<FormProps['uploadDelete']>,
	uploadAfter: Function as PropType<FormProps['uploadAfter']>,
	uploadPreview: Function as PropType<FormProps['uploadPreview']>,
	uploadError: Function as PropType<FormProps['uploadError']>,
	uploadExceed: Function as PropType<FormProps['uploadExceed']>,
	option: {
		type: Object as PropType<FormProps['option']>,
		default: () => {
			return {}
		}
	},
	status: Boolean,
	isCrud: Boolean,
	modelValue: Object as PropType<FormProps['modelValue']>,
	formBtn: {
		type: String as PropType<FormProps['formBtn']>,
		default: 'default'
	}
}
export type FormInstance = InstanceType<typeof Form>
