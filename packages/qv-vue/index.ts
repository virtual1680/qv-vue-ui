import installer from './defaults'
export * from '@qv-vue/components'
export * from '@qv-vue/constants'
export * from '@qv-vue/directives'
export * from '@qv-vue/hooks'
export * from '@qv-vue/tokens'
export * from '@qv-vue/core'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
