// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElRate: typeof import('qv-vue')['QvRate']
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
