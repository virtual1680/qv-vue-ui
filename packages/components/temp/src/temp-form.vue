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
// import QvInput from '@qv-vue/components/input/src/input.vue'
// import QvRate from '@qv-vue/components/rate/src/rate.vue'
// import QvCheckbox from '@qv-vue/components/checkbox/src/checkbox.vue'
// import QvDate from '@qv-vue/components/date/src/date.vue'
// import QvInputColor from '@qv-vue/components/input-color/src/input-color.vue'
// import QvInputIcon from '@qv-vue/components/input-icon/src/input-icon.vue'
// import QvInputNumber from '@qv-vue/components/input-number/src/input-number.vue'
// import QvRadio from '@qv-vue/components/radio/src/radio.vue'
// import QvSelect from '@qv-vue/components/select/src/select.vue'
// import QvSwitch from '@qv-vue/components/switch/src/switch.vue'
// import QvTime from '@qv-vue/components/time/src/time.vue'
// import QvUpload from '@qv-vue/components/upload/src/upload.vue'
// import QvArray from '@qv-vue/components/array/src/array.vue'
// import QvCarousel from '@qv-vue/components/carousel/src/carousel.vue'
// import QvCascader from '@qv-vue/components/cascader/src/cascader.vue'
// import QvImg from '@qv-vue/components/img/src/img.vue'
import type { Ref } from 'vue'
defineOptions({
	name: 'qv-temp-form',
	components: {
		// QvInput,
		// QvRate,
		// QvCheckbox,
		// QvDate,
		// QvInputColor,
		// QvInputIcon,
		// QvInputNumber,
		// QvRadio,
		// QvSelect,
		// QvSwitch,
		// QvTime,
		// QvUpload,
		// QvCarousel,
		// QvCascader,
		// QvImg,
		// QvArray
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
