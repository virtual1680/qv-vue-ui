<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-18 15:39:43
 * @Description: 暂无
-->
<template>
	<div :class="b()">
		<el-tabs v-model="active" :tab-position="parentOption?.position" :type="parentOption?.type">
			<el-tab-pane :name="index" :disabled="column.disabled" v-for="(column, index) in columnOption" :key="index">
				<template #label>
					<i :class="column.icon"></i>&nbsp;
					{{ column.label }}
				</template>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { tabsProps } from './tabs'
import { ElTabs, ElTabPane } from 'element-plus'

defineOptions({
	name: 'qv-tabs'
})
const { b } = useBem('qv-tabs')
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const props = defineProps(tabsProps)
const active = ref('0')
watch(
	() => active.value,
	() => {
		emit('change', tabsObj.value)
	}
)
const tabsObj = computed(() => {
	return columnOption.value[active.value]
})
const parentOption = computed(() => {
	return props.option
})
const columnOption = computed(() => {
	return parentOption.value?.column || []
})
// const changeTabs = (actived: string) => {
// 	active.value = actived + ''
// }
</script>
<style></style>
