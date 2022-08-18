<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-18 17:09:21
 * @Description: 暂无
-->
<template>
	<div :class="b()">
		<el-radio-group v-model="text" :size="size" :disabled="disabled" @change="handleChange" @click="handleClick">
			<component
				:is="componentName"
				v-for="(item, index) in dic"
				:key="index"
				:label="item[valueKey]"
				:border="column?.border"
				:readonly="readonly"
				:disabled="item[disabledKey]">
				{{ item[labelKey] }}
			</component>
		</el-radio-group>
	</div>
</template>
<script lang="ts" setup>
import { useBem, useEvent } from '@qv-vue/hooks'
import { radioProps } from './radio'
import { ElRadioGroup, ElRadio } from 'element-plus'

defineOptions({
	name: 'qv-radio',
	components: { ElRadio }
})
const { b } = useBem('radio')

const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const props = defineProps(radioProps)
const { text, name, handleChange, labelKey, handleClick, componentName, valueKey, disabledKey } = useEvent(props, emit)
name.value = 'radio'
</script>
<style></style>
