import { onUnmounted } from 'vue'
import { debounce } from 'lodash'

export const useAutoResize = (dom: HTMLElement) => {
	const viewResize = () => {
		const currentWidth = document.body.clientWidth
		const width = dom.clientWidth || 0
		const height = dom.clientHeight || 0
		if (!width || !height) {
			console.warn('Component width or height is 0px, rendering abnormality may occur!')
		}
		dom.style.transform = `scale(${currentWidth / width})`
	}
	viewResize()
	const debounceViewResize = debounce(viewResize, 100)

	window.addEventListener('resize', debounceViewResize, false)

	onUnmounted(() => window.removeEventListener('resize', debounceViewResize))
}
