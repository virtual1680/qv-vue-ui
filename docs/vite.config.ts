// vite.config.ts
// 打包element-plus css时报错 加如下插件plugin https://blog.csdn.net/qq_39831708/article/details/124703642
// md的目录必须小写 不然打包后找不到文件 会显示不了
import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig, loadEnv } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
// import UnoCSS from 'unocss/vite'
import glob from 'fast-glob'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { docPackage, epPackage, getPackageDependencies, projRoot } from '@qv-vue/build-utils'

export default defineConfig(async ({ mode }) => {
	return {
		server: {
			host: true
		},
		css: {
			postcss: {
				plugins: [
					{
						postcssPlugin: 'internal:charset-removal',
						AtRule: {
							charset: atRule => {
								// 去除elementPlus内部charset警告
								if (atRule.name === 'charset') {
									atRule.remove()
								}
							}
						}
					}
				]
			}
		},
		resolve: {
			alias: {
				'@qv-vue': path.resolve(__dirname, '../dist/qv-vue')
			}
		},
		plugins: [vueJsx(), Components(), DefineOptions()]
	}
})
