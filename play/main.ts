/*
 * @Author: virtual1680 virtual1680@gmail.com
 * @Date: 2022-07-18 19:47:12
 * @LastEditTime: 2022-08-20 10:52:15
 * @Description: 暂无
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import axios from 'axios'
// import QvVue from '../dist/qv-vue'
import QvVue from '../packages/qv-vue/index'
// import QvDialogForm from './src/dialog/index'
import '../packages/theme-chalk/src/index.scss'
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
	app.use(QvVue, { axios })
	// app.use(QvDialogForm)
	app.mount('#play')
})()
