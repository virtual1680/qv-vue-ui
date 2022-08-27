/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 09:34:09
 * @LastEditTime: 2022-08-20 11:33:47
 * @Description: DialogForm
 */
// import DialogForm from './src/qv-dialog-form'

// import type { App } from 'vue'
// import type { SFCWithInstall } from '@qv-vue/utils'

// export const QvDialogForm = DialogForm as SFCWithInstall<typeof DialogForm>

// QvDialogForm.install = (app: App) => {
// 	DialogForm._context = app._context
// 	app.config.globalProperties.$dialogForm = DialogForm
// }

// export default QvDialogForm
import { withInstall } from '@qv-vue/utils'

import DialogForm from './src/qv-dialog-form.vue'

export const QvDialogForm = withInstall(DialogForm)
export default QvDialogForm

// export * from './src/form'
export * from './src/qv-dialog-form.type'
