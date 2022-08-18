<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-18 17:06:49
 * @Description: 暂无
-->
<template>
	<div :class="b()">
		<!-- :arrow-control="column.arrowControl" -->
		<!-- :disabled-date="disabledDate" -->
		<el-time-picker
			v-model="text"
			:popper-class="column?.popperClass"
			:is-range="isRange"
			:size="size"
			:editable="column?.editable"
			:default-value="column?.defaultValue"
			:range-separator="column?.rangeSeparator"
			:start-placeholder="column?.startPlaceholder"
			:end-placeholder="column?.endPlaceholder"
			:format="column?.format"
			:readonly="readonly"
			:clearable="clearableVal"
			:shortcuts="column?.shortcuts"
			:value-format="column?.valueFormat"
			:disabled="disabled"
			:placeholder="placeholder"
			@change="handleChange"
			@click="handleClick" />
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useBem, useEvent } from '@qv-vue/hooks'
import { validatenull } from '@qv-vue/utils'
import { timeProps } from './time'
import { ElTimePicker } from 'element-plus'
defineOptions({
	name: 'qv-time'
})
const { b } = useBem('qv-date')
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const props = defineProps(timeProps)
const handleTextValue = (val: unknown) => {
	if (Array.isArray(val) && validatenull(val)) {
		text.value = val.join(',')
	}
}
const { text, clearableVal, handleChange, handleClick } = useEvent(props, emit, { handleTextValue })

const isRange = computed(() => {
	return props.type === 'timerange'
})
</script>
<style></style>
