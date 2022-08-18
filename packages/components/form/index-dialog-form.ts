/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 09:34:09
 * @LastEditTime: 2022-08-18 09:36:05
 * @Description: DialogForm
 */
import DialogForm from './src/dialog-form'

import type { App } from 'vue'
import type { SFCWithInstall } from '@qv-vue/utils'

const _DialogForm = DialogForm as SFCWithInstall<typeof DialogForm>

_DialogForm.install = (app: App) => {
	_DialogForm._context = app._context
	app.config.globalProperties.$dialogForm = _DialogForm
}

export default _DialogForm
export const QvDialogForm = _DialogForm

export * from './src/dialog-form.type'
