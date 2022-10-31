/*
 * @Author: virtual1680 virtual1680@gmail.com
 * @Date: 2022-07-17 00:27:44
 * @LastEditTime: 2022-10-29 14:06:28
 * @Description: 暂无
 */
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { epRoot, excludeFiles, pkgRoot } from '@qv-vue/build-utils'
import { generateExternal, writeBundles } from '../utils'
import { ElementPlusAlias } from '../plugins/element-plus-alias'
import { buildConfigEntries, target } from '../build-info'

import type { OutputOptions } from 'rollup'

export const buildModulesQv = async () => {
	const input = excludeFiles(
		await glob('qv-vue/*.{js,ts,vue}', {
			cwd: pkgRoot,
			absolute: true,
			onlyFiles: true
		})
	)
	const bundle = await rollup({
		input,
		plugins: [
			ElementPlusAlias(),
			DefineOptions(),
			vue({
				isProduction: false
			}),
			vueJsx(),
			nodeResolve({
				extensions: ['.mjs', '.js', '.json', '.ts']
			}),
			commonjs(),
			esbuild({
				sourceMap: false,
				target,
				loaders: {
					'.vue': 'ts'
				}
			})
		],
		external: await generateExternal({ full: false }),
		treeshake: false
	})
	await writeBundles(
		bundle,
		buildConfigEntries.map(([module, config]): OutputOptions => {
			return {
				format: config.format,
				dir: config.output.path,
				exports: module === 'cjs' ? 'named' : undefined,
				preserveModules: true,
				preserveModulesRoot: epRoot,
				sourcemap: false,
				entryFileNames: `[name].${config.ext}`
			}
		})
	)
}
