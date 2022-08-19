/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 14:14:56
 * @Description: 暂无
 */
import { withInstall } from '@qv-vue/utils'
import TempFrom from './src/temp-form.vue'
import TempIcon from './src/temp-icon.vue'
import type { TempFormInstance } from './src/temp-form'

export const QvTempForm = withInstall(TempFrom)
export const QvTempIcon = withInstall(TempIcon)
export default QvTempForm

export * from './src/temp-form'

export type { TempFormInstance }
