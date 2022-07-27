import { epPackage, getPackageDependencies } from '@qv-vue/build-utils'
// import consola from 'consola'
import type { OutputOptions, RollupBuild } from 'rollup'

export const generateExternal = async (options: { full: boolean }) => {
	const { dependencies, peerDependencies } = getPackageDependencies(epPackage)

	return (id: string) => {
		let packages: string[] = peerDependencies
		if (!options.full) {
			packages.push('@vue', 'element-plus', ...dependencies)
		}
		packages = packages.filter(item => item !== 'lodash-es')
		// consola.log(packages)
		return [...new Set(packages)].some(pkg => id === pkg || id.startsWith(`${pkg}/`))
	}
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
	return Promise.all(
		options.map(option => {
			return bundle.write(option)
		})
	)
}

export function formatBundleFilename(name: string, minify: boolean, ext: string) {
	return `${name}${minify ? '.min' : ''}.${ext}`
}
