import type tempForm from './temp-form.vue'
import type { PropType } from 'vue'
import type { DicProps, PropsHttp, QvColumn } from '@qv-vue/types/qvue-ui'

export interface TempFormProps {
  uploadBefore?: () => void
  uploadDelete?: () => void
  uploadAfter?: () => void
  uploadPreview?: () => void
  uploadError?: () => void
  uploadExceed?: () => void
  columnSlot?: string[]
  tableData?: any
  clearable?: boolean
  enter?: boolean
  type?: string
  propsHttp?: PropsHttp
  props?: Partial<DicProps>
  dic?: Record<string, string | number | boolean>[]
  size?: string
  disabled?: boolean
  readonly?: boolean
  modelValue: unknown
  column: Partial<QvColumn>
}

export const tempFormProps = {
  uploadBefore: Function as PropType<TempFormProps['uploadBefore']>,
  uploadDelete: Function as PropType<TempFormProps['uploadDelete']>,
  uploadAfter: Function as PropType<TempFormProps['uploadAfter']>,
  uploadPreview: Function as PropType<TempFormProps['uploadPreview']>,
  uploadError: Function as PropType<TempFormProps['uploadError']>,
  uploadExceed: Function as PropType<TempFormProps['uploadExceed']>,
  columnSlot: Array as PropType<TempFormProps['columnSlot']>,
  tableData: Object as PropType<TempFormProps['tableData']>,
  clearable: Boolean,
  enter: Boolean,
  type: String,
  propsHttp: Object as PropType<TempFormProps['propsHttp']>,
  props: Object as PropType<TempFormProps['props']>,
  dic: Array as PropType<TempFormProps['dic']>,
  size: String,
  disabled: Boolean,
  readonly: Boolean,
  modelValue: [String, Array, Number, Boolean] as PropType<
    TempFormProps['modelValue']
  >,
  column: Object as PropType<TempFormProps['column']>,
}

export type TempFormInstance = InstanceType<typeof tempForm>
