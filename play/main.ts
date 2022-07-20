import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import QvVue from '../packages/qv-vue/index'
import '../packages/theme-chalk/src/index.scss'
import * as Icon from '@element-plus/icons-vue'
;(async () => {
	const apps = import.meta.glob('./src/*.vue')
	const name = location.pathname.replace(/^\//, '') || 'App'
	const file = apps[`./src/${name}.vue`]
	if (!file) {
		location.pathname = 'App'
		return
	}
	const App = (await file()).default
	const app = createApp(App)
	app.use(ElementPlus)
	app.use(QvVue)
	Object.keys(Icon).forEach(item => {
		app.component(item, Icon[item as keyof typeof Icon])
	})
	app.mount('#play')
})()
