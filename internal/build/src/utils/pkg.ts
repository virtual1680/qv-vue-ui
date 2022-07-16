import { PKG_NAME, PKG_PREFIX } from '@qv-vue/build-constants'
import { buildConfig } from '../build-info'

import type { Module } from '../build-info'

/** used for type generator */
export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]

  return (id: string) => {
    do {
      id = id.replace(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`)
    } while (id.includes(`${PKG_PREFIX}/theme-chalk`))
    do {
      id = id.replace(`${PKG_PREFIX}/`, `${config.bundle.path}/`)
    } while (id.includes(`${PKG_PREFIX}/`))
    // id = id.replace(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`)
    // id = id.replace(`${PKG_PREFIX}/`, `${config.bundle.path}/`)
    return id
  }
}
