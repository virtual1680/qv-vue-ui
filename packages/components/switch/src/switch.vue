<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 15:29:30
 * @Description: 暂无
-->
<template>
	<div>
		<el-switch
			v-model="text"
			:active-text="active[0]"
			:active-value="active[1]"
			:inactive-value="inactive[1]"
			:inactive-text="inactive[0]"
			:active-icon-class="column?.activeIconClass"
			:inactive-icon-class="column?.inactiveIconClass"
			:active-color="column?.activeColor"
			:inactive-color="column?.inactiveColor"
			:width="column?.len"
			:disabled="disabled"
			@click="handleClick" />
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useEvent } from '@qv-vue/hooks'
import { switchProps } from './switch'
// import { ElSwitch } from 'element-plus'
defineOptions({
	name: 'qv-switch'
})
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const props = defineProps(switchProps)
const { handleClick, labelKey, valueKey, text } = useEvent(props, emit)
const active = computed(() => {
	const ff = props.dic?.[1] || {}
	return [ff[labelKey.value], ff[valueKey.value]]
})
const inactive = computed(() => {
	const ff = props.dic?.[0] || {}
	return [ff[labelKey.value], ff[valueKey.value]]
})
</script>
<style></style>
