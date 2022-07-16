import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@qv-vue/constants'
import { buildProps, isNumber, isValidComponentSize } from '@qv-vue/utils'
import type { ComponentSize } from '@qv-vue/constants'
import type { ExtractPropTypes, PropType } from 'vue'
import type Rate from './rate.vue'

// modelValue: IxPropTypes.oneOfType([string, number, symbol]),
// 	dic: IxPropTypes.array<EventProps['dic']>().def(() => []),
// 	// column: IxPropTypes.object<EventProps['column']>().def(() => ({
// 	// 	max: 5,
// 	// 	showText: false,
// 	// })),
// 	size: IxPropTypes.oneOf<EventProps['size']>(['', 'default', 'small', 'large']).def('small'),
// 	disabled: IxPropTypes.bool,
// 	readonly: IxPropTypes.bool,
// 	placeholder: IxPropTypes.string,
// 	props: IxPropTypes.object<EventProps['props']>(),
// 	propsHttp: IxPropTypes.object<EventProps['propsHttp']>(),
// 	type: IxPropTypes.string,
export const rateProps = buildProps({
  modelValue: { type: Number, default: 0 },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
} as const)

export type RateProps = ExtractPropTypes<typeof rateProps>

export const rateEmits = {
  [CHANGE_EVENT]: (value: number) => isNumber(value),
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
}
export type RateEmits = typeof rateEmits

export type RateInstance = InstanceType<typeof Rate>
