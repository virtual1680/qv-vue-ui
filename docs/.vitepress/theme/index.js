// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css' //自定义主题样式
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import QvVue from '@qv-vue'
import '@qv-vue/theme-chalk/index.css' // 导入css样式 icon图标组件需要

// 展开收起
import Theme from 'vitepress/dist/client/theme-default' // 导入vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import 'vitepress-theme-demoblock/theme/styles/index.css' // 导入主题样式
import { registerComponents } from './register-components.js' // 导入插件的主题

export default {
	...DefaultTheme,
	...Theme,
	enhanceApp({ app }) {
		app.use(ElementPlus).use(QvVue, { axios })
		registerComponents(app)
	}
}
