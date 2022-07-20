import { usePermission } from '@qv-vue/directives'
import Components from './component'
import { version } from './version'
import type { App } from 'vue'
import { INSTALLED_KEY } from '@qv-vue/constants'
import * as Icon from '@element-plus/icons-vue'
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
	}
}
export * from '@qv-vue/components'
export * from '@qv-vue/constants'
export * from '@qv-vue/directives'
export * from '@qv-vue/hooks'
export * from '@qv-vue/tokens'
export * from '@qv-vue/core'
