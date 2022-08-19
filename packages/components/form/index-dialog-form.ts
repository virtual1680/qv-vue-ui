/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 09:34:09
 * @LastEditTime: 2022-08-19 15:52:50
 * @Description: DialogForm
 */
import DialogForm from './src/qv-dialog-form'

import type { App } from 'vue'
import type { SFCWithInstall } from '@qv-vue/utils'

const _DialogForm = DialogForm as SFCWithInstall<typeof DialogForm>

_DialogForm.install = (app: App) => {
	_DialogForm._context = app._context
	app.config.globalProperties.$dialogForm = _DialogForm
}

export default _DialogForm
export const QvDialogForm = _DialogForm

export * from './src/qv-dialog-form.type'
