import type { EventProps } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'
import type Time from './time.vue'

export const timeProps = {
  modelValue: [String, Array] as PropType<EventProps['modelValue']>,
  dic: {
    type: Array as PropType<EventProps['dic']>,
    default: () => [],
  },
  column: {
    type: Object as PropType<EventProps['column']>,
    default: () => ({
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      valueFormat: '',
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
export type TimeInstance = InstanceType<typeof Time>
