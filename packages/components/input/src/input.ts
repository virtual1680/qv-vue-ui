import type { PropType } from 'vue'
import type Input from './input.vue'
import type { EventProps } from '@qv-vue/types/qvue-ui'

export const inputProps = {
  modelValue: String as PropType<EventProps['modelValue']>,
  dic: {
    type: Array as PropType<EventProps['dic']>,
    default: () => [],
  },
  column: {
    type: Object as PropType<EventProps['column']>,
    default: () => ({
      clearable: true,
      showPassword: true,
      showWordLimit: false,
      minRows: 5,
      maxRows: 10,
    }),
  },
  size: String as PropType<EventProps['size']>,
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

// export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputInstance = InstanceType<typeof Input>
