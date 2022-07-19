<template>
	<div :class="b()">
		<el-checkbox
			v-if="column?.all"
			v-model="checkAll"
			:class="b('all')"
			:disabled="disabled"
			:indeterminate="isIndeterminate"
			@change="handleCheckAll">
			全选
		</el-checkbox>
		<el-checkbox-group
			v-model="text"
			:disabled="disabled"
			:size="size"
			:min="column?.min"
			:max="column?.max"
			@click="handleClick"
			@change="handleCheckChange">
			<component
				:is="componentName"
				v-for="(item, index) in dic"
				:key="index"
				:label="item[valueKey]"
				:border="column?.border"
				:size="size"
				:readonly="readonly"
				:disabled="item[disabledKey]">
				{{ item[labelKey] }}
			</component>
		</el-checkbox-group>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useBem, useEvent } from '@qv-vue/hooks'
import { checkboxProps } from './checkbox'
defineOptions({
	name: 'qv-checkbox'
})
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const props = defineProps(checkboxProps)
const { b } = useBem('qv-checkbox')
const checkAll = ref(false)
const isIndeterminate = ref(false)
const { text, name, labelKey, valueKey, disabledKey, handleClick, componentName } = useEvent(props, emit)
name.value = 'checkbox'
const handleCheckChange = (value = []) => {
	if (!props.column?.all) return
	const checkedCount = value.length
	const dicLen = props.dic?.length || 0
	checkAll.value = checkedCount === dicLen
	isIndeterminate.value = checkedCount > 0 && checkedCount < dicLen
}
watch(
	() => props.dic,
	() => {
		handleCheckChange(text.value)
	}
)
watch(
	() => text.value,
	() => {
		handleCheckChange(text.value)
	},
	{
		immediate: true
	}
)

const handleCheckAll = (val: boolean) => {
	if (!props.column?.all) return
	text.value = val ? props.dic?.map(ele => ele[valueKey.value]) : []
	isIndeterminate.value = false
}
</script>
<style></style>
