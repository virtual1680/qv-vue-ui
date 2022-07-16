import { PKG_NAME, PKG_PREFIX } from '@qv-vue/build-constants'

import type { Plugin } from 'rollup'

export function ElementPlusAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'element-plus-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) return
      do {
        id = id.replace(sourceThemeChalk, bundleThemeChalk)
      } while (id.includes(sourceThemeChalk))
      return {
        id,
        external: 'absolute',
      }
    },
  }
}
