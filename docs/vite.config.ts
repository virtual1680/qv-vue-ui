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

import type { Alias } from 'vite'

const alias: Alias[] = [
	{
		find: '~/',
		replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`
	}
]
if (process.env.DOC_ENV !== 'production') {
	alias.push(
		{
			find: /^qv-vue(\/(es|lib))?$/,
			replacement: path.resolve(projRoot, 'packages/qv-vue/index.ts')
		},
		{
			find: /^qv-vue\/(es|lib)\/(.*)$/,
			replacement: `${path.resolve(projRoot, 'packages')}/$2`
		}
	)
}
export default defineConfig(async ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	const { dependencies: epDeps } = getPackageDependencies(epPackage)
	const { dependencies: docsDeps } = getPackageDependencies(docPackage)

	const optimizeDeps = [...new Set([...epDeps, ...docsDeps])].filter(
		dep => !dep.startsWith('@types/') && !['@qv-vue/metadata', 'qv-vue'].includes(dep)
	)

	optimizeDeps.push(
		...(await glob(['dayjs/plugin/*.js'], {
			cwd: path.resolve(projRoot, 'node_modules'),
			onlyFiles: true
		}))
	)

	return {
		server: {
			host: true,
			fs: {
				allow: [projRoot]
			}
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
			alias
		},
		plugins: [
			vueJsx(),
			DefineOptions(),

			// https://github.com/antfu/unplugin-vue-components
			Components({
				dirs: ['.vitepress/vitepress/components'],

				allowOverrides: true,

				// custom resolvers
				resolvers: [
					// auto import icons
					// https://github.com/antfu/unplugin-icons
					IconsResolver()
				],

				// allow auto import and register components used in markdown
				include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
			}),

			// https://github.com/antfu/unplugin-icons
			Icons({
				autoInstall: true
			}),
			// UnoCSS(),
			Inspect()
			// mkcert()
		],
		build: {
			rollupOptions: {
				// external: ['lodash-es']
			}
		},
		optimizeDeps: {
			include: optimizeDeps
		}
	}
})
