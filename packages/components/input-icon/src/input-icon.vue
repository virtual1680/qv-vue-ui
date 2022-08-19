<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 15:28:10
 * @Description: 暂无
-->
<template>
	<div :class="b()">
		<el-input
			ref="mainRef"
			:placeholder="placeholder"
			:model-value="text"
			:popper-class="column?.popperClass"
			:size="size"
			:clearable="disabled ? false : column?.clearable"
			:disabled="disabled"
			@change="handleChange"
			@click="handleClick"
			@focus="handleShow">
			<template #append>
				<qv-temp-icon small :text="text" :size="28" @click="handleShow" />
			</template>
		</el-input>
		<el-dialog v-model="box" custom-class="qv-dialog qv-dialog--none" :title="placeholder" append-to-body :width="column?.dialogWidth">
			<qv-tabs :option="option" @change="handleTabs" />
			<div :class="b('list')">
				<div v-for="(item, index) in list" :key="index" :class="b('item')" @click="handleSubmit(item.value)">
					<qv-temp-icon :text="item.value" :size="item.size" :color="item.color" />
					<p>{{ item.label || item.value }}</p>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useBem, useEvent } from '@qv-vue/hooks'
import { inputIconProps } from './input-icon'
// import { ElInput, ElDialog } from 'element-plus'
// import QvTempIcon from '@qv-vue/components/temp/src/temp-icon.vue'
// import { QvTabs } from '@qv-vue/components/tabs'
import type { IconItem } from '@qv-vue/types/qvue-ui'
import type { Ref } from 'vue'
import type { InputInstance } from 'element-plus'
defineOptions({
	name: 'qv-input-icon'
})
const { b } = useBem('qv-input-icon')
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const props = defineProps(inputIconProps)
const { text, handleChange, handleClick } = useEvent(props, emit)
const box = ref(false)
const tabs: Ref<IconItem> = ref({} as IconItem)
const mainRef: Ref<InputInstance | null> = ref(null)

const list = computed(() => {
	return (props.column?.iconList || []).map(ele => {
		if (!ele.value) {
			//TODO 返回的类型包裹了一层 value，可能会导致数据渲染不对
			return {
				value: ele
			}
		}
		return ele
	}) as IconItem[]
})
const option = computed(() => {
	return {
		column: props.column?.iconList
	}
})

onMounted(() => {
	tabs.value = props.column?.iconList?.[0] || ({} as IconItem)
})

const handleTabs = (tab: IconItem) => {
	tabs.value = tab
}
const handleSubmit = (item?: string) => {
	box.value = false
	text.value = item
	handleChange(item)
}
const handleShow = () => {
	mainRef.value?.blur()
	if (props.disabled || props.readonly) return
	box.value = true
}
</script>
<style></style>
