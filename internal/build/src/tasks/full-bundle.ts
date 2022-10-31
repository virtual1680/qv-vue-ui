import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/rollup'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { parallel } from 'gulp'
import glob from 'fast-glob'
import { camelCase, upperFirst } from 'lodash'
import { PKG_BRAND_NAME, PKG_CAMELCASE_LOCAL_NAME, PKG_CAMELCASE_NAME } from '@qv-vue/build-constants'
import { epOutput, epRoot, localeRoot } from '@qv-vue/build-utils'
import { version } from '../../../../packages/qv-vue/version'
import { ElementPlusAlias } from '../plugins/element-plus-alias'
import { formatBundleFilename, generateExternal, withTaskName, writeBundles } from '../utils'
import { target } from '../build-info'
import type { Plugin } from 'rollup'

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`

async function buildFullEntry(minify: boolean) {
	const plugins: Plugin[] = [
		ElementPlusAlias(),
		DefineOptions(),
		vue({
			isProduction: true
		}),
		vueJsx(),
		nodeResolve({
			extensions: ['.mjs', '.js', '.json', '.ts']
		}),
		commonjs(),
		esbuild({
			exclude: [],
			sourceMap: false,
			target,
			loaders: {
				'.vue': 'ts'
			},
			define: {
				'process.env.NODE_ENV': JSON.stringify('production')
			},
			treeShaking: true,
			legalComments: 'eof'
		})
	]
	if (minify) {
		plugins.push(minifyPlugin({ sourceMap: false }))
	}

	const bundle = await rollup({
		input: path.resolve(epRoot, 'index.ts'),
		plugins,
		external: await generateExternal({ full: false }),
		treeshake: true
	})
	await writeBundles(bundle, [
		{
			format: 'umd',
			file: path.resolve(epOutput, 'dist', formatBundleFilename('index.full', minify, 'js')),
			exports: 'named',
			name: PKG_CAMELCASE_NAME,
			globals: {
				vue: 'Vue'
			},
			sourcemap: false,
			banner
		},
		{
			format: 'esm',
			file: path.resolve(epOutput, 'dist', formatBundleFilename('index.full', minify, 'mjs')),
			sourcemap: false,
			banner
		}
	])
}

async function buildFullLocale(minify: boolean) {
	const files = await glob(`${path.resolve(localeRoot, 'lang')}/*.ts`, {
		absolute: true
	})
	return Promise.all(
		files.map(async file => {
			const filename = path.basename(file, '.ts')
			const name = upperFirst(camelCase(filename))

			const bundle = await rollup({
				input: file,
				plugins: [
					esbuild({
						minify,
						sourceMap: false,
						target
					})
				]
			})
			await writeBundles(bundle, [
				{
					format: 'umd',
					file: path.resolve(epOutput, 'dist/locale', formatBundleFilename(filename, minify, 'js')),
					exports: 'default',
					name: `${PKG_CAMELCASE_LOCAL_NAME}${name}`,
					sourcemap: false,
					banner
				},
				{
					format: 'esm',
					file: path.resolve(epOutput, 'dist/locale', formatBundleFilename(filename, minify, 'mjs')),
					sourcemap: false,
					banner
				}
			])
		})
	)
}

export const buildFull = (minify: boolean) => async () => Promise.all([buildFullEntry(minify), buildFullLocale(minify)])

export const buildFullBundle = parallel(withTaskName('buildFullMinified', buildFull(true)), withTaskName('buildFull', buildFull(false)))
