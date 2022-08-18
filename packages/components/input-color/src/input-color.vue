<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-18 15:24:32
 * @Description: 暂无
-->
<template>
	<div :class="b()">
		<el-input
			ref="main"
			v-model="text"
			:placeholder="placeholder"
			:size="size"
			:readonly="readonly"
			:clearable="clearableVal"
			:disabled="disabled"
			@change="handleChange"
			@click="handleClick">
			<template #append>
				<el-color-picker
					v-model="text"
					size="small"
					:color-format="column?.colorFormat"
					:disabled="disabled"
					:show-alpha="column?.showAlpha"
					:predefine="predefineColors"
					@change="handleChange" />
			</template>
		</el-input>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useBem, useEvent } from '@qv-vue/hooks'
import { inputColorProps } from './input-color'
import { ElInput, ElColorPicker } from 'element-plus'
defineOptions({
	name: 'qv-input-color'
})
const { b } = useBem('qv-input-color')
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const props = defineProps(inputColorProps)
const { text, handleChange, handleClick, clearableVal } = useEvent(props, emit)

const predefineColors = ref([
	'#ff4500',
	'#ff8c00',
	'#ffd700',
	'#90ee90',
	'#00ced1',
	'#1e90ff',
	'#c71585',
	'rgba(255, 69, 0, 0.68)',
	'rgb(255, 120, 0)',
	'hsv(51, 100, 98)',
	'hsva(120, 40, 94, 0.5)',
	'hsl(181, 100%, 37%)',
	'hsla(209, 100%, 56%, 0.73)',
	'#c7158577'
])
</script>
<style></style>
