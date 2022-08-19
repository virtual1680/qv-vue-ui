/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 16:43:35
 * @Description: 暂无
 */
import { usePermission } from '@qv-vue/directives'
import Components from './component'
import { version } from './version'
import type { App } from 'vue'
import { INSTALLED_KEY } from '@qv-vue/constants'
import * as Icon from '@element-plus/icons-vue'
import { QvDialogForm } from '@qv-vue/components/form/index-dialog-form'
export default {
	version,
	install(app: App, option?: { lang?: string; axios?: any }) {
		if (app[INSTALLED_KEY]) return
		// console.log('开始注册-----')
		app[INSTALLED_KEY] = true

		Components.forEach(c => {
			app.use(c)
		})

		app.directive('permission', usePermission())
		// console.log(option)
		// window['lang'] = option.lang || 'zh'
		app.config.globalProperties.$lang = option?.lang || 'zh'
		app.config.globalProperties.$axios = option?.axios
		Object.keys(Icon).forEach(item => {
			app.component(item, Icon[item as keyof typeof Icon])
		})
		setTimeout(() => {
			app.use(QvDialogForm)
		}, 2000)
	}
}
export * from '@qv-vue/components'
export * from '@qv-vue/constants'
export * from '@qv-vue/directives'
export * from '@qv-vue/hooks'
export * from '@qv-vue/tokens'
export * from '@qv-vue/core'
export * from '@qv-vue/utils'
