// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    QvRate: typeof import('qv-vue')['QvRate']
    QvCard: typeof import('qv-vue')['QvCard']
    QvCheckbox: typeof import('qv-vue')['QvCheckbox']
    QvDate: typeof import('qv-vue')['QvDate']
    QvGroup: typeof import('qv-vue')['QvGroup']
    QvInput: typeof import('qv-vue')['QvInput']
    QvInputColor: typeof import('qv-vue')['QvInputColor']
    QvInputIcon: typeof import('qv-vue')['QvInputIcon']
    QvInputNumber: typeof import('qv-vue')['QvInputNumber']
    QvRadio: typeof import('qv-vue')['QvRadio']
    QvSelect: typeof import('qv-vue')['QvSelect']
    QvSwitch: typeof import('qv-vue')['QvSwitch']
    QvTime: typeof import('qv-vue')['QvTime']
    QvUpload: typeof import('qv-vue')['QvUpload']
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
