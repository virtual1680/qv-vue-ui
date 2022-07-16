import { componentSizes } from '@qv-vue/constants'
import type { ComponentSize } from '@qv-vue/constants'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)
