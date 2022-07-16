// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ElRate: typeof import('qv-vue')['ElRate']
  }

  // interface ComponentCustomProperties {
  //   $message: typeof import('qv-vue')['ElMessage']
  //   $notify: typeof import('qv-vue')['ElNotification']
  //   $msgbox: typeof import('qv-vue')['ElMessageBox']
  //   $messageBox: typeof import('qv-vue')['ElMessageBox']
  //   $alert: typeof import('qv-vue')['ElMessageBox']['alert']
  //   $confirm: typeof import('qv-vue')['ElMessageBox']['confirm']
  //   $prompt: typeof import('qv-vue')['ElMessageBox']['prompt']
  //   $loading: typeof import('qv-vue')['ElLoadingService']
  // }
}

export {}
