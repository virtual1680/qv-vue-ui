// @ts-nocheck
import { INSTALLED_KEY } from '../constants'
import { version } from './version'
import type { App, Plugin } from '@vue/runtime-core'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLED_KEY]) return
    console.log('开始注册-----')

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }

  return {
    version,
    install,
  }
}
