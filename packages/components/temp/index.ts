import { withInstall } from '@qv-vue/utils'
import TempFrom from './src/temp-form.vue'
import TempIcon from './src/icon.vue'
import type { TempFormInstance } from './src/temp-form'

export const QvTempForm = withInstall(TempFrom)
export const QvTempIcon = withInstall(TempIcon)
export default QvTempForm

export * from './src/temp-form'

export type { TempFormInstance }
