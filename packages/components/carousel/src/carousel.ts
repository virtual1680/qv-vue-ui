import type { PropType } from 'vue'
import type Carousel from './carousel.vue'
export interface CarouselProps {
	fullscreen: string
	type: string
	height: string | number
	autoplay: number
	interval: number
	data: { href: string; title: string; src: string; target: string }[]
}
export const carouselProps = {
	option: Object as PropType<CarouselProps>
}
export type CarouselInstance = InstanceType<typeof Carousel>
