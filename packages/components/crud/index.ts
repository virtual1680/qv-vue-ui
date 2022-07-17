import { withInstall } from '@qv-vue/utils'

import Crud from './src/crud.vue'

export const QvCrud = withInstall(Crud)
export default QvCrud

export * from './src/crud'
