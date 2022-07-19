<template>
	<el-cascader
		:options="dic"
		:class="b()"
		@click="handleClick"
		v-model="text"
		:placeholder="placeholder"
		:props="allProps"
		:size="size"
		:clearable="clearableVal"
		:show-all-levels="column.showAllLevels"
		:filterable="column.filterable"
		:popper-class="column.popperClass"
		:separator="column.separator"
		:disabled="disabled"
		:collapse-tags="column.tags"
		@focus="handleFocus"
		@blur="handleBlur">
		<template #="{ data, node }">
			<slot v-if="$slots.default" :data="data" :node="node"></slot>
			<span v-else>{{ data[labelKey] }}</span>
		</template>
	</el-cascader>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useBem, useEvent } from '@qv-vue/hooks'
import { cascaderProps } from './cascader'
defineOptions({
	name: 'qv-cascader'
})
const { b } = useBem('qv-cascader')
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const props = defineProps(cascaderProps)
const { text, labelKey, valueKey, childrenKey, handleClick, clearableVal, handleFocus, handleBlur } = useEvent(props, emit)
const allProps = computed(() => {
	return {
		label: labelKey.value,
		value: valueKey.value,
		children: childrenKey.value,
		checkStrictly: props.column.checkStrictly,
		multiple: props.column.multiple,
		emitPath: props.column.emitPath,
		lazy: props.column.lazy,
		lazyLoad: (node: any, resolve: any) => {
			let callback = (list?: any) => {
				let findDic = (list: any[], value?: any, children?: any) => {
					list.forEach(ele => {
						if (ele[valueKey.value] == value) {
							ele[childrenKey.value] = children
						} else if (ele[childrenKey.value]) {
							findDic(ele[childrenKey.value])
						}
					})
				}
				findDic(props.dic, node[valueKey.value], list)
				resolve(list)
			}
			props.column.lazyLoad && props.column.lazyLoad(node, callback)
		},
		expandTrigger: props.column.expandTrigger
	}
})
</script>
<style></style>
