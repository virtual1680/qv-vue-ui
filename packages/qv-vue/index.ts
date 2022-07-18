import QvForm from '@qv-vue/components/form/src/form.vue'
import QvGroup from '@qv-vue/components/group/src/group.vue'
import QvInput from '@qv-vue/components/input/src/input.vue'
import QvInputNumber from '@qv-vue/components/input-number/src/input-number.vue'
import QvInputIcon from '@qv-vue/components/input-icon/src/input-icon.vue'
import QvInputColor from '@qv-vue/components/input-color/src/input-color.vue'
import QvSelect from '@qv-vue/components/select/src/select.vue'
import QvTime from '@qv-vue/components/time/src/time.vue'
import QvDate from '@qv-vue/components/date/src/date.vue'
import QvCheckBox from '@qv-vue/components/checkbox/src/checkbox.vue'
import QvSwitch from '@qv-vue/components/switch/src/switch.vue'
import QvRadio from '@qv-vue/components/radio/src/radio.vue'
import QvUpload from '@qv-vue/components/upload/src/upload.vue'
import QvRate from '@qv-vue/components/rate/src/rate.vue'
import QvCard from '@qv-vue/components/crud/src/crud.vue'
import QvCrud from '@qv-vue/components/card/src/card.vue'
import { usePermission } from '@qv-vue/directives'
import { version } from './version'
import type { App } from 'vue'

export default {
  version,
  install(app: App, option?: any) {
    app.component(QvCrud.name, QvCrud)
    app.component(QvForm.name, QvForm)
    app.component(QvGroup.name, QvGroup)
    app.component(QvInput.name, QvInput)
    app.component(QvSelect.name, QvSelect)
    app.component(QvTime.name, QvTime)
    app.component(QvDate.name, QvDate)
    app.component(QvCheckBox.name, QvCheckBox)
    app.component(QvSwitch.name, QvSwitch)
    app.component(QvRadio.name, QvRadio)
    app.component(QvInputNumber.name, QvInputNumber)
    app.component(QvUpload.name, QvUpload)
    app.component(QvRate.name, QvRate)
    app.component(QvCard.name, QvCard)
    app.component(QvInputIcon.name, QvInputIcon)
    app.component(QvInputColor.name, QvInputColor)

    app.directive('permission', usePermission())
    console.log(option)
    // window['lang'] = option.lang || 'zh'
  },
}
export * from '@qv-vue/components'
export * from '@qv-vue/constants'
export * from '@qv-vue/directives'
export * from '@qv-vue/hooks'
export * from '@qv-vue/tokens'
export * from '@qv-vue/core'
export * from './make-installer'
export { default as dayjs } from 'dayjs'
