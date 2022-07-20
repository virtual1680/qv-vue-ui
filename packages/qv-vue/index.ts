import { usePermission } from '@qv-vue/directives'
import Components from './component'
import { version } from './version'
import type { App } from 'vue'
import { INSTALLED_KEY } from '@qv-vue/constants'
export default {
	version,
	install(app: App, option?: any) {
		if (app[INSTALLED_KEY]) return
		// console.log('开始注册-----')
		app[INSTALLED_KEY] = true

		Components.forEach(c => {
			app.use(c)
		})

		app.directive('permission', usePermission())
		// console.log(option)
		// window['lang'] = option.lang || 'zh'
	}
}
export * from '@qv-vue/components'
export * from '@qv-vue/constants'
export * from '@qv-vue/directives'
export * from '@qv-vue/hooks'
export * from '@qv-vue/tokens'
export * from '@qv-vue/core'
// export * from './make-installer'
export { default as dayjs } from 'dayjs'
