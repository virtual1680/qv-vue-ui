/* eslint-disable prettier/prettier */
import { computed, ref, watch } from 'vue'

import { validatenull } from '@qv-vue/utils'
import { DIC_HTTP_PROPS, DIC_PROPS, DIC_SPLIT } from '@qv-vue/constants'
import { initValue } from './useDataformat'
import type { DicData, EventProps } from '@qv-vue/types/qvue-ui'
import type { Ref } from 'vue'
// import type { LooseRequired } from '@vue/shared'
// ExtractPropTypes,

interface EventParams {
	handleModelValue?: (value: any) => void
	handleTextValue?: (value: any) => void
}
type EventList = 'click' | 'blur' | 'change' | 'focus'
export const useEvent = (props: EventProps, emit: any, params?: EventParams) => {
	const stringMode = ref(false)
	const text: Ref<any> = ref()
	const name = ref('')
	const propsHttpDefault = ref(DIC_HTTP_PROPS)
	const propsDefault = ref(DIC_PROPS)

	const clearableVal = computed(() => {
		return props.disabled ? false : props.column?.clearable
	})
	const componentName = computed(() => {
		const type = 'el'
		const result = `${type}-${name.value}${props.column?.button ? '-button' : ''}`
		return result
	})
	const required = computed(() => {
		return !validatenull(props.column?.rules)
	})
	const groupsKey = computed(() => {
		return props.props?.groups || propsDefault.value.groups
	})
	const isGroup = computed(() => {
		let result = false
		if (Array.isArray(props.dic)) {
			props.dic?.forEach((ele: Record<string, unknown>) => {
				if (ele[groupsKey.value]) {
					result = true
				}
			})
		}
		return result
	})
	const isArray = computed(() => {
		return props.column?.dataType === 'array'
	})
	const isString = computed(() => {
		return props.column?.dataType === 'string'
	})
	const isNumber = computed(() => {
		return props.column?.dataType === 'number'
	})

	const nameKey = computed(() => {
		return props.propsHttp?.name || propsHttpDefault.value.name
	})
	const urlKey = computed(() => {
		return props.propsHttp?.url || propsHttpDefault.value.url
	})
	const resKey = computed(() => {
		return props.propsHttp?.res || propsHttpDefault.value.res
	})
	const valueKey = computed(() => {
		return props.props?.value || propsDefault.value.value
	})
	const descKey = computed(() => {
		return props.props?.desc || propsDefault.value.desc
	})
	const leafKey = computed(() => {
		return props.props?.leaf || propsDefault.value.leaf
	})
	const labelKey = computed<string>(() => {
		return props.props?.label || propsDefault.value.label
	})
	const childrenKey = computed(() => {
		return props.props?.children || propsDefault.value.children
	})
	const disabledKey = computed(() => {
		return props.props?.disabled || propsDefault.value.disabled
	})
	const idKey = computed(() => {
		return props.props?.rowKey || propsDefault.value.rowKey
	})

	watch(
		() => text.value,
		val => {
			console.log('text value: %s', val)
			handleChange(val)
			params?.handleTextValue && params.handleTextValue(val)
		}
	)
	watch(
		() => props.modelValue,
		val => {
			initVal()
			params?.handleModelValue && params.handleModelValue(val)
		}
	)

	const initVal = () => {
		stringMode.value = typeof props.modelValue == 'string'
		text.value = initValue(props.modelValue, props.column)
	}
	const getLabelText = (item: DicData & Record<string, unknown>) => {
		if (validatenull(item)) return ''
		if (typeof props.column?.typeformat === 'function') {
			return props.column?.typeformat(item, labelKey.value, valueKey.value)
		}
		return item[labelKey.value]
	}

	const handleFocus = (event: Event) => {
		bindEvent('focus', { value: text.value, event })
	}
	const handleBlur = (event: Event) => {
		bindEvent('blur', { value: text.value, event })
	}
	const handleClick = (event: Event) => {
		bindEvent('click', { value: text.value, event })
	}
	const handleChange = (value: any) => {
		let result = value
		const flag = isString.value || isNumber.value || stringMode.value || props.column?.listType === 'picture-img'
		if (flag && Array.isArray(value)) result = value.join(DIC_SPLIT)
		bindEvent('change', { value: result })
		emit('update:modelValue', result)
	}
	const bindEvent = (eventName: EventList, params: any) => {
		params = Object.assign(params, { column: props.column }, props.tableData)
		if (typeof props.column?.[eventName] === 'function') {
			if (eventName == 'change') {
				if (props.column?.cell != true) {
					props.column[eventName]?.(params)
				}
			} else {
				props.column[eventName]?.(params)
			}
		}
		emit(eventName, params)
	}
	return {
		text,
		name,
		bindEvent,
		getLabelText,
		handleFocus,
		handleBlur,
		handleClick,
		handleChange,
		initVal,
		// ----
		idKey,
		disabledKey,
		childrenKey,
		labelKey,
		leafKey,
		descKey,
		valueKey,
		resKey,
		urlKey,
		groupsKey,
		nameKey,
		isNumber,
		isString,
		isArray,
		isGroup,
		required,
		componentName,
		clearableVal,
		stringMode
	}
}
