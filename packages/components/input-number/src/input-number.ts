import type { EventProps } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'
import type InputNumber from './input-number.vue'

export const inputNumberProps = {
  modelValue: Number as PropType<EventProps['modelValue']>,
  dic: {
    type: Array as PropType<EventProps['dic']>,
    default: () => [],
  },
  column: {
    type: Object as PropType<EventProps['column']>,
    default: () => ({
      controls: true,
      step: 1,
      controlsPosition: 'right',
      min: -Number.POSITIVE_INFINITY,
      max: Number.POSITIVE_INFINITY,
    }),
  },
  size: {
    type: String as PropType<EventProps['size']>,
    default: 'small',
  },
  disabled: Boolean,
  tableData: Object as PropType<EventProps['tableData']>,
  readonly: Boolean,
  placeholder: String,
  props: {
    type: Object as PropType<EventProps['props']>,
    default: () => ({}),
  },
  propsHttp: {
    type: Object as PropType<EventProps['propsHttp']>,
    default: () => ({}),
  },
  type: {
    type: String,
  },
}
export type InputNumberInstance = InstanceType<typeof InputNumber>
