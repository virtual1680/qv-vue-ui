import { componentSizeMap } from '@qv-vue/constants'

import type { ComponentSize } from '@qv-vue/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
