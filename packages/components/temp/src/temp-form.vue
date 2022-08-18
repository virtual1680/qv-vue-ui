<template>
	<div>
		<component
			:is="getComponent(column?.type, column?.component)"
			ref="tempRef"
			v-model="text"
			v-bind="getBind(column)"
			v-on="event"
			:column="Object.assign(column!, params)"
			:dic="dic || []"
			:disabled="column?.disabled || disabled"
			:readonly="column?.readonly || readonly || false"
			:placeholder="column?.placeholder || getPlaceholder(column)"
			:props="column?.props || props"
			:propsHttp="column?.propsHttp || propsHttp"
			:size="column?.size || size"
			:table-data="tableData"
			:type="type || column?.type || ''">
			<template v-if="slots.default" #default="scope">
				<slot v-bind="scope" />
			</template>
			<template v-else-if="params.html" #default>
				<span v-html="params.html" />
			</template>
			<template v-for="item in (columnSlot as string[])" #[item]="scope">
				<slot v-bind="scope" :name="item" />
			</template>
		</component>
	</div>
</template>
<!-- @keyup.enter="enterChange" keyup事件 不能绑定下片段上 或者在子组件中注册-->
<script lang="ts" setup>
import { computed, nextTick, ref, useSlots, watch } from 'vue'
import { getComponent, getPlaceholder } from '@qv-vue/hooks'
import { validatenull } from '@qv-vue/utils'
import { tempFormProps } from './temp-form'
import { QvInput } from '@qv-vue/components/input'
import { QvRate } from '@qv-vue/components/rate'
import { QvCheckbox } from '@qv-vue/components/checkbox'
import { QvDate } from '@qv-vue/components/date'
import { QvInputColor } from '@qv-vue/components/input-color'
import { QvInputIcon } from '@qv-vue/components/input-icon'
import { QvInputNumber } from '@qv-vue/components/input-number'
import { QvRadio } from '@qv-vue/components/radio'
import { QvSelect } from '@qv-vue/components/select'
import { QvSwitch } from '@qv-vue/components/switch'
import { QvTime } from '@qv-vue/components/time'
import { QvUpload } from '@qv-vue/components/upload'
import { QvArray } from '@qv-vue/components/array'
import { QvCarousel } from '@qv-vue/components/carousel'
import { QvCascader } from '@qv-vue/components/cascader'
import { QvImg } from '@qv-vue/components/img'
import type { Ref } from 'vue'
defineOptions({
	name: 'qv-temp-form',
	components: {
		QvInput,
		QvRate,
		QvCheckbox,
		QvDate,
		QvInputColor,
		QvInputIcon,
		QvInputNumber,
		QvRadio,
		QvSelect,
		QvSwitch,
		QvTime,
		QvUpload,
		QvCarousel,
		QvCascader,
		QvImg,
		QvArray
	}
})

const emit = defineEmits<{
	(e: 'change', val: any): void
	(e: 'update:modelValue', val: any): void
	(e: 'enter'): void
}>()

const slots = useSlots()
const props = defineProps(tempFormProps)
const first = ref(false)
const text = ref()
const tempRef: Ref<any> = ref()

const params = computed(() => {
	return props.column?.params || {}
})
const event = computed(() => {
	return props.column?.event || {}
})

watch(
	() => text.value,
	val => {
		if (first.value || !validatenull(val)) {
			first.value = true
			emit('update:modelValue', val)
			emit('change', val)
		} else {
			first.value = true
		}
	},
	{
		immediate: true
	}
)
watch(
	() => props.modelValue,
	val => {
		// 组件加载完成后才能绑定数据
		nextTick(() => {
			text.value = val
		})
	},
	{
		immediate: true
	}
)

const getBind = (column: any) => {
	const params = { ...column }
	;['value', 'className'].forEach(ele => {
		delete params[ele]
	})
	return params
}
// const enterChange = () => {
// 	let enter = props.column?.enter
// 	if (!validatenull(enter)) {
// 		if (typeof enter === 'function') props.column?.enter?.({ value: text.value, column: props.column })
// 	} else if (enter) {
// 		emit('enter')
// 	}
// }
defineExpose({ tempRef })
</script>
