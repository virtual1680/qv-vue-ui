/// <reference types="qv-vue/types">

import type { vShow } from 'vue'
import type { INSTALLED_KEY } from '@qv-vue/constants'

declare global {
	const process: {
		env: {
			NODE_ENV: string
		}
	}

	namespace JSX {
		interface IntrinsicAttributes {
			class?: any
			style?: any
		}
	}
}

declare module '@vue/runtime-core' {
	export interface App {
		[INSTALLED_KEY]?: boolean
	}

	export interface GlobalComponents {
		Component: (props: { is: Component | string }) => void
	}

	export interface ComponentCustomProperties {
		vShow: typeof vShow
	}
}

export {}
