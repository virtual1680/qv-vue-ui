import { withInstall } from '@qv-vue/utils'

import TempFrom from './src/form.vue'
import TempIcon from './src/icon.vue'

export const QvTempForm = withInstall(TempFrom)
export const QvTempIcon = withInstall(TempIcon)
export default QvTempForm

export * from './src/form'
