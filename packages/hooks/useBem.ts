/* eslint-disable prettier/prettier */
/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

const ELEMENT = '__'
const MODS = '--'

const join = (name: string, el: string, symbol: string) => (el ? name + symbol + el : name)

const prefix = (name: string, mods: any): any => {
	if (typeof mods === 'string') {
		return join(name, mods, MODS)
	}

	if (Array.isArray(mods)) {
		return mods.map(item => prefix(name, item))
	}

	const ret: Record<string, unknown> = {}
	Object.keys(mods || {}).forEach((key: string) => {
		if (mods[key]) {
			ret[`${name}${MODS}${key}`] = mods[key]
		}
	})
	return Object.keys(ret)
}
type El = Record<string, string | number | boolean>
export const useBem = (name: string) => {
	const b = (el?: string | El, mods?: string | any[] | El) => {
		if (el && typeof el !== 'string') {
			mods = el
			el = ''
		}
		el = join(name, el || '', ELEMENT)
		return mods ? [el, ...prefix(el, mods)] : el
	}
	return { b }
}
