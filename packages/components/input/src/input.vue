<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 15:27:48
 * @Description: 暂无
-->
<template>
	<el-input
		v-model="text"
		:class="b()"
		:size="size"
		:clearable="clearableVal"
		:disabled="disabled"
		:autocomplete="column?.autocomplete"
		:type="typeParam"
		:maxlength="column?.maxlength"
		:minlength="column?.minlength"
		:show-password="typeParam == 'password' ? column?.showPassword : false"
		:autosize="{ minRows: column?.minRows, maxRows: column?.maxRows }"
		:prefix-icon="column?.prefixIcon"
		:suffix-icon="column?.suffixIcon"
		:readonly="readonly"
		:placeholder="placeholder"
		:show-word-limit="column?.showWordLimit"
		@keyup.enter="isSearch ? column?.appendClick?.() : ''"
		@click="handleClick"
		@focus="handleFocus"
		@blur="handleBlur">
		<template v-if="column?.prepend" #prepend>
			<span @click="column?.prependClick?.()">{{ column?.prepend }}</span>
		</template>
		<template v-if="column?.append" #append>
			<span @click="column?.appendClick?.()">{{ column?.append }}</span>
		</template>
		<template v-else-if="isSearch" #append>
			<el-button icon="Search" @click="column.appendClick?.()" />
		</template>
		<template v-if="column?.suffix" #suffix>
			<span @click="column?.suffixClick?.()">{{ column?.suffix }}</span>
		</template>
		<template v-if="column?.prefix" #prefix>
			<span @click="column?.prefixClick?.()">{{ column?.prefix }}</span>
		</template>
	</el-input>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useBem, useEvent } from '@qv-vue/hooks'
import { inputProps } from './input'
// import { ElInput, ElButton } from 'element-plus'

const { b } = useBem('qv-input')
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
defineOptions({
	name: 'qv-input'
	// components: { ElButton }
})
const props = defineProps(inputProps)
const { text, handleFocus, handleBlur, handleClick, clearableVal } = useEvent(props, emit)
const isSearch = computed(() => {
	return props.type == 'search'
})
const typeParam = computed(() => {
	if (props.type === 'textarea') {
		return 'textarea'
	} else if (props.type === 'password') {
		return 'password'
	} else {
		return 'text'
	}
})
</script>
<style></style>
